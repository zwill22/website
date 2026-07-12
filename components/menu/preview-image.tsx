import Image from "next/image";
import imageSize from "@coderosh/image-size";
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
      className="max-h-full object-contain"
    />
  );
}

async function RemoteImage(props: ImageProps) {
  const { height, width } = await imageSize(props.src);

  return (
    <Image
      src={props.src}
      alt={props.description}
      width={width}
      height={height}
      className="max-h-full object-contain"
    />
  );
}

export function PreviewImage(props: ImageProps) {
  const isRemote = props.src.startsWith("https");

  return (
    <div className="relative flex h-full w-full flex-col justify-center">
      {isRemote ? <RemoteImage {...props} /> : <LocalImage {...props} />}
    </div>
  );
}
