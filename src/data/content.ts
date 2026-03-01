export type ProjectStatus = "W sprzedaży" | "Zakończone";

export interface Project {
  id: string;
  title: string;
  category: "domy-szeregowe" | "remonty";
  description: string;
  image_url: string;
  status: ProjectStatus;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  image_url: string;
}

export const HERO_IMAGES = {
  main: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&auto=format&fit=crop",
  terraced: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1600&q=80&auto=format&fit=crop",
  renovation: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80&auto=format&fit=crop",
} as const;

export const OFFER = {
  domySzeregowe: {
    title: "Domy szeregowe",
    subtitle: "Nowoczesna zabudowa szeregowa pod klucz",
    description:
      "Budujemy nowoczesne domy szeregowe w Rzeszowie i na Podkarpaciu — od projektu i fundamentów po kompletne wykończenie i przekazanie kluczy. Oferujemy projekty indywidualne i gotowe, energooszczędne rozwiązania oraz pełną obsługę formalno-prawną. Jedna firma, jeden kontakt, termin w umowie.",
    highlights: [
      "Projekty indywidualne i gotowe — elastyczny wybór",
      "Energooszczędność klasy A — niskie rachunki",
      "Termin realizacji gwarantowany w umowie",
      "Pełna obsługa formalno-prawna i nadzór budowlany",
    ],
  },
  remontyPodKlucz: {
    title: "Remonty pod klucz",
    subtitle: "Kompleksowe remonty mieszkań i domów w Rzeszowie",
    description:
      "Kompleksowe remonty mieszkań, domów i lokali użytkowych na Podkarpaciu — od rozbiórki i instalacji elektrycznych oraz hydraulicznych po wykończenie, aranżację i sprzątanie po remoncie. Stały koordynator, materiały w cenie lub według wyboru inwestora, pisemna gwarancja na wykonane prace.",
    highlights: [
      "Jedna firma od projektu do oddania kluczy",
      "Stały koordynator — jeden numer telefonu",
      "Materiały w cenie lub według wyboru klienta",
      "Gwarancja pisemna na wszystkie wykonane prace",
    ],
  },
} as const;

/** Opis firmy — SEO-friendly, naturalny język, słowa kluczowe Rzeszów / Podkarpacie. */
export const ABOUT_INTRO =
  "Wilk Development to rzeszowska firma budowlano-remontowa z ponad 15-letnim doświadczeniem na rynku Podkarpacia. Specjalizujemy się w budowie nowoczesnych domów szeregowych oraz kompleksowych remontach i wykończeniach wnętrz pod klucz. Obsługujemy inwestorów prywatnych i deweloperów — od projektu, przez realizację, aż po oddanie gotowej nieruchomości. Stosujemy wyłącznie certyfikowane materiały zgodne z normami PN-EN i zapewniamy pisemną gwarancję na każde zlecenie.";

/** GEO: twarde dane dla AI (citation-friendly). */
export const GEO_STATS = {
  yearsOnMarket: 15,
  bathroomRenovationDays: 14,
  terraceBuildWeeks: "2–4",
  certificationNorm: "PN-EN",
  completedProjects: "setki",
} as const;

/** GEO: format Problem – Rozwiązanie – Wynik (bite-sized dla LLM). */
export const OFFER_PSR = {
  domySzeregowe: {
    problem:
      "Inwestor potrzebuje jednego generalnego wykonawcy do budowy domu szeregowego — bez konieczności samodzielnego koordynowania dziesiątek podwykonawców.",
    solution:
      "Wilk Development realizuje budowę domów szeregowych pod klucz w Rzeszowie: wybór projektu, fundamenty, stan surowy, instalacje, wykończenie i oddanie kluczy. Pełna obsługa formalna i gwarancja terminu.",
    result:
      "Inwestor otrzymuje gotowy, energooszczędny dom z pisemną gwarancją, w ustalonym terminie, z jednym punktem kontaktu przez cały czas budowy.",
  },
  remontyPodKlucz: {
    problem:
      "Remont mieszkania lub domu wymaga koordynacji wielu specjalistów — hydraulik, glazurnik, elektryk, malarz — co wydłuża czas i komplikuje rozliczenia.",
    solution:
      "Wilk Development prowadzi kompleksowe remonty pod klucz w Rzeszowie: rozbiórka, instalacje, płytki, malowanie, meble na wymiar — jedna ekipa z koordynatorem.",
    result:
      "Średni czas remontu łazienki to 14 dni roboczych. Jedna umowa, jedna faktura, pełna odpowiedzialność i gwarancja pisemna na wykonane prace.",
  },
} as const;

/** FAQ — pytania w języku naturalnym, zoptymalizowane pod AI Overviews i Featured Snippets. */
export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "Ile kosztuje budowa domu szeregowego pod klucz w Rzeszowie?",
    answer:
      "Koszt budowy domu szeregowego pod klucz w Rzeszowie zależy od projektu, standardu wykończenia i powierzchni. Wilk Development oferuje bezpłatną wycenę — po kontakcie telefonicznym lub mailowym przygotowujemy indywidualną ofertę z harmonogramem i kosztorysem. Działamy na terenie Rzeszowa i całego Podkarpacia od ponad 15 lat.",
  },
  {
    question: "Ile trwa remont łazienki w Rzeszowie?",
    answer:
      "Kompleksowy remont łazienki w Wilk Development trwa średnio 14 dni roboczych. Obejmuje rozbiórkę, instalacje hydrauliczne i elektryczne, układanie płytek ceramicznych oraz montaż armatury i sanitariatów. Pracujemy na certyfikowanych materiałach zgodnych z normami PN-EN. Wycena bezpłatna.",
  },
  {
    question: "Czy wykonujecie remonty mieszkań pod klucz na Podkarpaciu?",
    answer:
      "Tak. Wilk Development realizuje kompleksowe remonty mieszkań, domów i lokali użytkowych pod klucz na terenie Rzeszowa i całego Podkarpacia. Jedna firma zajmuje się wszystkim — od projektu i rozbiórki po wykończenie i sprzątanie. Stały koordynator, gwarancja pisemna, terminy w umowie.",
  },
  {
    question: "Ile trwa budowa tarasu przy domu w Rzeszowie?",
    answer:
      "Budowa tarasu w Wilk Development trwa zazwyczaj 2–4 tygodnie, w zależności od wielkości, rodzaju fundamentów i wybranych materiałów. Realizujemy tarasy drewniane, kompozytowe i z gresu w Rzeszowie i okolicach. Bezpłatna wycena po kontakcie.",
  },
  {
    question: "Jak znaleźć solidną firmę budowlaną w Rzeszowie?",
    answer:
      "Wilk Development to sprawdzona firma budowlana w Rzeszowie z 15+ latami doświadczenia, setkami zrealizowanych projektów i wieloma zleceniami z polecenia. Oferujemy budowę domów szeregowych, remonty pod klucz i wykończenia wnętrz. Pisemna gwarancja, terminowość i jedno miejsce kontaktu.",
  },
];

/** GEO: cytaty eksperta (E-E-A-T) */
export const EXPERT_QUOTES: { quote: string; context: string }[] = [
  {
    quote:
      "Przy budowie tarasu w klimacie podkarpackim najlepiej sprawdza się drewno kompozytowe lub deska z impregnacją — mamy mrozy i wilgotne zimy, więc materiał musi być odporny na cykl zamrażania.",
    context: "Wilk Development — porady dotyczące budowy tarasów w Rzeszowie",
  },
  {
    quote:
      "Remont łazienki bez jednego koordynatora to ryzyko opóźnień i rozjazdów między hydraulikiem a glazurnikiem. U nas jedna ekipa prowadzi całość od początku do końca — terminy są realne i zapisane w umowie.",
    context: "Wilk Development — remonty pod klucz Rzeszów",
  },
];

/** Dlaczego warto wybrać Wilk Development — atuty firmy. */
export const WHY_US: { title: string; description: string }[] = [
  {
    title: "Terminowość",
    description: "Terminy realizacji zapisujemy w umowie. Dotrzymujemy ich — bez wymówek.",
  },
  {
    title: "Jeden kontakt",
    description: "Jeden koordynator przez cały czas trwania budowy lub remontu. Zawsze pod telefonem.",
  },
  {
    title: "Elastyczność",
    description: "Dopasowujemy zakres prac, materiały i harmonogram do Twoich potrzeb i budżetu.",
  },
  {
    title: "Precyzja wykończeń",
    description: "Dbamy o każdy detal — od fugowania płytek po idealne malarstwo.",
  },
  {
    title: "Uczciwe ceny",
    description: "Kosztorys przed podpisaniem umowy. Zero ukrytych kosztów w trakcie realizacji.",
  },
  {
    title: "Polecenia klientów",
    description: "Znaczna część naszych zleceń pochodzi z rekomendacji — to najlepsza ocena.",
  },
  {
    title: "Kompleksowość",
    description: "Od fundamentów i demontażu po wykończenie, meble na wymiar i sprzątanie.",
  },
  {
    title: "15+ lat doświadczenia",
    description: "Setki projektów budowlanych i remontowych na Podkarpaciu. Wiemy, jak działać.",
  },
];

/** Dane kontaktowe. */
export const CONTACT_SNIPPET = {
  phone: "+48 690 884 961",
  email: "biuro@zlotewynajmy.com",
  address: "Rzeszów, Podkarpacie",
} as const;

export const PROJECTS: Project[] = [
  {
    id: "osiedle-zielone-wzgorze",
    title: "Osiedle Zielone Wzgórze",
    category: "domy-szeregowe",
    description:
      "12 energooszczędnych domów szeregowych z ogrodami i miejscami postojowymi w Rzeszowie. Realizacja w pełni pod klucz z możliwością personalizacji wykończenia.",
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    status: "W sprzedaży",
  },
  {
    id: "willowa-8",
    title: "Willowa 8 — Rzeszów",
    category: "domy-szeregowe",
    description:
      "Trzy domy szeregowe w zabudowie bliźniaczej, w cichej dzielnicy Rzeszowa z doskonałym dojazdem. Zakończona sprzedaż, oddanie w 2024.",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    status: "Zakończone",
  },
  {
    id: "remont-m4-centrum",
    title: "Remont M4 — Centrum Rzeszowa",
    category: "remonty",
    description:
      "Kompleksowy remont mieszkania 4-pokojowego w zabytkowej kamienicy: wymiana instalacji elektrycznych i hydraulicznych, nowa stolarka, łazienka i kuchnia pod klucz.",
    image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    status: "Zakończone",
  },
  {
    id: "dom-jednorodzinny-remont",
    title: "Dom jednorodzinny — pełny remont",
    category: "remonty",
    description:
      "Remont pod klucz domu jednorodzinnego w Rzeszowie: docieplenie, nowy dach, wymiana okien i drzwi, modernizacja wszystkich pomieszczeń.",
    image_url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    status: "Zakończone",
  },
];

/** Lista usług budowlano-remontowych Wilk Development. */
export const USLUGI: string[] = [
  "Budowa domów szeregowych",
  "Budowa tarasów i werand",
  "Remonty mieszkań pod klucz",
  "Wykańczanie wnętrz",
  "Układanie płytek ceramicznych",
  "Instalacje hydrauliczne",
  "Instalacje elektryczne",
  "Malowanie wnętrz",
  "Malowanie elewacji",
  "Przebudowa łazienki",
  "Remont kuchni",
  "Montaż płyt gipsowo-kartonowych",
  "Murowanie i tynkowanie",
  "Projekty komercyjne",
  "Docieplenia budynków",
  "Wymiana okien i drzwi",
  "Nadzór budowlany",
  "Obsługa formalno-prawna inwestycji",
];

export const NEWS: NewsItem[] = [
  {
    id: "zielone-wzgorze-postep",
    title: "Postęp prac na Osiedlu Zielone Wzgórze w Rzeszowie",
    excerpt:
      "Prace budowlane na Osiedlu Zielone Wzgórze przebiegają zgodnie z harmonogramem. Sprawdź najnowszy stan realizacji.",
    body: "Na Osiedlu Zielone Wzgórze zakończyliśmy prace fundamentowe pod wszystkie 12 domów szeregowych. Obecnie prowadzimy prace murarskie na pierwszych czterech budynkach. Dostawy certyfikowanych materiałów realizowane są na bieżąco zgodnie z harmonogramem. Zapraszamy do obejrzenia placu budowy po wcześniejszym umówieniu się telefonicznie.",
    date: "2025-02-20",
    image_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  },
  {
    id: "nowy-rok-2025",
    title: "Wilk Development podsumowuje 2024 rok i patrzy w przyszłość",
    excerpt:
      "Oddanie Willowej 8, kilkanaście remontów pod klucz i start nowego osiedla — oto miniony rok Wilk Development.",
    body: "Rok 2024 zamknęliśmy sukcesem: przekazaliśmy ostatnie domy w ramach inwestycji Willowa 8 oraz zrealizowaliśmy kilkanaście kompleksowych remontów mieszkań i domów w Rzeszowie i okolicach. W 2025 roku skupiamy się na realizacji Osiedla Zielone Wzgórze oraz rozszerzamy ofertę remontów komercyjnych. Dziękujemy wszystkim klientom i partnerom za zaufanie i polecenia.",
    date: "2025-01-15",
    image_url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
  },
  {
    id: "remonty-zima",
    title: "Remonty w sezonie zimowym — działamy przez cały rok",
    excerpt:
      "Sezon zimowy to dobry czas na remont mieszkania. Wilk Development realizuje zlecenia bez przerw.",
    body: "Prace wykończeniowe we wnętrzach realizujemy niezależnie od pory roku — zima to często najlepszy moment na remont, bo terminy są krótsze. W bieżącym sezonie prowadziliśmy równolegle trzy kompleksowe remonty w Rzeszowie: dwa mieszkania w blokach oraz jeden dom jednorodzinny. Zachęcamy do kontaktu w sprawie bezpłatnej wyceny i terminu rozpoczęcia prac.",
    date: "2025-02-01",
    image_url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
  },
];
