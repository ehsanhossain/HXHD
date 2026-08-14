import type { Metadata } from 'next';
import { AboutContent } from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us | HXHD Bangladesh & Global',
  description:
    'Learn about Hubei Hongxing Hongda New Materials Co., Ltd. (HXHD) — 26+ years of polymer emulsion synthesis, multi-base manufacturing in China and Bangladesh, and export-grade chemical solutions.',
  openGraph: {
    title: 'About Us | HXHD Bangladesh & Global Manufacturing',
    description:
      '26+ years of polymer emulsion innovation, multi-base manufacturing in China and Bangladesh, and verified ISO quality control.',
    url: '/about',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'About HXHD' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | HXHD Bangladesh & Global',
    description:
      '26+ years of polymer emulsion synthesis, multi-base manufacturing in China and Bangladesh.',
    images: ['/images/og-image.jpg'],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
