/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*', // URL path that you want to rewrite
            destination: 'http://localhost:3001/:path*', // The external URL that you are redirecting to
          },
        ];
      },
};

export default nextConfig;
