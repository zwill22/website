"use client";

import { Link } from "@heroui/react";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, LinkedInIcon, Logo } from "@/components/icons";
import { SponserButton } from "@/components/coffee";
import { MenuButton } from "@/components/buttons";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-4">
          <Link className="flex items-center hover:shadow hover:shadow-foreground" href="/">
            <Logo size={50} />
          </Link>
          <ul className="hidden lg:flex gap-4 ml-2">
            {siteConfig.navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className={clsx(
                    "text-foreground hover:text-accent transition-colors",
                    "data-[active=true]:text-accent data-[active=true]:font-medium",
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <Link
            aria-label="LinkedIn"
            href={siteConfig.links.linkedin}
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkedInIcon className="text-xl hover:opacity-80" />
          </Link>
          <Link
            aria-label="Github"
            href={siteConfig.links.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            <GithubIcon className="text-xl hover:opacity-80" />
          </Link>
          <ThemeSwitch />
          <MenuButton />
        </div>
      </header>
    </nav>
  );
}
