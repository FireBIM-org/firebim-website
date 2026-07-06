import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  description: string;
  link?: string;
  linkLabel?: string;
};

export function getNews(): NewsItem[] {
  const dirPath = path.join(process.cwd(), "content", "news");
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".md"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dirPath, file), "utf8");
      const { data, content } = matter(raw);

      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        description: data.description ?? content.trim(),
        link: data.link,
        linkLabel: data.linkLabel,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
