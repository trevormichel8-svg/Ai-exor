/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  api: {
    bodyParser: false, // required for Stripe
  },
};
module.exports = nextConfig;
