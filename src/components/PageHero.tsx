import { ReactNode } from "react";

type PageHeroProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
};

export default function PageHero({ title, subtitle, children, compact }: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-ink-950 text-white ${
        compact ? "py-16 sm:py-20" : "py-20 sm:py-28"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-flame-500/50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-ink-800" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-ink-200 sm:text-xl">{subtitle}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
