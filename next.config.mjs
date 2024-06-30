/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.cycleworld.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
    ],
  },
  redirects: async () => {
    return [];
  },
};

export default nextConfig;
