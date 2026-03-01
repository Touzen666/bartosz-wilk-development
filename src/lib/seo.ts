/**
 * Central SEO config. Set BASE_URL to your production domain before deploy.
 */
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wilkdevelopment.pl";

export const SITE_NAME = "Wilk Development";
export const DEFAULT_TITLE = "Wilk Development — Domy szeregowe i remonty pod klucz";
export const DEFAULT_DESCRIPTION =
  "Budowa nowoczesnych domów szeregowych oraz kompleksowe remonty pod klucz. Jakość, terminowość, jedno miejsce kontaktu. Wycena i realizacja w całej Polsce.";

export const KEYWORDS = [
  "domy szeregowe",
  "budowa domów szeregowych",
  "remont pod klucz",
  "remonty pod klucz",
  "Wilk Development",
  "firma budowlana",
  "generalny wykonawca",
  "budowa tarasów",
  "budowa werandy",
  "remonty domów",
  "wykańczanie wnętrz",
  "malowanie wnętrz",
  "układanie płytek",
  "przebudowa łazienki",
  "remont kuchni",
] as const;

export function canonical(path: string) {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${pathname}`;
}

export const PAGES = [
  { path: "/", title: "Strona główna" },
  { path: "/uslugi", title: "Usługi" },
  { path: "/aktualnosci", title: "Aktualności" },
  { path: "/wspolpraca", title: "Współpraca" },
  { path: "/kontakt", title: "Kontakt" },
] as const;

/** Linki do dzielnic Rzeszowa i okolic – stopka SEO (lokalne frazy). */
export const LOCAL_NAV: { label: string; href: string }[] = [
  { label: "Remonty Słocina", href: "/kontakt" },
  { label: "Budowa domów Drabinianka", href: "/kontakt" },
  { label: "Wykończenia pod klucz Zalesie", href: "/kontakt" },
  { label: "Remonty łazienek Rzeszów", href: "/kontakt" },
  { label: "Budowa tarasów Rzeszów", href: "/uslugi" },
  { label: "Remonty domów Podkarpacie", href: "/uslugi" },
];
