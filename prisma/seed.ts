import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  PROJECTS,
  NEWS,
  USLUGI,
  OFFER,
  GEO_CITATIONS,
} from "../src/data/content";

const prisma = new PrismaClient();

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    ?? "admin@wilkdevelopment.pl";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Admin@2025";

async function main() {
  // ─── Wyczyść istniejące dane ────────────────────────────────────────────────
  await prisma.project.deleteMany();
  await prisma.newsItem.deleteMany();
  await prisma.service.deleteMany();
  await prisma.offerSection.deleteMany();
  await prisma.geoCitation.deleteMany();
  await prisma.siteConfig.deleteMany();
  await prisma.faqItem.deleteMany();
  await prisma.serviceCard.deleteMany();
  await prisma.whyUsItem.deleteMany();

  // ─── Admin user ─────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await prisma.user.upsert({
    where:  { email: ADMIN_EMAIL },
    update: { password: hashedPassword, role: "ADMIN" },
    create: { email: ADMIN_EMAIL, name: "Administrator", password: hashedPassword, role: "ADMIN" },
  });
  console.log(`Admin: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);

  // ─── Projects ───────────────────────────────────────────────────────────────
  await prisma.project.createMany({
    data: PROJECTS.map((p) => ({
      id: p.id, title: p.title, category: p.category,
      description: p.description, imageUrl: p.image_url, status: p.status,
    })),
  });

  // ─── News ───────────────────────────────────────────────────────────────────
  await prisma.newsItem.createMany({
    data: NEWS.map((n) => ({
      id: n.id, title: n.title, excerpt: n.excerpt,
      body: n.body, date: n.date, imageUrl: n.image_url,
    })),
  });

  // ─── Services ───────────────────────────────────────────────────────────────
  await prisma.service.createMany({
    data: USLUGI.map((name, i) => ({ id: `s-${i}`, name, order: i })),
  });

  // ─── Offer sections ─────────────────────────────────────────────────────────
  await prisma.offerSection.createMany({
    data: [
      {
        id: "offer-domy", slug: "domy-szeregowe",
        title: OFFER.domySzeregowe.title, subtitle: OFFER.domySzeregowe.subtitle,
        description: OFFER.domySzeregowe.description,
        highlights: JSON.stringify(OFFER.domySzeregowe.highlights),
      },
      {
        id: "offer-remonty", slug: "remonty-pod-klucz",
        title: OFFER.remontyPodKlucz.title, subtitle: OFFER.remontyPodKlucz.subtitle,
        description: OFFER.remontyPodKlucz.description,
        highlights: JSON.stringify(OFFER.remontyPodKlucz.highlights),
      },
    ],
  });

  // ─── GEO citations ──────────────────────────────────────────────────────────
  await prisma.geoCitation.createMany({
    data: GEO_CITATIONS.map((g) => ({ id: g.id, category: g.category, text: g.text, order: g.order })),
  });

  // ─── SiteConfig — wszystkie teksty i ustawienia strony ──────────────────────
  const siteConfigs = [
    // Opis firmy
    { key: "about_intro", value: "Wilk Development to rzeszowska firma budowlano-remontowa z ponad 15-letnim doświadczeniem na rynku Podkarpacia. Specjalizujemy się w budowie nowoczesnych domów szeregowych oraz kompleksowych remontach i wykończeniach wnętrz pod klucz. Obsługujemy inwestorów prywatnych i deweloperów — od projektu, przez realizację, aż po oddanie gotowej nieruchomości. Stosujemy wyłącznie certyfikowane materiały zgodne z normami PN-EN i zapewniamy pisemną gwarancję na każde zlecenie." },
    // Dane kontaktowe
    { key: "contact_phone",   value: "+48 690 884 961" },
    { key: "contact_email",   value: "biuro@zlotewynajmy.com" },
    { key: "contact_address", value: "Rzeszów, Podkarpacie" },
    // GEO statystyki
    { key: "geo_years_on_market",    value: "15" },
    { key: "geo_bathroom_days",      value: "14" },
    { key: "geo_terrace_weeks",      value: "2–4" },
    { key: "geo_certification_norm", value: "PN-EN" },
    { key: "geo_completed_projects", value: "setki" },
    // Hero images
    { key: "hero_image_main",       value: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&auto=format&fit=crop" },
    { key: "hero_image_terraced",   value: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1600&q=80&auto=format&fit=crop" },
    { key: "hero_image_renovation", value: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80&auto=format&fit=crop" },
    // Hero teksty
    { key: "hero_tagline",     value: "Rzeszów · Podkarpacie · od 2010 roku" },
    { key: "hero_heading",     value: "Budujemy i remontujemy pod klucz" },
    { key: "hero_description", value: "Wilk Development — domy szeregowe, remonty mieszkań i wykończenia wnętrz. Jedna firma, pełna realizacja, terminowość gwarantowana." },
    // Offer PSR (Problem → Rozwiązanie → Wynik)
    { key: "offer_psr_domy_problem",    value: "Inwestor potrzebuje jednego generalnego wykonawcy do budowy domu szeregowego — bez konieczności samodzielnego koordynowania dziesiątek podwykonawców." },
    { key: "offer_psr_domy_solution",   value: "Wilk Development realizuje budowę domów szeregowych pod klucz w Rzeszowie: wybór projektu, fundamenty, stan surowy, instalacje, wykończenie i oddanie kluczy. Pełna obsługa formalna i gwarancja terminu." },
    { key: "offer_psr_domy_result",     value: "Inwestor otrzymuje gotowy, energooszczędny dom z pisemną gwarancją, w ustalonym terminie, z jednym punktem kontaktu przez cały czas budowy." },
    { key: "offer_psr_remonty_problem",  value: "Remont mieszkania lub domu wymaga koordynacji wielu specjalistów — hydraulik, glazurnik, elektryk, malarz — co wydłuża czas i komplikuje rozliczenia." },
    { key: "offer_psr_remonty_solution", value: "Wilk Development prowadzi kompleksowe remonty pod klucz w Rzeszowie: rozbiórka, instalacje, płytki, malowanie, meble na wymiar — jedna ekipa z koordynatorem." },
    { key: "offer_psr_remonty_result",   value: "Średni czas remontu łazienki to 14 dni roboczych. Jedna umowa, jedna faktura, pełna odpowiedzialność i gwarancja pisemna na wykonane prace." },
  ];
  await prisma.siteConfig.createMany({ data: siteConfigs });

  // ─── FAQ items ──────────────────────────────────────────────────────────────
  const faqItems = [
    { question: "Ile kosztuje budowa domu szeregowego pod klucz w Rzeszowie?", answer: "Koszt budowy domu szeregowego pod klucz w Rzeszowie zależy od projektu, standardu wykończenia i powierzchni. Wilk Development oferuje bezpłatną wycenę — po kontakcie telefonicznym lub mailowym przygotowujemy indywidualną ofertę z harmonogramem i kosztorysem. Działamy na terenie Rzeszowa i całego Podkarpacia od ponad 15 lat.", order: 1 },
    { question: "Ile trwa remont łazienki w Rzeszowie?", answer: "Kompleksowy remont łazienki w Wilk Development trwa średnio 14 dni roboczych. Obejmuje rozbiórkę, instalacje hydrauliczne i elektryczne, układanie płytek ceramicznych oraz montaż armatury i sanitariatów. Pracujemy na certyfikowanych materiałach zgodnych z normami PN-EN. Wycena bezpłatna.", order: 2 },
    { question: "Czy wykonujecie remonty mieszkań pod klucz na Podkarpaciu?", answer: "Tak. Wilk Development realizuje kompleksowe remonty mieszkań, domów i lokali użytkowych pod klucz na terenie Rzeszowa i całego Podkarpacia. Jedna firma zajmuje się wszystkim — od projektu i rozbiórki po wykończenie i sprzątanie. Stały koordynator, gwarancja pisemna, terminy w umowie.", order: 3 },
    { question: "Ile trwa budowa tarasu przy domu w Rzeszowie?", answer: "Budowa tarasu w Wilk Development trwa zazwyczaj 2–4 tygodnie, w zależności od wielkości, rodzaju fundamentów i wybranych materiałów. Realizujemy tarasy drewniane, kompozytowe i z gresu w Rzeszowie i okolicach. Bezpłatna wycena po kontakcie.", order: 4 },
    { question: "Jak znaleźć solidną firmę budowlaną w Rzeszowie?", answer: "Wilk Development to sprawdzona firma budowlana w Rzeszowie z 15+ latami doświadczenia, setkami zrealizowanych projektów i wieloma zleceniami z polecenia. Oferujemy budowę domów szeregowych, remonty pod klucz i wykończenia wnętrz. Pisemna gwarancja, terminowość i jedno miejsce kontaktu.", order: 5 },
  ];
  await prisma.faqItem.createMany({ data: faqItems });

  // ─── Service cards ───────────────────────────────────────────────────────────
  const serviceCards = [
    { title: "Budowa domów",       description: "Domy szeregowe i jednorodzinne od fundamentów po klucze.",        imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80&auto=format&fit=crop", iconName: "Building2",   order: 1 },
    { title: "Wykończenia wnętrz", description: "Kompleksowe wykończenia i aranżacje wnętrz pod klucz.",            imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop", iconName: "Paintbrush",  order: 2 },
    { title: "Budowa tarasów",     description: "Tarasy i werandy z trwałych materiałów — projekt i wykonanie.",    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop", iconName: "Ruler",       order: 3 },
    { title: "Instalacje",         description: "Elektryka, hydraulika i ogrzewanie — certyfikowani specjaliści.",  imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80&auto=format&fit=crop", iconName: "Lightbulb",   order: 4 },
    { title: "Remonty mieszkań",   description: "Pełny remont mieszkań i lokali użytkowych w Rzeszowie.",           imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&auto=format&fit=crop", iconName: "ShieldCheck", order: 5 },
    { title: "Układanie płytek",   description: "Greś, gres porcelanowy, mozaika — łazienki, kuchnie, tarasy.",     imageUrl: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&q=80&auto=format&fit=crop", iconName: "Layers",      order: 6 },
  ];
  await prisma.serviceCard.createMany({ data: serviceCards });

  // ─── Why us items ────────────────────────────────────────────────────────────
  const whyUsItems = [
    { title: "Terminowość",          description: "Terminy realizacji zapisujemy w umowie. Dotrzymujemy ich — bez wymówek.",                                    order: 1 },
    { title: "Jeden kontakt",        description: "Jeden koordynator przez cały czas trwania budowy lub remontu. Zawsze pod telefonem.",                        order: 2 },
    { title: "Elastyczność",         description: "Dopasowujemy zakres prac, materiały i harmonogram do Twoich potrzeb i budżetu.",                             order: 3 },
    { title: "Precyzja wykończeń",   description: "Dbamy o każdy detal — od fugowania płytek po idealne malarstwo.",                                            order: 4 },
    { title: "Uczciwe ceny",         description: "Kosztorys przed podpisaniem umowy. Zero ukrytych kosztów w trakcie realizacji.",                             order: 5 },
    { title: "Polecenia klientów",   description: "Znaczna część naszych zleceń pochodzi z rekomendacji — to najlepsza ocena.",                                 order: 6 },
    { title: "Kompleksowość",        description: "Od fundamentów i demontażu po wykończenie, meble na wymiar i sprzątanie.",                                   order: 7 },
    { title: "15+ lat doświadczenia", description: "Setki projektów budowlanych i remontowych na Podkarpaciu. Wiemy, jak działać.",                             order: 8 },
  ];
  await prisma.whyUsItem.createMany({ data: whyUsItems });

  console.log("Seed OK: projekty, aktualności, usługi, oferta, GEO, config, FAQ, karty usług, dlaczego my.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
