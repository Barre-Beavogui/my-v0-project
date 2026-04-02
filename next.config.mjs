/** @type {import('next').NextConfig} */
const nextConfig = {
  // enable static export for GitHub Pages (output: 'export')
  // Note: App Router pages that require server runtime or API routes won't work when exported.
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
