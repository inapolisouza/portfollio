/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: false,
  },
  // Configuração para produção na Vercel
  output: 'standalone',
}

module.exports = nextConfig



