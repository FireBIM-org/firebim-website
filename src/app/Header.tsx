"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigationLinks = [
  { href: "/#about", label: "About" },
  { href: "/#partners", label: "Partners" },
  { href: "/#news", label: "News" },
  { href: "/reference_platform", label: "Platform" },
  { href: "/documentation", label: "Docs" },
  { href: "/deliverables", label: "Deliverables" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    !href.includes("#") && pathname === href;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-ink-100 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-tight text-ink-900">
              <span className="flex items-center gap-2">
                <Image src="/assets/firebim-logo.png" alt="FireBIM" width={36} height={36} />
                Fire<span className="-ml-2 text-flame-600">BIM</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-flame-600"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://app.firebim.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-flame-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-flame-700"
            >
              Open Platform
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex align-middle items-center justify-center rounded-md p-1 text-ink-500 hover:text-ink-800 hover:bg-ink-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-flame-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 border-t border-ink-100 bg-white px-2 pt-2 pb-4 sm:px-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    isActive(link.href)
                      ? "bg-flame-50 text-flame-700"
                      : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://app.firebim.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block rounded-md bg-flame-600 px-3 py-2 text-center text-base font-semibold text-white hover:bg-flame-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Open Platform
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
