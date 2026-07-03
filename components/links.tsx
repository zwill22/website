import { Logo } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { Link as HeroLink } from "@heroui/react";
import clsx from "clsx";
import { ReactNode } from "react";

export function Link(props: {
  className?: string;
  href: string;
  children: ReactNode;
  "aria-label": string;
}) {
  const external = props.href.startsWith("http");
  const rel = external ? "noopener noreferrer" : undefined;
  const target = external ? "_blank" : undefined;

  return (
    <HeroLink
      className={props.className}
      href={props.href}
      rel={rel}
      target={target}
      aria-label={props["aria-label"]}
    >
      {props.children}
    </HeroLink>
  );
}

export function ButtonLink(props: {
  className?: string;
  children: ReactNode;
  href: string;
  "aria-label": string;
}) {
  return (
    <Link
      className={clsx(
        "button",
        "bg-foreground/5 text-foreground shadow shadow-foreground/50",
        "hover:bg-foreground/10 hover:shadow-foreground hover:font-semibold",
        props.className,
      )}
      href={props.href}
      aria-label={props["aria-label"]}
    >
      {props.children}
    </Link>
  );
}

function ContactLink(props: {
  href: string;
  children: ReactNode;
  "aria-label": string;
}) {
  return (
    <div className="flex flex-col justify-center">
      <ButtonLink
        className="flex py-1 px-2 rounded-md gap-2"
        href={props.href}
        aria-label={props["aria-label"]}
      >
        {props.children}
      </ButtonLink>
    </div>
  );
}

export function CVPdfLink() {
  const hrefPdf = `https://www.icloud.com/iclouddrive/0bc2fZznjWFeMF2oswPpiupoA#Zack_Williams_PhD_-_Curriculum_Vitae`;

  return (
    <ContactLink href={hrefPdf} aria-label="Link to PDF version of CV">
      <p className={clsx("font-bold text-nowrap text-sm")}>PDF Version</p>
      <div className="text-lg my-auto">
        <i className="bi bi-filetype-pdf" />
      </div>
    </ContactLink>
  );
}

function Email() {
  return (
    <ContactLink
      href="/about?showCompose=true#contactme"
      aria-label="Email link"
    >
      <div className="text-lg my-auto">
        <i className="bi bi-envelope" />
      </div>
      <p className={clsx("font-bold font-plain text-nowrap text-sm")}>
        Send Message
      </p>
    </ContactLink>
  );
}

function LinkedIn() {
  return (
    <ContactLink href={siteConfig.links.linkedin} aria-label="LinkedIn">
      <div className="text-lg my-auto">
        <i className="bi bi-linkedin" />
      </div>
      <p
        className={clsx(
          "font-bold font-plain text-nowrap text-sm text-right w-18",
        )}
      >
        LinkedIn
      </p>
    </ContactLink>
  );
}

function GitHub() {
  return (
    <ContactLink href={siteConfig.links.github} aria-label="LinkedIn">
      <div className="text-lg my-auto">
        <i className="bi bi-github" />
      </div>
      <p
        className={clsx(
          "font-bold font-plain text-nowrap text-sm text-right w-16",
        )}
      >
        GitHub
      </p>
    </ContactLink>
  );
}

function Phone() {
  return <></>;
}

export function ContactLinks() {
  return (
    <div className="flex w-full gap-4">
      <Email />
      <LinkedIn />
      <GitHub />
      <Phone />
    </div>
  );
}

export function GitHubLink(props: {
  href: string;
  label: string;
  "aria-label": string;
}) {
  return (
    <div className="flex flex-col justify-center">
      <Link
        className={clsx(
          "flex py-1 px-2 rounded-md gap-2 bg-(--github-black)",
          "shadow shadow-foreground/50 hover:ring hover:ring-foreground",
          "hover:ring-offset-1 hover:ring-offset-background",
        )}
        href={props.href}
        aria-label={props["aria-label"]}
      >
        <p
          className={clsx(
            "font-github text-white font-bold text-nowrap text-sm",
          )}
        >
          {props.label}
        </p>
        <div className="text-white text-lg">
          <i className="bi bi-github" />
        </div>
      </Link>
    </div>
  );
}

export function LogoLink() {
  return (
    <Link
      className={clsx(
        "flex items-center hover:shadow hover:shadow-foreground",
        "focus-visible:outline-0 focus-visible:ring-offset-background",
        "focus-visible:ring-foreground",
      )}
      href="/"
      aria-label="Home page link"
    >
      <Logo size={50} />
    </Link>
  );
}

export function SocialLink(props: {
  label: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      className={clsx(
        "px-1 focus-visible:ring-foreground focus-visible:rounded-lg",
        "focus-visible:ring-offset-background hover:opacity-80",
      )}
      aria-label={props.label}
      href={props.href}
    >
      {props.children}
    </Link>
  );
}
