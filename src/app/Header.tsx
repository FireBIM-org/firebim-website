import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              <span className="flex items-center">
                FireBIM
                <Image src="/assets/firebim-logo.png" alt="FireBIM" width={32} height={32} className="ml-2" />
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/#about" className="text-gray-500 hover:text-gray-900">
              About
            </Link>
            <Link href="/#partners" className="text-gray-500 hover:text-gray-900">
              Partners
            </Link>
            <Link href="/reference_platform" className="text-gray-500 hover:text-gray-900">
              Platform
            </Link>
            <Link href="/documentation" className="text-gray-500 hover:text-gray-900">
              Docs
            </Link>
            <Link href="/downloads" className="text-gray-500 hover:text-gray-900">
              Downloads
            </Link>
            <Link href="/deliverables" className="text-gray-500 hover:text-gray-900">
              Deliverables
            </Link>
            <Link href="/#faq" className="text-gray-500 hover:text-gray-900">
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
