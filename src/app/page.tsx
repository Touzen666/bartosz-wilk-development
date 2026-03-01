import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Paintbrush,
  Clock,
  Phone,
  Mail,
  Lightbulb,
  Ruler,
  ShieldCheck,
  Star,
  Layers,
  Briefcase,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { createCaller } from "~/server/api/trpc/server";
import { canonical } from "~/lib/seo";
import type { Project } from "~/data/content";
import {
  ABOUT_INTRO,
  WHY_US,
  CONTACT_SNIPPET,
  HERO_IMAGES,
  GEO_STATS,
  OFFER_PSR,
  FAQ_ITEMS,
} from "~/data/content";
import { GeoFaq } from "~/components/GeoFaq";
import { GeoSpeakableSchema } from "~/components/GeoSpeakableSchema";

export const metadata: Metadata = {
  title: "Wilk Development — Domy szeregowe i remonty pod klucz",
  description:
    "Budowa nowoczesnych domów szeregowych oraz kompleksowe remonty pod klucz. Jakość, terminowość, jedno miejsce kontaktu.",
  alternates: { canonical: canonical("/") },
  openGraph: {
    url: canonical("/"),
    title: "Wilk Development — Domy szeregowe i remonty pod klucz",
    description:
      "Budowa nowoczesnych domów szeregowych oraz kompleksowe remonty pod klucz. Jakość, terminowość, jedno miejsce kontaktu.",
  },
};

type HomePageSearchParams = {
  kategoria?: "domy-szeregowe" | "remonty" | "wszystkie";
  status?: "W sprzedaży" | "Zakończone" | "wszystkie";
};

export default async function HomePage({
  searchParams,
}: {
  searchParams?: HomePageSearchParams;
}) {
  const categoryParam = searchParams?.kategoria;
  const statusParam = searchParams?.status;

  const categoryFilter =
    categoryParam && categoryParam !== "wszystkie" ? categoryParam : undefined;
  const statusFilter =
    statusParam && statusParam !== "wszystkie" ? statusParam : undefined;

  const caller = await createCaller();
  const [offer, projects, uslugi] = await Promise.all([
    caller.content.getOffer(),
    caller.content.getProjects({
      limit: 9,
      ...(categoryFilter && { category: categoryFilter }),
      ...(statusFilter && { status: statusFilter }),
    }),
    caller.content.getUslugi(),
  ]);

  return (
    <>
      <GeoSpeakableSchema />

      {/* ═══════════════════════════════════════
          HERO – overlay image
      ═══════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "clamp(520px, 75vh, 780px)", display: "flex", flexDirection: "column" }}
        aria-labelledby="hero-heading"
      >
        <Image
          src={HERO_IMAGES.main}
          alt="Nowoczesne osiedle domów szeregowych w wieczornym świetle"
          fill
          priority
          fetchPriority="high"
          loading="eager"
          className="object-cover"
          sizes="100vw"
          style={{ zIndex: 0 }}
        />
        {/* Multi-layer overlay for depth */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(135deg, rgba(10,18,30,0.82) 0%, rgba(10,18,30,0.65) 60%, rgba(10,18,30,0.55) 100%)",
          }}
        />

        <div
          className="wp-section relative mx-auto flex w-full max-w-content grow flex-col justify-center"
          style={{ paddingBlock: "clamp(5rem, 10vw, 8rem)", zIndex: 3 }}
        >
          <div style={{ maxWidth: "44rem" }}>
            <span className="section-label">
              Rzeszów · Podkarpacie · od 2010 roku
            </span>
            <h1
              id="hero-heading"
              style={{
                fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                fontSize: "clamp(2.1rem, 5.5vw, 3.75rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "var(--white)",
                marginTop: "0.5rem",
              }}
            >
              Budujemy i remontujemy{" "}
              <span style={{ color: "var(--gold)" }}>pod klucz</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "rgba(255,255,255,0.82)",
                marginTop: "1.25rem",
                lineHeight: 1.7,
                maxWidth: "36rem",
              }}
            >
              Wilk Development — domy szeregowe, remonty mieszkań i wykończenia wnętrz. Jedna firma, pełna realizacja, terminowość gwarantowana.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", marginTop: "2.5rem" }}>
              <Link href="/kontakt" className="wp-btn-primary">
                Bezpłatna wycena
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href="/aktualnosci" className="wp-btn-outline">
                Aktualności
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════ */}
      <section
        id="geo-stats"
        className="geo-speakable section-white"
        aria-labelledby="stats-label"
        style={{ paddingBlock: "clamp(2.5rem, 4vw, 3.5rem)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="wp-section mx-auto max-w-content">
          <h2 id="stats-label" className="sr-only">Fakty i liczby</h2>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0",
              listStyle: "none",
            }}
          >
            {[
              { value: `${GEO_STATS.yearsOnMarket}+`, label: "lat\nna rynku" },
              { value: `${GEO_STATS.bathroomRenovationDays}`, label: "dni\nremont łazienki" },
              { value: `${GEO_STATS.terraceBuildWeeks} tyg.`, label: "budowa\ntarasu" },
              { value: GEO_STATS.completedProjects, label: "zrealizowanych\ninwestycji" },
            ].map(({ value, label }, i) => (
              <li
                key={i}
                className="stat-block"
                style={{
                  borderRight: i < 3 ? "1px solid var(--border)" : undefined,
                  padding: "0.5rem clamp(1.5rem, 3vw, 3rem)",
                  minWidth: "130px",
                }}
              >
                <span className="stat-number" style={{ color: "var(--navy)" }}>{value}</span>
                <span className="stat-label" style={{ whiteSpace: "pre-line" }}>
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT – light warm bg
      ═══════════════════════════════════════ */}
      <section
        id="geo-about"
        className="geo-speakable section-warm"
        aria-labelledby="about-heading"
        style={{ paddingBlock: "var(--section-py)" }}
      >
        <div className="wp-section mx-auto max-w-content">
          <div className="grid gap-12 items-center md:grid-cols-2">
            <div>
              <span className="section-label">O firmie</span>
              <h2 id="about-heading" className="heading-accent" style={{ marginTop: "0.5rem" }}>
                Czym się zajmujemy
              </h2>
              <p style={{ marginTop: "1.75rem", color: "var(--charcoal-soft)", lineHeight: 1.78 }}>
                {ABOUT_INTRO}
              </p>
              <Link
                href="/uslugi"
                className="wp-btn-primary"
                style={{ marginTop: "2rem", display: "inline-flex" }}
              >
                Nasze usługi <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none" }}>
              {WHY_US.slice(0, 4).map((item) => (
                <li key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <CheckCircle2 size={18} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "0.15rem" }} aria-hidden />
                  <span style={{ fontSize: "0.9375rem", color: "var(--charcoal-soft)" }}>
                    <strong style={{ color: "var(--charcoal)", fontFamily: "var(--font-heading, 'Montserrat', sans-serif)" }}>{item.title} — </strong>
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DLACZEGO MY – white bg
      ═══════════════════════════════════════ */}
      <section
        className="section-white"
        aria-labelledby="why-heading"
        style={{ paddingBlock: "var(--section-py)" }}
      >
        <div className="wp-section mx-auto max-w-content">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto" }}>
            <span className="section-label">Dlaczego my?</span>
            <h2 id="why-heading" style={{ marginTop: "0.5rem" }}>
              Twoja budowa, nasza odpowiedzialność
            </h2>
          </div>
          <ul
            style={{
              marginTop: "3rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 14rem), 1fr))",
              gap: "1.25rem",
              listStyle: "none",
            }}
          >
            {WHY_US.map((item, i) => {
              const icons = [Clock, Phone, Lightbulb, Ruler, ShieldCheck, Star, Layers, Briefcase];
              const Icon = icons[i] ?? Star;
              return (
                <li key={item.title}>
                  <div className="wp-content-box" style={{ height: "100%" }}>
                    <span className="icon-badge">
                      <Icon size={20} aria-hidden />
                    </span>
                    <p style={{
                      marginTop: "1rem",
                      fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                      fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)"
                    }}>
                      {item.title}
                    </p>
                    <p style={{ marginTop: "0.4rem", fontSize: "0.875rem", color: "var(--slate)", lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          OFERTA – light bg (P-S-R cards)
      ═══════════════════════════════════════ */}
      <section
        className="section-light"
        aria-labelledby="offer-heading"
        style={{ paddingBlock: "var(--section-py)" }}
      >
        <div className="wp-section mx-auto max-w-content">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto" }}>
            <span className="section-label">Nasza oferta</span>
            <h2 id="offer-heading" style={{ marginTop: "0.5rem" }}>
              Co robimy najlepiej?
            </h2>
          </div>
          <div style={{ marginTop: "3rem", display: "grid", gap: "1.75rem" }}
               className="md:grid-cols-2"
          >
            {/* Card 1 */}
            <article id="geo-offer-domy" className="geo-speakable service-card">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span className="icon-badge">
                  <Building2 size={22} aria-hidden />
                </span>
                <div>
                  <p style={{
                    fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                    fontSize: "clamp(1.05rem, 2vw, 1.2rem)", fontWeight: 700, color: "var(--charcoal)"
                  }}>
                    {offer.domySzeregowe.title}
                  </p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--gold)", fontWeight: 600, marginTop: "0.15rem" }}>
                    {offer.domySzeregowe.subtitle}
                  </p>
                </div>
              </div>

              <p style={{ marginTop: "1.25rem", fontSize: "0.9375rem", color: "var(--charcoal-soft)", lineHeight: 1.72 }}>
                {OFFER_PSR.domySzeregowe.result}
              </p>

              <ul style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {offer.domySzeregowe.highlights.map((h: string) => (
                  <li key={h} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--charcoal-soft)" }}>
                    <CheckCircle2 size={14} style={{ color: "var(--gold)", flexShrink: 0 }} aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
                <Link href="/kontakt" className="wp-btn-primary" style={{ fontSize: "0.875rem" }}>
                  Wyceń budowę domu <ArrowRight size={14} aria-hidden />
                </Link>
                <Link href="/uslugi" style={{ fontSize: "0.8125rem", color: "var(--gold)", fontWeight: 600, alignSelf: "center" }}
                      className="hover:underline">
                  Wykańczanie wnętrz Rzeszów →
                </Link>
              </div>
            </article>

            {/* Card 2 */}
            <article id="geo-offer-remonty" className="geo-speakable service-card">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span className="icon-badge">
                  <Paintbrush size={22} aria-hidden />
                </span>
                <div>
                  <p style={{
                    fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                    fontSize: "clamp(1.05rem, 2vw, 1.2rem)", fontWeight: 700, color: "var(--charcoal)"
                  }}>
                    {offer.remontyPodKlucz.title}
                  </p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--gold)", fontWeight: 600, marginTop: "0.15rem" }}>
                    {offer.remontyPodKlucz.subtitle}
                  </p>
                </div>
              </div>

              <p style={{ marginTop: "1.25rem", fontSize: "0.9375rem", color: "var(--charcoal-soft)", lineHeight: 1.72 }}>
                {OFFER_PSR.remontyPodKlucz.result}
              </p>

              <ul style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {offer.remontyPodKlucz.highlights.map((h: string) => (
                  <li key={h} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--charcoal-soft)" }}>
                    <CheckCircle2 size={14} style={{ color: "var(--gold)", flexShrink: 0 }} aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
                <Link href="/kontakt" className="wp-btn-primary" style={{ fontSize: "0.875rem" }}>
                  Wyceń remont <ArrowRight size={14} aria-hidden />
                </Link>
                <Link href="/uslugi" style={{ fontSize: "0.8125rem", color: "var(--gold)", fontWeight: 600, alignSelf: "center" }}
                      className="hover:underline">
                  Układanie płytek Rzeszów →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          USŁUGI – warm bg
      ═══════════════════════════════════════ */}
      <section
        className="section-warm"
        aria-labelledby="uslugi-heading"
        style={{ paddingBlock: "var(--section-py)" }}
      >
        <div className="wp-section mx-auto max-w-content" style={{ textAlign: "center" }}>
          <span className="section-label">Co oferujemy</span>
          <h2 id="uslugi-heading" style={{ marginTop: "0.5rem" }}>
            Pełna lista usług budowlanych
          </h2>
          <p style={{ marginTop: "0.875rem", color: "var(--slate)", maxWidth: "36rem", margin: "0.875rem auto 0" }}>
            Budowa tarasów i werand, remonty, malowanie, układanie płytek, wykończanie wnętrz i wiele więcej — na terenie Rzeszowa i Podkarpacia.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}>
            {uslugi.slice(0, 14).map((nazwa: string) => (
              <span key={nazwa} className="wp-tag">
                {nazwa}
              </span>
            ))}
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Link href="/uslugi" className="wp-btn-primary">
              Zobacz pełną listę usług <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ – white bg
      ═══════════════════════════════════════ */}
      <section
        className="section-white"
        aria-labelledby="faq-heading"
        style={{ paddingBlock: "var(--section-py)" }}
      >
        <div className="wp-section mx-auto" style={{ maxWidth: "54rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="section-label">FAQ</span>
            <h2 style={{ marginTop: "0.5rem" }}>Masz pytania?</h2>
          </div>
          <GeoFaq items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GALERIA REALIZACJI – light bg
      ═══════════════════════════════════════ */}
      <section
        className="section-light"
        aria-labelledby="projects-heading"
        style={{ paddingBlock: "var(--section-py)" }}
      >
        <div className="wp-section mx-auto max-w-content">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto" }}>
            <span className="section-label">Realizacje</span>
            <h2 id="projects-heading" style={{ marginTop: "0.5rem" }}>
              Galeria naszych inwestycji
            </h2>
            <p style={{ marginTop: "0.875rem", color: "var(--slate)" }}>
              Domy szeregowe oraz remonty pod klucz — wybrane projekty Wilk Development.
            </p>
          </div>

          {/* Filters */}
          <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}>
            {[
              { label: "Wszystkie typy", value: "wszystkie" as const },
              { label: "Domy szeregowe", value: "domy-szeregowe" as const },
              { label: "Remonty", value: "remonty" as const },
            ].map((item) => {
              const isActive = (searchParams?.kategoria ?? "wszystkie") === item.value;
              const params = new URLSearchParams();
              if (item.value !== "wszystkie") params.set("kategoria", item.value);
              if (searchParams?.status && searchParams.status !== "wszystkie")
                params.set("status", searchParams.status);
              const href = params.toString() ? `/?${params.toString()}` : "/";
              return (
                <Link key={item.value} href={href} className={`wp-tag ${isActive ? "wp-tag-active" : ""}`}>
                  {item.label}
                </Link>
              );
            })}
            {[
              { label: "Wszystkie statusy", value: "wszystkie" as const },
              { label: "W sprzedaży", value: "W sprzedaży" as const },
              { label: "Zakończone", value: "Zakończone" as const },
            ].map((item) => {
              const isActive = (searchParams?.status ?? "wszystkie") === item.value;
              const params = new URLSearchParams();
              if (searchParams?.kategoria && searchParams.kategoria !== "wszystkie")
                params.set("kategoria", searchParams.kategoria);
              if (item.value !== "wszystkie") params.set("status", item.value);
              const href = params.toString() ? `/?${params.toString()}` : "/";
              return (
                <Link key={item.value} href={href} className={`wp-tag ${isActive ? "wp-tag-active" : ""}`}>
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Grid */}
          <ul
            style={{
              marginTop: "2.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 22rem), 1fr))",
              gap: "1.5rem",
              listStyle: "none",
            }}
          >
            {projects.map((project: Project) => (
              <li key={project.id}>
                <article className="wp-card" style={{ overflow: "hidden" }}>
                  <div style={{ position: "relative", aspectRatio: "4/3", background: "var(--offwhite-warm)" }}>
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span
                      style={{
                        position: "absolute", top: "0.625rem", right: "0.625rem",
                        background: "rgba(10,18,30,0.85)", color: "var(--white)",
                        fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em",
                        padding: "0.25rem 0.625rem", borderRadius: "var(--radius-full)",
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div style={{ padding: "1.25rem 1.5rem" }}>
                    <p style={{
                      fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                      fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)"
                    }}>
                      {project.title}
                    </p>
                    <p style={{ marginTop: "0.4rem", fontSize: "0.875rem", color: "var(--slate)", lineHeight: 1.55,
                                overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {project.description}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA / KONTAKT – bg image + overlay
      ═══════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        aria-labelledby="contact-heading"
        style={{ paddingBlock: "clamp(4rem, 8vw, 6rem)" }}
      >
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden
          style={{ zIndex: 0 }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "rgba(10, 18, 30, 0.75)",
          }}
        />

        <div className="wp-section relative mx-auto max-w-content" style={{ textAlign: "center", zIndex: 2 }}>
          <span className="section-label">Kontakt</span>
          <h2
            id="contact-heading"
            style={{
              marginTop: "0.5rem",
              fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
              color: "var(--white)",
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
            }}
          >
            Porozmawiajmy o Twojej inwestycji
          </h2>
          <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.7)", maxWidth: "36rem", margin: "1rem auto 0", lineHeight: 1.7 }}>
            Zadzwoń lub napisz — wycena bezpłatna, odpowiadamy szybko. Rzeszów i cała Polska.
          </p>
          <div style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
            <a
              href={`tel:${CONTACT_SNIPPET.phone.replace(/\s/g, "")}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.625rem",
                fontSize: "1.0625rem", fontWeight: 700, color: "var(--gold)",
                transition: "opacity var(--transition)",
              }}
              className="hover:opacity-80"
            >
              <Phone size={18} aria-hidden /> {CONTACT_SNIPPET.phone}
            </a>
            <a
              href={`mailto:${CONTACT_SNIPPET.email}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.625rem",
                fontSize: "1.0625rem", fontWeight: 700, color: "var(--gold)",
                transition: "opacity var(--transition)",
              }}
              className="hover:opacity-80"
            >
              <Mail size={18} aria-hidden /> {CONTACT_SNIPPET.email}
            </a>
          </div>
          <div style={{ marginTop: "2.5rem" }}>
            <Link href="/kontakt" className="wp-btn-primary">
              Wypełnij formularz kontaktowy <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
