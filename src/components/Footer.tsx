import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { LOCAL_NAV } from "~/lib/seo";
import { getCachedSiteConfig } from "~/lib/data-cache";

const footerNav = [
  { href: "/uslugi", label: "Wszystkie usługi" },
  { href: "/uslugi", label: "Budowa domów szeregowych" },
  { href: "/uslugi", label: "Remonty pod klucz" },
  { href: "/uslugi", label: "Wykańczanie wnętrz" },
  { href: "/uslugi", label: "Budowa tarasów i werand" },
  { href: "/uslugi", label: "Układanie płytek" },
] as const;

const localLinks = LOCAL_NAV;

export async function Footer() {
  const cfg = await getCachedSiteConfig();
  const phone   = cfg.contact_phone   ?? "+48 690 884 961";
  const email   = cfg.contact_email   ?? "biuro@zlotewynajmy.com";
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: "var(--navy)",
        color: "var(--white)",
        borderTop: "3px solid var(--gold)",
      }}
    >
      {/* Main footer grid */}
      <div
        className="wp-section mx-auto max-w-content"
        style={{ paddingBlock: "clamp(3rem, 6vw, 5rem)" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))",
            gap: "2.5rem 3rem",
          }}
        >
          {/* Col 1 – Brand */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "var(--white)",
              }}
            >
              Wilk Development
            </p>
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginTop: "0.2rem",
              }}
            >
              Rzeszów · Podkarpacie
            </p>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", marginTop: "1rem", lineHeight: 1.65 }}>
              Budujemy i remontujemy od ponad 15 lat. Domy szeregowe, wykończenia pod klucz, termin i jakość — gwarantowane.
            </p>
            <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.6rem",
                  fontSize: "0.9rem", color: "var(--gold)", fontWeight: 600,
                  transition: "opacity var(--transition)",
                }}
                className="hover:opacity-80"
              >
                <Phone size={15} aria-hidden /> {phone}
              </a>
              <a
                href={`mailto:${email}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.6rem",
                  fontSize: "0.9rem", color: "var(--gold)", fontWeight: 600,
                  transition: "opacity var(--transition)",
                }}
                className="hover:opacity-80"
              >
                <Mail size={15} aria-hidden /> {email}
              </a>
              <span
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.6rem",
                  fontSize: "0.875rem", color: "rgba(255,255,255,0.5)",
                }}
              >
                <MapPin size={14} aria-hidden /> ul. Kopisto 11/193, 35-315 Rzeszów
              </span>
            </div>
          </div>

          {/* Col 2 – Usługi */}
          <nav aria-label="Usługi – stopka">
            <p
              style={{
                fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1rem",
              }}
            >
              Nasze usługi
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {footerNav.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.65)",
                      transition: "color var(--transition)",
                    }}
                    className="hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 – Firma (linki nawigacyjne) */}
          <nav aria-label="Firma – stopka">
            <p
              style={{
                fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1rem",
              }}
            >
              Firma
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { href: "/", label: "Strona główna" },
                { href: "/aktualnosci", label: "Aktualności" },
                { href: "/wspolpraca", label: "Współpraca" },
                { href: "/kontakt", label: "Kontakt" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.65)",
                      transition: "color var(--transition)",
                    }}
                    className="hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4 – Dzielnice Rzeszowa */}
          <nav aria-label="Usługi w dzielnicach Rzeszowa">
            <p
              style={{
                fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1rem",
              }}
            >
              Rzeszów i okolice
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {localLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.65)",
                      transition: "color var(--transition)",
                    }}
                    className="hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* CTA strip */}
        <div
          style={{
            marginTop: "clamp(2rem, 4vw, 3rem)",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.75)", maxWidth: "32rem" }}>
            Potrzebujesz wyceny? Zadzwoń lub napisz — odpowiadamy szybko.
          </p>
          <Link href="/kontakt" className="wp-btn-primary">
            Bezpłatna wycena
          </Link>
        </div>

        {/* Bottom bar */}
        <p
          style={{
            marginTop: "2rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            textAlign: "center",
            fontSize: "0.8125rem",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          © {year} Wilk Development. Wszelkie prawa zastrzeżone. · Rzeszów, Podkarpacie
        </p>
      </div>
    </footer>
  );
}
