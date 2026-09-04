"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Search, FileSpreadsheet, Check, X, Info } from "lucide-react";
import type { MappingFile, MappingRow } from "@/lib/ontologyTerms";
import StatusBadge from "./StatusBadge";
import type { ReleaseStatus } from "@/lib/ontologyTerms";

export interface MappingVersion {
  version: string;
  status: ReleaseStatus;
  issued_at: string;
  ttl_path: string;
  mapping_path: string;
  resource_filename: string;
  is_latest: boolean;
}

const COUNTRY_NAMES: Record<string, string> = {
  core: "FBO core",
  be: "Belgium",
  dk: "Denmark",
  lt: "Lithuania",
  nl: "Netherlands",
  pt: "Portugal",
};

function csvEscape(v: string | null | undefined): string {
  const s = v ?? "";
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(rows: MappingRow[]): string {
  const header = [
    "mapping_id",
    "fbo_terms",
    "countries",
    "kind",
    "ifc_class_predefined_type",
    "pset_property",
    "data_type",
    "value",
    "buildingsmart_standard",
    "interpretation",
    "argumentation",
  ];
  const lines = rows.map((r) =>
    [
      r.id,
      r.terms.map((t) => t.prefixed).join(" | "),
      r.countries.join(" | "),
      r.kind,
      r.ifc_classes.join(" | "),
      r.pset_properties.join(" | "),
      r.data_type,
      r.value,
      r.is_buildingsmart ? "yes" : "no",
      r.interpretation,
      r.argumentation,
    ]
      .map(csvEscape)
      .join(","),
  );
  return [header.join(","), ...lines].join("\n");
}

export default function MappingExplorer({ versions }: { versions: MappingVersion[] }) {
  const [selectedVersion, setSelectedVersion] = useState(versions[0].version);
  const [data, setData] = useState<MappingFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const [entity, setEntity] = useState("all");
  const [country, setCountry] = useState("all");
  const [standardOnly, setStandardOnly] = useState(false);
  const [highlight, setHighlight] = useState<string | null>(null);

  const current = versions.find((v) => v.version === selectedVersion) ?? versions[0];

  // ?version=… and #RowId from the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("version");
    if (v && versions.some((x) => x.version === v)) setSelectedVersion(v);
    const apply = () => {
      const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      setHighlight(hash || null);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [versions]);

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setError(null);
    fetch(current.mapping_path)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((json: MappingFile) => {
        if (!cancelled) setData(json);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [current.mapping_path]);

  useEffect(() => {
    if (!data || !highlight) return;
    const el = document.getElementById(`row-${highlight}`);
    if (el) el.scrollIntoView({ block: "center" });
  }, [data, highlight]);

  const kinds = useMemo(() => [...new Set((data?.rows ?? []).map((r) => r.kind).filter(Boolean))].sort() as string[], [data]);
  const entities = useMemo(
    () => [...new Set((data?.rows ?? []).flatMap((r) => r.ifc_entities))].sort(),
    [data],
  );
  const countries = useMemo(
    () => [...new Set((data?.rows ?? []).flatMap((r) => r.countries))].sort(),
    [data],
  );

  const q = query.trim().toLowerCase();
  const rows = useMemo(() => {
    if (!data) return [];
    return data.rows.filter((r) => {
      if (kind !== "all" && r.kind !== kind) return false;
      if (entity !== "all" && !r.ifc_entities.includes(entity)) return false;
      if (country !== "all" && !r.countries.includes(country)) return false;
      if (standardOnly && !r.is_buildingsmart) return false;
      if (!q) return true;
      const hay = [
        r.id,
        r.label,
        ...r.ifc_classes,
        ...r.pset_properties,
        r.data_type ?? "",
        r.value ?? "",
        r.interpretation ?? "",
        r.argumentation ?? "",
        ...r.terms.flatMap((t) => [t.prefixed, t.label]),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [data, kind, entity, country, standardOnly, q]);

  const downloadCsv = () => {
    const blob = new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fbo-ifc-mapping-${current.version}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <label className="text-xs text-gray-500">
            Mapping version
            <select
              className="ml-2 rounded border border-gray-300 px-2 py-1 text-sm font-mono"
              value={current.version}
              onChange={(e) => {
                setSelectedVersion(e.target.value);
                window.history.replaceState(null, "", `?version=${e.target.value}`);
              }}
            >
              {versions.map((v) => (
                <option key={v.version} value={v.version}>
                  {v.version} · {v.status}
                  {v.is_latest ? " · latest" : ""}
                </option>
              ))}
            </select>
          </label>
          <StatusBadge status={current.status} />
          <span className="text-xs text-gray-500">issued {current.issued_at}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={downloadCsv}
            disabled={!data}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            <FileSpreadsheet className="h-4 w-4" /> CSV ({rows.length} rows)
          </button>
          <a
            href={current.ttl_path}
            download
            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 text-white px-3 py-1.5 text-sm hover:bg-blue-700"
          >
            <Download className="h-4 w-4" /> {current.resource_filename}
          </a>
        </div>
      </div>

      {data && (
        <div className="text-xs text-gray-500 mb-3">
          {data.counts.rows} mappings · {data.counts.buildingsmart_rows} using buildingSMART standard property sets ·{" "}
          {data.counts.ifc_entities} IFC entities · {data.counts.mapped_terms} FBO terms covered
        </div>
      )}

      {/* filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms, IFC classes, Psets…"
            className="rounded-lg border border-gray-300 pl-8 pr-2 py-2 text-sm w-72"
          />
        </div>
        <select value={kind} onChange={(e) => setKind(e.target.value)} className="rounded-lg border border-gray-300 px-2 py-2 text-sm">
          <option value="all">All kinds</option>
          {kinds.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        <select value={entity} onChange={(e) => setEntity(e.target.value)} className="rounded-lg border border-gray-300 px-2 py-2 text-sm font-mono">
          <option value="all">All IFC entities</option>
          {entities.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="rounded-lg border border-gray-300 px-2 py-2 text-sm">
          <option value="all">All countries</option>
          {countries.map((k) => (
            <option key={k} value={k}>{COUNTRY_NAMES[k] ?? k.toUpperCase()}</option>
          ))}
        </select>
        <label className="inline-flex items-center gap-1 text-sm text-gray-700">
          <input type="checkbox" checked={standardOnly} onChange={(e) => setStandardOnly(e.target.checked)} />
          buildingSMART standard only
        </label>
        {(q || kind !== "all" || entity !== "all" || country !== "all" || standardOnly) && (
          <button
            type="button"
            className="text-xs text-blue-600 hover:underline"
            onClick={() => {
              setQuery("");
              setKind("all");
              setEntity("all");
              setCountry("all");
              setStandardOnly(false);
            }}
          >
            clear filters
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 p-4 text-sm mb-4">
          Could not load the mapping ({error}). You can still{" "}
          <a href={current.ttl_path} className="underline">download the Turtle file</a>.
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-3 py-2">FBO term</th>
              <th className="px-3 py-2">Kind</th>
              <th className="px-3 py-2">IFC class · predefined type</th>
              <th className="px-3 py-2">Property set . Property</th>
              <th className="px-3 py-2">Data type / value</th>
              <th className="px-3 py-2 text-center" title="Uses a buildingSMART standard property set">bSI</th>
              <th className="px-3 py-2">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {!data && !error && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-gray-400">Loading mapping…</td>
              </tr>
            )}
            {data && rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-gray-400">No mappings match the current filters.</td>
              </tr>
            )}
            {rows.map((r) => (
              <tr
                key={r.id}
                id={`row-${r.id}`}
                className={`align-top ${highlight === r.id ? "bg-yellow-50" : "hover:bg-gray-50"}`}
              >
                <td className="px-3 py-2 min-w-[220px]">
                  <div className="font-mono text-[11px] text-gray-400 mb-1">
                    <a href={`#${r.id}`} className="hover:underline">fbo-ifc:{r.id}</a>
                  </div>
                  {r.terms.length === 0 && <span className="text-gray-400 text-xs">– no FBO term linked –</span>}
                  <ul className="space-y-0.5">
                    {r.terms.map((t) => (
                      <li key={t.iri} className="leading-snug">
                        {t.href ? (
                          <Link href={t.href} className="text-blue-700 hover:underline" title={t.definition ?? t.iri}>
                            {t.label}
                          </Link>
                        ) : (
                          <span title={t.iri}>{t.label}</span>
                        )}
                        <span className="ml-1 rounded bg-gray-100 px-1 text-[10px] text-gray-600">
                          {t.ontology?.split("/")[1]?.toUpperCase() ?? "?"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{r.kind ?? "–"}</td>
                <td className="px-3 py-2 font-mono text-xs">
                  {r.ifc_classes.length ? r.ifc_classes.map((c) => <div key={c}>{c}</div>) : <span className="text-gray-400">–</span>}
                </td>
                <td className="px-3 py-2 font-mono text-xs">
                  {r.pset_properties.length ? (
                    r.pset_properties.map((p) => (
                      <div key={p} className={p.startsWith("CPset_") ? "text-purple-700" : ""}>{p}</div>
                    ))
                  ) : (
                    <span className="text-gray-400">–</span>
                  )}
                </td>
                <td className="px-3 py-2 text-xs">
                  {r.data_type && <div className="font-mono">{r.data_type}</div>}
                  {r.value && <div className="text-gray-700">= {r.value}</div>}
                  {!r.data_type && !r.value && <span className="text-gray-400">–</span>}
                </td>
                <td className="px-3 py-2 text-center">
                  {r.is_buildingsmart ? (
                    <Check className="inline h-4 w-4 text-green-600" aria-label="buildingSMART standard" />
                  ) : (
                    <X className="inline h-4 w-4 text-gray-300" aria-label="custom / FireBIM property set" />
                  )}
                </td>
                <td className="px-3 py-2 text-xs text-gray-600 max-w-[320px]">
                  {r.interpretation && <p className="mb-1">{r.interpretation}</p>}
                  {r.argumentation && (
                    <p className="text-gray-500 flex gap-1">
                      <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" /> <span>{r.argumentation}</span>
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Purple property sets (<span className="font-mono text-purple-700">CPset_FireBIM.*</span>) are FireBIM custom property
        sets; add them as user-defined Psets in your authoring tool. Rows with a green check use buildingSMART standard
        property sets and quantity sets that most IFC exporters fill automatically.
      </p>
    </div>
  );
}
