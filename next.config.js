/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: [
      "api.fashional.pro",
      "admin.fashional.pro",
      "source.unsplash.com",
      "cdn.sanity.io",
      "api.myspa.vn"
    ],
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
      {
        source: "/profile/:slug",
        destination: "/profile/:slug",
      },
      {
        source: "/profile/address/:id",
        destination: "/profile/address",
      },
      {
        source: "/profile/address/new",
        destination: "/profile/address",
      },
    ];
  },
};
