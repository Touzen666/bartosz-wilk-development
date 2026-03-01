import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "~/lib/seo";
import { Breadcrumbs } from "~/components/Breadcrumbs";

export const revalidate = 86400; // statyczna – regeneruj raz na dobę

export const metadata: Metadata = {
  title: "Współpraca",
  description:
    "Zapraszamy podwykonawców i partnerów do współpracy z Wilk Development. Stałe zlecenia, terminowe płatności.",
  alternates: { canonical: canonical("/wspolpraca") },
  openGraph: {
    url: canonical("/wspolpraca"),
    title: "Współpraca | Wilk Development",
    description:
      "Współpraca z Wilk Development: stałe zlecenia, terminowe płatności. Domy szeregowe i remonty pod klucz.",
  },
};

export default function WspolpracaPage() {
  return (
    <div className="wp-section mx-auto max-w-3xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: "/" },
          { label: "Współpraca", href: "/wspolpraca" },
        ]}
      />
      <header>
        <h1 className="text-3xl font-bold text-charcoal">Współpraca</h1>
        <p className="mt-2 text-charcoal/80">
          Szukamy rzetelnych podwykonawców i partnerów do długoterminowej współpracy.
        </p>
      </header>

      <section className="mt-10 space-y-6 text-charcoal/90" aria-labelledby="dla-kogo">
        <h2 id="dla-kogo" className="text-xl font-semibold text-charcoal">
          Dla kogo?
        </h2>
        <p>
          Współpracujemy z ekipami budowlanymi, elektrykami, hydraulikami, dekarzami,
          tynkarzami, posadzkarzami oraz firmami wykończeniowymi. Liczy się
          terminowość, jakość i uczciwa wycena.
        </p>
      </section>

      <section className="mt-10 space-y-6 text-charcoal/90" aria-labelledby="korzysci">
        <h2 id="korzysci" className="text-xl font-semibold text-charcoal">
          Co oferujemy
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>Stałe zlecenia przy realizacji domów szeregowych i remontów</li>
          <li>Terminowe płatności zgodnie z umową</li>
          <li>Jasne zakresy prac i harmonogramy</li>
          <li>Możliwość długoterminowej współpracy</li>
        </ul>
      </section>

      <section className="mt-10 space-y-6 text-charcoal/90" aria-labelledby="kontakt-wspolpraca">
        <h2 id="kontakt-wspolpraca" className="text-xl font-semibold text-charcoal">
          Jak się skontaktować
        </h2>
        <p>
          Napisz do nas w wiadomości podając: branżę, zakres usług, rejon działania
          oraz preferowany kontakt. Odpowiadamy w ciągu kilku dni roboczych.
        </p>
        <Link
          href="/kontakt"
          className="inline-block rounded-lg bg-amber px-6 py-3 font-medium text-white transition hover:bg-amber/90"
        >
          Formularz kontaktowy
        </Link>
      </section>
    </div>
  );
}
