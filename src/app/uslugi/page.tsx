import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "~/lib/seo";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { getCachedUslugi } from "~/lib/data-cache";

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
  const uslugi = await getCachedUslugi();

  return (
    <div className="wp-section mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: "/" },
          { label: "Usługi", href: "/uslugi" },
        ]}
      />
      <header>
        <h1 className="text-3xl font-bold text-charcoal">Usługi</h1>
        <p className="mt-2 text-charcoal/80">
          Oferujemy kompleksowe usługi budowlane i remontowe — od budowy tarasów i werand po wykończanie wnętrz i remonty pod klucz.
        </p>
      </header>

      <section className="mt-10" aria-labelledby="lista-uslug">
        <h2 id="lista-uslug" className="sr-only">
          Lista oferowanych usług
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
          Powiązane usługi
        </h2>
        <p className="mb-3 text-sm text-charcoal-soft">
          Remont łazienki łączy się z <Link href="/kontakt" className="text-amber hover:underline">instalacjami hydraulicznymi</Link> oraz <Link href="/kontakt" className="text-amber hover:underline">układaniem płytek w Rzeszowie</Link>. 
          Domy szeregowe i budowa od zera? Zobacz naszą ofertę <Link href="/" className="text-amber hover:underline">budowy domów szeregowych</Link> oraz <Link href="/" className="text-amber hover:underline">wykańczania wnętrz pod klucz</Link>.
        </p>
      </section>

      <p className="mt-10 text-center">
        <Link
          href="/kontakt"
          className="inline-block rounded-lg bg-amber px-6 py-3 font-medium text-white transition hover:bg-amber/90"
        >
          Wyceń remont lub budowę w Rzeszowie
        </Link>
      </p>
    </div>
  );
}
