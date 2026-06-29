"use client";

import { Link } from "@heroui/react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  CodeBracketIcon,
  HomeIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import {
  CodeBracketIcon as SolidCodeBracketIcon,
  HomeIcon as SolidHomeIcon,
  PencilIcon as SolidPencilIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";

interface Item {
  label: string;
  href: string;
}

function getIcons(label: string) {
  if (label === "Home") {
    return { SolidIcon: SolidHomeIcon, Icon: HomeIcon };
  }

  if (label == "About") {
    return { SolidIcon: SolidUserIcon, Icon: UserIcon };
  }

  if (label == "Blog") {
    return { SolidIcon: SolidPencilIcon, Icon: PencilIcon };
  }

  return { SolidIcon: SolidCodeBracketIcon, Icon: CodeBracketIcon };
}

function pathIsActive(currentPath: string, itemPath: string) {
  if (itemPath !== "/") {
    return currentPath.startsWith(itemPath);
  }

  return currentPath === itemPath;
}

export function SideLink(props: { item: Item }) {
  const item = props.item;

  const pathname = usePathname();
  const isActive = pathIsActive(pathname, item.href);

  const { SolidIcon, Icon } = getIcons(item.label);

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
        {isActive ? <SolidIcon /> : <Icon />}
      </div>
      {item.label}
    </Link>
  );
}
