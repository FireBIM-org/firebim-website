import type { Metadata } from "next";
import ViewerPage, { versionParams } from "../../viewer-page";
import { findEntry } from "@/lib/ontologies";

export const dynamicParams = false;

export function generateStaticParams() {
  return versionParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ family: string; country: string; version: string }>;
}): Promise<Metadata> {
  const { family, country, version } = await params;
  const entry = findEntry(family, country);
  return { title: entry ? `${entry.title} ${version} – FireBIM Ontologies` : "FireBIM Ontologies" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ family: string; country: string; version: string }>;
}) {
  const { family, country, version } = await params;
  return <ViewerPage family={family} country={country} version={version} />;
}
