import { ContactHero } from '../components/contact/ContactHero';
import { ContactHQ } from '../components/contact/ContactHQ';
import { ContactServices } from '../components/contact/ContactServices';
import { ContactForm } from '../components/contact/ContactForm';
import { NewsletterStrip } from '../components/contact/NewsletterStrip';

export default function ContactPage() {
  return (
    <div className="bg-white">
      <ContactHero />
      <ContactHQ />
      <div className="h-px bg-slate-200 w-full max-w-screen-2xl mx-auto" />
      <div className="pt-16">
        <ContactServices />
      </div>
      <ContactForm />
      <NewsletterStrip />
    </div>
  );
}
