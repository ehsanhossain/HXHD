import type { Metadata } from 'next';
import { Hero } from './components/Hero';
import { SearchStrip } from './components/SearchStrip';
import { SolutionsAndProducts } from './components/SolutionsAndProducts';
import { CredibilityAndCTA } from './components/CredibilityAndCTA';
import { ResourcesAndInsights } from './components/ResourcesAndInsights';

export const metadata: Metadata = {
  title: 'HXHD | Emulsion & Functional Chemical Solutions That Perform',
  description:
    'R&D-driven manufacturer of polymer emulsions, waterproofing systems, coating emulsions and functional additives — engineered for consistent formulation performance and export-ready supply.',
  openGraph: {
    title: 'HXHD | Emulsion & Functional Chemical Solutions That Perform',
    description:
      'R&D-driven manufacturer of polymer emulsions, waterproofing systems, coating emulsions and functional additives with multi-base production in China and Bangladesh.',
    url: '/',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'HXHD Chemical Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HXHD | Emulsion & Functional Chemical Solutions That Perform',
    description:
      'R&D-driven manufacturer of polymer emulsions, waterproofing systems, and functional chemical additives.',
    images: ['/images/og-image.jpg'],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchStrip />
      <SolutionsAndProducts />
      <CredibilityAndCTA />
      <ResourcesAndInsights />
    </>
  );
}
