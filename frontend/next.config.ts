/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

   images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "c8.alamy.com" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "t3.ftcdn.net" },
       { protocol: "https", hostname: "static.vecteezy.com" },
       { protocol: "https", hostname: "www.shutterstock.com" },
        { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;