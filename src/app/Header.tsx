import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              FireBIM
              <Image src="/assets/firebim-logo.png" alt="FireBIM" width={32} height={32} />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link href="#about" className="text-gray-500 hover:text-gray-900">
              About
            </Link>
            <Link href="#features" className="text-gray-500 hover:text-gray-900">
              Features
            </Link>
            <Link href="#collaborators" className="text-gray-500 hover:text-gray-900">
              Collaborators
            </Link>
            <Link href="#partners" className="text-gray-500 hover:text-gray-900">
              Partners
            </Link>
            <Link href="#faq" className="text-gray-500 hover:text-gray-900">
              FAQ
            </Link>
            <Link href="#contact" className="text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
