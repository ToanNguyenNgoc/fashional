/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: ["api.fashional.pro", "admin.fashional.pro"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/danh-sach-villa",
  //       destination: "/villas",
  //     },
  //     {
  //       source: "/danh-sach-villa/:id",
  //       destination: "/villas/:id",
  //     },
  //   ];
  // },
};
