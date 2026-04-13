import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "~/lib/seo";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { getCachedSiteConfig } from "~/lib/data-cache";

export const revalidate = 3600;

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

export default async function WspolpracaPage() {
  const cfg = await getCachedSiteConfig();

  const heading         = cfg.wspolpraca_heading            ?? "Współpraca";
  const intro           = cfg.wspolpraca_intro              ?? "Szukamy rzetelnych podwykonawców i partnerów do długoterminowej współpracy.";
  const dlaKogo         = cfg.wspolpraca_dla_kogo           ?? "";
  const dlaKogoHeading  = cfg.wspolpraca_dla_kogo_heading   ?? "Dla kogo?";
  const kontaktText     = cfg.wspolpraca_kontakt            ?? "";
  const kontaktHeading  = cfg.wspolpraca_kontakt_heading    ?? "Jak się skontaktować";
  const kontaktCTA      = cfg.wspolpraca_kontakt_cta        ?? "Formularz kontaktowy";
  const oferujemyHeading = cfg.wspolpraca_oferujemy_heading ?? "Co oferujemy";
  const oferujemyRaw    = cfg.wspolpraca_oferujemy          ?? "[]";
  const oferujemy: string[] = (() => {
    try { return JSON.parse(oferujemyRaw) as string[]; }
    catch { return []; }
  })();
  const navHome     = cfg.nav_home      ?? "Strona główna";
  const navWsp      = cfg.nav_wspolpraca ?? "Współpraca";

  return (
    <div className="wp-section mx-auto max-w-3xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: navHome, href: "/" },
          { label: navWsp,  href: "/wspolpraca" },
        ]}
      />
      <header>
        <h1 className="text-3xl font-bold text-charcoal">{heading}</h1>
        <p className="mt-2 text-charcoal/80">{intro}</p>
      </header>

      <section className="mt-10 space-y-6 text-charcoal/90" aria-labelledby="dla-kogo">
        <h2 id="dla-kogo" className="text-xl font-semibold text-charcoal">
          {dlaKogoHeading}
        </h2>
        <p>{dlaKogo}</p>
      </section>

      <section className="mt-10 space-y-6 text-charcoal/90" aria-labelledby="korzysci">
        <h2 id="korzysci" className="text-xl font-semibold text-charcoal">
          {oferujemyHeading}
        </h2>
        <ul className="list-inside list-disc space-y-2">
          {oferujemy.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-6 text-charcoal/90" aria-labelledby="kontakt-wspolpraca">
        <h2 id="kontakt-wspolpraca" className="text-xl font-semibold text-charcoal">
          {kontaktHeading}
        </h2>
        <p>{kontaktText}</p>
        <Link
          href="/kontakt"
          className="inline-block rounded-lg bg-amber px-6 py-3 font-medium text-white transition hover:bg-amber/90"
        >
          {kontaktCTA}
        </Link>
      </section>
    </div>
  );
}
