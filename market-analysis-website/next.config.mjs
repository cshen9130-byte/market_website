/** @type {import('next').NextConfig} */
const nextConfig = {
  // Speed up builds on constrained hosts
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  experimental: {
    // Avoid Turbopack scanning the whole parent workspace
    turbo: { rootDirectory: __dirname },
    // Limit output tracing scope to this app
    outputFileTracingRoot: __dirname,
  },
}

export default nextConfig
