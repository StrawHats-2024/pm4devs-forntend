/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // URL path that you want to rewrite
        destination: 'http://159.89.173.5:3000/api/:path*', // Ensure the destination path is correct
      },
    ];
  },
};

export default nextConfig;