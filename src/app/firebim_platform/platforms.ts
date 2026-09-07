/**
 * The FireBIM platforms directory.
 *
 * The FireBIM reference platform comes first; the others are implementations by consortium partners that build on
 * the same open FireBIM building blocks (FBO ontology, rules, IFC → RDF, IDS/SHACL checks). Entries marked
 * `placeholder` are announced but not yet described by their makers — the card links to the maker's page.
 */

export type Availability =
  | "open-source"
  | "free"
  | "subscription"
  | "demo"
  | "on-request"
  | "login"
  | "placeholder";

export type PlatformLink = { label: string; href: string };

export type Platform = {
  id: string;
  name: string;
  maker: string;
  makerHref: string;
  logo: string;
  screenshot?: string;
  /** one sentence */
  tagline: string;
  /** a short paragraph */
  description: string;
  availability: Availability[];
  price: string;
  countries: string[];
  features: string[];
  standards?: string[];
  links: PlatformLink[];
  placeholder?: boolean;
  status: string;
};

export const REFERENCE_PLATFORM: Platform = {
  id: "firebim-reference",
  name: "FireBIM Webapp — the reference platform",
  maker: "FireBIM consortium (DTU and WP3 partners)",
  makerHref: "https://firebim.org",
  logo: "/assets/firebim-logo.png",
  screenshot: "/assets/platforms/firebim-webapp-rulebook.jpg",
  tagline:
    "The consortium's own implementation: an API-first, no-code environment for writing fire-safety rules and running them against building graphs.",
  description:
    "The reference platform shows how the FireBIM building blocks fit together. IFC models are uploaded and converted to a building graph in the FireBIM Building Ontology (FBO, with national extensions); rules are composed visually in the RuleBuilder from start / decision / derive / end elements and compiled to SHACL; the RuleBook runs one or several rules against a graph, chains rules that hand over to each other, shows every decision step and asks the user for the facts the model does not contain. Everything the app does is a call to the public API, so any other front end — or a script — can do the same.",
  availability: ["open-source", "free", "login"],
  price: "Free · open source (ITEA4 FireBIM project)",
  countries: ["BE", "DK", "LT", "NL", "PT"],
  features: [
    "IFC upload & IFC → FBO graph",
    "IDS information requirements",
    "RuleBuilder (visual, no-code)",
    "Rule elements: decision · derive · rule links",
    "RuleBook rule runner with step log",
    "Ask the user when data is missing",
    "FBO ontology registry (core + national)",
    "Lexicon / term mapping",
    "SHACL compile of every rule",
    "Public REST API (OpenAPI)",
  ],
  standards: ["IFC", "IDS", "RDF / OWL", "SHACL", "OpenAPI"],
  links: [
    { label: "Open the stable release", href: "https://app.firebim.org/" },
    { label: "Open the experimental release", href: "https://app.staging.firebim.org/" },
    { label: "API reference (Swagger)", href: "https://api.firebim.org/docs" },
    { label: "Docs", href: "/documentation/" },
  ],
  status: "Beta — under active development",
};

export const OTHER_PLATFORMS: Platform[] = [
  {
    id: "vn2r-firebim",
    name: "FireBIM – Compliance (VN2R · ISEP · Exactusensu)",
    maker: "VN2R – Engineering Innovation Consulting, with ISEP and Exactusensu",
    makerHref: "https://www.vn2r.pt/",
    logo: "/assets/partners/vn2r-logo.png",
    screenshot: "/assets/platforms/vn2r-firebim-demo.jpg",
    tagline:
      "A Portuguese fire-safety compliance checker: upload an IFC model, run the information requirements (IDS) and the SHACL rules, and export the report — or answer a questionnaire when there is no model yet.",
    description:
      "Built on open-source components (IfcOpenShell, pySHACL, RDFLib, React), the demo offers three ways to check: a full IFC check (IDS first, then the SHACL compliance rules with an exportable report), an information-requirements-only check, and a questionnaire for the design stage. A 3D viewer, a decision diagram and a 'rules explained' view sit next to the semantic layer: graph, ontology, IFC mapping and a SHACL Studio. The rules are VN2R's structured reading of the Portuguese SCIE regime and are not a certified legal transposition.",
    availability: ["demo", "free"],
    price: "Free demo · not for official use",
    countries: ["PT"],
    features: [
      "IFC check (IDS → SHACL) with report",
      "IDS-only check",
      "Questionnaire without a model",
      "3D viewer (WebGPU)",
      "Decision diagram & rules explained",
      "Graph / ontology / IFC mapping views",
      "SHACL Studio",
      "BCF issue export",
      "EN / PT",
    ],
    standards: ["IFC", "IDS", "RDF / BOT", "SHACL", "BCF"],
    links: [
      { label: "Open the demo", href: "https://vn2r-firebim-demo.onrender.com/" },
      { label: "VN2R", href: "https://www.vn2r.pt/" },
    ],
    status: "Beta demo (v0.1) — uploads are not kept between restarts",
  },
  {
    id: "bim-connected",
    name: "BIM-Connected FireBIM",
    maker: "BIM-Connected (Eindhoven, NL)",
    makerHref: "https://www.bim-connected.com/",
    logo: "/assets/partners/bimconnected-logo.png",
    tagline:
      "Dutch consortium partner developing a web-based fire-safety assessment on top of its Wistor platform.",
    description:
      "BIM-Connected is a BIM consultancy and software developer that received ITEA4 funding to build a web-based platform harmonising fire-safety codes across countries. Details of the FireBIM offering have not been published yet — follow the link for the announcement and news.",
    availability: ["placeholder"],
    price: "To be announced",
    countries: ["NL"],
    features: ["Web-based", "Built on Wistor", "Fire-safety assessment"],
    links: [
      { label: "FireBIM news at BIM-Connected", href: "https://www.bim-connected.com/?s=firebim" },
    ],
    placeholder: true,
    status: "In development — no public release yet",
  },
  {
    id: "d-studio",
    name: "D-studio FireBIM",
    maker: "D-studio (BE)",
    makerHref: "https://dstudio.be/",
    logo: "/assets/partners/dstudio-logo.png",
    tagline:
      "Belgian consortium partner working on BIM applications for the verification and validation of fire-safety compliance.",
    description:
      "D-studio's portfolio page describes the FireBIM ambition — a harmonised, open BIM platform that streamlines fire-safety assessments across European jurisdictions and lets compliance be verified from the early design phases. Product details have not been published yet — follow the link to the portfolio page.",
    availability: ["placeholder"],
    price: "To be announced",
    countries: ["BE"],
    features: ["Compliance verification", "Early design phases", "European harmonisation"],
    links: [{ label: "FireBIM at D-studio", href: "https://dstudio.be/language/en/portfolio/firebim-uk/" }],
    placeholder: true,
    status: "In development — no public release yet",
  },
  {
    id: "kabandy",
    name: "Kabandy",
    maker: "Kabandy",
    makerHref: "https://kabandy.com/",
    logo: "/assets/partners/kabandy-logo.png",
    tagline:
      "Cloud BIM data platform (quantity take-off, model enrichment, IFC / IDS / BCF) — consortium partner; a FireBIM offering is to be announced.",
    description:
      "Kabandy is a subscription-based cloud platform that turns BIM models into structured data: visual quantity take-off, AI-assisted classification and enrichment, native Revit and IFC input, IDS and BCF support. How FireBIM checks will surface in Kabandy has not been published yet — follow the link for the product and pricing.",
    availability: ["subscription", "placeholder"],
    price: "Subscription (see kabandy.com/pricing)",
    countries: ["BE", "FR", "UK"],
    features: ["Cloud SaaS", "IFC / Revit / IDS / BCF", "Quantity take-off", "ISO 27001"],
    links: [
      { label: "kabandy.com", href: "https://kabandy.com/" },
      { label: "Pricing", href: "https://kabandy.com/pricing" },
    ],
    placeholder: true,
    status: "FireBIM integration to be announced",
  },
];

export const AVAILABILITY_LABEL: Record<Availability, { label: string; className: string }> = {
  "open-source": { label: "Open source", className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  free: { label: "Free", className: "bg-sky-100 text-sky-800 border-sky-200" },
  subscription: { label: "Subscription", className: "bg-violet-100 text-violet-800 border-violet-200" },
  demo: { label: "Demo", className: "bg-amber-100 text-amber-800 border-amber-200" },
  "on-request": { label: "On request", className: "bg-gray-100 text-gray-700 border-gray-200" },
  login: { label: "Login required", className: "bg-gray-100 text-gray-700 border-gray-200" },
  placeholder: { label: "To be announced", className: "bg-gray-100 text-gray-600 border-dashed border-gray-300" },
};
