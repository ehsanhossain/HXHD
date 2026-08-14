import type { Metadata } from 'next';
import { IndustriesContent } from './IndustriesContent';

export const metadata: Metadata = {
  title: 'Industries We Serve | HXHD Bangladesh & Regional Manufacturing',
  description:
    'Emulsions and functional chemicals for Bangladesh RMG and textiles, construction, infrastructure, paint manufacturing, tile adhesives and anti-corrosion.',
  openGraph: {
    title: 'Industries We Serve | HXHD Bangladesh & Regional Manufacturing',
    description:
      'Materials and polymer emulsions engineered for RMG textiles, construction waterproofing, roads, coatings, and tile adhesives.',
    url: '/industries',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'HXHD Industries We Serve' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries We Serve | HXHD Bangladesh',
    description:
      'Emulsions and functional chemicals for Bangladesh RMG textiles, construction, infrastructure, and paint manufacturing.',
    images: ['/images/og-image.jpg'],
  },
};

export default function Page() {
  return <IndustriesContent />;
}
