/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

   images: {
    remotePatterns: [
        {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/assets/**",
      },
      {
        protocol: "http",
        hostname: "16.171.250.82",
        port: "5000",
        pathname: "/**",
      },
         {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'clarity-cosmos-roadmap-videos-pdfs.s3.us-east-1.amazonaws.com',
        pathname: '/**',
      },
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