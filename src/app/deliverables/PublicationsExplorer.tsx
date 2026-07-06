"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import type { PublicationCard } from "./types";

const wpColors: Record<string, string> = {
  WP1: "bg-blue-100 text-blue-800 border-blue-200",
  WP2: "bg-green-100 text-green-800 border-green-200",
  WP3: "bg-purple-100 text-purple-800 border-purple-200",
  WP4: "bg-orange-100 text-orange-800 border-orange-200",
  WP5: "bg-pink-100 text-pink-800 border-pink-200",
  WP6: "bg-cyan-100 text-cyan-800 border-cyan-200",
};

const typeFilters = [
  { value: "all", label: "All" },
  { value: "deliverable", label: "Deliverables" },
  { value: "article", label: "Articles" },
] as const;

function PublicationCardView({ item }: { item: PublicationCard }) {
  const wpClass = item.workPackage
    ? wpColors[item.workPackage] ?? "bg-gray-100 text-gray-800 border-gray-200"
    : "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <article className="flex flex-col rounded-md border border-ink-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-snug text-ink-950">
          {item.title}
        </h3>

        <a
          href={item.pdf}
          download
          className="shrink-0 rounded-lg border border-ink-100 p-2 text-ink-600 transition hover:border-flame-200 hover:bg-flame-50 hover:text-flame-600"
          aria-label={`Download ${item.title}`}
          title="Download PDF"
        >
          <Download className="h-4 w-4" />
        </a>
      </div>

      <p className="mt-2 flex-grow text-sm leading-relaxed text-ink-600">
        {item.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex border-l-2 border-ink-300 bg-ink-50 px-2.5 py-1 font-medium capitalize text-ink-700">
          {item.type}
        </span>

        {item.workPackage && (
          <span className={`inline-flex border-l-2 px-2.5 py-1 font-medium ${wpClass}`}>
            {item.workPackage}
          </span>
        )}

        {item.date && (
          <span className="inline-flex border-l-2 border-ink-300 bg-ink-50 px-2.5 py-1 text-ink-700">
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
          className="inline-flex rounded-sm border border-ink-100 bg-ink-50 px-2.5 py-1 text-ink-700 transition hover:border-flame-200 hover:bg-flame-50 hover:text-flame-700"
        >
          Open PDF
        </a>
      </div>
    </article>
  );
}

export default function PublicationsExplorer({
  publications,
}: {
  publications: PublicationCard[];
}) {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [wpFilter, setWpFilter] = useState<string>("all");

  const workPackages = useMemo(
    () =>
      Array.from(
        new Set(
          publications
            .map((item) => item.workPackage)
            .filter((wp): wp is string => Boolean(wp))
        )
      ).sort(),
    [publications]
  );

  const filtered = publications.filter(
    (item) =>
      (typeFilter === "all" || item.type === typeFilter) &&
      (wpFilter === "all" || item.workPackage === wpFilter)
  );

  const chipClass = (active: boolean) =>
    `rounded-md border px-4 py-1.5 text-sm font-medium transition-colors ${
      active
        ? "border-flame-600 bg-flame-600 text-white"
        : "border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:text-ink-900"
    }`;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex flex-wrap gap-2">
          {typeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setTypeFilter(filter.value)}
              className={chipClass(typeFilter === filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {workPackages.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-ink-400">Work package:</span>
            <button
              onClick={() => setWpFilter("all")}
              className={chipClass(wpFilter === "all")}
            >
              All
            </button>
            {workPackages.map((wp) => (
              <button
                key={wp}
                onClick={() => setWpFilter(wp)}
                className={chipClass(wpFilter === wp)}
              >
                {wp}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <PublicationCardView key={item.slug} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-ink-500">
          No publications match the selected filters.
        </p>
      )}
    </div>
  );
}
