import Link from "next/link";
import { getCachedSiteConfig } from "~/lib/data-cache";

export async function Header() {
  const cfg = await getCachedSiteConfig();

  const tagline       = cfg.header_tagline   ?? "Rzeszów · Podkarpacie";
  const navHome       = cfg.nav_home         ?? "Strona główna";
  const navUslugi     = cfg.nav_uslugi       ?? "Usługi";
  const navAkt        = cfg.nav_aktualnosci  ?? "Aktualności";
  const navWsp        = cfg.nav_wspolpraca   ?? "Współpraca";
  const btnFreeQuote  = cfg.btn_free_quote   ?? "Bezpłatna wycena";

  const nav = [
    { href: "/",            label: navHome   },
    { href: "/uslugi",      label: navUslugi },
    { href: "/aktualnosci", label: navAkt    },
    { href: "/wspolpraca",  label: navWsp    },
  ];

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "0 1px 0 0 var(--border), var(--shadow-sm)",
      }}
    >
      <div
        className="wp-section mx-auto flex max-w-content items-center justify-between"
        style={{ paddingBlock: "0.875rem" }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex flex-col leading-tight group"
          aria-label="Wilk Development – strona główna"
        >
          <span
            style={{
              fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
              fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "var(--navy)",
              transition: "color var(--transition)",
            }}
            className="group-hover:text-[--gold]"
          >
            Wilk Development
          </span>
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            {tagline}
          </span>
        </Link>

        {/* Mobile hamburger – CSS-only */}
        <details className="sm:hidden relative">
          <summary
            className="flex h-11 w-11 cursor-pointer items-center justify-center list-none"
            style={{
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border)",
              background: "var(--offwhite-warm)",
              color: "var(--charcoal-soft)",
              transition: "border-color var(--transition), color var(--transition)",
            }}
          >
            <span className="sr-only">Otwórz menu</span>
            <span className="flex h-4 w-5 flex-col justify-between" aria-hidden>
              <span style={{ display: "block", height: "2px", background: "currentColor", borderRadius: "2px" }} />
              <span style={{ display: "block", height: "2px", background: "currentColor", borderRadius: "2px" }} />
              <span style={{ display: "block", height: "2px", background: "currentColor", borderRadius: "2px" }} />
            </span>
          </summary>
          <nav
            aria-label="Główna nawigacja mobilna"
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 0.5rem)",
              minWidth: "16rem",
              background: "var(--white)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-lg)",
              padding: "0.5rem",
              zIndex: 100,
            }}
          >
            <ul className="flex flex-col">
              {nav.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      display: "block",
                      padding: "0.7rem 1rem",
                      borderRadius: "var(--radius-lg)",
                      fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      transition: "background var(--transition), color var(--transition)",
                    }}
                    className="hover:bg-[--gold-muted] hover:text-[--gold-hover]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 border-t pt-2" style={{ borderColor: "var(--border)" }}>
                <Link href="/kontakt" className="wp-btn-primary w-full justify-center">
                  {btnFreeQuote}
                </Link>
              </li>
            </ul>
          </nav>
        </details>

        {/* Desktop nav */}
        <nav aria-label="Główna nawigacja" className="hidden items-center gap-1 sm:flex">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "inline-block",
                padding: "0.45rem 0.875rem",
                borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--charcoal-soft)",
                transition: "color var(--transition), background var(--transition)",
              }}
              className="hover:bg-[--offwhite-warm] hover:text-[--navy]"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="wp-btn-primary ml-3"
            style={{ padding: "0.55rem 1.35rem", fontSize: "0.875rem" }}
          >
            {btnFreeQuote}
          </Link>
        </nav>
      </div>
    </header>
  );
}
