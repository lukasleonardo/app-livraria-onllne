import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./app'],
  },
  images: {
    domains: ['www.gutenberg.org'],
  },
};

export default nextConfig;
