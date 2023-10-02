/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: ["api.fashional.pro", "admin.fashional.pro"],
  },
  async rewrites() {
    return [
      {
        source: "/danh-sach-san-pham",
        destination: "/products",
      },
      {
        source: "/san-pham/:id",
        destination: "/products/:id",
      },
    ];
  },
};
