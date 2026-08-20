/**
 * Certificates published by the group at hxhdchemical.com/certificate/,
 * mirrored into public/images/certificates/.
 *
 * The source page carries no titles or captions — the tiles are images only —
 * so nothing is labelled here beyond its position. Inventing names for
 * patents and awards would be worse than leaving them unnamed: the documents
 * themselves are the claim, and a reader can open one to see what it says.
 */
export interface Certificate {
  /** Path under /public. */
  src: string;
  /** 1-based position, as ordered on the source page. */
  index: number;
}

export const CERTIFICATES: Certificate[] = Array.from({ length: 14 }, (_, i) => ({
  src: `/images/certificates/certificate-${String(i + 1).padStart(2, '0')}.jpg`,
  index: i + 1,
}));
