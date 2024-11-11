/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/v1/:path*', // URL path that you want to rewrite
        destination: 'http://68.183.90.31:3000/v1/:path*', // Ensure the destination path is correct
      },
    ];
  },
};

export default nextConfig;