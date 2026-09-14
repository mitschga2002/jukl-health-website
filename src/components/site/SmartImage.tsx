import variantsMap from "@/assets/image-variants.json";

type Variant = { url: string; width: number };
type Entry = { width: number; height: number; variants: Variant[] };

const MAP = variantsMap as Record<string, Entry>;

type SmartImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  src: string;
  alt: string;
  /** Above-the-fold image: loads eagerly with high priority. */
  priority?: boolean;
  /** CSS `sizes` hint. Defaults to full viewport width. */
  sizes?: string;
};

export function SmartImage({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  ...rest
}: SmartImageProps) {
  const entry = MAP[src];

  return (
    <img
      src={src}
      alt={alt}
      srcSet={entry ? entry.variants.map((v) => `${v.url} ${v.width}w`).join(", ") : undefined}
      sizes={entry ? sizes : undefined}
      width={entry?.width}
      height={entry?.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      {...rest}
    />
  );
}
