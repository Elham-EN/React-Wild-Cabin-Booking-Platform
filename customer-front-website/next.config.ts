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
  // Explicitly configure SWC to handle the conflict
  swcMinify: true,
  // For Next.js 13+, you need to specify compiler settings
  compiler: {
    // This disables SWC React optimization and adds the legacy code
    // to handle font/image imports
    styledComponents: true, // Enable if you're using styled-components
  },
};

export default nextConfig;