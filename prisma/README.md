# Baza danych — Prisma + SQLite

## Co to jest i po co?

Aplikacja aktualnie trzyma dane (projekty, aktualności, oferta, usługi) w pliku `src/data/content.ts`.
Prisma to przygotowana baza danych SQLite, która w przyszłości zastąpi ten plik — umożliwi edytowanie treści bez konieczności zmiany kodu i ponownego deployowania strony.

---

## Pliki

| Plik | Opis |
|---|---|
| `prisma/schema.prisma` | Definicja tabelek w bazie danych |
| `prisma/seed.ts` | Skrypt wgrywający dane z `content.ts` do bazy |
| `prisma/dev.db` | Plik bazy danych SQLite (lokalny) |
| `src/generated/zod/` | Automatycznie generowane typy (nie edytuj ręcznie) |

---

## Tabelki w bazie

### `Project` — Projekty

| Kolumna | Typ | Opis |
|---|---|---|
| `id` | String (PK) | Unikalny identyfikator |
| `title` | String | Nazwa projektu |
| `category` | String | `"domy-szeregowe"` lub `"remonty"` |
| `description` | String | Opis projektu |
| `imageUrl` | String | Ścieżka do zdjęcia głównego |
| `status` | String | `"W sprzedaży"` lub `"Zakończone"` |
| `createdAt` | DateTime | Data dodania (automatyczna) |
| `updatedAt` | DateTime | Data ostatniej zmiany (automatyczna) |

### `NewsItem` — Aktualności

| Kolumna | Typ | Opis |
|---|---|---|
| `id` | String (PK) | Unikalny identyfikator |
| `title` | String | Tytuł artykułu |
| `excerpt` | String | Krótki opis (zajawka) |
| `body` | String | Pełna treść artykułu |
| `date` | String | Data publikacji (format ISO, np. `2024-03-01`) |
| `imageUrl` | String | Ścieżka do zdjęcia |
| `createdAt` | DateTime | Data dodania (automatyczna) |
| `updatedAt` | DateTime | Data ostatniej zmiany (automatyczna) |

### `Service` — Usługi

| Kolumna | Typ | Opis |
|---|---|---|
| `id` | String (PK) | Unikalny identyfikator |
| `name` | String | Nazwa usługi |
| `order` | Int | Kolejność wyświetlania (domyślnie 0) |

### `OfferSection` — Sekcje oferty

| Kolumna | Typ | Opis |
|---|---|---|
| `id` | String (PK) | Unikalny identyfikator |
| `slug` | String (unikalny) | Identyfikator URL, np. `"domy-szeregowe"` |
| `title` | String | Nagłówek sekcji |
| `subtitle` | String | Podtytuł sekcji |
| `description` | String | Opis oferty |
| `highlights` | String | Lista punktów kluczowych (JSON) |
| `createdAt` | DateTime | Data dodania (automatyczna) |
| `updatedAt` | DateTime | Data ostatniej zmiany (automatyczna) |

---

## Pierwsze uruchomienie (konfiguracja od zera)

### 1. Ustaw plik `.env`

Skopiuj `.env.example` i zapisz jako `.env`:

```
DATABASE_URL="file:./dev.db"
```

### 2. Zsynchronizuj schemat z bazą

```bash
npm run db:push
```

### 3. Wgraj dane początkowe

```bash
npm run db:seed
```

Seed kopiuje wszystkie dane z `src/data/content.ts` do bazy. Można go uruchamiać wielokrotnie — za każdym razem czyści tabelki i wgrywa je od nowa.

---

## Codzienne komendy

```bash
# Podejrzyj bazę w przeglądarce (panel graficzny)
npm run db:studio
# → otwiera http://localhost:5555

# Po zmianie schema.prisma — zaktualizuj bazę
npm run db:push

# Po zmianie schema.prisma — zaktualizuj wygenerowane typy TypeScript
npm run db:generate

# Wgraj dane ponownie (np. po dodaniu nowego wpisu do content.ts)
npm run db:seed
```

---

## Jak edytować dane przez panel

1. Uruchom `npm run db:studio`
2. Otwórz `http://localhost:5555` w przeglądarce
3. Wybierz tabelkę (np. `NewsItem`)
4. Kliknij rekord żeby go edytować lub dodaj nowy przyciskiem `+ Add record`
5. Zatwierdź przyciskiem `Save 1 change`

---

## Jak dodać nowe pole do tabelki

1. Edytuj `prisma/schema.prisma` — dodaj pole do odpowiedniego modelu
2. Uruchom `npm run db:push` — Prisma doda kolumnę do bazy
3. Uruchom `npm run db:generate` — zaktualizuje typy TypeScript
4. Jeśli pole ma domyślną wartość, uruchom `npm run db:seed` żeby uzupełnić istniejące rekordy

---

## Jak przełączyć aplikację na czytanie z bazy zamiast z `content.ts`

Aktualnie tRPC routery czytają dane z `src/data/content.ts`.
Żeby przełączyć na bazę danych, w każdym routerze (`src/server/api/routers/`) zamień importy z `content.ts` na wywołania Prisma, np.:

```ts
// Przed (content.ts)
import { PROJECTS } from "~/data/content";
return PROJECTS;

// Po (Prisma)
import { db } from "~/server/db";
return db.project.findMany();
```
