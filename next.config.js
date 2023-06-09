/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storeframework.vtexassets.com'],
  },
  experimental: {
    nextScriptWorkers: true,
  },
  async rewrites() {
    return [
      {
        source: '/vtex/api/:path*',
        destination: `https://storeframework.myvtex.com/api/:path*`,
      },
    ];
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev && config.optimization?.splitChunks) {
      config.optimization.splitChunks.maxInitialRequests = 1;
    }

    return config;
  },
};

module.exports = nextConfig;
