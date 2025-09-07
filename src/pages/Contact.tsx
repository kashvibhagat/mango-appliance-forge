import { useEffect } from 'react';
import { Card } from '@/components/ui/card';

const Contact = () => {
  // SEO: title, meta description, canonical, JSON-LD
  useEffect(() => {
    const title = 'Contact Us | Mango Appliances';
    const description = 'Get in touch with Mango Appliances for support, sales, and service. India and International contact details, phone numbers, and email addresses.';
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Canonical
    const canonicalHref = `${window.location.origin}/contact`;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);

    // JSON-LD structured data
    const scriptId = 'ld-contact-json';
    let ld = document.getElementById(scriptId);
    if (ld) ld.remove();
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: title,
      url: canonicalHref,
      about: {
        '@type': 'Organization',
        name: 'Mango Appliances (Rishika Industries Limited)',
        url: 'https://mangoappliances.com',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91-8804048811',
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: 'en'
          },
          {
            '@type': 'ContactPoint',
            telephone: '18001200670',
            contactType: 'toll-free',
            areaServed: 'IN',
            availableLanguage: 'en'
          }
        ],
        email: 'info@mangoappliances.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Survey No. 1816, Old Survey No.26.3.P3, Nargol Road, Manda, Valsad',
          addressLocality: 'Valsad',
          addressRegion: 'Gujarat',
          postalCode: '396155',
          addressCountry: 'IN'
        }
      }
    });
    document.head.appendChild(script);

    return () => {
      // optional cleanup
    };
  }, []);

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Contact Us</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          We’re here to help. Reach Mango Appliances for support, service inquiries, and international contacts.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground">India</h2>
          <address className="not-italic mt-3 text-sm text-muted-foreground">
            <strong className="text-foreground">Rishika Industries Limited.</strong><br />
            Survey No. 1816, Old Survey No.26.3.P3,<br />
            Nargol Road, Manda, Valsad,<br />
            Gujarat, India. Pin: 396155
          </address>
          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="text-foreground font-medium">Mobile:</span>{' '}
              <a className="text-accent underline underline-offset-4" href="tel:+918804048811">+91 880 404 8811</a>
            </p>
            <p>
              <span className="text-foreground font-medium">Email:</span>{' '}
              <a className="text-accent underline underline-offset-4" href="mailto:info@mangoappliances.com">info@mangoappliances.com</a>
            </p>
            <p>
              <span className="text-foreground font-medium">Toll free:</span>{' '}
              <a className="text-accent underline underline-offset-4" href="tel:18001200670">1800 1200 670</a>
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground">International</h2>
          <address className="not-italic mt-3 text-sm text-muted-foreground">
            <strong className="text-foreground">Rishika Industries Limited.</strong><br />
            6th Floor, Swati Clover,<br />
            Shilaj Circle, S.P. Ring Rd, Nr. Thaltej Flyover,<br />
            Ahmedabad, Gujarat – 380054, India
          </address>
          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="text-foreground font-medium">Email:</span>{' '}
              <a className="text-accent underline underline-offset-4" href="mailto:biju.v@mangoappliances.com">biju.v@mangoappliances.com</a>
            </p>
          </div>
        </Card>
      </section>

      <section className="mt-10">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground">Customer Support</h2>
          <p className="text-sm text-muted-foreground mt-2">
            For product support or warranty queries, please contact us via phone or email. Our team will get back to you promptly.
          </p>
        </Card>
      </section>
    </main>
  );
};

export default Contact;
