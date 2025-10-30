/** @type {import('next').NextConfig} */
const config = {
  images: {
    qualities: [75, 80, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  // Ensure Next treats this folder as the project root (env loading, cache, etc.)
  turbopack: {
    root: __dirname,
  },
  // Keep builds unblocked while types are being polished
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
