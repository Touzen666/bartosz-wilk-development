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
 * Zwraca props dla Next.js <Image> z optymalnym lazy loadingiem i cachowaniem.
 * Obrazy blob — lazy loading (domyślny).
 * Obrazy hero (LCP) — eager + priority.
 */
export function getImageProps(
  src: string,
  isAboveTheFold = false
): {
  src: string;
  loading: "lazy" | "eager";
  priority: boolean;
  fetchPriority: "high" | "low" | "auto";
} {
  return {
    src,
    loading: isAboveTheFold ? "eager" : "lazy",
    priority: isAboveTheFold,
    fetchPriority: isAboveTheFold ? "high" : "auto",
  };
}
