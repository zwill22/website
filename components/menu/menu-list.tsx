import Image from "next/image";
import clsx from "clsx";
import { MenuItemData } from "@/lib/types";
import { fetchImageSize } from "@/lib/image";
import { imageSizeFromFile } from "image-size/fromFile";
import { Link } from "@/components/links";

function getMonth(n: number) {
  switch (n + 1) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      throw new Error("Invalid month");
  }
}

function getDateString(date: Date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const fullMonth = getMonth(month);

  return `${day} ${fullMonth} ${year}`;
}

interface ImageProps {
  src: string;
  description: string;
}

async function LocalImage(props: ImageProps) {
  const imageFile = props.src;
  const imagePath = `./public/${imageFile}`;
  const imageSrc = `/${imageFile}`;

  const dimensions = await imageSizeFromFile(imagePath);

  return (
    <Image
      src={imageSrc}
      alt={props.description}
      width={dimensions.width}
      height={dimensions.height}
      className="object-contain max-h-full"
    />
  );
}

async function RemoteImage(props: ImageProps) {
  const imageSize = await fetchImageSize(props.src);

  return (
    <Image
      src={props.src}
      alt={props.description}
      width={imageSize.width}
      height={imageSize.height}
      className="object-contain max-h-full"
    />
  );
}

function PreviewImage(props: ImageProps) {
  const isRemote = props.src.startsWith("https");

  return (
    <div className="flex flex-col h-full w-full relative justify-center">
      {isRemote ? <RemoteImage {...props} /> : <LocalImage {...props} />}
    </div>
  );
}

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
              "font-heading text-lg overflow-hidden line-clamp-2 leading-5",
              "md:text-2xl min-h-16 md:min-h-18 leading-6 md:leading-8",
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
