import type { Metadata } from "next";
import Link from "next/link";
import MappingExplorer, { type MappingVersion } from "@/components/ontology/MappingExplorer";
import { findEntry, sitePath } from "@/lib/ontologies";

export const metadata: Metadata = {
  title: "FBO → IFC mapping – FireBIM",
  description:
    "The official mapping from the FireBIM Building Ontology (FBO) to IFC 4.3: which IFC class, property set and property to use for each fire-safety concept.",
};

export default function MappingPage() {
  const entry = findEntry("fbo", "ifc");
  if (!entry) {
    return (
      <main className="py-20 text-center text-gray-500">The FBO → IFC mapping has not been published yet.</main>
    );
  }
  const versions: MappingVersion[] = entry.versions.map((v) => ({
    version: v.version,
    status: v.status,
    issued_at: v.issued_at,
    ttl_path: sitePath(v.ttl_url),
    mapping_path: sitePath(v.mapping_url ?? v.url),
    resource_filename: v.resource_filename,
    is_latest: v.is_latest,
  }));

  return (
    <main>
      <section className="flex flex-col items-center justify-center text-center py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">FBO → IFC mapping</h1>
        <p className="text-lg sm:text-xl max-w-3xl">
          How each FireBIM fire-safety concept is expressed in IFC 4.3 – the official alignment module{" "}
          <code className="font-mono text-base">fbo-ifc:</code>.
        </p>
      </section>

      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 text-gray-700">
          <div className="max-w-5xl mx-auto px-0 mb-2 text-sm text-gray-500">
            <Link href="/documentation/" className="hover:underline">Documentation</Link> ›{" "}
            <Link href="/documentation/ontologies/" className="hover:underline">Ontologies</Link> › FBO → IFC mapping
          </div>
          <h2 className="text-2xl font-bold mb-3">How to read this table</h2>
          <p className="mb-3">
            FBO deliberately does not bake IFC into the ontology: the same fire-safety concept can be modelled in
            different ways depending on the design stage, the country and the authoring software (a fire compartment can
            be a list of spaces in an <code className="font-mono text-sm">IfcZone</code> early on and a 3D{" "}
            <code className="font-mono text-sm">IfcSpatialZone</code> later). This mapping is the <strong>official
            FireBIM recommendation</strong> for placing that information in an IFC model so that the FireBIM platform can
            read it. Each row is one mapping individual in <code className="font-mono text-sm">fbo-ifc</code>:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-4 text-sm">
            <li><strong>FBO term</strong> – the core (<code className="font-mono">fbo:</code>) and/or national term(s) the row represents; click to open the term in the ontology viewer.</li>
            <li><strong>Kind</strong> – whether the concept is an IFC <em>Object</em> (an element or spatial element), a <em>Property</em> in a property set, a <em>Quantity</em> in a quantity set, or a <em>Relationship</em>.</li>
            <li><strong>IFC class · predefined type</strong> – the IFC 4.3 entity (with <code className="font-mono">.PREDEFINEDTYPE</code> where relevant) to use. Several alternatives are listed when more than one is acceptable.</li>
            <li><strong>Property set . Property</strong> – where to put the value. <span className="text-purple-700 font-mono">CPset_FireBIM.*</span> sets are FireBIM custom property sets to be added as user-defined Psets.</li>
            <li><strong>Data type / value</strong> – the expected IFC data type, and, for classifications, the expected value.</li>
            <li><strong>bSI</strong> – a check means the row uses a buildingSMART standard property or quantity set that most exporters fill automatically; otherwise it is a FireBIM convention.</li>
            <li><strong>Notes</strong> – interpretation results and argumentation from the ontology working group, including open questions.</li>
          </ul>
          <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 p-4 text-sm">
            <strong>Other mappings are allowed.</strong> This is the official mapping used by default on{" "}
            <a href="https://app.firebim.org/" className="underline" target="_blank" rel="noopener noreferrer">app.firebim.org</a>, but
            organisations and projects may use their own. In the FireBIM platform every user can maintain custom term mappings (see the
            Lexicon) – the compliance checks then follow your mapping instead of this one. See also the{" "}
            <Link href="/modeling-guideline/" className="underline">modelling guideline</Link>.
          </div>
        </div>
      </section>

      <section className="pb-16">
        <MappingExplorer versions={versions} />
      </section>
    </main>
  );
}
