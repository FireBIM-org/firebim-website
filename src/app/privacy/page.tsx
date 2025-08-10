export default function Privacy() {
  return (
    <main>
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-lg sm:text-2xl mb-8">
          How we handle your data and privacy
        </p>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Our Commitment to Privacy</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              At FireBIM, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This privacy policy explains how we collect, use, and protect information when you visit our website.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Information We Collect</h3>
            <p className="mb-6">
              We collect minimal information to improve our website and understand how visitors use our services. 
              The information we collect includes:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Basic website usage statistics (page views, session duration, referral sources)</li>
              <li>General geographic information (country/region level)</li>
              <li>Device and browser information for compatibility purposes</li>
              <li>Information you voluntarily provide when contacting us</li>
            </ul>

            <h3 className="text-2xl font-bold mb-4 mt-8">Analytics</h3>
            <p className="mb-6">
              This website uses <strong>Umami Analytics</strong>, a privacy-focused web analytics service. 
              Umami is designed with privacy in mind and provides us with insights about website usage without compromising your privacy:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>No personal data or personally identifiable information is collected</li>
              <li>No cookies are stored on your device</li>
              <li>All data is anonymized and aggregated</li>
              <li>Data cannot be used to track you across websites</li>
            </ul>
            
            <p className="mb-6">
              You can learn more about Umami&apos;s privacy practices at{" "}
              <a 
                href="https://umami.is" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                umami.is
              </a>.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">How We Use Information</h3>
            <p className="mb-6">
              The anonymized information we collect through Umami Analytics is used solely to:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Understand how visitors interact with our website</li>
              <li>Improve website performance and user experience</li>
              <li>Monitor website traffic and popular content</li>
              <li>Make informed decisions about website improvements</li>
            </ul>

            <h3 className="text-2xl font-bold mb-4 mt-8">Data Sharing</h3>
            <p className="mb-6">
              We do not sell, trade, or otherwise transfer your information to third parties. 
              The only exception is our use of Umami Analytics as described above, which processes data in a privacy-compliant manner.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Your Rights</h3>
            <p className="mb-6">
              Since we use privacy-focused analytics that don&apos;t collect personal data, there is no personal information to access, modify, or delete. 
              However, if you have any concerns about privacy or wish to contact us regarding this policy, please reach out to us.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Updates to This Policy</h3>
            <p className="mb-6">
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Contact Us</h3>
            <p className="mb-6">
              If you have any questions about this privacy policy or our privacy practices, please contact us through the information provided on our website.
            </p>

            <p className="text-sm text-gray-600 mt-8">
              <em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
