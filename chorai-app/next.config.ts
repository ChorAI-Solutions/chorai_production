import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/f%C3%B6rderung",
        destination: "/foerderung",
        permanent: true,
      },
      {
        source: "/förderung",
        destination: "/foerderung",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
