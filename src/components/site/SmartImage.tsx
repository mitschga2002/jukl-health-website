import variantsMap from "@/assets/image-variants.json";

type Variant = { url: string; width: number };
type Entry = { width: number; height: number; variants: Variant[]; avif?: Variant[] };

const MAP = variantsMap as Record<string, Entry>;

type SmartImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  src: string;
  alt: string;
  /** Above-the-fold image: loads eagerly with high priority. */
  priority?: boolean;
  /** CSS `sizes` hint. Defaults to full viewport width. */
  sizes?: string;
};

const srcSet = (list: Variant[]) => list.map((v) => `${v.url} ${v.width}w`).join(", ");

export function SmartImage({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  ...rest
}: SmartImageProps) {
  const entry = MAP[src];

  const img = (
    <img
      src={src}
      alt={alt}
      srcSet={entry ? srcSet(entry.variants) : undefined}
      sizes={entry ? sizes : undefined}
      width={entry?.width}
      height={entry?.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      {...rest}
    />
  );

  /* Stems that have an AVIF ladder in the manifest are served through
     `<picture>`, with the WebP ladder left on the `<img>` as the fallback for
     browsers that cannot decode AVIF. `display: contents` keeps the wrapper
     out of the box tree, so callers can go on sizing the image with classes
     like `h-full w-full` that resolve against the real parent. */
  if (!entry?.avif) return img;

  return (
    <picture className="contents">
      <source type="image/avif" srcSet={srcSet(entry.avif)} sizes={sizes} />
      {img}
    </picture>
  );
}
