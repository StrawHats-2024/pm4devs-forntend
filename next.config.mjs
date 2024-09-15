/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // URL path that you want to rewrite
        destination: 'http://localhost:3001/api/v1/:path*', // Ensure the destination path is correct
      },
    ];
  },
};

export default nextConfig;