import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const ProjectScalarFieldEnumSchema = z.enum(['id','title','category','description','imageUrl','status','createdAt','updatedAt']);

export const NewsItemScalarFieldEnumSchema = z.enum(['id','title','excerpt','body','date','imageUrl','createdAt','updatedAt']);

export const ServiceScalarFieldEnumSchema = z.enum(['id','name','order']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','password','role','createdAt','updatedAt']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const SiteConfigScalarFieldEnumSchema = z.enum(['key','value','updatedAt']);

export const FaqItemScalarFieldEnumSchema = z.enum(['id','question','answer','order','createdAt','updatedAt']);

export const ServiceCardScalarFieldEnumSchema = z.enum(['id','title','description','imageUrl','iconName','order','createdAt','updatedAt']);

export const WhyUsItemScalarFieldEnumSchema = z.enum(['id','title','description','order','createdAt','updatedAt']);

export const GeoCitationScalarFieldEnumSchema = z.enum(['id','category','text','order','createdAt','updatedAt']);

export const OfferSectionScalarFieldEnumSchema = z.enum(['id','slug','title','subtitle','description','highlights','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['USER','ADMIN']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  /**
   * Unikalny identyfikator (np. "proj-001")
   */
  id: z.string(),
  /**
   * Nazwa projektu wyświetlana na karcie
   */
  title: z.string(),
  /**
   * Kategoria: "domy-szeregowe" | "remonty"
   */
  category: z.string(),
  /**
   * Opis projektu widoczny po rozwinięciu karty
   */
  description: z.string(),
  /**
   * Ścieżka do zdjęcia głównego (relatywna, np. "/images/proj-001.jpg")
   */
  imageUrl: z.string(),
  /**
   * Status realizacji: "W sprzedaży" | "Zakończone"
   */
  status: z.string(),
  /**
   * Data dodania rekordu (ustawiana automatycznie)
   */
  createdAt: z.coerce.date(),
  /**
   * Data ostatniej modyfikacji (aktualizowana automatycznie)
   */
  updatedAt: z.coerce.date(),
})

export type Project = z.infer<typeof ProjectSchema>

/////////////////////////////////////////
// NEWS ITEM SCHEMA
/////////////////////////////////////////

export const NewsItemSchema = z.object({
  /**
   * Unikalny identyfikator (np. "news-001")
   */
  id: z.string(),
  /**
   * Tytuł artykułu
   */
  title: z.string(),
  /**
   * Krótki opis (zajawka) wyświetlany na liście aktualności
   */
  excerpt: z.string(),
  /**
   * Pełna treść artykułu (może zawierać HTML lub Markdown)
   */
  body: z.string(),
  /**
   * Data publikacji w formacie ISO (np. "2024-03-01")
   */
  date: z.string(),
  /**
   * Ścieżka do zdjęcia artykułu (relatywna)
   */
  imageUrl: z.string(),
  /**
   * Data dodania rekordu (ustawiana automatycznie)
   */
  createdAt: z.coerce.date(),
  /**
   * Data ostatniej modyfikacji (aktualizowana automatycznie)
   */
  updatedAt: z.coerce.date(),
})

export type NewsItem = z.infer<typeof NewsItemSchema>

/////////////////////////////////////////
// SERVICE SCHEMA
/////////////////////////////////////////

export const ServiceSchema = z.object({
  /**
   * Unikalny identyfikator (np. "s-0")
   */
  id: z.string(),
  /**
   * Nazwa usługi wyświetlana na stronie
   */
  name: z.string(),
  /**
   * Kolejność wyświetlania na liście (rosnąco, domyślnie 0)
   */
  order: z.number().int(),
})

export type Service = z.infer<typeof ServiceSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  /**
   * Hashed password (bcrypt) — null dla kont OAuth
   */
  password: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// SITE CONFIG SCHEMA
/////////////////////////////////////////

export const SiteConfigSchema = z.object({
  key: z.string(),
  value: z.string(),
  updatedAt: z.coerce.date(),
})

export type SiteConfig = z.infer<typeof SiteConfigSchema>

/////////////////////////////////////////
// FAQ ITEM SCHEMA
/////////////////////////////////////////

export const FaqItemSchema = z.object({
  id: z.string().cuid(),
  question: z.string(),
  answer: z.string(),
  order: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type FaqItem = z.infer<typeof FaqItemSchema>

/////////////////////////////////////////
// SERVICE CARD SCHEMA
/////////////////////////////////////////

export const ServiceCardSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  /**
   * Nazwa ikony z lucide-react (np. "Building2", "Paintbrush")
   */
  iconName: z.string(),
  order: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ServiceCard = z.infer<typeof ServiceCardSchema>

/////////////////////////////////////////
// WHY US ITEM SCHEMA
/////////////////////////////////////////

export const WhyUsItemSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  description: z.string(),
  order: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type WhyUsItem = z.infer<typeof WhyUsItemSchema>

/////////////////////////////////////////
// GEO CITATION SCHEMA
/////////////////////////////////////////

export const GeoCitationSchema = z.object({
  /**
   * Unikalny identyfikator (np. "geo-001")
   */
  id: z.string(),
  /**
   * Kategoria tematyczna zdania
   */
  category: z.string(),
  /**
   * Treść zdania zoptymalizowanego pod cytowanie przez AI
   */
  text: z.string(),
  /**
   * Kolejność wyświetlania w ramach kategorii (rosnąco)
   */
  order: z.number().int(),
  /**
   * Data dodania rekordu (ustawiana automatycznie)
   */
  createdAt: z.coerce.date(),
  /**
   * Data ostatniej modyfikacji (aktualizowana automatycznie)
   */
  updatedAt: z.coerce.date(),
})

export type GeoCitation = z.infer<typeof GeoCitationSchema>

/////////////////////////////////////////
// OFFER SECTION SCHEMA
/////////////////////////////////////////

export const OfferSectionSchema = z.object({
  /**
   * Unikalny identyfikator (np. "offer-domy")
   */
  id: z.string(),
  /**
   * Identyfikator w URL (np. "domy-szeregowe", "remonty-pod-klucz") — musi być unikalny
   */
  slug: z.string(),
  /**
   * Nagłówek sekcji oferty
   */
  title: z.string(),
  /**
   * Podtytuł sekcji oferty
   */
  subtitle: z.string(),
  /**
   * Pełny opis oferty
   */
  description: z.string(),
  /**
   * Lista punktów kluczowych oferty (przechowywana jako JSON, np. ["Punkt 1","Punkt 2"])
   */
  highlights: z.string(),
  /**
   * Data dodania rekordu (ustawiana automatycznie)
   */
  createdAt: z.coerce.date(),
  /**
   * Data ostatniej modyfikacji (aktualizowana automatycznie)
   */
  updatedAt: z.coerce.date(),
})

export type OfferSection = z.infer<typeof OfferSectionSchema>
