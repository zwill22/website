import {
  CodeBracketIcon,
  HomeIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import {
  CodeBracketIcon as SolidCodeBracketIcon,
  HomeIcon as SolidHomeIcon,
  PencilIcon as SolidPencilIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "My site",
  description: "My beautiful website",
  navItems: [
    {
      label: "Home",
      href: "/",
      icon: HomeIcon,
      solidIcon: SolidHomeIcon,
    },
    {
      label: "About",
      href: "/about",
      icon: UserIcon,
      solidIcon: SolidUserIcon,
    },
    {
      label: "Blog",
      href: "/blog",
      icon: PencilIcon,
      solidIcon: SolidPencilIcon,
    },
    {
      label: "Projects",
      href: "/projects",
      icon: CodeBracketIcon,
      solidIcon: SolidCodeBracketIcon,
    },
  ],
  navMenuItems: [],
  links: {
    linkedin: "https://www.linkedin.com/in/zmwill",
    github: "https://github.com/zwill22",
    sponsor: "https://coff.ee/zmwill",
  },
};
