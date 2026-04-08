import { AlertTriangle, Upload, FileText, CheckCircle } from "lucide-react";

export default function ReferencePlatformPage() {
  return (
    <main>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          FireBIM Reference Platform
        </h1>
        <p className="text-lg sm:text-2xl mb-6 max-w-2xl">
          A better way to manage BIM models and automate compliance workflows.
        </p>

        {/* CTA */}
        <a
          href="https://app.firebim.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
        >
          Open Platform
        </a>
      </section>

      {/* Warning banner */}
      <section className="py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 border border-yellow-300 bg-yellow-50 text-yellow-800 rounded-xl p-4">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">
              Under development – this platform is currently in beta version.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Features
            </h2>
            <p className="text-gray-600 text-lg">
              A better way to manage BIM models
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="mb-4">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Upload IFC Models
              </h3>
              <p className="text-sm text-gray-600">
                Upload your IFC models to analyze and validate against specifications.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="mb-4">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Manage IDS Files
              </h3>
              <p className="text-sm text-gray-600">
                Upload and manage Information Delivery Specification files for model validation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Analyze and Validate
              </h3>
              <p className="text-sm text-gray-600">
                Run compliance checks on your models against IDS specifications to ensure they meet requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}