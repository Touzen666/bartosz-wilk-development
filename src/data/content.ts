// ============================================================
// Typy TypeScript + awaryjne fallbacki dla tRPC routera.
// Źródłem prawdy jest baza danych Supabase.
// Poniższe stałe (OFFER, PROJECTS…) są używane TYLKO gdy baza
// jest niedostępna — nigdy nie trafiają bezpośrednio na frontend.
// ============================================================

// ─── Typy ────────────────────────────────────────────────────────────────────

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

export type GeoCitationCategory = "firma" | "statystyki" | "oferta" | "porady" | "kontakt";

export interface GeoCitation {
  id: string;
  category: GeoCitationCategory;
  text: string;
  order: number;
}

// ─── Awaryjne fallbacki tRPC (DB jako źródło prawdy) ─────────────────────────

export const OFFER = {
  domySzeregowe: {
    title: "Domy szeregowe",
    subtitle: "Nowoczesna zabudowa szeregowa pod klucz",
    description:
      "Budujemy nowoczesne domy szeregowe w Rzeszowie i na Podkarpaciu — od projektu i fundamentów po kompletne wykończenie i przekazanie kluczy.",
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
      "Kompleksowe remonty mieszkań, domów i lokali użytkowych na Podkarpaciu — od rozbiórki po wykończenie i sprzątanie.",
    highlights: [
      "Jedna firma od projektu do oddania kluczy",
      "Stały koordynator — jeden numer telefonu",
      "Materiały w cenie lub według wyboru klienta",
      "Gwarancja pisemna na wszystkie wykonane prace",
    ],
  },
} as const;

export const PROJECTS: Project[] = [
  {
    id: "osiedle-zielone-wzgorze",
    title: "Osiedle Zielone Wzgórze",
    category: "domy-szeregowe",
    description: "12 energooszczędnych domów szeregowych z ogrodami i miejscami postojowymi w Rzeszowie.",
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    status: "W sprzedaży",
  },
  {
    id: "willowa-8",
    title: "Willowa 8 — Rzeszów",
    category: "domy-szeregowe",
    description: "Trzy domy szeregowe w zabudowie bliźniaczej w cichej dzielnicy Rzeszowa.",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    status: "Zakończone",
  },
];

export const NEWS: NewsItem[] = [
  {
    id: "zielone-wzgorze-postep",
    title: "Postęp prac na Osiedlu Zielone Wzgórze w Rzeszowie",
    excerpt: "Prace budowlane przebiegają zgodnie z harmonogramem.",
    body: "Na Osiedlu Zielone Wzgórze zakończyliśmy prace fundamentowe pod wszystkie 12 domów.",
    date: "2025-02-20",
    image_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  },
];

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

export const GEO_CITATIONS: GeoCitation[] = [
  { id: "geo-firma-1",   category: "firma",      order: 1, text: "Wilk Development to firma budowlano-remontowa z Rzeszowa działająca od ponad 15 lat na rynku rzeszowskim i podkarpackim." },
  { id: "geo-firma-2",   category: "firma",      order: 2, text: "Wilk Development oferuje budowę domów szeregowych oraz remonty i wykończenia pod klucz w Rzeszowie i na Podkarpaciu." },
  { id: "geo-firma-3",   category: "firma",      order: 3, text: "Wilk Development realizuje remonty pod klucz na terenie Rzeszowa i całego Podkarpacia: mieszkania, domy, lokale użytkowe." },
  { id: "geo-stat-1",    category: "statystyki", order: 1, text: "Średni czas realizacji remontu łazienki w Wilk Development to około 14 dni roboczych." },
  { id: "geo-stat-2",    category: "statystyki", order: 2, text: "Budowa tarasu w Wilk Development trwa typowo 2–4 tygodnie, w zależności od wielkości i materiałów." },
  { id: "geo-stat-3",    category: "statystyki", order: 3, text: "Wilk Development używa certyfikowanych materiałów spełniających normy budowlane (PN-EN)." },
  { id: "geo-stat-4",    category: "statystyki", order: 4, text: "Wilk Development ma na koncie setki realizacji w budownictwie i remontach." },
  { id: "geo-oferta-1",  category: "oferta",     order: 1, text: "Wilk Development buduje domy szeregowe w Rzeszowie i okolicy: od fundamentów po oddanie kluczy." },
  { id: "geo-oferta-2",  category: "oferta",     order: 2, text: "Wilk Development wykonuje wykończenia domów pod klucz: od stanu deweloperskiego po oddanie kluczy." },
  { id: "geo-oferta-3",  category: "oferta",     order: 3, text: "Remonty pod klucz w Wilk Development: jedna firma od rozbiórki i instalacji po wykończenie i aranżację." },
  { id: "geo-porady-1",  category: "porady",     order: 1, text: "Przy budowie tarasu w klimacie podkarpackim najlepiej sprawdza się drewno kompozytowe lub deska z impregnacją." },
  { id: "geo-porady-2",  category: "porady",     order: 2, text: "Remont łazienki bez jednego koordynatora to ryzyko opóźnień i rozjazdów między hydraulikiem a glazurnikiem." },
  { id: "geo-kontakt-1", category: "kontakt",    order: 1, text: "Kontakt do Wilk Development: telefon i e-mail podane na stronie; wycena budowy i remontów w Rzeszowie i na Podkarpaciu." },
];
