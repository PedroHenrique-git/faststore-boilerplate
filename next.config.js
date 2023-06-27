/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storeframework.vtexassets.com'],
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
