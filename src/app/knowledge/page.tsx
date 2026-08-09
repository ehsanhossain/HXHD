import type { Metadata } from 'next';
import { KnowledgeContent } from './KnowledgeContent';

export const metadata: Metadata = {
  title: 'Knowledge | HXHD Bangladesh',
  description:
    'Technical guides on emulsion chemistry and selection, plus company updates from Hongxing Hongda — including the Bangladesh plant investment.',
};

export default function Page() {
  return <KnowledgeContent />;
}
