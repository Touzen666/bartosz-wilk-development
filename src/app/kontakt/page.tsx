import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { ContactForm } from "~/components/ContactForm";
import { canonical } from "~/lib/seo";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { getCachedSiteConfig } from "~/lib/data-cache";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Kontakt — Bezpłatna wycena | Wilk Development Rzeszów",
  description:
    "Skontaktuj się z Wilk Development: bezpłatna wycena domów szeregowych i remontów pod klucz w Rzeszowie i na Podkarpaciu. Odpowiadamy w 24h.",
  alternates: { canonical: canonical("/kontakt") },
  openGraph: {
    url: canonical("/kontakt"),
    title: "Kontakt | Wilk Development",
    description:
      "Formularz kontaktowy Wilk Development — wycena bez zobowiązań. Budownictwo i remonty pod klucz w Rzeszowie.",
  },
};

export default async function KontaktPage() {
  const cfg = await getCachedSiteConfig();
  const phone = cfg.contact_phone ?? "+48 690 884 961";
  const email = cfg.contact_email ?? "biuro@zlotewynajmy.com";
  return (
    <>
      {/* ── Hero bar ── */}
      <div className="section-dark" style={{ paddingBlock: "clamp(3rem, 6vw, 5rem)" }}>
        <div className="wp-section mx-auto max-w-content">
          <Breadcrumbs
            light
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Kontakt", href: "/kontakt" },
            ]}
          />
          <span className="section-label-dash" style={{ color: "var(--gold)", marginTop: "1rem", display: "inline-flex" }}>
            Skontaktuj się z nami
          </span>
          <h1
            style={{
              marginTop: "0.5rem",
              fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
              color: "var(--white)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 800,
            }}
          >
            Bezpłatna wycena w 24&nbsp;h
          </h1>
          <p style={{ marginTop: "0.75rem", color: "rgba(255,255,255,0.6)", maxWidth: "38rem", lineHeight: 1.72 }}>
            Masz pytanie o budowę domu, remont lub współpracę? Napisz lub zadzwoń — wycena jest bezpłatna i niezobowiązująca.
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <section className="section-light" style={{ paddingBlock: "var(--section-py)" }}>
        <div
          className="wp-section mx-auto max-w-content grid gap-10 md:grid-cols-[2fr_3fr] md:items-start"
        >

            {/* ── Left: dane kontaktowe ── */}
            <aside>
              {/* Karty danych */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  {
                    icon: Phone,
                    label: "Telefon",
                    value: phone,
                    sub: "Pon–Pt 8:00–18:00",
                    href: `tel:${phone.replace(/\s/g, "")}`,
                  },
                  {
                    icon: Mail,
                    label: "E-mail",
                    value: email,
                    sub: "Odpowiadamy w ciągu 24h",
                    href: `mailto:${email}`,
                  },
                  {
                    icon: MapPin,
                    label: "Obszar działania",
                    value: "Rzeszów i Podkarpacie",
                    sub: "Al. mjr. W. Kopisto 11/193, 35-315 Rzeszów",
                    href: undefined,
                  },
                  {
                    icon: Clock,
                    label: "Godziny pracy",
                    value: "Pon – Sob",
                    sub: "8:00 – 18:00 · Niedziela: na zlecenie",
                    href: undefined,
                  },
                ].map(({ icon: Icon, label, value, sub, href }) => {
                  const Inner = (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "1rem",
                        padding: "1.5rem",
                        borderBottom: "1px solid var(--border)",
                        background: "var(--white)",
                        transition: "background var(--transition)",
                      }}
                    >
                      <span style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: "2.75rem", height: "2.75rem", flexShrink: 0,
                        background: "var(--gold)", color: "var(--navy)",
                      }}>
                        <Icon size={17} aria-hidden />
                      </span>
                      <div>
                        <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--slate)" }}>
                          {label}
                        </p>
                        <p style={{
                          fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                          fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)", marginTop: "0.2rem",
                        }}>
                          {value}
                        </p>
                        <p style={{ fontSize: "0.8125rem", color: "var(--slate)", marginTop: "0.15rem" }}>
                          {sub}
                        </p>
                      </div>
                    </div>
                  );

                  return href ? (
                    <a key={label} href={href} style={{ textDecoration: "none", display: "block" }} className="hover:bg-gold-muted">
                      {Inner}
                    </a>
                  ) : (
                    <div key={label}>{Inner}</div>
                  );
                })}
              </div>

              {/* CTA boczne */}
              <div
                style={{
                  marginTop: "2rem",
                  background: "var(--navy)",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <p style={{
                  fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                  fontWeight: 700, fontSize: "1rem", color: "var(--white)",
                }}>
                  Wolisz zadzwonić?
                </p>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                  Nasz specjalista odpowie na wszystkie pytania i przygotuje wstępną wycenę telefonicznie.
                </p>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="wp-btn-primary"
                  style={{ justifyContent: "center" }}
                >
                  <Phone size={15} aria-hidden /> {phone}
                </a>
              </div>
            </aside>

            {/* ── Right: formularz ── */}
            <div
              style={{
                background: "var(--white)",
                border: "1px solid var(--border)",
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                  fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
                  fontWeight: 800,
                  color: "var(--charcoal)",
                  marginBottom: "0.5rem",
                }}
              >
                Wyślij zapytanie
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--slate)", marginBottom: "1.75rem", lineHeight: 1.6 }}>
                Opisz swoje potrzeby — odpowiemy w ciągu 24h z bezpłatną wyceną.
              </p>
              <ContactForm />
            </div>

        </div>
      </section>
    </>
  );
}
