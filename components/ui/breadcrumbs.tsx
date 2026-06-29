import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { Breadcrumbs, Link } from "@heroui/react";
import clsx from "clsx";

interface Crumb {
  name: string;
  href: string;
}

export function PageBreadcrumbs(props: {
  crumbs: Crumb[];
  back: string;
  current: string;
}) {
  return (
    <div className="flex gap-2 max-w-4xl w-full">
      <Link className="py-2" href={props.back}>
        <div
          className={clsx(
            "flex flex-col size-5 text-foreground hover:text-foreground/80",
            "hover:ring hover:ring-foreground rounded-full m-1",
          )}
        >
          <ArrowUturnLeftIcon />
        </div>
      </Link>
      <div className="flex flex-col max-w-4xl w-full text-left justify-center">
        <Breadcrumbs>
          {props.crumbs.map((crumb) => (
            <Breadcrumbs.Item href={crumb.href}>{crumb.name}</Breadcrumbs.Item>
          ))}
          <Breadcrumbs.Item>{props.current}</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
    </div>
  );
}
