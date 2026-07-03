import clsx from "clsx";
import { MenuItemData } from "@/lib/types";
import { Link } from "@/components/links";
import { PreviewImage } from "@/components/menu/preview-image";
import { getDateString } from "@/lib/date";
export function MenuItem(props: {
  key: string;
  itemData: MenuItemData;
  hrefRoot: string;
}) {
  const menuItem = props.itemData;
  const hrefRoot = props.hrefRoot;

  const dateString = getDateString(menuItem.date);

  return (
    <Link
      href={`${hrefRoot}/${menuItem.id}`}
      className={clsx(
        "border border-foreground/10 rounded-xl shadow shadow-foreground/20",
        "bg-foreground/5 hover:bg-foreground/10 transition-colors hover:shadow",
        "hover:shadow-foreground/30 w-full",
      )}
      aria-label={menuItem.id}
    >
      <div className="flex gap-2 md:gap-4 p-2 md:p-4 max-h-28 md:max-h-52 w-full">
        <div className="max-h-full md:max-h-full w-1/4">
          <PreviewImage
            src={menuItem.image}
            description={menuItem.imageDescription}
          />
        </div>

        <div className="flex flex-col w-3/4">
          <h2
            className={clsx(
              "font-heading text-lg overflow-hidden line-clamp-2 leading-6",
              "md:text-2xl min-h-16 md:min-h-18 md:leading-8",
            )}
          >
            {menuItem.title}
          </h2>
          <p className="leading-8 h-8 my-auto">{dateString}</p>
          <p
            className={clsx(
              "hidden md:flex text-left h-18 text-foreground/70 italic line-clamp-3",
            )}
          >
            {menuItem.preview}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function ListMenu(props: { items: MenuItemData[]; href: string }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-2 md:p-4">
        {props.items.map((item) => (
          <MenuItem key={item.id} itemData={item} hrefRoot={props.href} />
        ))}
      </div>
    </>
  );
}
