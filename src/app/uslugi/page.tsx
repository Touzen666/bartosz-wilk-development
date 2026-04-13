import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "~/lib/seo";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { getCachedUslugi, getCachedSiteConfig } from "~/lib/data-cache";

export const revalidate = 3600; // ISR: regeneruj co 1 h

export const metadata: Metadata = {
  title: "Usługi",
  description:
    "Wilk Development: budowa tarasów i werand, remonty domów i mieszkań, malowanie, układanie płytek, montaż płyt gipsowo-kartonowych, wykończanie wnętrz i elewacji. Pełna lista usług.",
  alternates: { canonical: canonical("/uslugi") },
  openGraph: {
    url: canonical("/uslugi"),
    title: "Usługi | Wilk Development",
    description:
      "Budowa tarasów, remonty pod klucz, malowanie, układanie płytek, wykończanie wnętrz i elewacji. Pełna lista usług budowlanych i remontowych.",
  },
};

export default async function UslugiPage() {
  const [uslugi, cfg] = await Promise.all([getCachedUslugi(), getCachedSiteConfig()]);
  const heading        = cfg.uslugi_heading         ?? "Usługi";
  const uslugiIntro    = cfg.uslugi_intro           ?? "Oferujemy kompleksowe usługi budowlane i remontowe.";
  const relatedHeading = cfg.uslugi_related_heading ?? "Powiązane usługi";
  const relatedText    = cfg.uslugi_related_text    ?? "";
  const ctaText        = cfg.uslugi_cta             ?? "Wyceń remont lub budowę w Rzeszowie";
  const navHome        = cfg.nav_home               ?? "Strona główna";
  const navUslugi      = cfg.nav_uslugi             ?? "Usługi";

  return (
    <div className="wp-section mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: navHome,    href: "/" },
          { label: navUslugi,  href: "/uslugi" },
        ]}
      />
      <header>
        <h1 className="text-3xl font-bold text-charcoal">{heading}</h1>
        <p className="mt-2 text-charcoal/80">{uslugiIntro}</p>
      </header>

      <section className="mt-10" aria-labelledby="lista-uslug">
        <h2 id="lista-uslug" className="sr-only">
          {heading}
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {uslugi.map((nazwa: string) => (
            <li key={nazwa}>
              <span className="block rounded-lg border border-charcoal/10 bg-white px-4 py-3 text-charcoal shadow-sm">
                {nazwa}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="powiazane-heading">
        <h2 id="powiazane-heading" className="mb-4 text-lg font-semibold text-charcoal">
          {relatedHeading}
        </h2>
        <p className="mb-3 text-sm text-charcoal-soft">
          {relatedText}
        </p>
      </section>

      <p className="mt-10 text-center">
        <Link
          href="/kontakt"
          className="inline-block rounded-lg bg-amber px-6 py-3 font-medium text-white transition hover:bg-amber/90"
        >
          {ctaText}
        </Link>
      </p>
    </div>
  );
}
