/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  poweredByHeader: false,
  images: {
    domains: ['localhost', 'vercel.app'],
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['readai.vercel.app', 'localhost:3000'],
    },
  },
  env: {
    NEXT_PUBLIC_VERSION: '1.0.0',
  },
};

module.exports = nextConfig;
