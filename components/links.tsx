import { Logo } from "@/components/icons";
import { Link } from "@heroui/react";
import clsx from "clsx";
import { ReactNode } from "react";

export function LogoLink() {
  return (
    <Link
      className={clsx(
        "flex items-center hover:shadow hover:shadow-foreground",
        "focus-visible:outline-0 focus-visible:ring-offset-background",
        "focus-visible:ring-foreground",
      )}
      href="/"
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
      rel="noopener noreferrer"
      target="_blank"
    >
      {props.children}
    </Link>
  );
}
