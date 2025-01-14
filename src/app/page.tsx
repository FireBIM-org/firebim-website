import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Lorem Ipsum</h1>
        <p className="text-lg sm:text-2xl mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <a
          className="rounded-full bg-white text-blue-600 hover:bg-gray-200 transition-colors text-lg sm:text-xl py-3 px-8"
          href="#about"
        >
          Learn More
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">About</h2>
        <p className="text-center max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-100">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <Image src="/feature1.svg" alt="Feature 1" width={64} height={64} />
            <h3 className="text-xl font-semibold mt-4">Feature One</h3>
            <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="text-center">
            <Image src="/feature2.svg" alt="Feature 2" width={64} height={64} />
            <h3 className="text-xl font-semibold mt-4">Feature Two</h3>
            <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="text-center">
            <Image src="/feature3.svg" alt="Feature 3" width={64} height={64} />
            <h3 className="text-xl font-semibold mt-4">Feature Three</h3>
            <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </section>

      {/* Collaborators Section */}
      <section id="collaborators" className="py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Collaborators</h2>
        <p className="text-center max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 bg-gray-100">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Partners</h2>
        <p className="text-center max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">FAQ</h2>
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mt-4">Question 1</h3>
          <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <h3 className="text-xl font-semibold mt-4">Question 2</h3>
          <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-100">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Contact Us</h2>
        <p className="text-center max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </section>
    </main>
  );
}
