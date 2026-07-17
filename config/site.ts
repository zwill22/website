export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ZMWill",
  description: "ZMWill's website, for sharing my work",
  logo: "/logo.svg",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Projects",
      href: "/projects",
    },
  ],
  navMenuItems: [],
  links: {
    linkedin: "https://www.linkedin.com/in/zmwill",
    github: "https://github.com/zwill22",
    sponsor: "https://coff.ee/zmwill",
  },
};
