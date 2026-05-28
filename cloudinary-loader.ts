export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // For Cloudinary URLs: inject Cloudinary transformation params so the image
  // is resized on Cloudinary's CDN instead of being proxied through Next.js.
  if (src.startsWith("https://res.cloudinary.com")) {
    const params = `f_auto,c_limit,w_${width},q_${quality ?? "auto"}`;
    return src.replace("/upload/", `/upload/${params}/`);
  }
  // For local / other images return the src unchanged (served by Next.js directly).
  return src;
}
