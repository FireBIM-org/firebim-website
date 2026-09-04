import type { Metadata } from "next";
import ViewerPage, { ontologyParams } from "./viewer-page";
import { findEntry } from "@/lib/ontologies";

export const dynamicParams = false;

export function generateStaticParams() {
  return ontologyParams();
}

export async function generateMetadata({ params }: { params: Promise<{ family: string; country: string }> }): Promise<Metadata> {
  const { family, country } = await params;
  const entry = findEntry(family, country);
  return { title: entry ? `${entry.title} – FireBIM Ontologies` : "FireBIM Ontologies" };
}

export default async function Page({ params }: { params: Promise<{ family: string; country: string }> }) {
  const { family, country } = await params;
  return <ViewerPage family={family} country={country} />;
}
