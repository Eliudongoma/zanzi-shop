import noImage from "../assets/no-image.webp";

const getCroppedImage = (url: string) => {
  if (!url) return noImage;

  const target = "media/";
  const index = url.indexOf(target);
  if (index === -1) return url;
  // const index = url.indexOf(target)  + target.length;
  const newUrl =
    url.slice(0, index + target.length) +
    "crop/600/400/" +
    url.slice(index + target.length);

  return newUrl;
};
export default getCroppedImage;
