import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Code2,
  ExternalLink,
  FlaskConical,
  Globe2,
  Layers,
  Rocket,
  Server,
  ShieldCheck,
} from "lucide-react";

import {
  AVAILABILITY_LABEL,
  OTHER_PLATFORMS,
  REFERENCE_PLATFORM,
  type Platform,
} from "./platforms";

export const metadata: Metadata = {
  title: "FireBIM Platform",
  description:
    "The FireBIM reference platform (stable and experimental releases), how the API and the web app fit together, and the other FireBIM platforms built by consortium partners.",
};

const DEPLOYMENTS = [
  {
    id: "stable",
    title: "FireBIM Webapp",
    badge: "Stable release",
    href: "https://app.firebim.org/",
    api: "https://api.firebim.org",
    apiDocs: "https://api.firebim.org/docs",
    description:
      "The release we recommend for trying FireBIM: the last version that passed the consortium's checks. Updated when a set of features is complete.",
    icon: Rocket,
    tone: "border-blue-200 bg-white hover:border-blue-400",
    button: "bg-blue-600 text-white hover:bg-blue-700",
  },
  {
    id: "experimental",
    title: "Newest version",
    badge: "Experimental release",
    href: "https://app.staging.firebim.org/",
    api: "https://api.staging.firebim.org",
    apiDocs: "https://api.staging.firebim.org/docs",
    description:
      "Follows the main branch: the newest rule elements, ontology versions and UI — sometimes hours old. Expect rough edges; data may be reset.",
    icon: FlaskConical,
    tone: "border-purple-200 bg-white hover:border-purple-400",
    button: "bg-purple-600 text-white hover:bg-purple-700",
  },
] as const;

function Tag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

function AvailabilityTags({ platform }: { platform: Platform }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {platform.availability.map((key) => (
        <Tag key={key} className={AVAILABILITY_LABEL[key].className}>
          {AVAILABILITY_LABEL[key].label}
        </Tag>
      ))}
    </div>
  );
}

function Screenshot({ platform, className = "" }: { platform: Platform; className?: string }) {
  if (platform.screenshot) {
    return (
      <div className={`relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 ${className}`}>
        <Image
          src={platform.screenshot}
          alt={`Screenshot of ${platform.name}`}
          width={1200}
          height={534}
          className="h-full w-full object-cover object-top"
        />
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 ${className}`}
    >
      <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
        <div className="relative h-14 w-40">
          <Image src={platform.logo} alt={platform.maker} fill className="object-contain" />
        </div>
        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Screenshot to follow
        </span>
      </div>
    </div>
  );
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm">
      <dt className="w-24 shrink-0 text-gray-500">{label}</dt>
      <dd className="text-gray-800">{children}</dd>
    </div>
  );
}

function PlatformCard({ platform }: { platform: Platform }) {
  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${
        platform.placeholder ? "border-gray-200" : "border-blue-100"
      }`}
    >
      <Screenshot platform={platform} className="mb-4 aspect-[16/7]" />

      <div className="mb-3 flex items-start gap-3">
        <div className="relative h-10 w-24 shrink-0">
          <Image src={platform.logo} alt={platform.maker} fill className="object-contain object-left" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-tight text-gray-900">{platform.name}</h3>
          <p className="text-xs text-gray-500">
            by{" "}
            <a href={platform.makerHref} target="_blank" rel="noopener noreferrer" className="underline">
              {platform.maker}
            </a>
          </p>
        </div>
      </div>

      <p className="mb-3 text-sm text-gray-700">{platform.tagline}</p>
      <p className="mb-4 text-sm text-gray-600">{platform.description}</p>

      <dl className="mb-4 space-y-1.5">
        <MetaRow label="Availability">
          <AvailabilityTags platform={platform} />
        </MetaRow>
        <MetaRow label="Price">{platform.price}</MetaRow>
        <MetaRow label="Countries">{platform.countries.join(" · ")}</MetaRow>
        <MetaRow label="Status">{platform.status}</MetaRow>
      </dl>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {platform.features.map((feature) => (
          <Tag key={feature} className="border-gray-200 bg-gray-50 text-gray-700">
            {feature}
          </Tag>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {platform.links.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={
              index === 0
                ? "inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
                : "inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            }
          >
            {link.label}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ))}
      </div>
    </article>
  );
}

export default function FireBimPlatformPage() {
  const reference = REFERENCE_PLATFORM;

  return (
    <main>
      {/* Header field */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-16 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-4 text-4xl font-bold sm:text-6xl">FireBIM Platform</h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-2xl">
            One open API, one reference web app, and a growing family of platforms that build on the same
            FireBIM building blocks.
          </p>
        </div>
      </section>

      {/* Two deployments — right below the header */}
      <section className="-mt-8 pb-4">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Open the reference platform</h2>
                <p className="text-sm text-gray-600">
                  Two deployments run side by side — pick the stable one unless you want to see what is coming.
                </p>
              </div>
              <Link href="/documentation/" className="text-sm font-medium text-blue-600 hover:underline">
                Read the docs first →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {DEPLOYMENTS.map((deployment) => {
                const Icon = deployment.icon;
                return (
                  <div
                    key={deployment.id}
                    className={`flex flex-col rounded-xl border-2 p-5 transition ${deployment.tone}`}
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <Icon className="h-6 w-6 text-gray-700" />
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{deployment.title}</div>
                        <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
                          {deployment.badge}
                        </div>
                      </div>
                    </div>
                    <p className="mb-4 text-sm text-gray-600">{deployment.description}</p>
                    <div className="mb-4 rounded-lg bg-gray-50 px-3 py-2 font-mono text-xs text-gray-600">
                      <div>app · {deployment.href.replace(/\/$/, "")}</div>
                      <div>api · {deployment.api}</div>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2">
                      <a
                        href={deployment.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow ${deployment.button}`}
                      >
                        Open {deployment.title}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <a
                        href={deployment.apiDocs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        API docs
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-yellow-800">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-xs font-medium">
                Both releases are beta software from a research project. Do not use them as the basis of a legal
                fire-safety approval; results depend on the model, the mapping and the rules you choose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reference platform — first in line, most information */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold sm:text-4xl">The FireBIM reference platform</h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">{reference.tagline}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Screenshot platform={reference} className="shadow-md" />
              <p className="mt-2 text-xs text-gray-500">
                The RuleBook: a rule dropped into the rule runner, executed step by step against a building
                graph, with the execution log and the summary panel.
              </p>
            </div>

            <div className="lg:col-span-2">
              <p className="mb-4 text-sm text-gray-700">{reference.description}</p>
              <dl className="mb-4 space-y-1.5">
                <MetaRow label="Availability">
                  <AvailabilityTags platform={reference} />
                </MetaRow>
                <MetaRow label="Price">{reference.price}</MetaRow>
                <MetaRow label="Countries">{reference.countries.join(" · ")} (national FBO extensions)</MetaRow>
                <MetaRow label="Standards">{reference.standards?.join(" · ")}</MetaRow>
                <MetaRow label="Status">{reference.status}</MetaRow>
              </dl>
              <div className="flex flex-wrap gap-1.5">
                {reference.features.map((feature) => (
                  <Tag key={feature} className="border-blue-100 bg-blue-50 text-blue-800">
                    {feature}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API and front end are separate */}
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Two parts: the API and the web app</h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              FireBIM is API-first. The web app you see is one client of a public REST API — everything it does,
              you can do from your own tool.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <Server className="mb-3 h-8 w-8 text-blue-600" />
              <h3 className="mb-2 text-lg font-semibold">FireBIM API</h3>
              <p className="mb-3 text-sm text-gray-600">
                A FastAPI service that stores building graphs, rules and ontologies, converts IFC, compiles rules to
                SHACL and runs the checks (four independent runners must agree). Fully described by an OpenAPI
                schema — every screen of the web app is a documented call.
              </p>
              <ul className="mb-4 space-y-1 text-xs text-gray-600">
                <li>
                  <span className="font-mono">/graphs</span> · publish and fetch building graphs, write answers into
                  an answered copy
                </li>
                <li>
                  <span className="font-mono">/rules</span> · validate, compile, publish, decompile rules and rule
                  elements
                </li>
                <li>
                  <span className="font-mono">/checks</span> · run a rule against a graph (standard, horizontal,
                  vertical, blind) with derived values and open questions
                </li>
                <li>
                  <span className="font-mono">/ontologies</span> · the FBO registry, versions, sync
                </li>
              </ul>
              <a
                href="https://api.firebim.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
              >
                <Code2 className="h-4 w-4" />
                API reference (Swagger) <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <Layers className="mb-3 h-8 w-8 text-purple-600" />
              <h3 className="mb-2 text-lg font-semibold">FireBIM Webapp</h3>
              <p className="mb-3 text-sm text-gray-600">
                A Next.js front end: IFC models and IDS files, the RuleBuilder canvas, the RuleBook rule runner, the
                Lexicon and the ontology browser. It keeps no logic of its own — it composes API calls and shows the
                results, so the same checks can be run from any other client.
              </p>
              <ul className="mb-4 space-y-1 text-xs text-gray-600">
                <li>RuleBuilder · compose rules from stored rule elements, save as workspaces</li>
                <li>RuleBook · drop rules into a runner, chain linked rules, answer open questions</li>
                <li>Ontologies · browse FBO core and the national versions</li>
              </ul>
              <a
                href="https://app.firebim.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:underline"
              >
                <Globe2 className="h-4 w-4" />
                Open the web app <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <BookOpen className="mb-3 h-8 w-8 text-green-600" />
              <h3 className="mb-2 text-lg font-semibold">For developers</h3>
              <p className="mb-3 text-sm text-gray-600">
                Build your own front end, plug the checks into a BIM tool, or run the stack yourself. The
                documentation pages collect the ontology registry, the modelling guideline and the API reference; the
                source code lives in the FireBIM-org GitHub organisation (partner access during the development
                phase).
              </p>
              <ul className="mb-4 space-y-1 text-xs text-gray-600">
                <li>Ontology registry · FBO core, BE / DK / LT / NL / PT versions, Turtle downloads</li>
                <li>Modelling guideline · what to model in IFC so FireBIM can check it</li>
                <li>Example graphs · synthetic buildings to test rules against</li>
              </ul>
              <div className="flex flex-col gap-1">
                <Link
                  href="/documentation/"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 hover:underline"
                >
                  <ShieldCheck className="h-4 w-4" /> Docs · developer site
                </Link>
                <a
                  href="https://github.com/FireBIM-org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 hover:underline"
                >
                  <Code2 className="h-4 w-4" /> github.com/FireBIM-org <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other FireBIM platforms */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold sm:text-4xl">Other FireBIM platforms</h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              Consortium partners build their own products on the FireBIM building blocks — the FBO ontology, the
              rule formalism, the IFC-to-graph conversion and the IDS / SHACL checks. Some are live demos, some are
              announced; this list grows as they are released.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {OTHER_PLATFORMS.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Building a FireBIM platform? Send us the link, a screenshot and a short description via the FireBIM
            consortium and it will be listed here.
          </p>
        </div>
      </section>
    </main>
  );
}
