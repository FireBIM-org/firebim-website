export type PublicationType = "deliverable" | "article";

export type PublicationCard = {
  slug: string;
  title: string;
  date: string;
  description: string;
  type: PublicationType;
  workPackage?: string;
  pdf: string;
};
