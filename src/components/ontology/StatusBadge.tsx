import { STATUS_STYLES, type ReleaseStatus } from "@/lib/ontologyTerms";

export default function StatusBadge({ status, className = "" }: { status: ReleaseStatus; className?: string }) {
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${STATUS_STYLES[status] ?? "bg-gray-100 text-gray-700"} ${className}`}
    >
      {status}
    </span>
  );
}
