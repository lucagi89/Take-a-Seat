import type { NextConfig } from "next";
import withPWA from 'next-pwa';

// const nextConfig: NextConfig = {};

// The following line redefines withPWA using require, causing conflicts
// const withPWA = require('next-pwa')({ ... });

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = withPWA({
  dest: 'public',
  disable: !isProd,
  register: true,
  skipWaiting: true,
})({
  reactStrictMode: true,
});

export default nextConfig;
