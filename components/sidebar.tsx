"use client";

import { Link } from "@heroui/react";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, LinkedInIcon, Logo } from "@/components/icons";
import { SponserButton } from "@/components/coffee";
import { HomeIcon } from "@heroicons/react/24/outline";

export function Sidebar() {
  return (
    <nav className="sticky z-40 h-screen backdrop-blur-lg">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between p-2">
            <Link
              className="flex items-center hover:shadow hover:shadow-foreground"
              href="/"
            >
              <Logo size={50} />
            </Link>
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
            </div>
          </div>
          <div className="flex flex-col gap-4 p-2">
            {siteConfig.navItems.map((item) => (
              <Link
                className={clsx(
                  "flex gap-4 active:font-mono, hover:bg-foreground/5",
                  "rounded-md w-full h-10 active:shadow active:shadow-foreground/50 hover:shadow-foreground",
                  "font-semibold hover:font-extrabold hover:text-foreground",
                  "text-foreground hover:text-accent transition-colors px-4",
                  "data-[active=true]:text-accent data-[active=true]:font-medium",
                )}
                href={item.href}
              >
                <div className="flex flex-col justify-center size-5">
                  <HomeIcon />
                </div>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <SponserButton />
      </div>
    </nav>
  );
}
