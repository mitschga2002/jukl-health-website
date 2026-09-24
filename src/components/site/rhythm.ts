/*
 * One vertical rhythm for the whole site. Every module — light section, dark
 * slab, ticker — carries half the gap above and below itself, so any two
 * neighbours sit exactly one gap apart (80px, 128px from lg) whatever their
 * kind. Slabs carry it outside their rounded card; the seamless last slab and
 * the footer take it as a top margin, since nothing follows them.
 */
export const SECTION_Y = "py-10 lg:py-16";
/** The same half-gap as a top margin, for the seamless slab and the footer. */
export const MODULE_TOP = "mt-10 lg:mt-16";
