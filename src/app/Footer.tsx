import Link from 'next/link';

export default function Footer() {
  return (
      <footer className="bg-white border-t border-gray-200 pt-8 pb-3 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} FireBIM Organization. All rights reserved.
            <br />
            <Link href="/#about" className="text-xs text-gray-300 hover:underline mt-1 inline-block">
              About
            </Link>
            <span className='text-gray-300'> • </span>
            <Link href="/privacy" className="text-xs text-gray-300 hover:underline mt-1 inline-block">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
  );
}
