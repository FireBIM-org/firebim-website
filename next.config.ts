import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  // Folder-style URLs so that page HTML (e.g. /documentation/ontologies/index.html)
  // can coexist with the static registry files under public/documentation/ontologies/.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
