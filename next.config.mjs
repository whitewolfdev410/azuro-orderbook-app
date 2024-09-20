/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-avatars.azuro.org',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.azuro.org',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
