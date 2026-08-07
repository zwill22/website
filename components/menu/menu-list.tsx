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
        "border-foreground/10 shadow-foreground/20 rounded-xl border shadow",
        "bg-foreground/5 hover:bg-foreground/10 transition-colors hover:shadow",
        "hover:shadow-foreground/30 w-full",
      )}
      aria-label={menuItem.id}
    >
      <div className="flex max-h-28 w-full gap-2 p-2 md:max-h-52 md:gap-4 md:p-4">
        <div className="max-h-full w-1/4 md:max-h-full">
          <PreviewImage
            src={menuItem.image}
            description={menuItem.imageDescription}
          />
        </div>

        <div className="flex w-3/4 flex-col">
          <h2
            className={clsx(
              "font-heading line-clamp-2 overflow-hidden text-lg leading-6",
              "min-h-16 md:min-h-18 md:text-2xl md:leading-8",
            )}
          >
            {menuItem.title}
          </h2>
          <p className="my-auto h-8 leading-8">{dateString}</p>
          <p
            className={clsx(
              "text-foreground/70 line-clamp-3 hidden h-18 text-left italic md:flex",
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
