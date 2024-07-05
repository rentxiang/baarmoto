/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['*'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  redirects: async () => {
    return [];
  },
};

export default nextConfig;
