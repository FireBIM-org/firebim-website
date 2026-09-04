import { notFound } from "next/navigation";
import Link from "next/link";
import OntologyViewer, { type ViewerVersion } from "@/components/ontology/OntologyViewer";
import { findEntry, publicEntries, sitePath } from "@/lib/ontologies";

/** Static params for every public ontology (mappings have their own page). */
export function ontologyParams() {
  return publicEntries()
    .filter((entry) => entry.kind === "ontology")
    .map((entry) => ({ family: entry.ontology_family, country: entry.country }));
}

export function versionParams() {
  return publicEntries()
    .filter((entry) => entry.kind === "ontology")
    .flatMap((entry) =>
      entry.versions.map((v) => ({ family: entry.ontology_family, country: entry.country, version: v.version })),
    );
}

export default function ViewerPage({ family, country, version }: { family: string; country: string; version?: string }) {
  const entry = findEntry(family, country);
  if (!entry || entry.kind !== "ontology") notFound();
  const selected = version ?? entry.latest_version;
  if (!entry.versions.some((v) => v.version === selected)) notFound();
  const versions: ViewerVersion[] = entry.versions.map((v) => ({
    version: v.version,
    status: v.status,
    issued_at: v.issued_at,
    ttl_path: sitePath(v.ttl_url),
    terms_path: sitePath(v.terms_url ?? v.url),
    resource_filename: v.resource_filename,
    is_latest: v.is_latest,
    byte_size: v.byte_size,
  }));
  return (
    <main className="py-8">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-sm text-gray-500">
        <Link href="/documentation/" className="hover:underline">Documentation</Link> ›{" "}
        <Link href="/documentation/ontologies/" className="hover:underline">Ontologies</Link> › {entry.short_title}
        {version && <> › <span className="font-mono">{version}</span></>}
      </div>
      <OntologyViewer
        family={entry.ontology_family}
        country={entry.country}
        title={entry.title}
        shortTitle={entry.short_title}
        description={entry.description}
        prefix={entry.prefix}
        namespace={entry.namespace}
        versions={versions}
        selectedVersion={selected}
      />
    </main>
  );
}
