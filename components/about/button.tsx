import { Button as HeroButton, Link as HeroLink } from "@heroui/react";
import clsx from "clsx";
import { ReactNode } from "react";

export function Link(props: {
  className?: string;
  children: ReactNode;
  href: string;
}) {
  const external = props.href.startsWith("http");
  const rel = external ? "noopener noreferrer" : undefined;
  const target = external ? "_blank" : undefined;

  return (
    <HeroLink
      className={clsx(
        "button",
        "bg-foreground/5 text-foreground shadow shadow-foreground/50",
        "hover:bg-foreground/10 hover:shadow-foreground hover:font-semibold",
        props.className,
      )}
      href={props.href}
      rel={rel}
      target={target}
    >
      {props.children}
    </HeroLink>
  );
}

export function Button(props: {
  className?: string;
  children: ReactNode;
  onPress?: () => void;
  isDisabled?: boolean;
  type?: any;
  variant?: any;
}) {
  const isDisabled = props.isDisabled ?? false;

  return (
    <HeroButton
      className={clsx(
        "button",
        "bg-foreground/5 text-foreground shadow shadow-foreground/50",
        "hover:bg-foreground/10 hover:shadow-foreground hover:font-semibold",
        props.className,
      )}
      onPress={props.onPress}
      isDisabled={isDisabled}
      type={props.type}
    >
      {props.children}
    </HeroButton>
  );
}

export function ButtonLabel(props: { children: string }) {
  return <p className="hidden md:inline w-18 text-center">{props.children}</p>;
}

export function ButtonContent(props: { children: ReactNode }) {
  return <div className="flex gap-2 md:w-24">{props.children}</div>;
}
