import "server-only";
import { put, del, list, type PutBlobResult } from "@vercel/blob";

/**
 * Folder structure in Vercel Blob:
 *  images/projects/  — zdjęcia projektów
 *  images/news/      — zdjęcia aktualności
 *  images/hero/      — zdjęcia hero sekcji
 */
export type BlobFolder = "projects" | "news" | "hero";

/**
 * Wgrywa obraz do Vercel Blob Storage.
 * Zwraca publiczny URL do użycia w bazie danych.
 */
export async function uploadImage(
  file: File | Blob,
  folder: BlobFolder,
  filename: string
): Promise<PutBlobResult> {
  const pathname = `images/${folder}/${filename}`;
  return put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
  });
}

/**
 * Usuwa obraz z Vercel Blob Storage po jego URL.
 */
export async function deleteImage(url: string): Promise<void> {
  await del(url);
}

/**
 * Zwraca listę wszystkich obrazów w danym folderze.
 */
export async function listImages(folder: BlobFolder) {
  const result = await list({ prefix: `images/${folder}/` });
  return result.blobs;
}

/**
 * Sprawdza czy podany URL pochodzi z Vercel Blob Storage.
 * Przydatne do warunkowego renderowania z lazy loadingiem.
 */
export function isBlobUrl(url: string): boolean {
  return url.includes(".public.blob.vercel-storage.com");
}

/**
 * Warianty obrazków — określają atrybut `sizes` przekazywany do Next.js <Image>.
 * Przeglądarka pobiera obraz dopasowany do faktycznej szerokości slotu,
 * dzięki czemu telefon nie ściąga zdjęcia w 4K.
 *
 *  card    — miniaturka karty projektu / aktualności (max ~600 px)
 *  article — pełna szerokość artykułu (max ~900 px)
 *  hero    — baner na pełną szerokość ekranu
 */
export type ImageVariant = "card" | "article" | "hero";

const SIZES: Record<ImageVariant, string> = {
  card:    "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  article: "(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px",
  hero:    "100vw",
};

/**
 * Zwraca props dla Next.js <Image> z optymalnym lazy loadingiem, cachowaniem
 * i atrybutem `sizes` dopasowanym do wariantu — przeglądarka pobierze obraz
 * tylko w potrzebnej rozdzielczości (np. 480 px na telefonie zamiast 4K).
 */
export function getImageProps(
  src: string,
  variant: ImageVariant = "card",
  isAboveTheFold = false
): {
  src: string;
  sizes: string;
  loading: "lazy" | "eager";
  priority: boolean;
  fetchPriority: "high" | "low" | "auto";
} {
  return {
    src,
    sizes: SIZES[variant],
    loading: isAboveTheFold ? "eager" : "lazy",
    priority: isAboveTheFold,
    fetchPriority: isAboveTheFold ? "high" : "auto",
  };
}
