const nextConfig = {
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
  // Keep any other existing configuration
}

export default nextConfig

