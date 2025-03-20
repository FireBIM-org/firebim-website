export default function Downloads() {
  return (
    <main>
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Downloads</h1>
        <p className="text-lg sm:text-2xl mb-8">
          Access software, tools, and resources
        </p>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">WIP - coming soon</h2>
          <p className="mb-6">
            Under development - check back soon for updates.
          </p>
        </div>
        <div className="max-w-4xl mx-auto px-4 opacity-50 pointer-events-none cursor-not-allowed">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Available Downloads</h2>

          {/* Adding opacity and preventing interaction with pointer-events-none */}
          <div className="space-y-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">FireBIM SDK</h3>
              <p className="mb-4">Software Development Kit for integrating with the FireBIM platform.</p>
              <div className="flex gap-4">
                <a href="#" className="px-4 py-2 bg-gray-400 text-white rounded">
                  Download v1.0.0
                </a>
                <a href="#" className="px-4 py-2 border border-gray-400 text-gray-400 rounded">
                  Documentation
                </a>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">FireBIM Example Projects</h3>
              <p className="mb-4">Example projects demonstrating the capabilities of FireBIM.</p>
              <div className="flex gap-4">
                <a href="#" className="px-4 py-2 bg-gray-400 text-white rounded">
                  Download Examples
                </a>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">FireBIM Design Templates</h3>
              <p className="mb-4">Design templates for creating fire safety compliant building designs.</p>
              <div className="flex gap-4">
                <a href="#" className="px-4 py-2 bg-gray-400 text-white rounded">
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
