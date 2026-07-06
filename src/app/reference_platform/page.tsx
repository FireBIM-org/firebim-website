import { AlertTriangle, Upload, FileText, CheckCircle, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";

const features = [
  {
    icon: Upload,
    title: "Upload IFC Models",
    text: "Upload your IFC models to analyze and validate against specifications.",
  },
  {
    icon: FileText,
    title: "Manage IDS Files",
    text: "Upload and manage Information Delivery Specification files for model validation.",
  },
  {
    icon: CheckCircle,
    title: "Analyze and Validate",
    text: "Run compliance checks on models against IDS specifications and review the results.",
  },
];

export default function ReferencePlatformPage() {
  return (
    <main>
      <PageHero
        title="FireBIM Reference Platform"
        subtitle="Manage BIM models and run compliance workflows."
      >
        <a
          href="https://app.firebim.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-flame-600 px-8 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-flame-700"
        >
          Open Platform
          <ArrowRight className="h-5 w-5" />
        </a>
      </PageHero>

      {/* Warning banner */}
      <section className="px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-800">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">
              This beta platform is under development.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-flame-600">
              Features
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
              BIM model management and validation
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-md border border-ink-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-md bg-flame-50 p-3">
                  <feature.icon className="h-6 w-6 text-flame-600" />
                </div>
                <h3 className="text-lg font-semibold text-ink-950">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
