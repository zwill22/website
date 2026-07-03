import { Logo } from "@/components/ui/icons";
import { Link } from "@heroui/react";
import clsx from "clsx";
import { ReactNode } from "react";

export function GitHubLink(props: { href: string; label: string }) {
  return (
    <div className="flex flex-col justify-center">
      <Link
        className={clsx(
          "flex py-1 px-2 rounded-md gap-2 bg-(--github-black)",
          "shadow shadow-foreground/50 hover:ring hover:ring-foreground",
          "hover:ring-offset-1 hover:ring-offset-background",
        )}
        href={props.href}
        rel="noopener noreferrer"
        target="_blank"
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
