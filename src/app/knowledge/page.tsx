import type { Metadata } from 'next';
import { KnowledgeContent } from './KnowledgeContent';

export const metadata: Metadata = {
  title: 'Knowledge Hub & Technical Guides | HXHD Bangladesh',
  description:
    'Technical guides on emulsion chemistry and selection, formulation guides, plus company updates from Hongxing Hongda — including the Bangladesh plant investment.',
  openGraph: {
    title: 'Knowledge Hub & Technical Guides | HXHD Bangladesh',
    description:
      'In-depth technical guides on polymer emulsion chemistry, selection criteria, and formulating for durability in tropical climates.',
    url: '/knowledge',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'HXHD Knowledge Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge Hub & Technical Guides | HXHD',
    description:
      'Technical guides on emulsion chemistry, formulation, and industry insights.',
    images: ['/images/og-image.jpg'],
  },
};

export default function Page() {
  return <KnowledgeContent />;
}
