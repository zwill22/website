import { ButtonRootProps, Button as HeroButton } from "@heroui/react";
import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonProps
  extends ButtonRootProps {
  isDisabled?: boolean
}

export function Button(props: ButtonProps) {
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
