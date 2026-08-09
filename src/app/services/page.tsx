import type { Metadata } from 'next';
import { ServicesContent } from './ServicesContent';

export const metadata: Metadata = {
  title: 'Services | HXHD Bangladesh',
  description:
    'Technical consultation, OEM and custom formulation, local supply from the BEPZA Mirsharai plant, documentation and after-sales support for Bangladesh manufacturers.',
};

export default function Page() {
  return <ServicesContent />;
}
