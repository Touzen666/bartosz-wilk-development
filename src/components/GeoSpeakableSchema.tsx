import { BASE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from "~/lib/seo";

/**
 * Schema.org Speakable – wskazuje fragmenty strony odpowiednie do odczytu
 * przez asystentów głosowych i modele AI (Google Assistant, ChatGPT, itp.).
 */
export function GeoSpeakableSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/#webpage`,
    url: BASE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [
        "#geo-about",
        "#geo-stats",
        "#geo-offer-domy",
        "#geo-offer-remonty",
        "#geo-faq",
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
