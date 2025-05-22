/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath: process.env.NODE_ENV === 'production' ? '/attarchi.github.io' : '',
    trailingSlash: true,
}

module.exports = nextConfig 