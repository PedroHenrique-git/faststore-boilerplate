/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    nextScriptWorkers: true,
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev && config.optimization?.splitChunks) {
      config.optimization.splitChunks.maxInitialRequests = 1;
    }

    return config;
  },
};

module.exports = nextConfig;
