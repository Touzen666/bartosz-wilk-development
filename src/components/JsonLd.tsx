import { BASE_URL, SITE_NAME, DEFAULT_DESCRIPTION, PAGES } from "~/lib/seo";

export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: SITE_NAME,
    url: BASE_URL,
    description: DEFAULT_DESCRIPTION,
    logo: `${BASE_URL}/logo.png`,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: { "@id": `${BASE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", url: `${BASE_URL}/kontakt` },
      "query-input": "required name=query",
    },
    inLanguage: "pl-PL",
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    serviceType: [
      "Budowa domów szeregowych",
      "Remonty pod klucz",
      "Budowa tarasów i werand",
      "Wykańczanie wnętrz",
      "Remonty domów i mieszkań",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Aleja Majora Wacława Kopisto 11/193",
      addressLocality: "Rzeszów",
      postalCode: "35-315",
      addressCountry: "PL",
    },
    areaServed: { "@type": "Country", name: "Poland" },
    contactPoint: {
      "@type": "ContactPoint",
      url: `${BASE_URL}/kontakt`,
      contactType: "customer service",
      availableLanguage: "Polish",
      telephone: "+48 690 884 961",
      email: "biuro@zlotewynajmy.com",
    },
  };

  const combined = [organization, website, localBusiness];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(combined) }}
    />
  );
}
