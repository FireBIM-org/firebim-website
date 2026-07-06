import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

const exploreLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#partners', label: 'Partners' },
  { href: '/reference_platform', label: 'Reference Platform' },
  { href: '/documentation', label: 'Documentation' },
  { href: '/deliverables', label: 'Deliverables & Publications' },
];

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
              <Image src="/assets/firebim-logo.png" alt="FireBIM" width={32} height={32} />
              Fire<span className="-ml-2 text-flame-500">BIM</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              An open-source platform for digital fire safety compliance,
              built by 22 partners across 5 countries.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-flame-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Connect</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/FireBIM-org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-flame-400"
                >
                  <GitHubIcon className="h-4 w-4" />
                  FireBIM on GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@firebim.org"
                  className="inline-flex items-center gap-2 transition-colors hover:text-flame-400"
                >
                  <Mail className="h-4 w-4" />
                  info@firebim.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-ink-800 pt-6 text-xs text-ink-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} FireBIM Organization. All rights reserved.</p>
          <Link href="/privacy" className="transition-colors hover:text-flame-400">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
