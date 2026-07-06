import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative flex min-h-full flex-grow flex-col items-center justify-center overflow-hidden bg-ink-950 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-flame-500/50" />

      <div className="relative px-4 text-center text-white">
        <div className="mb-8">
          <h1 className="mb-4 text-9xl font-bold text-flame-600/30">404</h1>
          <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-6xl">Page Not Found</h2>
          <p className="mb-8 max-w-2xl text-lg text-ink-200 sm:text-xl">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="space-y-4 sm:flex sm:justify-center sm:space-x-4 sm:space-y-0">
          <Link
            href="/"
            className="inline-block rounded-md bg-flame-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-flame-700"
          >
            Go Home
          </Link>
          <Link
            href="/#about"
            className="inline-block rounded-md border border-ink-600 px-8 py-3 font-semibold text-ink-100 transition-colors hover:border-ink-400 hover:bg-ink-900"
          >
            About
          </Link>
        </div>

        <div className="mt-12 text-sm text-ink-400">
          <p>If you believe this is an error, please contact us.</p>
        </div>
      </div>
    </main>
  );
}
