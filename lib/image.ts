import imageSize from "@coderosh/image-size";

export function fetchImageSize(url: string) {
  return imageSize(url);
}
