import type { Metadata } from 'next';
import { ContactHero } from '../components/contact/ContactHero';
import { ContactHQ } from '../components/contact/ContactHQ';
import { ContactServices } from '../components/contact/ContactServices';
import { ContactForm } from '../components/contact/ContactForm';
import { NewsletterStrip } from '../components/contact/NewsletterStrip';

export const metadata: Metadata = {
  title: 'Contact & Schedule Consultation | HXHD Bangladesh',
  description:
    'Contact the HXHD technical and sales team or book an appointment for sample requests, custom emulsion formulation, documentation (TDS), and supply inquiries.',
  openGraph: {
    title: 'Contact HXHD | Technical Consultation & Sample Requests',
    description:
      'Send an enquiry, schedule an appointment, or speak directly with our chemical formulation specialists in Dhaka and Mirsharai.',
    url: '/contact',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Contact HXHD' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & Schedule Consultation | HXHD Bangladesh',
    description:
      'Contact the HXHD technical team for sample requests, formulation advice, and supply inquiries.',
    images: ['/images/og-image.jpg'],
  },
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <ContactHero />
      <ContactHQ />
      <ContactServices />
      <ContactForm />
      <NewsletterStrip />
    </div>
  );
}
