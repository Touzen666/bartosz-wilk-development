import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const ProjectScalarFieldEnumSchema = z.enum(['id','title','category','description','imageUrl','status','createdAt','updatedAt']);

export const NewsItemScalarFieldEnumSchema = z.enum(['id','title','excerpt','body','date','imageUrl','createdAt','updatedAt']);

export const ServiceScalarFieldEnumSchema = z.enum(['id','name','order']);

export const OfferSectionScalarFieldEnumSchema = z.enum(['id','slug','title','subtitle','description','highlights','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  status: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Project = z.infer<typeof ProjectSchema>

/////////////////////////////////////////
// NEWS ITEM SCHEMA
/////////////////////////////////////////

export const NewsItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  body: z.string(),
  date: z.string(),
  imageUrl: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type NewsItem = z.infer<typeof NewsItemSchema>

/////////////////////////////////////////
// SERVICE SCHEMA
/////////////////////////////////////////

export const ServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  order: z.number().int(),
})

export type Service = z.infer<typeof ServiceSchema>

/////////////////////////////////////////
// OFFER SECTION SCHEMA
/////////////////////////////////////////

export const OfferSectionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  highlights: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type OfferSection = z.infer<typeof OfferSectionSchema>
