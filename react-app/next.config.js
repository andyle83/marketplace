module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com', 'marketplacecelo.s3.ap-southeast-2.amazonaws.com'],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      child_process: false,
      readline: false,
    };
    return config;
  },
}
