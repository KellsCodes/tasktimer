/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*", // frontend calls /api/...
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*` //"http://localhost:8000/:path*", // actual backend
      },
    ];
  },
};

export default nextConfig;
