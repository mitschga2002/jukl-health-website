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

The hero uses `hero-club` (desktop) and `hero-club-mobile` (phones and
tablets), two crops of one frame. That frame is the only one behind this
directory that did not come from the CDN — it is a 7081x4723 camera original
delivered by the photographer over WeTransfer as `5D4A6817.jpg`, and it is
**not stored in this repo** (21 MB). Ask for it again before regenerating
these two stems:

    magick 5D4A6817.jpg -crop 5134x3267+0+0 +repage -resize <W>x<H>! \
      -quality 85 -define webp:method=6 public/img/hero-club-<W>.webp

    magick 5D4A6817.jpg -crop 6120x4723+0+0 +repage -resize <W>x<H>! \
      -quality 85 -define webp:method=6 public/img/hero-club-mobile-<W>.webp

Both crops are anchored at the frame's top-left corner and trim only the right
edge (and, for the desktop crop, the floor at the bottom); they reproduce the
framing of the placeholder `test.png`/`test-mobile.png` they replaced.

`hero-athlete.jpg` is the earlier hero photo. Its variants have been deleted
and nothing references it any more; the master is kept only because this
directory is the last copy of these images. It can go too.

Four stems have no master here (`angebot`, `lucas-vidal`, `profisport`,
`rico-andriessen`); they postdate the last deploy and exist only as variants.
