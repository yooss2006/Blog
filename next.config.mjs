/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/": ["./public/blog/**/*"],
    },
  },
};

export default nextConfig;
