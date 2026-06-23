import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/zwill22/blogs/refs/heads/main/thumbnails/**",
        search: "",
      },
    ],
  },
};

export default config;
