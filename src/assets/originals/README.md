# Original images

The uncompressed masters behind the WebP variants in `public/img/`.

**Source:** recovered from the CDN that served the previous deployment, which
was the only copy of these files. They are not referenced by application code —
the site loads the derived variants from `public/img/` — but they are the input
for regenerating those variants.

**Known limitation:** these are 1385–1824 px wide. They were already downscaled
by the upload pipeline before reaching that CDN (camera EXIF stripped; where
EXIF survives it records the downscaled size). The CDN serves no larger
rendition and has no resize API, so this is the highest resolution available
over the network. Full-bleed banners therefore upscale on HiDPI screens.
Pending: original files from the photographer.

**Regenerating the variants:** resize a master to each width listed for it in
`src/assets/image-variants.json` and encode at quality 85, keeping the exact
pixel dimensions recorded there:

    magick <master> -resize <W>x<H>! -quality 85 -define webp:method=6 public/img/<stem>-<W>.webp

`hero-athlete` is the one stem with a crop step before the resize. Its variants
are cut to the largest region centred on the two people, so that the hero can
hold them in the middle of the frame at any viewport with a plain
`object-position: center`:

    magick hero-athlete.jpg -crop 1320x910+0+13 +repage -resize <W>x<H>! \
      -quality 85 -define webp:method=6 public/img/hero-athlete-<W>.webp

Four stems have no master here (`angebot`, `lucas-vidal`, `profisport`,
`rico-andriessen`); they postdate the last deploy and exist only as variants.
