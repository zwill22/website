import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { GithubIcon, LinkedInIcon } from "@/components/ui/icons";
import { MenuButton } from "@/components/ui/buttons";
import { LogoLink, SocialLink } from "@/components/links";
import clsx from "clsx";
import { Drawer } from "@heroui/react";
import { SponserButton } from "@/components/ui/coffee";
import { SideLink } from "@/components/sidebar/link";

function NavMenu() {
  return (
    <Drawer>
      <MenuButton />

      <Drawer.Backdrop variant="blur">
        <Drawer.Content placement="left">
          <Drawer.Dialog aria-label="navigation-menu">
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading className="font-heading">
                Navigation
              </Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body className="py-4">
              <nav className="flex flex-col gap-4 p-2">
                {siteConfig.navItems.map((item) => (
                  <SideLink key={item.label} item={item} />
                ))}
              </nav>
            </Drawer.Body>
            <Drawer.Footer className="flex justify-center">
              <SponserButton />
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

export function Navbar() {
  return (
    <nav
      className={clsx(
        "fixed top-0 z-40 w-full border-b border-separator shadow",
        "bg-background/70 backdrop-blur-lg",
      )}
    >
      <header
        className={clsx(
          "mx-auto flex h-16 max-w-6xl items-center justify-between",
          "gap-4 px-6",
        )}
      >
        <LogoLink />

        <div className="flex items-center gap-3">
          <SocialLink label="LinkedIn" href={siteConfig.links.linkedin}>
            <LinkedInIcon className="text-xl" />
          </SocialLink>
          <SocialLink label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-xl" />
          </SocialLink>
          <ThemeSwitch />
          <NavMenu />
        </div>
      </header>
    </nav>
  );
}
