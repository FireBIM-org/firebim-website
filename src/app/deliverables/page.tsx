import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PageHero from "@/components/PageHero";
import PublicationsExplorer from "./PublicationsExplorer";
import type { PublicationCard } from "./types";

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

export default function DeliverablesPage() {
  const publications = getPublications();

  return (
    <main>
      <PageHero
        title="Deliverables & Publications"
        subtitle="Official project deliverables, articles, papers, and dissemination outputs."
        compact
      />

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <PublicationsExplorer publications={publications} />
        </div>
      </section>
    </main>
  );
}
