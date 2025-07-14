import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-full
    bg-gradient-to-r from-blue-500 to-purple-600 flex-grow">
      <div className="text-center text-white px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold mb-4 opacity-20">404</h1>
          <h2 className="text-4xl sm:text-6xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4 sm:space-y-0 space-x-4 sm:flex sm:justify-center">
          <Link 
            href="/"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Go Home
          </Link>
          <Link 
            href="/#about"
            className="inline-block px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
          >
            About
          </Link>
        </div>
        
        <div className="mt-12 text-sm opacity-75">
          <p>If you believe this is an error, please contact us.</p>
        </div>
      </div>
    </main>
  );
}
