import Image from "next/image";
import { fetchImageSize } from "@/lib/image";
import { imageSizeFromFile } from "image-size/fromFile";

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

export function PreviewImage(props: ImageProps) {
  const isRemote = props.src.startsWith("https");

  return (
    <div className="flex flex-col h-full w-full relative justify-center">
      {isRemote ? <RemoteImage {...props} /> : <LocalImage {...props} />}
    </div>
  );
}
