import type { Metadata } from 'next';
import { IndustriesContent } from './IndustriesContent';

export const metadata: Metadata = {
  title: 'Industries | HXHD Bangladesh',
  description:
    'Emulsions and functional chemicals for Bangladesh RMG and textiles, construction, infrastructure, paint manufacturing, tile adhesives and anti-corrosion.',
};

export default function Page() {
  return <IndustriesContent />;
}
