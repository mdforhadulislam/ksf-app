/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveExtensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  serverExternalPackages: ['mongodb', 'bcryptjs'],
};

export default nextConfig;
