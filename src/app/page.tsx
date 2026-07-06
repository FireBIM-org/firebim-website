import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Code2,
  Globe2,
  Landmark,
  Layers,
  PencilRuler,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import Brands from "@/components/Brands";
import { getNews } from "@/lib/news";

const stats = [
  { value: "22", label: "Partners" },
  { value: "5", label: "Countries" },
];

const aims = [
  {
    icon: Scale,
    title: "Collective interpretation",
    text: "Enable the collective interpretation of fire regulations in all partner countries through a shared, machine-readable ontology.",
  },
  {
    icon: ShieldCheck,
    title: "Automated compliance",
    text: "Enable automated compliance checking of buildings against fire safety regulations from the earliest design stages.",
  },
  {
    icon: Globe2,
    title: "Open markets",
    text: "Reduce international barriers for building products and services across the participating countries.",
  },
  {
    icon: Users,
    title: "Easier collaboration",
    text: "Reduce the barriers to international collaboration and fire safety design competition for AEC companies.",
  },
];

const audiences = [
  {
    icon: Code2,
    title: "For developers",
    text: "Build on the FireBIM API for standalone applications, software add-ins, platform extensions, training tools, analytical dashboards, and control interfaces.",
  },
  {
    icon: Landmark,
    title: "For authorities",
    text: "Municipalities and fire departments can inspect a building's configuration earlier, supporting permit reviews, exception handling, and Digital Audit workflows.",
  },
  {
    icon: PencilRuler,
    title: "For design teams",
    text: "Review early design proposals against relevant national, regional, and local building codes before major design decisions are fixed.",
  },
];

export default function Home() {
  const news = getNews();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-flame-500/50" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-ink-800" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-24 text-center sm:py-32">
          <span className="mb-6 inline-flex items-center gap-2 border-l-2 border-flame-500 bg-ink-900 px-3 py-1.5 text-sm text-ink-200">
            Open-source fire safety engineering
          </span>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Fire<span className="text-flame-500">BIM</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200 sm:text-2xl">
            Accounting for fire safety engineering using Building Information
            Modelling, from the first design sketch to the building permit.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://app.firebim.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-flame-600 px-8 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-flame-700"
            >
              Open Platform
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-md border border-ink-600 px-8 py-3 text-lg font-semibold text-ink-100 transition-colors hover:border-ink-400 hover:bg-ink-900"
            >
              Learn more
            </a>
          </div>

          {/* Stats strip */}
          <dl className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-6 border-t border-ink-800 pt-10 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="order-2 text-sm text-ink-300">{stat.label}</dt>
                <dd className="text-3xl font-bold text-flame-500 sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-4 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-flame-600">
              About
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
              An interpreter, inspector, and validator of fire regulations
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-700 lg:col-span-3">
            <p>
              The FireBIM platform relies on Building Information Modelling
              (BIM), Open Data standards, semantic data modelling, and web
              technologies specifically addressing international collaboration
              and computational interoperability. It resembles an interpreter,
              inspector, and validator of the regulations, thus also helping
              authorities facilitate and regulate fire safety more efficiently.
            </p>
            <p>
              Using FireBIM, design teams will be digitally assisted to create
              safer buildings cost-effectively. The platform is open source and
              provides infrastructure for
              developers to bring the FireBIM concept to new countries and
              applications, while supporting integration with other AEC
              standards and tools.
            </p>
          </div>
        </div>
      </section>

      {/* Aim Section */}
      <section id="aim" className="bg-ink-50 px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-flame-600">
              Aim
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
              Harmonized fire codes, from early design to compliance
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-700">
              FireBIM harmonizes and implements the fire codes of the
              participating countries in an open-source, web-based BIM platform
              for fire safety assessment. It supports (inter)national fire
              safety documentation and compliance from the early design stages.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {aims.map((aim) => (
              <div
                key={aim.title}
                className="rounded-md border border-ink-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-md bg-flame-50 p-3">
                  <aim.icon className="h-6 w-6 text-flame-600" />
                </div>
                <h3 className="text-lg font-semibold text-ink-950">{aim.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{aim.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-flame-600">
              How it works
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
              The FireBIM Stack
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-md border border-ink-100 bg-ink-50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="hidden rounded-md bg-white p-3 shadow-sm sm:inline-flex">
                <Layers className="h-6 w-6 text-flame-600" />
              </div>
              <p className="leading-relaxed text-ink-700">
                The FireBIM Platform relies on the extensible and modular{" "}
                <strong className="text-ink-900">FireBIM Ontology</strong>, which
                digitally harmonises the underlying concepts of country-specific
                fire codes and turns them into uniform, machine-readable
                <strong className="text-ink-900"> fire code kernels</strong>.
                These kernels and the core FireBIM services are exposed through
                the <strong className="text-ink-900">FireBIM API</strong>, the interface
                between the core services and custom FireBIM Applications built
                inside or outside the project. Together, the Platform and
                Applications form the FireBIM Stack, and end users interact with
                it through dedicated, tailored interfaces.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="rounded-md border border-ink-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-md bg-ink-50 p-3">
                  <audience.icon className="h-6 w-6 text-ink-700" />
                </div>
                <h3 className="text-lg font-semibold text-ink-950">
                  {audience.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {audience.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      {news.length > 0 && (
        <section id="news" className="bg-ink-50 px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-flame-600">
                News
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
                Latest from the project
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.slice(0, 6).map((item) => (
                <article
                  key={item.slug}
                  className="flex flex-col rounded-md border border-ink-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  {item.date && (
                    <p className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-400">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(item.date).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-ink-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-grow text-sm leading-relaxed text-ink-600">
                    {item.description}
                  </p>
                  {item.link &&
                    (item.link.startsWith("/") ? (
                      <Link
                        href={item.link}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-flame-600 hover:text-flame-700"
                      >
                        {item.linkLabel ?? "Read more"}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-flame-600 hover:text-flame-700"
                      >
                        {item.linkLabel ?? "Read more"}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    ))}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners Section */}
      <section id="partners" className="px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-flame-600">
              Partners
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
              22 partners, 5 countries, one goal
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-700">
              A consortium building open tools for fire safety engineering
              across architecture, engineering, construction, and regulation.
            </p>
          </div>
          <Brands />
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden bg-ink-950 px-4 py-16 text-white sm:py-20">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Try the FireBIM Reference Platform
          </h2>
          <p className="max-w-2xl text-lg text-ink-200">
            Upload IFC models, manage IDS files, and run automated compliance
            checks. FireBIM is free and open source.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="https://app.firebim.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-flame-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-flame-700"
            >
              Open Platform
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/FireBIM-org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-ink-600 px-8 py-3 font-semibold text-ink-100 transition-colors hover:border-ink-400 hover:bg-ink-900"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
