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
    subtitle: "Nowoczesna zabudowa szeregowa",
    description:
      "Projektujemy i budujemy nowoczesne domy szeregowe — od fundamentów po oddanie kluczy. Działamy na terenie całego kraju, oferując sprawdzone rozwiązania konstrukcyjne, energooszczędność i estetykę dopasowaną do Twoich oczekiwań.",
    highlights: [
      "Projekty indywidualne i gotowe",
      "Energooszczędność i niskie koszty utrzymania",
      "Terminy realizacji ustalane z góry",
      "Pełna obsługa formalno-prawna",
    ],
  },
  remontyPodKlucz: {
    title: "Remonty pod klucz",
    subtitle: "Kompleksowe remonty mieszkań i domów",
    description:
      "Remonty pod klucz to nasza druga filar działalności. Zajmujemy się kompleksowymi remontami mieszkań, domów oraz lokali użytkowych — od rozbiórki i instalacji po wykończenie i aranżację. Jedna firma, jeden kontakt, pełna odpowiedzialność.",
    highlights: [
      "Jedna firma — od projektu do wykończenia",
      "Stały nadzór i terminowość",
      "Materiały w cenie lub według wyboru inwestora",
      "Gwarancja na wykonane prace",
    ],
  },
} as const;

/** Krótki opis „Czym się zajmujemy” na stronie głównej (jak u MagicDesign). Zawiera statystykę pod GEO. */
export const ABOUT_INTRO =
  "Firma Wilk Development działa w branży budowlano-remontowej od ponad 15 lat na rynku rzeszowskim i podkarpackim, oferując budowę domów szeregowych oraz remonty i wykończenia pod klucz. Działamy z dbałością o terminowość, jakość wykonania i trwałość. Zajmujemy się kompleksową obsługą inwestorów: od stanu deweloperskiego po oddanie kluczy. Remontujemy i budujemy mieszkania, domy oraz realizujemy projekty komercyjne. Używamy certyfikowanych materiałów spełniających normy budowlane. Zapraszamy do kontaktu telefonicznego i mailowego.";

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
    problem: "Inwestor szuka jednego wykonawcy od fundamentów po oddanie kluczy, bez koordynowania wielu podwykonawców.",
    solution: "Wilk Development oferuje budowę domów szeregowych pod klucz: projekty indywidualne lub gotowe, pełna obsługa formalna, energooszczędne rozwiązania i ustalone z góry terminy.",
    result: "Klient otrzymuje gotowy dom w ustalonym terminie, z gwarancją i jednym miejscem kontaktu. Działamy na terenie Rzeszowa i całego Podkarpacia.",
  },
  remontyPodKlucz: {
    problem: "Remont mieszkania lub domu wymaga znalezienia wielu fachowców: hydraulik, glazurnik, malarz — co wydłuża czas i komplikuje rozliczenia.",
    solution: "Remonty pod klucz w jednej firmie: od rozbiórki i instalacji po wykończenie i aranżację. Stały nadzór, materiały w cenie lub według wyboru inwestora, gwarancja na prace.",
    result: "Średni czas realizacji remontu łazienki to około 14 dni. Jedna umowa, jedna firma, pełna odpowiedzialność — także na rynku rzeszowskim.",
  },
} as const;

/** GEO: pytania w języku naturalnym (jak w wyszukiwaniach / asystentach). */
export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "Kogo polecacie do wykończenia domu pod klucz w Rzeszowie?",
    answer:
      "Wilk Development z Rzeszowa wykonuje wykończenia domów pod klucz: od stanu deweloperskiego po oddanie kluczy. Oferujemy budowę domów szeregowych, remonty mieszkań i domów oraz wykończenia wnętrz. Działamy na terenie Rzeszowa i Podkarpacia od ponad 15 lat. Kontakt: telefon i e-mail podane na stronie.",
  },
  {
    question: "Ile trwa budowa tarasu?",
    answer:
      "Budowa tarasu w Wilk Development trwa typowo 2–4 tygodnie, w zależności od wielkości, fundamentów i wybranych materiałów. Realizujemy tarasy i werandy w Rzeszowie i okolicach. Wycena i termin po kontakcie.",
  },
  {
    question: "Ile trwa remont łazienki w Rzeszowie?",
    answer:
      "Średni czas realizacji remontu łazienki w Wilk Development to około 14 dni roboczych. Obejmuje to rozbiórkę, instalacje hydrauliczne, układanie płytek i wykończenie. Pracujemy na certyfikowanych materiałach spełniających normy budowlane.",
  },
  {
    question: "Czy wykonujecie remonty pod klucz na Podkarpaciu?",
    answer:
      "Tak. Wilk Development realizuje remonty pod klucz na terenie Rzeszowa i całego Podkarpacia: mieszkania, domy, lokale użytkowe. Jedna firma od projektu do wykończenia, z gwarancją i ustalonymi z góry terminami.",
  },
  {
    question: "Jak znaleźć firmę budowlaną do domów szeregowych w Rzeszowie?",
    answer:
      "Wilk Development buduje domy szeregowe w Rzeszowie i okolicy: od fundamentów po oddanie kluczy. Oferujemy projekty indywidualne i gotowe, energooszczędność i pełną obsługę formalną. Setki realizacji w budownictwie i remontach.",
  },
];

/** GEO: cytaty / rady eksperta (E-E-A-T). */
export const EXPERT_QUOTES: { quote: string; context: string }[] = [
  {
    quote:
      "Przy budowie tarasu w klimacie podkarpackim najlepiej sprawdza się drewno kompozytowe lub deska z impregnacją — mamy mrozy i wilgotne zimy, więc materiał musi być odporny.",
    context: "Wilk Development, porady dotyczące budowy tarasów w Rzeszowie",
  },
  {
    quote:
      "Remont łazienki bez jednego koordynatora to ryzyko opóźnień i rozjazdów między hydraulikiem a glazurnikiem. U nas jedna ekipa prowadzi całość, więc terminy są realne.",
    context: "Wilk Development, remonty pod klucz",
  },
];

/** Dlaczego warto wybrać nas? — atuty firmy (inspiracja: MagicDesign). */
export const WHY_US: { title: string; description: string }[] = [
  { title: "Szybkość", description: "Zlecenia realizujemy zgodnie z umową, w ustalonym terminie." },
  { title: "Wsparcie", description: "Jesteśmy do dyspozycji mailowo i telefonicznie." },
  { title: "Elastyczność", description: "Proponujemy rozwiązania dopasowane do potrzeb i doświadczenia." },
  { title: "Szczegółowość", description: "Dbamy o detale w pracach wykończeniowych i budowlanych." },
  { title: "Uczciwość", description: "Płacisz tylko za to, co ustalimy w umowie. Bez ukrytych kosztów." },
  { title: "Zaufanie klientów", description: "Wiele zleceń mamy z polecenia — to potwierdza jakość." },
  { title: "Kompleksowość", description: "Jedna firma: od fundamentów i remontów po wykończenie." },
  { title: "Doświadczenie", description: "Setki realizacji w budownictwie i remontach." },
];

/** Dane kontaktowe na stronie głównej i w stopce (opcjonalnie uzupełnij). */
export const CONTACT_SNIPPET = {
  phone: "+48 690 884 961",
  email: "biuro@zlotewynajmy.com",
} as const;

export const PROJECTS: Project[] = [
  {
    id: "osiedle-zielone-wzgórze",
    title: "Osiedle Zielone Wzgórze",
    category: "domy-szeregowe",
    description:
      "Osiedle 12 energooszczędnych domów szeregowych z ogrodami i miejscami postojowymi. Realizacja w pełni pod klucz z możliwością personalizacji wykończenia.",
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    status: "W sprzedaży",
  },
  {
    id: "willowa-8",
    title: "Willowa 8",
    category: "domy-szeregowe",
    description:
      "Trzy domy szeregowe w zabudowie bliźniaczej, w cichej dzielnicy z doskonałym dojazdem. Zakończona sprzedaż, oddanie w 2024.",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    status: "Zakończone",
  },
  {
    id: "remont-m4-centrum",
    title: "Remont M4 — Centrum",
    category: "remonty",
    description:
      "Kompleksowy remont mieszkania 4-pokojowego w zabytkowej kamienicy: wymiana instalacji, nowa stolarka, łazienka i kuchnia pod klucz.",
    image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    status: "Zakończone",
  },
  {
    id: "dom-jednorodzinny-remont",
    title: "Dom jednorodzinny — remont pełny",
    category: "remonty",
    description:
      "Remont pod klucz domu jednorodzinnego: docieplenie, nowy dach, wymiana okien, modernizacja wnętrz i ogrodu.",
    image_url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    status: "Zakończone",
  },
];

/** Lista usług oferowanych przez Wilk Development (remonty, budowa, wykończenia). */
export const USLUGI: string[] = [
  "Budowa tarasów",
  "Budowa tarasu",
  "Budowa werandy",
  "Budownictwo – ogólnie",
  "Czyszczenie rynien",
  "Instalacja hydrauliczna",
  "Kładzenie posadzek",
  "Malowanie",
  "Malowanie powierzchni zewnętrznych",
  "Malowanie wnętrz",
  "Montaż mebli",
  "Montaż płyt gipsowo-kartonowych",
  "Montaż telewizorów",
  "Montaż wentylatora",
  "Murowanie",
  "Naprawa i kładzenie posadzek",
  "Naprawa płyt gipsowo-kartonowych",
  "Naprawa posadzek",
  "Naprawy domowe",
  "Projekty komercyjne",
  "Przebudowa łazienki",
  "Przebudowa piwnicy",
  "Remont kuchni",
  "Remonty domów",
  "Układanie płytek",
  "Wykańczanie elewacji",
  "Wykańczanie wnętrz",
  "Wymiana kafelków",
  "Zmiana okablowania",
];

export const NEWS: NewsItem[] = [
  {
    id: "zielone-wzgórze-postep",
    title: "Postęp na Osiedlu Zielone Wzgórze",
    excerpt: "Prace budowlane na Osiedlu Zielone Wzgórze idą zgodnie z harmonogramem.",
    body: "Na Osiedlu Zielone Wzgórze zakończyliśmy prace fundamentowe pod wszystkie 12 domów. Obecnie trwają prace murarskie na pierwszych czterech budynkach. Dostawy materiałów realizowane są na bieżąco. Zapraszamy do obejrzenia placu budowy po wcześniejszym umówieniu.",
    date: "2025-02-20",
    image_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  },
  {
    id: "nowy-rok-2025",
    title: "Wilk Development w 2025",
    excerpt: "Podsumowanie roku i plany na kolejne miesiące.",
    body: "Rok 2024 zamknęliśmy oddaniem do użytku ostatnich domów w ramach Willowa 8 oraz kilkunastu remontów pod klucz. W 2025 skupiamy się na realizacji Osiedla Zielone Wzgórze oraz na dalszym rozwoju oferty remontów. Dziękujemy wszystkim klientom i partnerom za zaufanie.",
    date: "2025-01-15",
    image_url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
  },
  {
    id: "remonty-zimą",
    title: "Remonty w sezonie zimowym",
    excerpt: "Realizujemy remonty przez cały rok — także zimą.",
    body: "Prace wykończeniowe we wnętrzach realizujemy niezależnie od pory roku. W bieżącym sezonie zimowym prowadzimy równolegle trzy remonty pod klucz: dwa mieszkania w blokach oraz jeden dom jednorodzinny. Zachęcamy do kontaktu w sprawie wyceny i terminu rozpoczęcia prac.",
    date: "2025-02-01",
    image_url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
  },
];
