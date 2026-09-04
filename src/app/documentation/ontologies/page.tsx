import Link from "next/link";
import type { Metadata } from "next";
import { Download, BookOpen, GitBranch, Table2, RefreshCw, Globe } from "lucide-react";
import { loadRegistry, publicEntries, sitePath, formatBytes, type RegistryEntry } from "@/lib/ontologies";
import StatusBadge from "@/components/ontology/StatusBadge";

export const metadata: Metadata = {
  title: "FireBIM Ontologies – FBO",
  description:
    "The FireBIM Building Ontology (FBO): the European core ontology, the national modules and the official mapping to IFC. Browse, download as Turtle, or sync into the FireBIM platform.",
};

function EntryCard({ entry }: { entry: RegistryEntry }) {
  const isMapping = entry.kind === "mapping";
  const browseHref = isMapping
    ? "/documentation/fbo-ifc-mapping/"
    : `/documentation/ontologies/${entry.ontology_family}/${entry.country}/`;
  const latest = entry.versions[0];
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h3 className="text-xl font-bold">{entry.title}</h3>
          <p className="text-xs text-gray-500 font-mono mt-1">
            {entry.prefix}: &lt;{entry.namespace}&gt;
          </p>
        </div>
        {isMapping ? (
          <span className="shrink-0 rounded bg-purple-100 text-purple-800 px-2 py-0.5 text-xs font-medium">alignment</span>
        ) : (
          <span className="shrink-0 rounded bg-gray-100 text-gray-700 px-2 py-0.5 text-xs font-medium">
            {entry.country === "core" ? "umbrella" : "national module"}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-4">{entry.description}</p>

      <div className="mt-auto">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>
            {entry.versions.length} version{entry.versions.length === 1 ? "" : "s"} · newest first
          </span>
          <span>
            {latest.class_count} classes · {latest.property_count} properties
            {latest.individual_count ? ` · ${latest.individual_count} individuals` : ""}
          </span>
        </div>
        <ul className="divide-y divide-gray-100 border border-gray-100 rounded-lg mb-4">
          {entry.versions.map((v) => (
            <li key={v.version} className="flex flex-wrap items-center gap-2 px-3 py-2 text-sm">
              <span className="font-mono font-semibold">{v.version}</span>
              <StatusBadge status={v.status} />
              {v.is_latest && (
                <span className="rounded bg-blue-50 text-blue-700 px-1.5 py-0.5 text-[10px] font-semibold">LATEST</span>
              )}
              <span className="text-gray-500 text-xs">issued {v.issued_at}</span>
              <span className="ml-auto flex items-center gap-3">
                <span className="text-gray-400 text-xs">{formatBytes(v.byte_size)}</span>
                <a
                  href={sitePath(v.ttl_url)}
                  download
                  className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs font-medium"
                  title={`Download ${v.resource_filename} (${v.version})`}
                >
                  <Download className="h-3.5 w-3.5" /> .ttl
                </a>
                <Link
                  href={
                    isMapping
                      ? `/documentation/fbo-ifc-mapping/?version=${v.version}`
                      : `/documentation/ontologies/${entry.ontology_family}/${entry.country}/versions/${v.version}/`
                  }
                  className="text-blue-600 hover:underline text-xs font-medium"
                >
                  {isMapping ? "table" : "browse"}
                </Link>
              </span>
            </li>
          ))}
        </ul>
        <Link
          href={browseHref}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition"
        >
          {isMapping ? <Table2 className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
          {isMapping ? "Open mapping table" : "Browse latest version"}
        </Link>
      </div>
    </div>
  );
}

export default function OntologiesPage() {
  const registry = loadRegistry();
  const entries = publicEntries();
  const core = entries.find((e) => e.country === "core");
  const nationals = entries.filter((e) => e.kind === "ontology" && e.country !== "core");
  const mappings = entries.filter((e) => e.kind === "mapping");

  return (
    <main>
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">FireBIM Ontologies</h1>
        <p className="text-lg sm:text-2xl mb-4 max-w-3xl">
          The FireBIM Building Ontology (FBO) – the shared vocabulary that bridges national fire-safety regulations and
          building information models.
        </p>
        <p className="text-sm text-blue-100">
          Every release is versioned and permanently available. Newest versions are listed first.
        </p>
      </section>

      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">What is FBO?</h2>
          <p className="text-gray-700 mb-4">
            FBO covers national fire-safety terms and their legal definitions and serves as a bridge between the
            terminology in regulatory documents and (BIM) modelling practice. Its core principle is an overarching
            European <em>umbrella</em> ontology (<code className="font-mono text-sm">fbo:</code>) with national
            sub-ontologies (<code className="font-mono text-sm">fbo-be:</code>, <code className="font-mono text-sm">fbo-dk:</code>,
            <code className="font-mono text-sm"> fbo-lt:</code>, <code className="font-mono text-sm">fbo-nl:</code>,
            <code className="font-mono text-sm"> fbo-pt:</code>, …) underneath it. National terms are linked to the umbrella
            concepts with <code className="font-mono text-sm">fbo:isLinkedTo</code>, which makes similarities and
            differences between countries explicit without overwriting local legal definitions.
          </p>
          <p className="text-gray-700 mb-4">
            IFC is deliberately <strong>not</strong> inferred by default. How a fire-safety concept is expressed in IFC is
            kept in a separate alignment module, the <Link href="/documentation/fbo-ifc-mapping/" className="text-blue-600 hover:underline">FBO → IFC mapping</Link>,
            so that modellers can follow the official mapping or use their own.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="rounded-xl border border-gray-200 p-4">
              <Globe className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-semibold">Vertical modularisation</h3>
              <p className="text-sm text-gray-600">One European umbrella, one module per country. Legal definitions stay national.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <GitBranch className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-semibold">Versioned releases</h3>
              <p className="text-sm text-gray-600">
                Releases are identified as <code className="font-mono">YYYY.MM.DD</code> with a status (draft, candidate,
                stable, deprecated, withdrawn) – the same scheme as the FireBIM API.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <RefreshCw className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-semibold">Sync into the platform</h3>
              <p className="text-sm text-gray-600">
                <a href="https://app.firebim.org/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">app.firebim.org</a> can
                pull these releases into your own FireBIM API with one click – no credentials needed to read this registry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {core && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Core ontology</h2>
            <EntryCard entry={core} />
          </div>
        </section>
      )}

      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">National modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nationals.map((entry) => (
              <EntryCard key={`${entry.ontology_family}/${entry.country}`} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      {mappings.length > 0 && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">Alignment modules</h2>
            <p className="text-sm text-gray-600 mb-6">
              Official mappings from FBO to other standards. Other mappings may exist – in the FireBIM platform every user can
              maintain their own.
            </p>
            <div className="grid grid-cols-1 gap-6">
              {mappings.map((entry) => (
                <EntryCard key={`${entry.ontology_family}/${entry.country}`} entry={entry} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-14" id="developers">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">For developers: the public registry API</h2>
          <p className="text-gray-700 mb-6">
            Everything on this page is generated from a small set of static JSON and Turtle files. They are open, need no
            credentials, allow cross-origin requests and follow the URL structure of the FireBIM API
            (<code className="font-mono text-sm">/ontologies/{"{family}"}/{"{country}"}/versions/{"{version}"}</code>).
            Versions are always sorted newest first.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-2 font-semibold">Resource</th>
                  <th className="px-4 py-2 font-semibold">URL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-mono text-xs">
                <tr>
                  <td className="px-4 py-2 font-sans">Registry (all ontologies, all versions)</td>
                  <td className="px-4 py-2"><a className="text-blue-600 hover:underline" href="/documentation/ontologies/index.json">{registry.base_url}/index.json</a></td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-sans">One ontology (summary)</td>
                  <td className="px-4 py-2">{registry.base_url}/{"{family}"}/{"{country}"}/index.json</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-sans">Version list</td>
                  <td className="px-4 py-2">{registry.base_url}/{"{family}"}/{"{country}"}/versions.json</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-sans">Version metadata</td>
                  <td className="px-4 py-2">{registry.base_url}/{"{family}"}/{"{country}"}/versions/{"{version}"}/metadata.json</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-sans">Turtle file</td>
                  <td className="px-4 py-2">{registry.base_url}/{"{family}"}/{"{country}"}/versions/{"{version}"}/{"{file}"}.ttl</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-sans">Parsed terms (used by this viewer)</td>
                  <td className="px-4 py-2">{registry.base_url}/{"{family}"}/{"{country}"}/versions/{"{version}"}/terms.json</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            <code className="font-mono">latest</code> and <code className="font-mono">stable</code> are not folders on this static
            site: read <code className="font-mono">latest_version</code> / <code className="font-mono">latest_stable_version</code>
            from the summary and follow <code className="font-mono">ttl_url</code>. Each version carries a{" "}
            <code className="font-mono">sha256</code> so a client can detect changes without downloading the Turtle.
          </p>
          <pre className="mt-4 rounded-xl bg-gray-900 text-gray-100 text-xs p-4 overflow-x-auto">
{`# list everything
curl -s ${registry.base_url}/index.json | jq '.ontologies[] | {ontology_family, country, latest_version}'

# download the latest FBO-DK release
curl -s ${registry.base_url}/fbo/dk/index.json | jq -r .latest_ttl_url | xargs curl -sO

# sync into your own FireBIM API (authenticated; see the API docs)
curl -X POST https://api.firebim.org/ontologies/sync \\
  -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \\
  -d '{"source_url": "${registry.base_url}/index.json"}'`}
          </pre>
          <p className="text-sm text-gray-600 mt-4">
            The sync endpoint of the FireBIM API accepts any <code className="font-mono">source_url</code> that serves an
            index in this format, so the same mechanism works for registries hosted elsewhere.
          </p>
        </div>
      </section>
    </main>
  );
}
