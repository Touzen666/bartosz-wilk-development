import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Strona nie istnieje | Wilk Development",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1.25rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <span
        style={{
          fontSize: "5rem",
          fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
          fontWeight: 800,
          color: "var(--gold, #c8920a)",
          lineHeight: 1,
        }}
      >
        404
      </span>
      <h1
        style={{
          fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          color: "var(--navy, #0f1f2e)",
        }}
      >
        Strona nie istnieje
      </h1>
      <p style={{ color: "var(--slate, #6b7280)", maxWidth: "30rem", lineHeight: 1.7 }}>
        Mogła zostać przeniesiona lub usunięta. Skorzystaj z nawigacji lub wróć na stronę główną.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.5rem" }}>
        <Link href="/" className="wp-btn-primary">
          Strona główna
        </Link>
        <Link href="/kontakt" className="wp-btn-outline">
          Kontakt
        </Link>
      </div>
    </div>
  );
}
