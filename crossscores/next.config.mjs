/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/',
      },
    ]
  },
}

export default nextConfig;
