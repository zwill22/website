"use client";

import { Link } from "@heroui/react";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, LinkedInIcon, Logo } from "@/components/icons";
import { SponserButton } from "@/components/coffee";
import { usePathname } from "next/navigation";
import { LogoLink, SocialLink } from "@/components/links";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface Item {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & RefAttributes<SVGSVGElement>
  >;
  solidIcon: ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & RefAttributes<SVGSVGElement>
  >;
}

function SideLink(props: { item: Item }) {
  const item = props.item;

  const pathname = usePathname();
  const isActive = pathname == item.href;

  return (
    <Link
      className={clsx(
        "flex gap-4 rounded-md w-full h-10 hover:shadow-foreground",
        "font-semibold text-foreground transition-colors px-4",
        isActive
          ? "shadow shadow-foreground/20 bg-foreground/5 hover:shadow-foreground/30"
          : "hover:bg-foreground/5 hover:shadow hover:shadow-foreground/40 hover:font-extrabold hover:text-foreground",
      )}
      key={item.label}
      href={item.href}
      aria-label={item.label}
    >
      <div className="flex flex-col justify-center size-5">
        {isActive ? <item.solidIcon /> : <item.icon />}
      </div>
      {item.label}
    </Link>
  );
}

export function Sidebar() {
  return (
    <nav className="sticky z-40 h-svh backdrop-blur-lg">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between p-2">
            <LogoLink />
            <div className="flex items-center gap-4">
              <SocialLink label="LinkedIn" href={siteConfig.links.linkedin}>
                <LinkedInIcon className="text-xl" />
              </SocialLink>
              <SocialLink label="Github" href={siteConfig.links.github}>
                <GithubIcon className="text-xl" />
              </SocialLink>
              <ThemeSwitch />
            </div>
          </div>
          <div className="flex flex-col gap-4 p-2">
            {siteConfig.navItems.map((item) => (
              <SideLink key={item.label} item={item} />
            ))}
          </div>
        </div>
        <div className="flex flex-col px-2 py-4">
          <SponserButton />
        </div>
      </div>
    </nav>
  );
}
