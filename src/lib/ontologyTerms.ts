/** Client-safe types and helpers for the generated registry / terms.json / mapping.json files. */

export type ReleaseStatus = "draft" | "candidate" | "stable" | "deprecated" | "withdrawn";

export const STATUS_STYLES: Record<ReleaseStatus, string> = {
  draft: "bg-amber-100 text-amber-800",
  candidate: "bg-blue-100 text-blue-800",
  stable: "bg-green-100 text-green-800",
  deprecated: "bg-gray-200 text-gray-700",
  withdrawn: "bg-red-100 text-red-800",
};

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export interface TermValue {
  kind: "literal" | "iri" | "blank";
  value: string;
  lang?: string;
  datatype?: string;
  prefixed?: string;
}

export interface TermProperty {
  predicate: string;
  iri: string;
  values: TermValue[];
}

export type TermCategory =
  | "class"
  | "objectProperty"
  | "datatypeProperty"
  | "annotationProperty"
  | "property"
  | "individual"
  | "ontology";

export interface Term {
  iri: string;
  id: string;
  name: string;
  category: TermCategory;
  types: string[];
  labels: TermValue[];
  definitions: TermValue[];
  comments: TermValue[];
  parents: string[];
  children: string[];
  linked_to: string[];
  subitems: string[];
  ifc_mappings: string[];
  properties: TermProperty[];
}

export interface TermRef {
  prefixed: string;
  label: string | null;
  ontology: string | null;
  href: string | null;
}

export interface TermsFile {
  ontology_family: string;
  country: string;
  version: string;
  prefixes: Record<string, string>;
  ontology: Term | null;
  counts: { classes: number; properties: number; individuals: number; triples: number };
  terms: Term[];
  refs: Record<string, TermRef>;
}

export interface MappingTermRef {
  iri: string;
  prefixed: string;
  label: string;
  definition: string | null;
  ontology: string | null;
  ontology_title: string | null;
  href: string | null;
}

export interface MappingRow {
  id: string;
  iri: string;
  label: string;
  kind: string | null;
  ifc_classes: string[];
  ifc_entities: string[];
  pset_properties: string[];
  data_type: string | null;
  value: string | null;
  is_buildingsmart: boolean;
  argumentation: string | null;
  interpretation: string | null;
  terms: MappingTermRef[];
  countries: string[];
}

export interface MappingFile {
  ontology_family: string;
  country: string;
  version: string;
  status: string;
  issued_at: string;
  ttl_url: string;
  property_definitions: { id: string; iri: string; label: string; category: string; comment: string | null }[];
  counts: { rows: number; buildingsmart_rows: number; ifc_entities: number; mapped_terms: number };
  rows: MappingRow[];
}

export const CATEGORY_LABELS: Record<TermCategory, string> = {
  class: "Class",
  objectProperty: "Object property",
  datatypeProperty: "Datatype property",
  annotationProperty: "Annotation property",
  property: "Property",
  individual: "Individual",
  ontology: "Ontology",
};

export function preferredLabel(values: TermValue[], fallback: string): string {
  const en = values.find((v) => !v.lang || v.lang.toLowerCase().startsWith("en"));
  return (en ?? values[0])?.value ?? fallback;
}

export function localName(iri: string): string {
  const idx = Math.max(iri.lastIndexOf("#"), iri.lastIndexOf("/"));
  return idx >= 0 ? iri.slice(idx + 1) : iri;
}
