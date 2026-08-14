import type { Metadata } from 'next';
import { CareerContent } from './CareerContent';

export const metadata: Metadata = {
  title: 'Careers | HXHD Bangladesh & International',
  description:
    'Explore career opportunities in polymer formulation R&D, chemical engineering, technical sales, and plant operations at Hubei Hongxing Hongda New Materials.',
  openGraph: {
    title: 'Careers at HXHD | Shape the Future of Materials Science',
    description:
      'Join our growing chemical manufacturing group with opportunities in Dhaka, Mirsharai BEPZA Economic Zone, and international operations.',
    url: '/career',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Careers at HXHD' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | HXHD Bangladesh & International',
    description:
      'Explore career opportunities in polymer formulation R&D, chemical engineering, and technical sales.',
    images: ['/images/og-image.jpg'],
  },
};

export default function CareerPage() {
  return <CareerContent />;
}
