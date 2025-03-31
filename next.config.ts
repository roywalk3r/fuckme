import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cloud.appwrite.io',
      'localhost',
      'placeholder.svg'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
