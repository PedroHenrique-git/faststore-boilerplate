/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storeframework.vtexassets.com'],
  },
  webpack: (config, { isServer, dev }) => {
    // Reduce the number of chunks so we ship a smaller first bundle.
    // This should help reducing TBT
    if (!isServer && !dev && config.optimization?.splitChunks) {
      config.optimization.splitChunks.maxInitialRequests = 1;
    }

    return config;
  },
};

module.exports = nextConfig;
