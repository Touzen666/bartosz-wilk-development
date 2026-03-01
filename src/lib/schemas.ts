/**
 * Wspólne schematy Zod używane zarówno na frontendzie (walidacja formularzy)
 * jak i backendzie (walidacja inputów tRPC / Server Actions).
 *
 * Typy modeli bazy danych generowane są automatycznie z Prisma:
 *   src/generated/zod/index.ts
 * Uruchom `npm run db:generate` żeby odświeżyć po zmianie schema.prisma
 */

import { z } from "zod";

// ─── Formularz kontaktowy ─────────────────────────────────────────────────────

export const contactSchema = z.object({
  name:    z.string().min(2,  "Imię i nazwisko: minimum 2 znaki"),
  email:   z.string().email("Podaj poprawny adres e-mail"),
  phone:   z.string().min(9,  "Numer telefonu: minimum 9 znaków"),
  message: z.string().min(10, "Wiadomość: minimum 10 znaków"),
});

export type ContactInput = z.infer<typeof contactSchema>;

// ─── Re-export typów z bazy danych (generowane z Prisma) ─────────────────────
// Importuj typy modeli z tego pliku zamiast z generated/zod bezpośrednio

export type {
  Project,
  NewsItem,
  Service,
  OfferSection,
} from "~/generated/zod";

export {
  ProjectSchema,
  NewsItemSchema,
  ServiceSchema,
  OfferSectionSchema,
} from "~/generated/zod";
