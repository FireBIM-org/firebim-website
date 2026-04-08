import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Download } from "lucide-react";

type PublicationType = "deliverable" | "article";

type PublicationCard = {
  slug: string;
  title: string;
  date: string;
  description: string;
  type: PublicationType;
  workPackage?: string;
  pdf: string;
};

const wpColors: Record<string, string> = {
  WP1: "bg-blue-100 text-blue-800 border-blue-200",
  WP2: "bg-green-100 text-green-800 border-green-200",
  WP3: "bg-purple-100 text-purple-800 border-purple-200",
  WP4: "bg-orange-100 text-orange-800 border-orange-200",
  WP5: "bg-pink-100 text-pink-800 border-pink-200",
  WP6: "bg-cyan-100 text-cyan-800 border-cyan-200",
};

function readMarkdownCards(dirPath: string): PublicationCard[] {
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".md"));

  return files.map((file) => {
    const fullPath = path.join(dirPath, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);

    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      description: data.description ?? "",
      type: data.type ?? "deliverable",
      workPackage: data.workPackage,
      pdf: data.pdf ?? "#",
    };
  });
}

function getPublications(): PublicationCard[] {
  const baseDir = path.join(process.cwd(), "content", "deliverables");

  const deliverables = readMarkdownCards(path.join(baseDir, "deliverables"));
  const articles = readMarkdownCards(path.join(baseDir, "articles"));

  return [...deliverables, ...articles].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}

function PublicationCardView({ item }: { item: PublicationCard }) {
  const wpClass = item.workPackage
    ? wpColors[item.workPackage] ?? "bg-gray-100 text-gray-800 border-gray-200"
    : "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <article className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 space-y-4">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>

          <a
            href={item.pdf}
            download
            className="shrink-0 rounded-lg border border-gray-200 p-2 hover:bg-gray-50 transition"
            aria-label={`Download ${item.title}`}
            title="Download PDF"
          >
            <Download className="h-4 w-4" />
          </a>
        </div>

        <p className="text-sm text-gray-600">{item.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        {item.workPackage && (
          <span className={`inline-flex rounded-full border px-2.5 py-1 font-medium ${wpClass}`}>
            {item.workPackage}
          </span>
        )}

        {item.date && (
          <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-gray-700">
            {new Date(item.date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        )}

        <a
          href={item.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-gray-700 hover:bg-gray-100"
        >
          Open PDF
        </a>
      </div>
    </article>
  );
}

export default function DeliverablesPage() {
  const publications = getPublications();

  const deliverables = publications.filter((item) => item.type === "deliverable");
  const articles = publications.filter((item) => item.type === "article");

  return (
    <main>
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Deliverables & Publications</h1>
        <p className="text-lg sm:text-2xl mb-8">
          Project outputs, deliverables, and articles
        </p>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
              <div className="mb-5">
                <h2 className="text-2xl font-bold">Deliverables</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Official project deliverables grouped by work package.
                </p>
              </div>

              <div className="space-y-4">
                {deliverables.length > 0 ? (
                  deliverables.map((item) => (
                    <PublicationCardView key={item.slug} item={item} />
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No deliverables yet.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
              <div className="mb-5">
                <h2 className="text-2xl font-bold">Articles</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Articles, papers, and dissemination outputs.
                </p>
              </div>

              <div className="space-y-4">
                {articles.length > 0 ? (
                  articles.map((item) => (
                    <PublicationCardView key={item.slug} item={item} />
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No articles yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}