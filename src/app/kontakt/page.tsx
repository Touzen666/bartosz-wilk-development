import type { Metadata } from "next";
import { ContactForm } from "~/components/ContactForm";
import { canonical } from "~/lib/seo";
import { CONTACT_SNIPPET } from "~/data/content";
import { Breadcrumbs } from "~/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj się z Wilk Development: wycena domów szeregowych, remontów pod klucz lub współpraca. Odpowiadamy szybko.",
  alternates: { canonical: canonical("/kontakt") },
  openGraph: {
    url: canonical("/kontakt"),
    title: "Kontakt | Wilk Development",
    description:
      "Formularz kontaktowy Wilk Development. Wycena domów szeregowych i remontów pod klucz. Odpowiadamy w 24h.",
  },
};

export default function KontaktPage() {
  return (
    <div className="wp-section mx-auto max-w-2xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: "/" },
          { label: "Kontakt", href: "/kontakt" },
        ]}
      />
      <header>
        <h1 className="text-3xl font-bold text-charcoal">Kontakt</h1>
        <p className="mt-2 text-charcoal/80">
          Masz pytanie o domy szeregowe, remont pod klucz lub współpracę? Napisz do nas.
        </p>
      </header>

      <section className="mt-10" aria-labelledby="contact-info">
        <h2 id="contact-info" className="text-xl font-semibold text-charcoal">
          Dane kontaktowe
        </h2>
        <address className="mt-4 not-italic text-charcoal/90">
          <p>
            <strong>Wilk Development</strong>
          </p>
          <p>Usługi remontowo-budowlane</p>
          <p className="mt-1">
            Al. mjr. Aleja Majora Wacława Kopisto 11/193
            <br />
            35-315 Rzeszów
          </p>
          <p className="mt-2">
            Telefon:{" "}
            <a
              href={`tel:${CONTACT_SNIPPET.phone.replace(/\s/g, "")}`}
              className="text-amber hover:underline"
            >
              {CONTACT_SNIPPET.phone}
            </a>
          </p>
          <p>
            E-mail:{" "}
            <a
              href={`mailto:${CONTACT_SNIPPET.email}`}
              className="text-amber hover:underline"
            >
              {CONTACT_SNIPPET.email}
            </a>
          </p>
          <p className="mt-2">Godziny pracy: czynne całą dobę.</p>
        </address>
      </section>

      <section className="mt-10" aria-labelledby="form-heading">
        <h2 id="form-heading" className="text-xl font-semibold text-charcoal">
          Wyślij wiadomość
        </h2>
        <ContactForm />
      </section>
    </div>
  );
}
