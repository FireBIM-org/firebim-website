import type { Metadata } from "next";
import Link from "next/link";
import { Table2, BookOpen, Boxes, Layers, ShieldCheck, Route } from "lucide-react";
import { findEntry } from "@/lib/ontologies";

export const metadata: Metadata = {
  title: "IFC modelling guideline – FireBIM",
  description:
    "How to model a building in IFC so that the FireBIM platform can check it against fire-safety regulations: spatial structure, fire compartments, elements, properties and the official FBO → IFC mapping.",
};

export default function ModelingGuidelinePage() {
  const mapping = findEntry("fbo", "ifc");
  const latest = mapping?.versions[0];

  return (
    <main>
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Modelling guideline</h1>
        <p className="text-lg sm:text-2xl max-w-3xl">
          What a BIM modeller needs to put in an IFC model so that FireBIM can read the fire-safety information.
        </p>
      </section>

      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 flex flex-col sm:flex-row gap-4 items-start">
            <Table2 className="h-10 w-10 text-blue-600 shrink-0" />
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">Official FBO → IFC mapping</h2>
              <p className="text-sm text-gray-700 mb-3">
                The authoritative table of which IFC class, property set and property to use for each FireBIM concept
                {latest && (
                  <>
                    {" "}
                    (current version <span className="font-mono">{latest.version}</span>, {latest.status}, issued {latest.issued_at})
                  </>
                )}
                . Filter by IFC entity, country or buildingSMART-standard properties, and download it as Turtle or CSV.
              </p>
              <Link
                href="/documentation/fbo-ifc-mapping/"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700"
              >
                Open the mapping table
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            <strong>Note:</strong> the mapping above is the FireBIM default. Users and organisations may work with other
            mappings – the FireBIM platform lets every user maintain their own term mappings, and compliance checks follow the
            mapping you select. Whatever mapping you use, the modelling principles below stay the same.
          </p>
        </div>
      </section>

      <section className="py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Principles</h2>
          <div className="space-y-8">
            <Principle icon={<Layers className="h-7 w-7 text-blue-600" />} title="1. Complete spatial structure">
              Model the full <code>IfcProject → IfcSite → IfcBuilding → IfcBuildingStorey → IfcSpace</code> hierarchy.
              Every room, corridor, stair and shaft that matters for evacuation or compartmentation must be an{" "}
              <code>IfcSpace</code> with a floor-area quantity (<code>Qto_SpaceBaseQuantities.NetFloorArea</code>) – many
              area-based FireBIM concepts are derived from it.
            </Principle>
            <Principle icon={<Boxes className="h-7 w-7 text-blue-600" />} title="2. Fire compartments as zones">
              Group the spaces of a fire compartment in an <code>IfcZone</code> (early design) or model the compartment as
              an <code>IfcSpatialZone.FIRESAFETY</code> with geometry (detailed design). Which one you use depends on the
              design stage and your software – the mapping table lists both options per concept.
            </Principle>
            <Principle icon={<ShieldCheck className="h-7 w-7 text-blue-600" />} title="3. Fire properties on elements">
              Walls, slabs, doors and windows carry their fire performance in the standard buildingSMART property sets
              (<code>Pset_WallCommon.FireRating</code>, <code>Pset_DoorCommon.FireRating</code>,{" "}
              <code>Pset_WallCommon.IsExternal</code>, <code>Pset_DoorCommon.SelfClosing</code>, …). Where IFC has no
              standard property, use the FireBIM custom property set <code>CPset_FireBIM</code> with the property names
              exactly as given in the mapping table (for example <code>CPset_FireBIM.Compartment</code> to name the
              compartment a space belongs to).
            </Principle>
            <Principle icon={<Route className="h-7 w-7 text-blue-600" />} title="4. Evacuation and access">
              Exits and escape doors need <code>Pset_DoorCommon.FireExit = TRUE</code>; staircases, corridors and refuges
              need the space types and <code>Pset_SpaceFireSafetyRequirements</code> values listed in the mapping. Site
              access for the fire service is described on <code>IfcSite</code>.
            </Principle>
            <Principle icon={<BookOpen className="h-7 w-7 text-blue-600" />} title="5. Use the national terms">
              National regulations define terms differently. The national FBO modules (
              <Link href="/documentation/ontologies/" className="text-blue-600 hover:underline">FBO-BE, FBO-DK, FBO-LT, FBO-NL, FBO-PT</Link>
              ) contain the legal definitions and the regulation articles behind each concept, and link every national term
              to its European umbrella concept and to the IFC mapping.
            </Principle>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Workflow in the FireBIM platform</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Export IFC 4.3 (IFC4 is accepted) with property sets and base quantities enabled.</li>
            <li>Upload the model on <a href="https://app.firebim.org/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">app.firebim.org</a>; the model is converted to a building graph.</li>
            <li>Choose the ontology release and the mapping (official or your own) in the Lexicon.</li>
            <li>Run the rule books for your country and review the diagnostics – missing properties are reported per element.</li>
          </ol>
          <p className="text-sm text-gray-500 mt-6">
            The guideline evolves with the ontology. Versions of the mapping are permanently available on the{" "}
            <Link href="/documentation/ontologies/" className="text-blue-600 hover:underline">ontologies page</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}

function Principle({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 mt-1">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-700 text-sm [&_code]:font-mono [&_code]:text-xs [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded">{children}</p>
      </div>
    </div>
  );
}
