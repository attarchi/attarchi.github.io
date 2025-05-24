/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?
    '/' + process.env.NEXT_PUBLIC_BASE_PATH : '',
  trailingSlash: true,
}

module.exports = nextConfig 