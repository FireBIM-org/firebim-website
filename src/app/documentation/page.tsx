import PageHero from "@/components/PageHero";

export default function Documentation() {
  return (
    <main>
      <PageHero
        title="Documentation"
        subtitle="Guides, tutorials, and technical documentation for the FireBIM platform."
        compact
      />

      {/* Content */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* API Reference (ACTIVE) */}
            <a
              href="https://api.firebim.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md border border-ink-100 bg-white p-6 shadow-sm transition hover:border-flame-300 hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold text-ink-950">API Reference</h3>
                <span className="border-l-2 border-green-600 bg-green-50 px-2 py-1 text-xs font-medium text-green-800">
                  Live
                </span>
              </div>

              <p className="mb-4 leading-relaxed text-ink-600">
                Browse FireBIM API endpoints for rules, graphs, and checks.
              </p>

              <span className="text-sm font-semibold text-flame-600">
                Open API docs
              </span>
            </a>

            {/* Getting Started (still WIP) */}
            <div className="rounded-md border border-ink-100 bg-ink-50/60 p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold text-ink-400">Getting Started</h3>
                <span className="border-l-2 border-ink-300 bg-white px-2 py-1 text-xs font-medium text-ink-500">
                  Coming soon
                </span>
              </div>
              <p className="leading-relaxed text-ink-400">
                Learn the basics of the FireBIM platform and its key concepts.
              </p>
            </div>

            {/* Tutorials (WIP) */}
            <div className="rounded-md border border-ink-100 bg-ink-50/60 p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold text-ink-400">Tutorials</h3>
                <span className="border-l-2 border-ink-300 bg-white px-2 py-1 text-xs font-medium text-ink-500">
                  Coming soon
                </span>
              </div>
              <p className="leading-relaxed text-ink-400">
                Step-by-step guides for common tasks and use cases.
              </p>
            </div>

            {/* Best Practices (WIP) */}
            <div className="rounded-md border border-ink-100 bg-ink-50/60 p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold text-ink-400">Best Practices</h3>
                <span className="border-l-2 border-ink-300 bg-white px-2 py-1 text-xs font-medium text-ink-500">
                  Coming soon
                </span>
              </div>
              <p className="leading-relaxed text-ink-400">
                Recommended patterns for using the FireBIM platform.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
