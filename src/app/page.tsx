import Brands from "@/components/Brands";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="px-4 flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">FireBIM</h1>
        <p className="text-lg sm:text-2xl mb-8">
          Accounting for fire safety engineering using Building Information Modelling
        </p>
        <a
          className="rounded-full bg-white text-blue-600 hover:bg-gray-200 transition-colors text-lg sm:text-xl py-3 px-8"
          href="#about"
        >
          Learn More
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="px-4 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">About</h2>
        <p className="text-center max-w-2xl mx-auto">
          The FireBIM platform relies on Building Information Modelling (BIM), Open Data standards, semantic data modelling, and web technologies specifically addressing international collaboration and computational interoperability. It resembles an interpreter, inspector, and validator of the regulations, thus also helping authorities facilitate and regulate fire safety more efficiently. Using FireBIM, design teams will be digitally assisted to create safer and better buildings cost-effectively. The FireBIM platform will purposefully be open source, providing the infrastructure for developers to bring the FireBIM concept to new countries and applications.
        </p><br></br>
        <p className="text-center max-w-2xl mx-auto">FireBIM gathers 22 partners from 5 countries committed to enabling fire safety engineering with faster, more precise, user-centred applications while supporting integration with other AEC standards and tools. The novel FireBIM technology stack will provide the most effective measures for minimising human risk as early as the building design process.</p>
      </section>

      {/* Aim Section */}
      <section id="aim" className="px-4 py-20 bg-gray-100">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Aim</h2>
        <p className="text-center max-w-2xl mx-auto">
          The FireBIM project aims to harmonize and implement the fire codes of the participating countries in an open-source, web-based BIM platform for fire safety assessment that facilitates (inter)national fire safety documentation and compliance from the early design stages. By relying on state-of-the-art web technologies, the platform suggests contextual fire safety improvements to early-stage design proposals based on the relevant national, regional, and local building codes.
        </p>
        <p className="text-center max-w-2xl mx-auto mt-4">
          As such, the goal of FireBIM is to develop a user-centred web-based platform to:
        </p>
        <ul className="list-disc list-inside max-w-2xl mx-auto mt-4">
          <li><strong>Enable</strong> the collective interpretation of fire regulations in all partner countries</li>
          <li><strong>Enable</strong> automated compliance checking of buildings against fire safety regulations</li>
          <li><strong>Reduce</strong> international barriers for building products and services</li>
          <li><strong>Reduce</strong> the barriers to international collaboration and fire safety design competition for Architecture, Engineering and Construction (AEC) companies</li>
        </ul>
      </section>

      {/* Partners Section */}
      <section id="partners" className="px-4 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Partners</h2>
        <p className="text-center max-w-2xl mx-auto">FireBIM gathers 22 partners from 5 countries committed to enabling fire safety engineering with faster, more precise, user-centred applications while supporting integration with other AEC standards and tools. </p>
        <div className="max-w-6xl mx-auto">
          <Brands />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-4 py-20 bg-gray-100">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">FAQ</h2>
        <div className="max-w-2xl mx-auto">
          <p>
            The FireBIM Platform relies on the extensible and modular FireBIM Ontology, that digitally harmonises the underlying concepts of the country-specific fire codes and transforms them into uniform, machine-readable representations (fire code kernels). These kernels, as well as core FireBIM services, can be used via the FireBIM Application Programming Interface (API). The FireBIM API is the interface between the core services and the different custom FireBIM Applications and platforms, relying on the reference architecture and developed inside or outside the project. The FireBIM Platform and FireBIM Applications forms the FireBIM Stack that builds on state-of-the-art web technologies. End users interact with specific FireBIM Applications through dedicated, tailored interfaces that ride atop the FireBIM Platform.
          </p>
          <h3 className="text-xl font-semibold mt-4">FireBIM for developers</h3>
          <p className="mt-2">FireBIM will enable software developers and vendors to access new markets by providing new software products and services to the various AEC domain experts and beyond. Software developers can provide standalone applications, add-ins to existing software and extensions to the FireBIM platform, virtual training experiences, analytical dashboards, and control interfaces.</p>

          <h3 className="text-xl font-semibold mt-4">FireBIM for Authorities</h3>
          <p className="mt-2">Authorities such as municipalities and fire departments can obtain a much faster insight into the building configuration and accelerate the discussions and decisions on building permits, exceptions, etc. That includes Digital Audit.</p>
        </div>
      </section>

    </main>
  );
}
