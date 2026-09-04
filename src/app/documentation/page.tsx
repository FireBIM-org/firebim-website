import Link from "next/link";

export default function Documentation() {
  return (
    <main>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Documentation</h1>
        <p className="text-lg sm:text-2xl mb-8">
          Guides, tutorials, and technical documentation
        </p>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">

          {/* Section title */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
            Technical Documentation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Ontologies (ACTIVE) */}
            <Link
              href="/documentation/ontologies/"
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition block"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Ontologies (FBO)</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Live</span>
              </div>
              <p className="mb-4 text-gray-600">
                Browse the FireBIM Building Ontology – the European core and the national modules – with every
                versioned release available as Turtle, plus an open JSON registry for tooling.
              </p>
              <span className="text-blue-600 text-sm font-medium">Browse ontologies →</span>
            </Link>

            {/* FBO → IFC mapping (ACTIVE) */}
            <Link
              href="/documentation/fbo-ifc-mapping/"
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition block"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">FBO → IFC mapping</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Live</span>
              </div>
              <p className="mb-4 text-gray-600">
                The official alignment between FBO concepts and IFC 4.3 classes, property sets and properties – as an
                interactive table for BIM modellers.
              </p>
              <span className="text-blue-600 text-sm font-medium">Open mapping →</span>
            </Link>

            {/* Modelling guideline (ACTIVE) */}
            <Link
              href="/modeling-guideline/"
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition block"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Modelling guideline</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Live</span>
              </div>
              <p className="mb-4 text-gray-600">
                What to model in IFC – spatial structure, compartments, fire properties – so FireBIM can check your
                building.
              </p>
              <span className="text-blue-600 text-sm font-medium">Read the guideline →</span>
            </Link>

            {/* API Reference (ACTIVE) */}
            <a
              href="https://api.firebim.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition block"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">API Reference</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Live
                </span>
              </div>

              <p className="mb-4 text-gray-600">
                Explore the FireBIM API, including endpoints for rules, graphs, checks and ontologies (publish, version
                and sync).
              </p>

              <span className="text-blue-600 text-sm font-medium">
                Open API Docs →
              </span>
            </a>

            {/* Getting Started (still WIP) */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 opacity-60">
              <h3 className="text-xl font-bold mb-4">Getting Started</h3>
              <p className="mb-4 text-gray-600">
                Learn the basics of the FireBIM platform and its key concepts.
              </p>
              <span className="text-sm text-gray-400">Coming soon</span>
            </div>

            {/* Tutorials (WIP) */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 opacity-60">
              <h3 className="text-xl font-bold mb-4">Tutorials</h3>
              <p className="mb-4 text-gray-600">
                Step-by-step guides for common tasks and use cases.
              </p>
              <span className="text-sm text-gray-400">Coming soon</span>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}