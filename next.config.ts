import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/zwill22/**",
      },
      {
        protocol: "https",
        hostname: "img.shields.io",
        pathname: "/badge/**",
      },
      {
        protocol: "https",
        hostname: "custom-icon-badges.demolab.com",
        pathname: "/badge/**",
      },
      {
        protocol: "https",
        hostname: "readthedocs.org",
        pathname: "/projects/*/badge/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/zwill22/*/actions/workflows/*/badge.svg",
      },
      
    ],
  },
};

export default config;
