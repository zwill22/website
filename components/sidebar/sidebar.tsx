import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { GithubIcon, LinkedInIcon } from "@/components/ui/icons";
import { SponsorButton } from "@/components/ui/coffee";
import { LogoLink, SocialLink } from "@/components/links";
import { SideLink } from "@/components/sidebar/link";
import clsx from "clsx";

export function Sidebar() {
  return (
    <nav
      className={clsx(
        "bg-background/70 top-0 left-0 z-40 h-dvh backdrop-blur-lg border-r shadow",
      )}
    >
      <div className="flex h-full flex-col justify-between">
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
        <div className="mx-auto px-2 py-4">
          <SponsorButton />
        </div>
      </div>
    </nav>
  );
}
