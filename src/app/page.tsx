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
import { canonical } from "~/lib/seo";
import {
  getCachedOffer, getCachedProjects, getCachedUslugi,
  getCachedSiteConfig, getCachedFaqItems, getCachedServiceCards,
  getCachedWhyUsItems,
} from "~/lib/data-cache";
import { TrendingUp, Users, Calendar, Award } from "lucide-react";
import { GeoFaq } from "~/components/GeoFaq";
import { GeoSpeakableSchema } from "~/components/GeoSpeakableSchema";
import { ProjectsGallery } from "~/components/ProjectsGallery";

export const revalidate = 3600; // ISR: regeneruj co 1 h

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

export default async function HomePage() {
  const [offer, projects, uslugi, cfg, faqItems, serviceCards, whyUsItems] = await Promise.all([
    getCachedOffer(),
    getCachedProjects(),
    getCachedUslugi(),
    getCachedSiteConfig(),
    getCachedFaqItems(),
    getCachedServiceCards(),
    getCachedWhyUsItems(),
  ]);

  // ── Hero ─────────────────────────────────────────────────────────────────
  const heroTagline     = cfg.hero_tagline     ?? "Rzeszów · Podkarpacie · od 2010 roku";
  const heroHeading     = cfg.hero_heading     ?? "Budujemy i remontujemy pod klucz";
  const heroDescription = cfg.hero_description ?? "";
  const heroImageMain   = cfg.hero_image_main  ?? "";
  const btnFreeQuote    = cfg.btn_free_quote   ?? "Bezpłatna wycena";
  const heroCTANews     = cfg.home_hero_cta_news ?? "Aktualności";
  // ── About ────────────────────────────────────────────────────────────────
  const aboutIntro      = cfg.about_intro             ?? "";
  const aboutLabel      = cfg.home_about_label        ?? "O firmie";
  const aboutHeadMid    = cfg.home_about_heading_mid  ?? "+ lat";
  const aboutHeadBot    = cfg.home_about_heading_bot  ?? "nieprzerwanego sukcesu";
  const aboutWorkCTA    = cfg.home_about_work_cta     ?? "Pracuj z nami";
  const yearsOnMarket   = cfg.geo_years_on_market     ?? "15";
  const completedProjects = cfg.geo_completed_projects ?? "setki";
  // ── Stats ────────────────────────────────────────────────────────────────
  const statCompletedLabel = cfg.home_stat_completed_label ?? "Zrealizowanych projektów";
  const statYearsLabel     = cfg.home_stat_years_label     ?? "Lat na rynku budowlanym";
  const statContactVal     = cfg.home_stat_contact_val     ?? "1 kontakt";
  const statContactLabel   = cfg.home_stat_contact_label   ?? "Jedna firma, pełna obsługa";
  const statCertVal        = cfg.home_stat_cert_val        ?? "100%";
  const statCertLabel      = cfg.home_stat_cert_label      ?? "Certyfikowane materiały";
  // ── Services section ─────────────────────────────────────────────────────
  const servicesLabel   = cfg.home_services_label   ?? "Nasze usługi";
  const servicesHeading = cfg.home_services_heading ?? "Jakość usług budowlanych";
  // ── Offer section ────────────────────────────────────────────────────────
  const offerLabel        = cfg.home_offer_label        ?? "Nasza oferta";
  const offerHeading      = cfg.home_offer_heading      ?? "Co robimy najlepiej?";
  const offerDomyCTA      = cfg.home_offer_domy_cta     ?? "Wyceń budowę domu";
  const offerDomyLink     = cfg.home_offer_domy_link    ?? "Wykańczanie wnętrz Rzeszów →";
  const offerRemontyCTA   = cfg.home_offer_remonty_cta  ?? "Wyceń remont";
  const offerRemontyLink  = cfg.home_offer_remonty_link ?? "Układanie płytek Rzeszów →";
  const psrDomyResult     = cfg.offer_psr_domy_result    ?? "";
  const psrRemontyResult  = cfg.offer_psr_remonty_result ?? "";
  // ── Split section ────────────────────────────────────────────────────────
  const sustainableLabel   = cfg.home_sustainable_label   ?? "Zrównoważony rozwój";
  const sustainableHeading = cfg.home_sustainable_heading ?? "Zaangażowani w bezpieczne i solidne budownictwo";
  const sustainableText    = cfg.home_sustainable_text    ?? "";
  const sustainableCTA     = cfg.home_sustainable_cta     ?? "Pracuj z nami";
  const bestHeading        = cfg.home_best_heading        ?? "Jesteśmy najlepsi w branży";
  const bestText           = cfg.home_best_text           ?? "";
  const bestFeatures: string[] = (() => {
    try { return JSON.parse(cfg.home_best_features ?? "[]") as string[]; }
    catch { return ["Certyfikowane materiały budowlane", "Realizacja na czas — gwarancja w umowie", "Nowoczesne technologie i projekty", "Najnowszy design i wykończenia premium"]; }
  })();
  // ── Usługi list section ───────────────────────────────────────────────────
  const uslugiLabel   = cfg.home_uslugi_label   ?? "Co oferujemy";
  const uslugiHeading = cfg.home_uslugi_heading ?? "Pełna lista usług budowlanych";
  const uslugiText    = cfg.home_uslugi_text    ?? "";
  const uslugiCTA     = cfg.home_uslugi_cta     ?? "Zobacz pełną listę usług";
  // ── Why us section ───────────────────────────────────────────────────────
  const whyUsLabel   = cfg.home_whyus_label   ?? "Dlaczego my";
  const whyUsHeading = cfg.home_whyus_heading ?? "Dlaczego Wilk Development?";
  // ── FAQ section ──────────────────────────────────────────────────────────
  const faqLabel   = cfg.home_faq_label   ?? "FAQ";
  const faqHeading = cfg.home_faq_heading ?? "Masz pytania?";
  // ── Projects section ─────────────────────────────────────────────────────
  const projectsLabel   = cfg.home_projects_label   ?? "Realizacje";
  const projectsHeading = cfg.home_projects_heading ?? "Galeria naszych inwestycji";
  const projectsText    = cfg.home_projects_text    ?? "";
  // ── Contact section ──────────────────────────────────────────────────────
  const contactLabel      = cfg.home_contact_label       ?? "Skontaktuj się z nami";
  const contactHeading    = cfg.home_contact_heading     ?? "Bezpłatna wycena w 24\u00a0h";
  const contactText       = cfg.home_contact_text        ?? "";
  const contactPhoneLabel = cfg.home_contact_phone_label ?? "Zadzwoń teraz";
  const contactEmailLabel = cfg.home_contact_email_label ?? "Napisz do nas";
  const contactAreaLabel  = cfg.home_contact_area_label  ?? "Obszar działania";
  const contactAreaValue  = cfg.home_contact_area_value  ?? "Rzeszów";
  const contactAreaSub    = cfg.home_contact_area_sub    ?? "i całe Podkarpacie";
  const contactFormCTA    = cfg.home_contact_form_cta    ?? "Wypełnij formularz kontaktowy";
  const contactPhone      = cfg.contact_phone  ?? "";
  const contactEmail      = cfg.contact_email  ?? "";
  const contactHoursWd    = cfg.contact_hours_weekdays ?? "Pon–Pt 8:00–18:00";
  const contactReplyTime  = cfg.contact_reply_time     ?? "Odpowiadamy w ciągu 24h";

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
          src={heroImageMain}
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
            <span className="section-label-dash" style={{ color: "var(--gold)" }}>
              {heroTagline}
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
              {heroHeading}
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
              {heroDescription}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", marginTop: "2.5rem" }}>
              <Link href="/kontakt" className="wp-btn-primary">
                {btnFreeQuote}
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href="/aktualnosci" className="wp-btn-outline">
                {heroCTANews}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT – split stats panel
      ═══════════════════════════════════════ */}
      <section id="geo-about" className="geo-speakable" aria-labelledby="about-heading">
        <div
          className="stats-split wp-section mx-auto max-w-content md:grid-cols-[2fr_3fr]"
          style={{ boxShadow: "var(--shadow-xl)" }}
        >
          {/* Left: gold panel */}
          <div className="stats-split-left">
            <span className="section-label-dash" style={{ color: "var(--navy)" }}>{aboutLabel}</span>
            <h2
              id="about-heading"
              style={{
                color: "var(--navy)",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                lineHeight: 1.2,
              }}
            >
              {yearsOnMarket}{aboutHeadMid}<br />{aboutHeadBot}
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "rgba(10,18,30,0.75)", lineHeight: 1.7 }}>
              {aboutIntro}
            </p>
            <div>
              <Link
                href="/wspolpraca"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "var(--navy)", color: "var(--white)",
                  fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                  fontWeight: 700, fontSize: "0.875rem",
                  padding: "0.75rem 1.5rem",
                  letterSpacing: "0.02em",
                  transition: "opacity var(--transition)",
                }}
                className="hover:opacity-80"
              >
                {aboutWorkCTA} <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          </div>

          {/* Right: 2x2 stats grid */}
          <div className="stats-split-right">
            {[
              { icon: TrendingUp, value: `${completedProjects}+`, label: statCompletedLabel },
              { icon: Calendar,   value: `${yearsOnMarket}+`,     label: statYearsLabel },
              { icon: Users,      value: statContactVal,          label: statContactLabel },
              { icon: Award,      value: statCertVal,             label: statCertLabel },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="stat-item">
                <span className="stat-icon">
                  <Icon size={18} aria-hidden />
                </span>
                <div>
                  <span className="stat-value">{value}</span>
                  <span className="stat-desc">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          JAKOŚĆ USŁUG – photo cards (Quality Services)
      ═══════════════════════════════════════ */}
      <section
        className="section-white"
        aria-labelledby="why-heading"
        style={{ paddingBlock: "var(--section-py)" }}
      >
        <div className="wp-section mx-auto max-w-content">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto" }}>
            <span className="section-label-dash" style={{ justifyContent: "center" }}>{servicesLabel}</span>
            <h2 id="why-heading" style={{ marginTop: "0.5rem" }}>
              {servicesHeading}
            </h2>
          </div>
          <ul
            style={{
              marginTop: "3rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 19rem), 1fr))",
              gap: "1.5rem",
              listStyle: "none",
            }}
          >
            {serviceCards.map((card) => {
              const iconMap: Record<string, React.ElementType> = {
                Building2: Building2, Paintbrush: Paintbrush, Ruler: Ruler,
                Lightbulb: Lightbulb, ShieldCheck: ShieldCheck, Layers: Layers,
              };
              const Icon = iconMap[card.iconName] ?? Building2;
              return (
                <li key={card.id}>
                  <div className="spc">
                    <div className="spc-photo">
                      <Image
                        src={card.imageUrl}
                        alt={card.title}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="spc-body">
                      <span className="spc-icon">
                        <Icon size={18} aria-hidden />
                      </span>
                      <div>
                        <p style={{
                          fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                          fontWeight: 700, fontSize: "0.9375rem", color: "var(--charcoal)",
                        }}>
                          {card.title}
                        </p>
                        <p style={{ marginTop: "0.3rem", fontSize: "0.8125rem", color: "var(--slate)", lineHeight: 1.6 }}>
                          {card.description}
                        </p>
                      </div>
                    </div>
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
            <span className="section-label">{offerLabel}</span>
            <h2 id="offer-heading" style={{ marginTop: "0.5rem" }}>
              {offerHeading}
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
                {psrDomyResult}
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
                  {offerDomyCTA} <ArrowRight size={14} aria-hidden />
                </Link>
                <Link href="/uslugi" style={{ fontSize: "0.8125rem", color: "var(--gold)", fontWeight: 600, alignSelf: "center" }}
                      className="hover:underline">
                  {offerDomyLink}
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
                {psrRemontyResult}
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
                  {offerRemontyCTA} <ArrowRight size={14} aria-hidden />
                </Link>
                <Link href="/uslugi" style={{ fontSize: "0.8125rem", color: "var(--gold)", fontWeight: 600, alignSelf: "center" }}
                      className="hover:underline">
                  {offerRemontyLink}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SPLIT – dark left + yellow right
      ═══════════════════════════════════════ */}
      <section
        aria-labelledby="process-heading"
        className="split-dg md:grid-cols-2"
      >
        {/* Left: dark panel with bg image */}
        <div className="split-dg-dark">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=75&auto=format&fit=crop"
            alt=""
            fill
            loading="lazy"
            className="object-cover"
            sizes="50vw"
            aria-hidden
            style={{ zIndex: 0, opacity: 0.25 }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="section-label-dash">{sustainableLabel}</span>
            <h2
              id="process-heading"
              style={{
                marginTop: "0.75rem",
                color: "var(--white)",
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
              }}
            >
              {sustainableHeading}
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75 }}>
              {sustainableText}
            </p>
            <Link
              href="/wspolpraca"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--gold)", color: "var(--navy)",
                fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                fontWeight: 700, fontSize: "0.875rem",
                padding: "0.75rem 1.5rem",
                letterSpacing: "0.02em",
                transition: "opacity var(--transition)",
                marginTop: "0.5rem",
              }}
              className="hover:opacity-85"
            >
              {sustainableCTA} <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </div>

        {/* Right: yellow panel */}
        <div className="split-dg-yellow">
          <h2
            style={{
              color: "var(--navy)",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              lineHeight: 1.25,
            }}
          >
            {bestHeading}
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "rgba(10,18,30,0.72)", lineHeight: 1.72 }}>
            {bestText}
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none" }}>
            {[
              { icon: ShieldCheck, text: bestFeatures[0] ?? "" },
              { icon: Clock,       text: bestFeatures[1] ?? "" },
              { icon: Briefcase,   text: bestFeatures[2] ?? "" },
              { icon: Star,        text: bestFeatures[3] ?? "" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: "1.75rem", height: "1.75rem", borderRadius: "var(--radius-full)",
                  background: "var(--navy)", color: "var(--gold)", flexShrink: 0,
                }}>
                  <Icon size={13} aria-hidden />
                </span>
                <span style={{
                  fontSize: "0.9375rem", fontWeight: 600, color: "var(--navy)",
                  fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                }}>
                  {text}
                </span>
              </li>
            ))}
          </ul>
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
          <span className="section-label">{uslugiLabel}</span>
          <h2 id="uslugi-heading" style={{ marginTop: "0.5rem" }}>
            {uslugiHeading}
          </h2>
          <p style={{ marginTop: "0.875rem", color: "var(--slate)", maxWidth: "36rem", margin: "0.875rem auto 0" }}>
            {uslugiText}
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
              {uslugiCTA} <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DLACZEGO WILK DEVELOPMENT – light bg
      ═══════════════════════════════════════ */}
      {whyUsItems.length > 0 && (
        <section
          className="section-light"
          aria-labelledby="why-us-heading"
          style={{ paddingBlock: "var(--section-py)" }}
        >
          <div className="wp-section mx-auto max-w-content">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span className="section-label-dash">{whyUsLabel}</span>
              <h2 id="why-us-heading" style={{ marginTop: "0.5rem" }}>
                {whyUsHeading}
              </h2>
            </div>
            <ul
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 16rem), 1fr))",
                gap: "1.5rem",
                listStyle: "none",
              }}
            >
              {whyUsItems.map((item) => (
                <li
                  key={item.id}
                  style={{
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    padding: "1.5rem",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <p style={{
                    fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    color: "var(--charcoal)",
                    marginBottom: "0.4rem",
                  }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--slate)", lineHeight: 1.65 }}>
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

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
            <span className="section-label">{faqLabel}</span>
            <h2 style={{ marginTop: "0.5rem" }}>{faqHeading}</h2>
          </div>
          <GeoFaq items={faqItems} />
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
            <span className="section-label">{projectsLabel}</span>
            <h2 id="projects-heading" style={{ marginTop: "0.5rem" }}>
              {projectsHeading}
            </h2>
            <p style={{ marginTop: "0.875rem", color: "var(--slate)" }}>
              {projectsText}
            </p>
          </div>

          <ProjectsGallery projects={projects} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          KONTAKT – dark bg + karty + CTA
      ═══════════════════════════════════════ */}
      <section
        className="section-dark"
        aria-labelledby="contact-heading"
        style={{ paddingBlock: "var(--section-py)" }}
      >
        <div className="wp-section mx-auto max-w-content">

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-label-dash" style={{ justifyContent: "center", color: "var(--gold)" }}>
              {contactLabel}
            </span>
            <h2
              id="contact-heading"
              style={{
                marginTop: "0.5rem",
                color: "var(--white)",
                fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              }}
            >
              {contactHeading}
            </h2>
            <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.6)", maxWidth: "38rem", margin: "1rem auto 0", lineHeight: 1.7 }}>
              {contactText}
            </p>
          </div>

          {/* Karty kontaktowe */}
          <div
            style={{
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
            }}
          >
            {/* Telefon */}
            <a
              href={`tel:${contactPhone.replace(/\s/g, "")}`}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                padding: "2.5rem 2rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "border-color var(--transition), background var(--transition)",
                textDecoration: "none",
                gap: "1rem",
              }}
              className="group hover:border-gold hover:bg-gold/10"
            >
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "3.5rem", height: "3.5rem", borderRadius: "var(--radius-full)",
                background: "var(--gold)", color: "var(--navy)",
              }}>
                <Phone size={20} aria-hidden />
              </span>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "0.4rem" }}>
                  {contactPhoneLabel}
                </p>
                <p style={{
                  fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                  fontWeight: 800, fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                  color: "var(--white)", letterSpacing: "-0.01em",
                }}>
                  {contactPhone}
                </p>
                <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", marginTop: "0.3rem" }}>
                  {contactHoursWd}
                </p>
              </div>
            </a>

            {/* E-mail */}
            <a
              href={`mailto:${contactEmail}`}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                padding: "2.5rem 2rem",
                background: "var(--gold)",
                border: "1px solid var(--gold)",
                transition: "opacity var(--transition)",
                textDecoration: "none",
                gap: "1rem",
              }}
              className="hover:opacity-90"
            >
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "3.5rem", height: "3.5rem", borderRadius: "var(--radius-full)",
                background: "var(--navy)", color: "var(--gold)",
              }}>
                <Mail size={20} aria-hidden />
              </span>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(10,18,30,0.6)", marginBottom: "0.4rem" }}>
                  {contactEmailLabel}
                </p>
                <p style={{
                  fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                  fontWeight: 800, fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                  color: "var(--navy)", letterSpacing: "-0.01em",
                  wordBreak: "break-all",
                }}>
                  {contactEmail}
                </p>
                <p style={{ fontSize: "0.8125rem", color: "rgba(10,18,30,0.55)", marginTop: "0.3rem" }}>
                  {contactReplyTime}
                </p>
              </div>
            </a>

            {/* Lokalizacja */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
              padding: "2.5rem 2rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              gap: "1rem",
            }}>
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "3.5rem", height: "3.5rem", borderRadius: "var(--radius-full)",
                background: "var(--gold)", color: "var(--navy)",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              </span>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "0.4rem" }}>
                  {contactAreaLabel}
                </p>
                <p style={{
                  fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                  fontWeight: 800, fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                  color: "var(--white)",
                }}>
                  {contactAreaValue}
                </p>
                <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", marginTop: "0.3rem" }}>
                  {contactAreaSub}
                </p>
              </div>
            </div>
          </div>

          {/* CTA button */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/kontakt" className="wp-btn-primary" style={{ fontSize: "1rem", padding: "0.9rem 2.5rem" }}>
              {contactFormCTA} <ArrowRight size={16} aria-hidden />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
