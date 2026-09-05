const exampleProjects = [
  { code: "be", country: "Belgium", module: "FBO-BE" },
  { code: "dk", country: "Denmark", module: "FBO-DK" },
  { code: "lt", country: "Lithuania", module: "FBO-LT" },
  { code: "nl", country: "Netherlands", module: "FBO-NL" },
  { code: "pt", country: "Portugal", module: "FBO-PT" },
] as const;

const downloadClassName =
  "inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

export default function Downloads() {
  return (
    <main>
      <section className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-20 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold sm:text-6xl">Downloads</h1>
        <p className="text-lg sm:text-2xl">Access software, tools, and resources</p>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
              FireBIM Example Projects
            </p>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Synthetic ontology test graphs</h2>
            <p className="max-w-3xl text-lg text-gray-700">
              Download matching Turtle examples for the generic FBO ontology and each national module.
              They are intended for graph browsing, RuleBook development, and automated testing.
            </p>
          </div>

          <aside className="mb-10 rounded-lg border-2 border-amber-400 bg-amber-50 p-5 text-amber-950" aria-label="Synthetic data notice">
            <h3 className="mb-2 text-lg font-bold">Synthetic graphs — not real buildings</h3>
            <p>
              Every building, room, value, and relationship in these files is fabricated. The examples
              are not evidence of regulatory compliance and must not be used as building-design guidance.
            </p>
          </aside>

          <div className="grid gap-6 md:grid-cols-2">
            {exampleProjects.map(({ code, country, module }) => (
              <article key={code} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5">
                  <h3 className="text-2xl font-bold">{country}</h3>
                  <p className="mt-1 text-sm font-medium text-gray-600">Generic FBO + {module}</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <h4 className="font-semibold">Three-storey office</h4>
                    <p className="mb-3 mt-1 text-sm text-gray-600">
                      25 varied spaces, including offices, meeting rooms, toilets, printer rooms,
                      central corridors, stairs, a lift, a top-floor canteen, and a kitchen.
                    </p>
                    <a
                      className={downloadClassName}
                      download
                      href={`/downloads/example-graphs/synthetic-three-storey-office-fbo-${code}.ttl`}
                    >
                      Download office graph (.ttl)
                    </a>
                  </div>

                  <div className="border-t border-gray-200 pt-5">
                    <h4 className="font-semibold">Unrealistic edge-case building</h4>
                    <p className="mb-3 mt-1 text-sm text-gray-600">
                      A deliberately impossible one-storey graph with contradictory and extreme values,
                      covering the national module&apos;s declared classes and properties.
                    </p>
                    <a
                      className={downloadClassName}
                      download
                      href={`/downloads/example-graphs/synthetic-unrealistic-edge-case-fbo-${code}.ttl`}
                    >
                      Download edge-case graph (.ttl)
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-lg bg-gray-100 p-6 text-gray-700">
            <h2 className="mb-2 text-xl font-bold text-gray-900">More downloads are coming</h2>
            <p>FireBIM SDK packages and design templates are still under development.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
