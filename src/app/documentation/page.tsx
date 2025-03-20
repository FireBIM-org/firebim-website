export default function Documentation() {
  return (
    <main>
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Documentation</h1>
        <p className="text-lg sm:text-2xl mb-8">
          Guides, tutorials, and technical documentation
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Technical Documentation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Getting Started</h3>
              <p className="mb-4">Learn the basics of the FireBIM platform and its key concepts.</p>
              <a href="#" className="text-blue-600 hover:underline">Read more →</a>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">API Reference</h3>
              <p className="mb-4">Comprehensive API documentation for developers.</p>
              <a href="#" className="text-blue-600 hover:underline">Read more →</a>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Tutorials</h3>
              <p className="mb-4">Step-by-step guides for common tasks and use cases.</p>
              <a href="#" className="text-blue-600 hover:underline">Read more →</a>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Best Practices</h3>
              <p className="mb-4">Recommendations for optimal usage of the FireBIM platform.</p>
              <a href="#" className="text-blue-600 hover:underline">Read more →</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
