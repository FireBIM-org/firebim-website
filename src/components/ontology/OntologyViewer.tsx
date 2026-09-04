"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronDown, Download, ExternalLink, Search, Copy, Check, Link2 } from "lucide-react";
import {
  CATEGORY_LABELS,
  localName,
  preferredLabel,
  type Term,
  type TermCategory,
  type TermRef,
  type TermValue,
  type TermsFile,
} from "@/lib/ontologyTerms";
import StatusBadge from "./StatusBadge";
import type { ReleaseStatus } from "@/lib/ontologyTerms";

export interface ViewerVersion {
  version: string;
  status: ReleaseStatus;
  issued_at: string;
  ttl_path: string;
  terms_path: string;
  resource_filename: string;
  is_latest: boolean;
  byte_size: number;
}

export interface ViewerProps {
  family: string;
  country: string;
  title: string;
  shortTitle: string;
  description: string;
  prefix: string;
  namespace: string;
  versions: ViewerVersion[]; // newest first
  selectedVersion: string;
}

type Filter = "all" | "class" | "objectProperty" | "datatypeProperty" | "individual";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "class", label: "Classes" },
  { key: "objectProperty", label: "Object properties" },
  { key: "datatypeProperty", label: "Datatype properties" },
  { key: "individual", label: "Individuals" },
];

const CATEGORY_DOT: Record<string, string> = {
  class: "bg-blue-500",
  objectProperty: "bg-purple-500",
  datatypeProperty: "bg-emerald-500",
  annotationProperty: "bg-gray-400",
  property: "bg-gray-400",
  individual: "bg-orange-500",
};

function matchesFilter(term: Term, filter: Filter): boolean {
  if (filter === "all") return true;
  if (filter === "individual") return term.category === "individual";
  return term.category === filter;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="inline-flex items-center text-gray-400 hover:text-gray-700"
      title="Copy"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function RefLink({
  iri,
  refs,
  local,
  onSelect,
}: {
  iri: string;
  refs: Record<string, TermRef>;
  local: Map<string, Term>;
  onSelect: (iri: string) => void;
}) {
  const ref = refs[iri];
  const isLocal = local.has(iri);
  const label = isLocal ? preferredLabel(local.get(iri)!.labels, localName(iri)) : (ref?.label ?? null);
  const text = ref?.prefixed ?? localName(iri);
  if (isLocal) {
    return (
      <button
        type="button"
        onClick={() => onSelect(iri)}
        className="text-blue-700 hover:underline text-left font-mono text-xs"
        title={label ?? undefined}
      >
        {text}
        {label && label !== localName(iri) && <span className="font-sans text-gray-500"> – {label}</span>}
      </button>
    );
  }
  if (ref?.href) {
    return (
      <Link href={ref.href} className="text-blue-700 hover:underline font-mono text-xs" title={iri}>
        {text}
        {label && <span className="font-sans text-gray-500"> – {label}</span>}
        <span className="font-sans text-gray-400"> ({ref.ontology})</span>
      </Link>
    );
  }
  if (/^https?:\/\//.test(iri)) {
    return (
      <a href={iri} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-mono text-xs inline-flex items-center gap-1">
        {text} <ExternalLink className="h-3 w-3" />
      </a>
    );
  }
  return <span className="font-mono text-xs">{text}</span>;
}

function LiteralList({ values }: { values: TermValue[] }) {
  return (
    <ul className="space-y-1">
      {values.map((v, i) => (
        <li key={i} className="text-sm text-gray-800 whitespace-pre-line">
          {v.value}
          {v.lang && <span className="ml-2 rounded bg-gray-100 px-1 text-[10px] uppercase text-gray-500">{v.lang}</span>}
          {v.datatype && <span className="ml-2 text-[10px] text-gray-400 font-mono">^^{v.datatype}</span>}
        </li>
      ))}
    </ul>
  );
}

export default function OntologyViewer(props: ViewerProps) {
  const { family, country, versions, selectedVersion } = props;
  const router = useRouter();
  const current = versions.find((v) => v.version === selectedVersion) ?? versions[0];

  const [data, setData] = useState<TermsFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setError(null);
    fetch(current.terms_path)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((json: TermsFile) => {
        if (!cancelled) setData(json);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [current.terms_path]);

  const byIri = useMemo(() => new Map((data?.terms ?? []).map((t) => [t.iri, t])), [data]);
  const byName = useMemo(() => new Map((data?.terms ?? []).map((t) => [t.name, t])), [data]);

  // hash → selection
  useEffect(() => {
    if (!data) return;
    const apply = () => {
      const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (hash && byName.has(hash)) setSelected(byName.get(hash)!.iri);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [data, byName]);

  const select = useCallback(
    (iri: string) => {
      setSelected(iri);
      const t = byIri.get(iri);
      if (t) {
        window.history.replaceState(null, "", `#${encodeURIComponent(t.name)}`);
        // expand ancestors so the tree shows the selection
        setExpanded((prev) => {
          const next = new Set(prev);
          let queue = [...t.parents];
          while (queue.length) {
            const p = queue.pop()!;
            if (next.has(p)) continue;
            next.add(p);
            const pt = byIri.get(p);
            if (pt) queue = queue.concat(pt.parents);
          }
          return next;
        });
      }
    },
    [byIri],
  );

  const q = query.trim().toLowerCase();
  const visible = useMemo(() => {
    if (!data) return [];
    return data.terms.filter((t) => {
      if (!matchesFilter(t, filter)) return false;
      if (!q) return true;
      if (t.name.toLowerCase().includes(q)) return true;
      if (t.labels.some((l) => l.value.toLowerCase().includes(q))) return true;
      if (t.definitions.some((d) => d.value.toLowerCase().includes(q))) return true;
      return false;
    });
  }, [data, filter, q]);

  const roots = useMemo(() => visible.filter((t) => !t.parents.some((p) => byIri.has(p))), [visible, byIri]);
  const treeMode = !q;

  const term = selected ? byIri.get(selected) ?? null : null;

  const renderNode = (t: Term, depth: number) => {
    const kids = t.children.map((c) => byIri.get(c)).filter((c): c is Term => Boolean(c) && matchesFilter(c!, filter));
    const isOpen = expanded.has(t.iri);
    const isSel = selected === t.iri;
    return (
      <li key={t.iri}>
        <div
          className={`flex items-center gap-1 rounded px-1 py-0.5 text-sm cursor-pointer ${isSel ? "bg-blue-50 text-blue-800" : "hover:bg-gray-50"}`}
          style={{ paddingLeft: `${depth * 14 + 4}px` }}
        >
          {kids.length > 0 ? (
            <button
              type="button"
              className="text-gray-400 hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((prev) => {
                  const next = new Set(prev);
                  if (next.has(t.iri)) next.delete(t.iri);
                  else next.add(t.iri);
                  return next;
                });
              }}
              aria-label={isOpen ? "Collapse" : "Expand"}
            >
              {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            </button>
          ) : (
            <span className="w-3.5" />
          )}
          <span className={`h-2 w-2 rounded-full shrink-0 ${CATEGORY_DOT[t.category] ?? "bg-gray-300"}`} />
          <button type="button" className="truncate text-left flex-1" onClick={() => select(t.iri)} title={t.id}>
            {t.name}
            <span className="ml-1 text-xs text-gray-400">{preferredLabel(t.labels, "") !== t.name ? preferredLabel(t.labels, "") : ""}</span>
          </button>
        </div>
        {isOpen && kids.length > 0 && <ul>{kids.map((k) => renderNode(k, depth + 1))}</ul>}
      </li>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold">{props.title}</h1>
          <p className="text-gray-600 mt-1 max-w-3xl">{props.description}</p>
          <p className="font-mono text-xs text-gray-500 mt-2 flex items-center gap-2">
            {props.prefix}: &lt;{props.namespace}&gt; <CopyButton text={props.namespace} />
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <label className="text-xs text-gray-500">
            Version
            <select
              className="ml-2 rounded border border-gray-300 px-2 py-1 text-sm font-mono"
              value={current.version}
              onChange={(e) => router.push(`/documentation/ontologies/${family}/${country}/versions/${e.target.value}/`)}
            >
              {versions.map((v) => (
                <option key={v.version} value={v.version}>
                  {v.version} · {v.status}
                  {v.is_latest ? " · latest" : ""}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-center gap-2">
            <StatusBadge status={current.status} />
            <span className="text-xs text-gray-500">issued {current.issued_at}</span>
            <a
              href={current.ttl_path}
              download
              className="inline-flex items-center gap-1 rounded-lg bg-blue-600 text-white px-3 py-1.5 text-sm hover:bg-blue-700"
            >
              <Download className="h-4 w-4" /> {current.resource_filename}
            </a>
          </div>
        </div>
      </div>

      {data?.ontology && (
        <div className="text-xs text-gray-500 mb-4 flex flex-wrap gap-x-6 gap-y-1">
          <span>
            Version IRI:{" "}
            <span className="font-mono">
              {data.ontology.properties.find((p) => p.predicate === "owl:versionIRI")?.values[0]?.value ?? "–"}
            </span>
          </span>
          <span>
            {data.counts.classes} classes · {data.counts.properties} properties · {data.counts.individuals} individuals ·{" "}
            {data.counts.triples} triples
          </span>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 p-4 text-sm">
          Could not load the ontology terms ({error}). You can still{" "}
          <a href={current.ttl_path} className="underline">download the Turtle file</a>.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,1fr)_2fr] gap-6">
        {/* left: browse */}
        <aside className="rounded-xl border border-gray-200 bg-white p-3 flex flex-col max-h-[75vh]">
          <div className="relative mb-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search names, labels, definitions…"
              className="w-full rounded-lg border border-gray-300 pl-8 pr-2 py-2 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-2.5 py-0.5 text-xs border ${filter === f.key ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="text-[11px] text-gray-400 mb-1">
            {data ? `${visible.length} term${visible.length === 1 ? "" : "s"}` : "Loading…"}
            {treeMode && data ? " · hierarchy (subClassOf / subPropertyOf)" : ""}
          </div>
          <div className="overflow-y-auto flex-1 -mx-1 px-1">
            {data && (
              <ul>
                {treeMode
                  ? roots.map((t) => renderNode(t, 0))
                  : visible.map((t) => (
                      <li key={t.iri}>
                        <button
                          type="button"
                          onClick={() => select(t.iri)}
                          className={`flex items-center gap-2 w-full rounded px-2 py-1 text-sm text-left ${selected === t.iri ? "bg-blue-50 text-blue-800" : "hover:bg-gray-50"}`}
                        >
                          <span className={`h-2 w-2 rounded-full shrink-0 ${CATEGORY_DOT[t.category] ?? "bg-gray-300"}`} />
                          <span className="truncate">
                            {t.name}
                            <span className="ml-1 text-xs text-gray-400">{preferredLabel(t.labels, "")}</span>
                          </span>
                        </button>
                      </li>
                    ))}
              </ul>
            )}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-100 flex flex-wrap gap-3 text-[10px] text-gray-500">
            {(["class", "objectProperty", "datatypeProperty", "individual"] as TermCategory[]).map((c) => (
              <span key={c} className="inline-flex items-center gap-1">
                <span className={`h-2 w-2 rounded-full ${CATEGORY_DOT[c]}`} /> {CATEGORY_LABELS[c]}
              </span>
            ))}
          </div>
        </aside>

        {/* right: detail */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 min-h-[40vh]">
          {!term ? (
            <div className="text-gray-500 text-sm">
              <p className="mb-2">Select a term on the left to see its labels, definition, relations and all annotations.</p>
              <p>
                Terms are shown as a hierarchy following <code className="font-mono">rdfs:subClassOf</code> /{" "}
                <code className="font-mono">rdfs:subPropertyOf</code>. Searching switches to a flat list. Each term has a
                permalink (<code className="font-mono">#TermName</code>).
              </p>
            </div>
          ) : (
            <TermDetail term={term} data={data!} local={byIri} onSelect={select} />
          )}
        </section>
      </div>
    </div>
  );
}

function TermDetail({
  term,
  data,
  local,
  onSelect,
}: {
  term: Term;
  data: TermsFile;
  local: Map<string, Term>;
  onSelect: (iri: string) => void;
}) {
  const label = preferredLabel(term.labels, term.name);
  const relation = (title: string, iris: string[]) =>
    iris.length > 0 && (
      <div>
        <dt className="text-xs uppercase tracking-wide text-gray-500 mb-1">{title}</dt>
        <dd className="flex flex-col gap-1">
          {iris.map((iri) => (
            <RefLink key={iri} iri={iri} refs={data.refs} local={local} onSelect={onSelect} />
          ))}
        </dd>
      </div>
    );
  const mappingLinks = term.ifc_mappings.map((iri) => ({
    iri,
    name: localName(iri),
    href: `/documentation/fbo-ifc-mapping/#${encodeURIComponent(localName(iri))}`,
  }));
  const isSubProperty = term.category.endsWith("Property");

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
        <div>
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${CATEGORY_DOT[term.category] ?? "bg-gray-300"}`} />
            <span className="text-xs uppercase tracking-wide text-gray-500">{CATEGORY_LABELS[term.category]}</span>
            {term.types.length > 1 && <span className="text-[10px] text-gray-400 font-mono">{term.types.join(", ")}</span>}
          </div>
          <h2 className="text-2xl font-bold mt-1">{label}</h2>
          <p className="font-mono text-sm text-gray-600 flex items-center gap-2">
            {term.id} <CopyButton text={term.id} />
          </p>
          <p className="font-mono text-[11px] text-gray-400 flex items-center gap-2 break-all">
            {term.iri} <CopyButton text={term.iri} />
            <a href={`#${encodeURIComponent(term.name)}`} className="text-gray-400 hover:text-gray-700" title="Permalink">
              <Link2 className="h-3.5 w-3.5" />
            </a>
          </p>
        </div>
      </div>

      <dl className="mt-4 space-y-5">
        {term.labels.length > 0 && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-500 mb-1">Labels</dt>
            <dd><LiteralList values={term.labels} /></dd>
          </div>
        )}
        {term.definitions.length > 0 && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-500 mb-1">Definition</dt>
            <dd><LiteralList values={term.definitions} /></dd>
          </div>
        )}
        {term.comments.length > 0 && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-500 mb-1">Comment</dt>
            <dd><LiteralList values={term.comments} /></dd>
          </div>
        )}
        {relation(isSubProperty ? "Sub-property of" : "Subclass of", term.parents)}
        {relation(isSubProperty ? "Sub-properties" : "Subclasses", term.children)}
        {relation("Linked to (umbrella concept)", term.linked_to)}
        {relation("National sub-items", term.subitems)}
        {mappingLinks.length > 0 && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-500 mb-1">Official IFC mapping</dt>
            <dd className="flex flex-col gap-1">
              {mappingLinks.map((m) => (
                <Link key={m.iri} href={m.href} className="text-blue-700 hover:underline font-mono text-xs">
                  fbo-ifc:{m.name} <span className="font-sans text-gray-500">– open in mapping table</span>
                </Link>
              ))}
            </dd>
          </div>
        )}
        {term.properties.length > 0 && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-500 mb-1">Annotations &amp; other properties</dt>
            <dd className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {term.properties.map((p) => (
                    <tr key={p.predicate} className="align-top">
                      <th className="py-1.5 pr-4 text-left font-mono text-xs text-gray-600 whitespace-nowrap w-1/3">{p.predicate}</th>
                      <td className="py-1.5">
                        <ul className="space-y-1">
                          {p.values.map((v, i) => (
                            <li key={i}>
                              {v.kind === "iri" ? (
                                <RefLink iri={v.value} refs={data.refs} local={local} onSelect={onSelect} />
                              ) : (
                                <span className="whitespace-pre-line">
                                  {v.value}
                                  {v.lang && <span className="ml-2 rounded bg-gray-100 px-1 text-[10px] uppercase text-gray-500">{v.lang}</span>}
                                  {v.datatype && <span className="ml-2 text-[10px] text-gray-400 font-mono">^^{v.datatype}</span>}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
