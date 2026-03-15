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
    // ── Opis firmy ──────────────────────────────────────────────────────────
    { key: "about_intro", value: "Wilk Development to rzeszowska firma budowlano-remontowa z ponad 15-letnim doświadczeniem na rynku Podkarpacia. Specjalizujemy się w budowie nowoczesnych domów szeregowych oraz kompleksowych remontach i wykończeniach wnętrz pod klucz. Obsługujemy inwestorów prywatnych i deweloperów — od projektu, przez realizację, aż po oddanie gotowej nieruchomości. Stosujemy wyłącznie certyfikowane materiały zgodne z normami PN-EN i zapewniamy pisemną gwarancję na każde zlecenie." },
    // ── Dane kontaktowe ─────────────────────────────────────────────────────
    { key: "contact_phone",        value: "+48 690 884 961" },
    { key: "contact_email",        value: "biuro@zlotewynajmy.com" },
    { key: "contact_address",      value: "Rzeszów, Podkarpacie" },
    { key: "contact_address_full", value: "Al. mjr. W. Kopisto 11/193, 35-315 Rzeszów" },
    { key: "contact_hours_weekdays", value: "Pon–Pt 8:00–18:00" },
    { key: "contact_hours_alldays",  value: "Pon – Sob" },
    { key: "contact_hours_full",     value: "8:00 – 18:00 · Niedziela: na zlecenie" },
    { key: "contact_reply_time",     value: "Odpowiadamy w ciągu 24h" },
    // ── GEO statystyki ───────────────────────────────────────────────────────
    { key: "geo_years_on_market",    value: "15" },
    { key: "geo_bathroom_days",      value: "14" },
    { key: "geo_terrace_weeks",      value: "2–4" },
    { key: "geo_certification_norm", value: "PN-EN" },
    { key: "geo_completed_projects", value: "setki" },
    // ── Hero images ──────────────────────────────────────────────────────────
    { key: "hero_image_main",       value: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&auto=format&fit=crop" },
    { key: "hero_image_terraced",   value: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1600&q=80&auto=format&fit=crop" },
    { key: "hero_image_renovation", value: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80&auto=format&fit=crop" },
    // ── Hero teksty ──────────────────────────────────────────────────────────
    { key: "hero_tagline",     value: "Rzeszów · Podkarpacie · od 2010 roku" },
    { key: "hero_heading",     value: "Budujemy i remontujemy pod klucz" },
    { key: "hero_description", value: "Wilk Development — domy szeregowe, remonty mieszkań i wykończenia wnętrz. Jedna firma, pełna realizacja, terminowość gwarantowana." },
    // ── Offer PSR ────────────────────────────────────────────────────────────
    { key: "offer_psr_domy_problem",     value: "Inwestor potrzebuje jednego generalnego wykonawcy do budowy domu szeregowego — bez konieczności samodzielnego koordynowania dziesiątek podwykonawców." },
    { key: "offer_psr_domy_solution",    value: "Wilk Development realizuje budowę domów szeregowych pod klucz w Rzeszowie: wybór projektu, fundamenty, stan surowy, instalacje, wykończenie i oddanie kluczy. Pełna obsługa formalna i gwarancja terminu." },
    { key: "offer_psr_domy_result",      value: "Inwestor otrzymuje gotowy, energooszczędny dom z pisemną gwarancją, w ustalonym terminie, z jednym punktem kontaktu przez cały czas budowy." },
    { key: "offer_psr_remonty_problem",  value: "Remont mieszkania lub domu wymaga koordynacji wielu specjalistów — hydraulik, glazurnik, elektryk, malarz — co wydłuża czas i komplikuje rozliczenia." },
    { key: "offer_psr_remonty_solution", value: "Wilk Development prowadzi kompleksowe remonty pod klucz w Rzeszowie: rozbiórka, instalacje, płytki, malowanie, meble na wymiar — jedna ekipa z koordynatorem." },
    { key: "offer_psr_remonty_result",   value: "Średni czas remontu łazienki to 14 dni roboczych. Jedna umowa, jedna faktura, pełna odpowiedzialność i gwarancja pisemna na wykonane prace." },
    // ── Nawigacja / UI globalne ───────────────────────────────────────────────
    { key: "btn_free_quote",     value: "Bezpłatna wycena" },
    { key: "nav_home",           value: "Strona główna" },
    { key: "nav_uslugi",         value: "Usługi" },
    { key: "nav_aktualnosci",    value: "Aktualności" },
    { key: "nav_wspolpraca",     value: "Współpraca" },
    // ── Header ───────────────────────────────────────────────────────────────
    { key: "header_tagline",     value: "Rzeszów · Podkarpacie" },
    // ── Footer ───────────────────────────────────────────────────────────────
    { key: "footer_brand_desc",     value: "Budujemy i remontujemy od ponad 15 lat. Domy szeregowe, wykończenia pod klucz, termin i jakość — gwarantowane." },
    { key: "footer_services_heading", value: "Nasze usługi" },
    { key: "footer_services_nav",   value: JSON.stringify(["Wszystkie usługi", "Budowa domów szeregowych", "Remonty pod klucz", "Wykańczanie wnętrz", "Budowa tarasów i werand", "Układanie płytek"]) },
    { key: "footer_company_heading", value: "Firma" },
    { key: "footer_company_nav",    value: JSON.stringify(["Strona główna", "Aktualności", "Współpraca", "Kontakt"]) },
    { key: "footer_area_heading",   value: "Rzeszów i okolice" },
    { key: "footer_cta_text",       value: "Potrzebujesz wyceny? Zadzwoń lub napisz — odpowiadamy szybko." },
    { key: "footer_copyright",      value: "© {year} Wilk Development. Wszelkie prawa zastrzeżone. · Rzeszów, Podkarpacie" },
    // ── Strona główna — sekcje ───────────────────────────────────────────────
    { key: "home_hero_cta_news",      value: "Aktualności" },
    { key: "home_about_label",        value: "O firmie" },
    { key: "home_about_heading_mid",  value: "+ lat" },
    { key: "home_about_heading_bot",  value: "nieprzerwanego sukcesu" },
    { key: "home_about_work_cta",     value: "Pracuj z nami" },
    { key: "home_stat_completed_label", value: "Zrealizowanych projektów" },
    { key: "home_stat_years_label",   value: "Lat na rynku budowlanym" },
    { key: "home_stat_contact_val",   value: "1 kontakt" },
    { key: "home_stat_contact_label", value: "Jedna firma, pełna obsługa" },
    { key: "home_stat_cert_val",      value: "100%" },
    { key: "home_stat_cert_label",    value: "Certyfikowane materiały" },
    { key: "home_services_label",     value: "Nasze usługi" },
    { key: "home_services_heading",   value: "Jakość usług budowlanych" },
    { key: "home_offer_label",        value: "Nasza oferta" },
    { key: "home_offer_heading",      value: "Co robimy najlepiej?" },
    { key: "home_offer_domy_cta",     value: "Wyceń budowę domu" },
    { key: "home_offer_domy_link",    value: "Wykańczanie wnętrz Rzeszów →" },
    { key: "home_offer_remonty_cta",  value: "Wyceń remont" },
    { key: "home_offer_remonty_link", value: "Układanie płytek Rzeszów →" },
    { key: "home_sustainable_label",  value: "Zrównoważony rozwój" },
    { key: "home_sustainable_heading", value: "Zaangażowani w bezpieczne i solidne budownictwo" },
    { key: "home_sustainable_text",   value: "Każda budowa i remont realizowane są z dbałością o jakość, bezpieczeństwo i terminy. Wilk Development to gwarancja spokoju inwestora." },
    { key: "home_sustainable_cta",    value: "Pracuj z nami" },
    { key: "home_best_heading",       value: "Jesteśmy najlepsi w branży" },
    { key: "home_best_text",          value: "Ponad 15 lat doświadczenia w budownictwie i wykończeniach na terenie Rzeszowa i Podkarpacia. Jedna firma — pełna odpowiedzialność za projekt." },
    { key: "home_best_features",      value: JSON.stringify(["Certyfikowane materiały budowlane", "Realizacja na czas — gwarancja w umowie", "Nowoczesne technologie i projekty", "Najnowszy design i wykończenia premium"]) },
    { key: "home_uslugi_label",       value: "Co oferujemy" },
    { key: "home_uslugi_heading",     value: "Pełna lista usług budowlanych" },
    { key: "home_uslugi_text",        value: "Budowa tarasów i werand, remonty, malowanie, układanie płytek, wykończanie wnętrz i wiele więcej — na terenie Rzeszowa i Podkarpacia." },
    { key: "home_uslugi_cta",         value: "Zobacz pełną listę usług" },
    { key: "home_whyus_label",        value: "Dlaczego my" },
    { key: "home_whyus_heading",      value: "Dlaczego Wilk Development?" },
    { key: "home_faq_label",          value: "FAQ" },
    { key: "home_faq_heading",        value: "Masz pytania?" },
    { key: "home_projects_label",     value: "Realizacje" },
    { key: "home_projects_heading",   value: "Galeria naszych inwestycji" },
    { key: "home_projects_text",      value: "Domy szeregowe oraz remonty pod klucz — wybrane projekty Wilk Development." },
    { key: "home_contact_label",      value: "Skontaktuj się z nami" },
    { key: "home_contact_heading",    value: "Bezpłatna wycena w 24\u00a0h" },
    { key: "home_contact_text",       value: "Zadzwoń, napisz lub wypełnij formularz. Odpowiadamy każdego dnia roboczego — bez zbędnego czekania." },
    { key: "home_contact_phone_label", value: "Zadzwoń teraz" },
    { key: "home_contact_email_label", value: "Napisz do nas" },
    { key: "home_contact_area_label",  value: "Obszar działania" },
    { key: "home_contact_area_value",  value: "Rzeszów" },
    { key: "home_contact_area_sub",    value: "i całe Podkarpacie" },
    { key: "home_contact_form_cta",    value: "Wypełnij formularz kontaktowy" },
    // ── Strona Kontakt ────────────────────────────────────────────────────────
    { key: "kontakt_hero_label",       value: "Skontaktuj się z nami" },
    { key: "kontakt_hero_heading",     value: "Bezpłatna wycena w 24\u00a0h" },
    { key: "kontakt_hero_text",        value: "Masz pytanie o budowę domu, remont lub współpracę? Napisz lub zadzwoń — wycena jest bezpłatna i niezobowiązująca." },
    { key: "kontakt_card_phone_label", value: "Telefon" },
    { key: "kontakt_card_email_label", value: "E-mail" },
    { key: "kontakt_card_area_label",  value: "Obszar działania" },
    { key: "kontakt_card_area_value",  value: "Rzeszów i Podkarpacie" },
    { key: "kontakt_card_hours_label", value: "Godziny pracy" },
    { key: "kontakt_card_hours_value", value: "Pon – Sob" },
    { key: "kontakt_cta_heading",      value: "Wolisz zadzwonić?" },
    { key: "kontakt_cta_text",         value: "Nasz specjalista odpowie na wszystkie pytania i przygotuje wstępną wycenę telefonicznie." },
    { key: "kontakt_form_heading",     value: "Wyślij zapytanie" },
    { key: "kontakt_form_text",        value: "Opisz swoje potrzeby — odpowiemy w ciągu 24h z bezpłatną wyceną." },
    // ── Strona Usługi ─────────────────────────────────────────────────────────
    { key: "uslugi_heading",         value: "Usługi" },
    { key: "uslugi_intro",           value: "Oferujemy kompleksowe usługi budowlane i remontowe — od budowy tarasów i werand po wykończanie wnętrz i remonty pod klucz." },
    { key: "uslugi_related_heading", value: "Powiązane usługi" },
    { key: "uslugi_related_text",    value: "Remont łazienki łączy się z instalacjami hydraulicznymi oraz układaniem płytek w Rzeszowie. Domy szeregowe i budowa od zera? Zobacz naszą ofertę budowy domów szeregowych oraz wykańczania wnętrz pod klucz." },
    { key: "uslugi_cta",             value: "Wyceń remont lub budowę w Rzeszowie" },
    // ── Strona Współpraca ─────────────────────────────────────────────────────
    { key: "wspolpraca_heading",            value: "Współpraca" },
    { key: "wspolpraca_intro",              value: "Szukamy rzetelnych podwykonawców i partnerów do długoterminowej współpracy." },
    { key: "wspolpraca_dla_kogo",           value: "Współpracujemy z ekipami budowlanymi, elektrykami, hydraulikami, dekarzami, tynkarzami, posadzkarzami oraz firmami wykończeniowymi. Liczy się terminowość, jakość i uczciwa wycena." },
    { key: "wspolpraca_dla_kogo_heading",   value: "Dla kogo?" },
    { key: "wspolpraca_oferujemy",          value: JSON.stringify(["Stałe zlecenia przy realizacji domów szeregowych i remontów", "Terminowe płatności zgodnie z umową", "Jasne zakresy prac i harmonogramy", "Możliwość długoterminowej współpracy"]) },
    { key: "wspolpraca_oferujemy_heading",  value: "Co oferujemy" },
    { key: "wspolpraca_kontakt",            value: "Napisz do nas w wiadomości podając: branżę, zakres usług, rejon działania oraz preferowany kontakt. Odpowiadamy w ciągu kilku dni roboczych." },
    { key: "wspolpraca_kontakt_heading",    value: "Jak się skontaktować" },
    { key: "wspolpraca_kontakt_cta",        value: "Formularz kontaktowy" },
    // ── Strona Aktualności ────────────────────────────────────────────────────
    { key: "aktualnosci_heading",   value: "Aktualności" },
    { key: "aktualnosci_intro",     value: "Postępy na budowach, realizacje i informacje z Wilk Development." },
    { key: "aktualnosci_read_more", value: "Czytaj więcej" },
    { key: "aktualnosci_back",      value: "Wróć do aktualności" },
    { key: "aktualnosci_all",       value: "Wszystkie aktualności" },
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
