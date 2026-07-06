import PageHero from "@/components/PageHero";

export default function Downloads() {
  return (
    <main>
      <PageHero
        title="Downloads"
        subtitle="Software, tools, and resources are still in development."
        compact
      />

      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl opacity-50 pointer-events-none cursor-not-allowed">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-ink-950">
            Available Downloads
          </h2>

          <div className="space-y-6">
            <div className="rounded-md border border-ink-100 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold text-ink-950">FireBIM SDK</h3>
              <p className="mb-4 text-ink-600">Software Development Kit for integrating with the FireBIM platform.</p>
              <div className="flex gap-4">
                <a href="#" className="rounded-md bg-ink-300 px-4 py-2 text-sm font-semibold text-white">
                  Download v1.0.0
                </a>
                <a href="#" className="rounded-md border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-400">
                  Documentation
                </a>
              </div>
            </div>

            <div className="rounded-md border border-ink-100 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold text-ink-950">FireBIM Example Projects</h3>
              <p className="mb-4 text-ink-600">Example projects showing common FireBIM workflows.</p>
              <div className="flex gap-4">
                <a href="#" className="rounded-md bg-ink-300 px-4 py-2 text-sm font-semibold text-white">
                  Download Examples
                </a>
              </div>
            </div>

            <div className="rounded-md border border-ink-100 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold text-ink-950">FireBIM Design Templates</h3>
              <p className="mb-4 text-ink-600">Design templates for fire safety compliance workflows.</p>
              <div className="flex gap-4">
                <a href="#" className="rounded-md bg-ink-300 px-4 py-2 text-sm font-semibold text-white">
                  Download Templates
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
