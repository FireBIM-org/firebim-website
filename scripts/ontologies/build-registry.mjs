#!/usr/bin/env node
/**
 * Build the public ontology registry served from https://firebim.org/documentation/ontologies/
 *
 * Reads ontologies/catalog.json and every
 *   public/documentation/ontologies/<family>/<country>/versions/<version>/{<file>.ttl,release.json}
 * and writes (all inside public/documentation/ontologies/):
 *   index.json                                   – the registry: every ontology + all versions (newest first)
 *   <family>/<country>/index.json                – summary (mirrors GET /ontologies/{family}/{country} of the API)
 *   <family>/<country>/versions.json             – version list (mirrors GET .../versions)
 *   <family>/<country>/versions/<v>/metadata.json – one version (mirrors GET .../versions/{v} minus the ttl body)
 *   <family>/<country>/versions/<v>/terms.json    – parsed terms for the website viewer (public entries only)
 *   <family>/<country>/versions/<v>/mapping.json  – mapping rows (kind = "mapping" entries only)
 *
 * The TTL files themselves are served as-is next to metadata.json.
 * Usage: npm run ontologies:build
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import N3 from "n3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const CATALOG = JSON.parse(fs.readFileSync(path.join(ROOT, "ontologies", "catalog.json"), "utf8"));
const PUBLIC_ROOT = path.join(ROOT, "public", "documentation", "ontologies");
const BASE_URL = CATALOG.registry.base_url.replace(/\/$/, "");
const CANONICAL_BASE = CATALOG.registry.canonical_base_uri;
const SCHEMA_VERSION = 1;

const RDF = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
const RDFS = "http://www.w3.org/2000/01/rdf-schema#";
const OWL = "http://www.w3.org/2002/07/owl#";
const FBO = "https://firebim.org/ontologies/fbo#";
const FBO_IFC = "https://firebim.org/ontologies/fbo/ifc#";
const WELL_KNOWN_PREFIXES = {
  rdf: RDF,
  rdfs: RDFS,
  owl: OWL,
  xsd: "http://www.w3.org/2001/XMLSchema#",
  schema: "http://schema.org/",
  schema1: "http://schema.org/",
  qudt: "https://qudt.org/3.1.0/schema/qudt/",
  "qudt-unit": "https://qudt.org/3.1.0/vocab/unit/",
};

function versionKey(version) {
  const [y, m, d = "0"] = String(version).split(".");
  return [Number(y), Number(m), Number(d)];
}
function compareVersionsDesc(a, b) {
  const ka = versionKey(a);
  const kb = versionKey(b);
  for (let i = 0; i < 3; i += 1) if (ka[i] !== kb[i]) return kb[i] - ka[i];
  return 0;
}
function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}
function sha256(text) {
  return crypto.createHash("sha256").update(text, "utf8").digest("hex");
}

// ---------------------------------------------------------------------------
// Turtle parsing
// ---------------------------------------------------------------------------
function parseTurtle(ttl) {
  const parser = new N3.Parser();
  const prefixes = {};
  const quads = parser.parse(ttl, null, (prefix, iri) => {
    prefixes[prefix] = iri.value;
  });
  // n3's sync parse returns quads; prefixes come from the callback
  return { quads, prefixes: { ...WELL_KNOWN_PREFIXES, ...prefixes } };
}

function makeShortener(prefixes) {
  const entries = Object.entries(prefixes).sort((a, b) => b[1].length - a[1].length);
  return (iri) => {
    for (const [prefix, ns] of entries) {
      if (iri.startsWith(ns) && iri.length > ns.length) return `${prefix}:${iri.slice(ns.length)}`;
    }
    return iri;
  };
}

function localName(iri) {
  const idx = Math.max(iri.lastIndexOf("#"), iri.lastIndexOf("/"));
  return idx >= 0 ? iri.slice(idx + 1) : iri;
}

function categorize(typeIris) {
  if (typeIris.includes(`${OWL}Ontology`)) return "ontology";
  if (typeIris.includes(`${OWL}Class`) || typeIris.includes(`${RDFS}Class`)) return "class";
  if (typeIris.includes(`${OWL}ObjectProperty`)) return "objectProperty";
  if (typeIris.includes(`${OWL}DatatypeProperty`)) return "datatypeProperty";
  if (typeIris.includes(`${OWL}AnnotationProperty`)) return "annotationProperty";
  if (typeIris.includes(`${RDF}Property`)) return "property";
  return "individual";
}

function termValue(term, shorten) {
  if (term.termType === "Literal") {
    const out = { kind: "literal", value: term.value };
    if (term.language) out.lang = term.language;
    else if (term.datatype && term.datatype.value !== "http://www.w3.org/2001/XMLSchema#string") {
      out.datatype = shorten(term.datatype.value);
    }
    return out;
  }
  if (term.termType === "NamedNode") return { kind: "iri", value: term.value, prefixed: shorten(term.value) };
  return { kind: "blank", value: term.value };
}

/**
 * Extract a compact, viewer-friendly representation of every named subject.
 */
function extractTerms(quads, prefixes) {
  const shorten = makeShortener(prefixes);
  const bySubject = new Map();
  for (const q of quads) {
    if (q.subject.termType !== "NamedNode") continue;
    if (!bySubject.has(q.subject.value)) bySubject.set(q.subject.value, []);
    bySubject.get(q.subject.value).push(q);
  }

  const terms = [];
  let ontology = null;
  for (const [iri, subjectQuads] of bySubject) {
    const typeIris = subjectQuads.filter((q) => q.predicate.value === `${RDF}type`).map((q) => q.object.value);
    const category = categorize(typeIris);
    const labels = [];
    const definitions = [];
    const comments = [];
    const parents = [];
    const linkedTo = [];
    const subitems = [];
    const ifcMappings = [];
    const props = new Map();
    for (const q of subjectQuads) {
      const p = q.predicate.value;
      if (p === `${RDF}type`) continue;
      const v = termValue(q.object, shorten);
      if (p === `${RDFS}label`) labels.push(v);
      else if (p === `${FBO}hasDefinition`) definitions.push(v);
      else if (p === `${RDFS}comment`) comments.push(v);
      else if (p === `${RDFS}subClassOf` || p === `${RDFS}subPropertyOf`) {
        if (v.kind === "iri") parents.push(v.value);
      } else if (p === `${FBO}isLinkedTo`) {
        if (v.kind === "iri") linkedTo.push(v.value);
      } else if (p === `${FBO}hasSubitem`) {
        if (v.kind === "iri") subitems.push(v.value);
      } else if (p === `${FBO}hasIFCMapping`) {
        if (v.kind === "iri") ifcMappings.push(v.value);
      } else {
        const key = shorten(p);
        if (!props.has(key)) props.set(key, { predicate: key, iri: p, values: [] });
        props.get(key).values.push(v);
      }
    }
    const term = {
      iri,
      id: shorten(iri),
      name: localName(iri),
      category,
      types: typeIris.map(shorten),
      labels,
      definitions,
      comments,
      parents,
      linked_to: linkedTo,
      subitems,
      ifc_mappings: ifcMappings,
      properties: [...props.values()].sort((a, b) => a.predicate.localeCompare(b.predicate)),
    };
    if (category === "ontology") {
      ontology = term;
      continue;
    }
    terms.push(term);
  }
  // children (inverse of parents)
  const children = new Map();
  for (const t of terms) for (const p of t.parents) {
    if (!children.has(p)) children.set(p, []);
    children.get(p).push(t.iri);
  }
  for (const t of terms) t.children = (children.get(t.iri) ?? []).sort();
  terms.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
  return { ontology, terms, prefixes, shorten };
}

function englishLabel(term) {
  if (!term) return null;
  const en = term.labels.find((l) => !l.lang || l.lang.toLowerCase().startsWith("en"));
  return (en ?? term.labels[0])?.value ?? term.name;
}

function entryForNamespace(iri) {
  for (const entry of CATALOG.entries) if (iri.startsWith(entry.namespace)) return entry;
  return null;
}

function viewerHref(entry, version, iri) {
  if (!entry) return null;
  const base = `/documentation/ontologies/${entry.ontology_family}/${entry.country}/`;
  return `${base}${version ? `versions/${version}/` : ""}#${encodeURIComponent(localName(iri))}`;
}

// ---------------------------------------------------------------------------
// Discover releases
// ---------------------------------------------------------------------------
function discoverVersions(entry) {
  const dir = path.join(PUBLIC_ROOT, entry.ontology_family, entry.country, "versions");
  if (!fs.existsSync(dir)) return [];
  const versions = [];
  for (const name of fs.readdirSync(dir)) {
    const vdir = path.join(dir, name);
    if (!fs.statSync(vdir).isDirectory()) continue;
    const releaseFile = path.join(vdir, "release.json");
    const ttlFile = path.join(vdir, entry.resource_filename);
    if (!fs.existsSync(releaseFile) || !fs.existsSync(ttlFile)) {
      console.warn(`skipping ${vdir}: needs release.json and ${entry.resource_filename}`);
      continue;
    }
    const release = JSON.parse(fs.readFileSync(releaseFile, "utf8"));
    if (!/^\d{4}\.\d{2}(\.\d{2})?$/.test(name) || release.version !== name) {
      throw new Error(`Version folder ${vdir} must be YYYY.MM[.DD] and match release.json.version`);
    }
    if (!release.published_at) {
      release.published_at = new Date().toISOString();
      writeJson(releaseFile, release);
    }
    versions.push({ version: name, release, dir: vdir, ttlFile, releaseFile });
  }
  versions.sort((a, b) => compareVersionsDesc(a.version, b.version));
  return versions;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const parsedCache = new Map(); // ttlFile -> extracted
function loadParsed(entry, v) {
  if (!parsedCache.has(v.ttlFile)) {
    const ttl = fs.readFileSync(v.ttlFile, "utf8");
    const { quads, prefixes } = parseTurtle(ttl);
    parsedCache.set(v.ttlFile, { ttl, quads, ...extractTerms(quads, prefixes) });
  }
  return parsedCache.get(v.ttlFile);
}

const registryEntries = [];
const labelIndex = new Map(); // iri -> { label, entry, version }

// pass 1: metadata for every version; label index from newest public versions
const perEntry = [];
for (const entry of CATALOG.entries) {
  const versions = discoverVersions(entry);
  if (versions.length === 0) {
    console.warn(`no versions for ${entry.ontology_family}/${entry.country}`);
    continue;
  }
  const wantsViewer = entry.viewer !== false;
  const metas = versions.map((v) => {
    const ttl = fs.readFileSync(v.ttlFile, "utf8");
    let parsed = null;
    let counts = { triple_count: 0, class_count: 0, property_count: 0, individual_count: 0, subclass_count: 0 };
    let ontologyInfo = { ontology_uri: null, version_iri: null, label: null, description: null, imports: [] };
    if (wantsViewer) {
      parsed = loadParsed(entry, v);
      counts = {
        triple_count: parsed.quads.length,
        class_count: parsed.terms.filter((t) => t.category === "class").length,
        property_count: parsed.terms.filter((t) => t.category.endsWith("Property") || t.category === "property").length,
        individual_count: parsed.terms.filter((t) => t.category === "individual").length,
        subclass_count: parsed.terms.reduce((n, t) => n + t.parents.length, 0),
      };
      if (parsed.ontology) {
        const o = parsed.ontology;
        const get = (pred) => o.properties.find((p) => p.iri === pred)?.values ?? [];
        ontologyInfo = {
          ontology_uri: o.iri,
          version_iri: get(`${OWL}versionIRI`)[0]?.value ?? null,
          label: englishLabel(o),
          description: o.comments[0]?.value ?? null,
          imports: get(`${OWL}imports`).map((x) => x.value),
        };
      }
    } else {
      // large reference ontologies: cheap header scan only
      counts.triple_count = null;
      const m = ttl.match(/owl:versionIRI\s+<([^>]+)>/);
      const o = ttl.match(/^<([^>]+)>\s+a\s+owl:Ontology/m);
      ontologyInfo.version_iri = m?.[1] ?? null;
      ontologyInfo.ontology_uri = o?.[1] ?? null;
    }
    const relPath = `${entry.ontology_family}/${entry.country}/versions/${v.version}`;
    return {
      version: v.version,
      status: v.release.status,
      issued_at: v.release.issued_at,
      published_at: v.release.published_at,
      resource_filename: entry.resource_filename,
      url: `${BASE_URL}/${relPath}/metadata.json`,
      ttl_url: `${BASE_URL}/${relPath}/${entry.resource_filename}`,
      terms_url: wantsViewer ? `${BASE_URL}/${relPath}/terms.json` : null,
      mapping_url: entry.kind === "mapping" ? `${BASE_URL}/${relPath}/mapping.json` : null,
      graph_uri: `${CATALOG.registry.api_base_uri}${entry.ontology_family}/${entry.country}/versions/${v.version}`,
      ...ontologyInfo,
      ...counts,
      byte_size: Buffer.byteLength(ttl, "utf8"),
      sha256: sha256(ttl),
      _v: v,
      _parsed: parsed,
    };
  });
  const latest = metas[0];
  const stable = metas.find((m) => m.status === "stable") ?? null;
  const defaultVersion = versions.find((v) => v.release.default_version)?.version ?? stable?.version ?? latest.version;
  for (const m of metas) {
    m.is_latest = m.version === latest.version;
    m.is_stable = stable ? m.version === stable.version : false;
    m.is_default = m.version === defaultVersion;
  }
  if (wantsViewer && entry.visibility === "public") {
    for (const t of latest._parsed.terms) {
      labelIndex.set(t.iri, { label: englishLabel(t), entry, version: null, definition: t.definitions[0]?.value ?? null });
    }
  }
  perEntry.push({ entry, metas, latest, stable, defaultVersion });
}

// pass 2: write per-entry files
for (const { entry, metas, latest, stable, defaultVersion } of perEntry) {
  const base = `${entry.ontology_family}/${entry.country}`;
  const strip = (m) => {
    const { _v, _parsed, ...rest } = m;
    return rest;
  };
  const publicMetas = metas.map(strip);
  const summary = {
    ontology_family: entry.ontology_family,
    country: entry.country,
    kind: entry.kind,
    visibility: entry.visibility,
    title: entry.title,
    short_title: entry.short_title,
    prefix: entry.prefix,
    namespace: entry.namespace,
    description: entry.description,
    canonical_family_uri: `${CANONICAL_BASE}${entry.ontology_family}#`,
    canonical_country_uri: `${CANONICAL_BASE}${entry.ontology_family}/${entry.country}#`,
    latest_version: latest.version,
    latest_stable_version: stable?.version ?? null,
    default_version: defaultVersion,
    url: `${BASE_URL}/${base}/index.json`,
    available_versions_url: `${BASE_URL}/${base}/versions.json`,
    latest_url: latest.url,
    latest_ttl_url: latest.ttl_url,
    stable_url: stable?.url ?? null,
    api_summary_url: `${CATALOG.registry.api_base_uri}${base}`,
  };
  writeJson(path.join(PUBLIC_ROOT, base, "index.json"), summary);
  writeJson(path.join(PUBLIC_ROOT, base, "versions.json"), { ...summary, versions: publicMetas });
  registryEntries.push({ ...summary, versions: publicMetas });

  for (const m of metas) {
    writeJson(path.join(m._v.dir, "metadata.json"), {
      ontology_family: entry.ontology_family,
      country: entry.country,
      kind: entry.kind,
      canonical_family_uri: summary.canonical_family_uri,
      canonical_country_uri: summary.canonical_country_uri,
      version: strip(m),
    });
    if (!m._parsed) continue;
    const refs = {};
    const addRef = (iri) => {
      if (refs[iri]) return;
      const hit = labelIndex.get(iri);
      const refEntry = hit?.entry ?? entryForNamespace(iri);
      refs[iri] = {
        prefixed: m._parsed.shorten(iri),
        label: hit?.label ?? null,
        ontology: refEntry ? `${refEntry.ontology_family}/${refEntry.country}` : null,
        href: refEntry && refEntry.visibility === "public" ? viewerHref(refEntry, null, iri) : null,
      };
    };
    for (const t of m._parsed.terms) {
      for (const iri of [...t.parents, ...t.children, ...t.linked_to, ...t.subitems, ...t.ifc_mappings]) addRef(iri);
      for (const p of t.properties) for (const v of p.values) if (v.kind === "iri") addRef(v.value);
    }
    writeJson(path.join(m._v.dir, "terms.json"), {
      ontology_family: entry.ontology_family,
      country: entry.country,
      version: m.version,
      prefixes: m._parsed.prefixes,
      ontology: m._parsed.ontology,
      counts: {
        classes: m.class_count,
        properties: m.property_count,
        individuals: m.individual_count,
        triples: m.triple_count,
      },
      terms: m._parsed.terms,
      refs,
    });
    if (entry.kind === "mapping") {
      writeJson(path.join(m._v.dir, "mapping.json"), buildMapping(entry, m));
    }
  }
}

function splitList(value) {
  return String(value ?? "")
    .split(/,\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildMapping(entry, m) {
  const parsed = m._parsed;
  const propertyDefs = parsed.terms
    .filter((t) => t.category.endsWith("Property"))
    .map((t) => ({ id: t.id, iri: t.iri, label: englishLabel(t), category: t.category, comment: t.comments[0]?.value ?? null }));
  const rows = [];
  // Terms in other ontologies that point at a mapping individual (fbo:hasIFCMapping)
  const inbound = new Map();
  for (const { entry: other, latest } of perEntry) {
    if (!latest._parsed || other.kind === "mapping") continue;
    for (const t of latest._parsed.terms) for (const mIri of t.ifc_mappings) {
      if (!inbound.has(mIri)) inbound.set(mIri, []);
      inbound.get(mIri).push(t.iri);
    }
  }
  for (const t of parsed.terms) {
    if (t.category !== "individual" || !t.iri.startsWith(FBO_IFC)) continue;
    const get = (name) => t.properties.find((p) => p.iri === `${FBO_IFC}${name}`)?.values ?? [];
    const termIris = new Set([
      ...get("mapsToTerm").filter((v) => v.kind === "iri").map((v) => v.value),
      ...(inbound.get(t.iri) ?? []),
    ]);
    const terms = [...termIris].map((iri) => {
      const hit = labelIndex.get(iri);
      const refEntry = hit?.entry ?? entryForNamespace(iri);
      return {
        iri,
        prefixed: parsed.shorten(iri),
        label: hit?.label ?? localName(iri),
        definition: hit?.definition ?? null,
        ontology: refEntry ? `${refEntry.ontology_family}/${refEntry.country}` : null,
        ontology_title: refEntry?.short_title ?? null,
        href: refEntry && refEntry.visibility === "public" ? viewerHref(refEntry, null, iri) : null,
      };
    });
    terms.sort((a, b) => (a.ontology ?? "").localeCompare(b.ontology ?? "") || a.label.localeCompare(b.label));
    const ifcClasses = splitList(get("hasClassPredefinedType")[0]?.value);
    rows.push({
      id: t.name,
      iri: t.iri,
      label: englishLabel(t),
      kind: get("hasKind")[0]?.value ?? null,
      ifc_classes: ifcClasses,
      ifc_entities: ifcClasses.map((c) => c.split(".")[0]),
      pset_properties: splitList(get("hasPsetProperty")[0]?.value),
      data_type: get("hasDataType")[0]?.value ?? null,
      value: get("hasValue")[0]?.value ?? null,
      is_buildingsmart: get("isBuildingSMART")[0]?.value === "true",
      argumentation: get("hasArgumentation")[0]?.value ?? null,
      interpretation: get("hasInterpretationResult")[0]?.value ?? null,
      terms,
      countries: [...new Set(terms.map((x) => x.ontology?.split("/")[1]).filter(Boolean))].sort(),
    });
  }
  rows.sort((a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" }));
  return {
    ontology_family: entry.ontology_family,
    country: entry.country,
    version: m.version,
    status: m.status,
    issued_at: m.issued_at,
    ttl_url: m.ttl_url,
    property_definitions: propertyDefs,
    counts: {
      rows: rows.length,
      buildingsmart_rows: rows.filter((r) => r.is_buildingsmart).length,
      ifc_entities: new Set(rows.flatMap((r) => r.ifc_entities)).size,
      mapped_terms: new Set(rows.flatMap((r) => r.terms.map((x) => x.iri))).size,
    },
    rows,
  };
}

// pass 3: root index — public entries first, unlisted last; versions already newest first
registryEntries.sort((a, b) => {
  if (a.visibility !== b.visibility) return a.visibility === "public" ? -1 : 1;
  if (a.kind !== b.kind) return a.kind === "ontology" ? -1 : 1;
  return `${a.ontology_family}/${a.country}`.localeCompare(`${b.ontology_family}/${b.country}`);
});
writeJson(path.join(PUBLIC_ROOT, "index.json"), {
  schema_version: SCHEMA_VERSION,
  registry: CATALOG.registry.name,
  base_url: BASE_URL,
  canonical_base_uri: CANONICAL_BASE,
  api_base_uri: CATALOG.registry.api_base_uri,
  version_format: "YYYY.MM or YYYY.MM.DD, sorted newest first",
  statuses: ["draft", "candidate", "stable", "deprecated", "withdrawn"],
  visibility_note: "Entries with visibility 'unlisted' are provided for the FireBIM platform sync hook only and are not part of the public documentation.",
  count: registryEntries.length,
  ontologies: registryEntries,
});
console.log(`registry written: ${registryEntries.length} ontologies, ${registryEntries.reduce((n, e) => n + e.versions.length, 0)} versions`);
