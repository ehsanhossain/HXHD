import type { Metadata } from 'next';
import { ServicesContent } from './ServicesContent';

export const metadata: Metadata = {
  title: 'Technical Services & Custom Formulation | HXHD Bangladesh',
  description:
    'Technical consultation, OEM and custom formulation, local supply from the BEPZA Mirsharai plant, documentation and after-sales support for Bangladesh manufacturers.',
  openGraph: {
    title: 'Technical Services & Custom Formulation | HXHD Bangladesh',
    description:
      'Direct chemical engineering support, OEM contract manufacturing, and local supply from the BEPZA Mirsharai plant.',
    url: '/services',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'HXHD Technical Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Services & Custom Formulation | HXHD Bangladesh',
    description:
      'Technical consultation, OEM and custom formulation, local supply from the BEPZA Mirsharai plant.',
    images: ['/images/og-image.jpg'],
  },
};

export default function Page() {
  return <ServicesContent />;
}
