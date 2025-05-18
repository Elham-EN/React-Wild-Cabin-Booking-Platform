import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gayavyzkiqxzxfdicgjv.supabase.co",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // For Next.js 15+, use compiler options but not swcMinify
  compiler: {
    // This helps with styling libraries if you use them
    styledComponents: true,
  },
};

export default nextConfig;