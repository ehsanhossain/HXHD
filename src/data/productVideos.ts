/**
 * Product demonstration videos, supplied by the company.
 *
 * Kept out of `products.ts` deliberately: that module is generated from the
 * group site's catalogue, and folding hand-matched assets into it would put
 * them at risk on the next regeneration.
 *
 * Matching is by name, not guesswork — each source file names the grade or the
 * full product title, so every entry below is a file whose name identified the
 * product outright. Products with no matching file simply have no videos, and
 * the section does not render.
 *
 * The short ids are deliberate: several product slugs run past 120 characters
 * and would make unwieldy filenames on an already deep Windows path.
 */
export interface ProductVideo {
  /** File stem under /videos/products/. */
  id: string;
}

/** Product slug to the videos that belong to it, in the order supplied. */
export const PRODUCT_VIDEOS: Record<string, ProductVideo[]> = {
  'waterproof-emulsion-hx-416-1-product': [{ id: '416a' }],
  'low-temperature-elastic-acrylic-and-styrene-waterproof-emulsion-hx416-for-thermal-insulation-mortar-and-cement-waterproof-coating':
    [{ id: '416m' }],
  'rust-conversion-agent-hxhd-800d': [{ id: '800d' }, { id: '800d-2' }],
  'anti-alkali-anti-cracking-and-anti-mould-waterproof-sand-fixing-agent-500a-500b': [
    { id: '500a-1' },
    { id: '500a-2' },
    { id: '500a-3' },
    { id: '500a-4' },
  ],
  // 500B had no film of its own until the company sent one; the 500A/500B
  // product above covers the pair, this covers the single grade.
  'sand-fixing-agent-500b': [{ id: '500b' }],
  'anti-oxidation-rust-converting-agent-800ab-to-convert-rust-into-primer-for-metal-surface':
    [{ id: '800ab' }],
  'pure-acrylic-textile-emulsion-hx929-for-high-grade-silk-cotton-and-dupont-cotton':
    [{ id: '929' }],
  'steel-iron-oxidation-resistant-and-rust-fixing-agent-900a-900b': [
    { id: '900ab' },
    { id: '900a' },
  ],
  'strong-and-reliable-ceramic-tile-adhesive-hx3086': [{ id: '3086' }],
  'transparent-waterproof-adhesive-hx-3088a-product': [{ id: '3088a' }],
};

export function videosFor(slug: string): ProductVideo[] {
  return PRODUCT_VIDEOS[slug] ?? [];
}

export const videoSrc = (id: string) => `/videos/products/${id}.mp4`;
export const videoPoster = (id: string) => `/videos/products/${id}.jpg`;
