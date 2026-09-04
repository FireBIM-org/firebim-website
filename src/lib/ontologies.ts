import fs from "node:fs";
import path from "node:path";

/**
 * Server-side (build time) access to the generated ontology registry in
 * public/documentation/ontologies/. The same JSON files are served publicly;
 * see scripts/ontologies/build-registry.mjs for the generator.
 */

import type { ReleaseStatus } from "./ontologyTerms";

export type { ReleaseStatus } from "./ontologyTerms";
export { STATUS_STYLES, formatBytes } from "./ontologyTerms";

export interface RegistryVersion {
  version: string;
  status: ReleaseStatus;
  issued_at: string;
  published_at: string;
  resource_filename: string;
  url: string;
  ttl_url: string;
  terms_url: string | null;
  mapping_url: string | null;
  graph_uri: string;
  ontology_uri: string | null;
  version_iri: string | null;
  label: string | null;
  description: string | null;
  imports: string[];
  triple_count: number | null;
  class_count: number;
  property_count: number;
  individual_count: number;
  subclass_count: number;
  byte_size: number;
  sha256: string;
  is_latest: boolean;
  is_stable: boolean;
  is_default: boolean;
}

export interface RegistryEntry {
  ontology_family: string;
  country: string;
  kind: "ontology" | "mapping";
  visibility: "public" | "unlisted";
  title: string;
  short_title: string;
  prefix: string;
  namespace: string;
  description: string;
  canonical_family_uri: string;
  canonical_country_uri: string;
  latest_version: string;
  latest_stable_version: string | null;
  default_version: string;
  url: string;
  available_versions_url: string;
  latest_url: string;
  latest_ttl_url: string;
  stable_url: string | null;
  api_summary_url: string;
  versions: RegistryVersion[];
}

export interface Registry {
  schema_version: number;
  registry: string;
  base_url: string;
  canonical_base_uri: string;
  api_base_uri: string;
  count: number;
  ontologies: RegistryEntry[];
}

const REGISTRY_FILE = path.join(process.cwd(), "public", "documentation", "ontologies", "index.json");

let cached: Registry | null = null;

export function loadRegistry(): Registry {
  if (!cached) {
    cached = JSON.parse(fs.readFileSync(REGISTRY_FILE, "utf8")) as Registry;
  }
  return cached;
}

export function publicEntries(): RegistryEntry[] {
  return loadRegistry().ontologies.filter((entry) => entry.visibility === "public");
}

export function findEntry(family: string, country: string): RegistryEntry | undefined {
  return publicEntries().find((entry) => entry.ontology_family === family && entry.country === country);
}

/** Relative (site-local) path for a registry URL, so links work in dev and on GitHub Pages. */
export function sitePath(absoluteUrl: string): string {
  const base = loadRegistry().base_url;
  return absoluteUrl.startsWith(base) ? `/documentation/ontologies${absoluteUrl.slice(base.length)}` : absoluteUrl;
}
