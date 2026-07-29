/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@maven/ai-core', '@maven/ai-types', '@maven/utils', '@maven/stores'],
};
module.exports = nextConfig;
