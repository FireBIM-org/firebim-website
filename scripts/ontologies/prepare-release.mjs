#!/usr/bin/env node
/**
 * Prepare a new FBO release from a raw Notion→Turtle export.
 *
 *   node scripts/ontologies/prepare-release.mjs \
 *     --source ../ontologies_export \
 *     --version 2026.09.04 \
 *     --issued 2026-09-04 \
 *     [--status draft|candidate|stable|deprecated|withdrawn] \
 *     [--only fbo,fbo-dk,...]
 *
 * For every file in the export that is listed in ontologies/catalog.json the script:
 *   1. rewrites the export namespaces (https://ontology.firebim.be/ontology/fbo-DK#)
 *      to the canonical firebim.org namespaces (https://firebim.org/ontologies/fbo/dk#),
 *   2. replaces the bare `fbo:FireBIMOntology a owl:Ontology .` statement with a proper
 *      owl:Ontology header carrying owl:versionIRI / owl:versionInfo,
 *   3. writes the TTL plus a release.json into
 *      public/documentation/ontologies/<family>/<country>/versions/<version>/
 *
 * Afterwards run `npm run ontologies:build` to regenerate the JSON registry.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const CATALOG = JSON.parse(fs.readFileSync(path.join(ROOT, "ontologies", "catalog.json"), "utf8"));
const PUBLIC_ROOT = path.join(ROOT, "public", "documentation", "ontologies");

const args = parseArgs(process.argv.slice(2));
if (!args.source || !args.version || !args.issued) {
  console.error("Usage: prepare-release.mjs --source <dir> --version YYYY.MM.DD --issued YYYY-MM-DD [--status draft] [--only fbo,fbo-dk]");
  process.exit(1);
}
if (!/^\d{4}\.\d{2}(\.\d{2})?$/.test(args.version)) {
  console.error("--version must use YYYY.MM or YYYY.MM.DD (same rule as the FireBIM API)");
  process.exit(1);
}
const status = args.status ?? "draft";
const only = args.only ? new Set(args.only.split(",").map((s) => s.trim())) : null;

const LEGACY_BASE = "https://ontology.firebim.be/ontology/";
const CANONICAL_BASE = CATALOG.registry.canonical_base_uri; // https://firebim.org/ontologies/

/** Map every catalog entry to its legacy namespace so we can rewrite both directions. */
function legacyNamespaceFor(entry) {
  if (entry.ontology_family !== "fbo") return null;
  if (entry.country === "core") return `${LEGACY_BASE}fbo#`;
  if (entry.country === "ifc") return `${LEGACY_BASE}fbo-ifc#`;
  return `${LEGACY_BASE}fbo-${entry.country.toUpperCase()}#`;
}

const rewrites = CATALOG.entries
  .map((entry) => ({ from: legacyNamespaceFor(entry), to: entry.namespace }))
  .filter((r) => r.from);

function ontologyHeader(entry, version, issued) {
  const iri = entry.namespace;
  const versionIri = entry.country === "core"
    ? `${CANONICAL_BASE}${entry.ontology_family}/${version}#`
    : `${CANONICAL_BASE}${entry.ontology_family}/${entry.country}/${version}#`;
  const imports = entry.country === "core" ? "" : `    owl:imports <${CANONICAL_BASE}fbo#> ;\n`;
  const label = entry.title.replace(/"/g, '\\"');
  const comment = `${entry.short_title} release ${version} (issued ${issued}). ${entry.description}`.replace(/"/g, '\\"');
  return [
    `<${iri}> a owl:Ontology ;`,
    `    owl:versionIRI <${versionIri}> ;`,
    `    owl:versionInfo "${version}" ;`,
    imports.trimEnd(),
    `    rdfs:label "${label}"@en ;`,
    `    rdfs:comment "${comment}"@en .`,
    "",
  ].filter((line) => line !== "").join("\n");
}

function ensurePrefix(ttl, prefix, iri) {
  const re = new RegExp(`^@prefix\\s+${prefix.replace("-", "\\-")}:\\s*<`, "m");
  if (re.test(ttl)) return ttl;
  return `@prefix ${prefix}: <${iri}> .\n${ttl}`;
}

let written = 0;
for (const entry of CATALOG.entries) {
  const key = entry.country === "core" ? "fbo" : `${entry.ontology_family}-${entry.country}`;
  if (only && !only.has(key)) continue;
  const sourceFile = path.join(args.source, entry.resource_filename);
  if (!fs.existsSync(sourceFile)) continue;

  let ttl = fs.readFileSync(sourceFile, "utf8").replace(/\r\n/g, "\n");
  for (const { from, to } of rewrites) ttl = ttl.split(from).join(to);
  // Drop the bare ontology statement from the Notion export; we add a full header instead.
  ttl = ttl.replace(/^fbo:FireBIMOntology a owl:Ontology \.\n\n?/m, "");
  ttl = ttl.replace(/^<[^>]+> a owl:Ontology \.\n\n?/m, "");
  ttl = ensurePrefix(ttl, "owl", "http://www.w3.org/2002/07/owl#");
  ttl = ensurePrefix(ttl, "rdfs", "http://www.w3.org/2000/01/rdf-schema#");

  // Insert header after the prefix block.
  const lines = ttl.split("\n");
  let cut = 0;
  while (cut < lines.length && (lines[cut].startsWith("@prefix") || lines[cut].trim() === "")) cut += 1;
  const prefixBlock = lines.slice(0, cut).filter((l) => l.trim() !== "").join("\n");
  const body = lines.slice(cut).join("\n").replace(/^\n+/, "");
  ttl = `${prefixBlock}\n\n${ontologyHeader(entry, args.version, args.issued)}\n\n${body.trimEnd()}\n`;

  const targetDir = path.join(PUBLIC_ROOT, entry.ontology_family, entry.country, "versions", args.version);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, entry.resource_filename), ttl, "utf8");
  fs.writeFileSync(
    path.join(targetDir, "release.json"),
    JSON.stringify({ version: args.version, status, issued_at: args.issued, source: "notion-export" }, null, 2) + "\n",
    "utf8",
  );
  console.log(`prepared ${entry.ontology_family}/${entry.country}/versions/${args.version}/${entry.resource_filename}`);
  written += 1;
}
console.log(`${written} release file(s) written. Now run: npm run ontologies:build`);

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const k = a.slice(2);
      const v = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
      out[k] = v;
    }
  }
  return out;
}
