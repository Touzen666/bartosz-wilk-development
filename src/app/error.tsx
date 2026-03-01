"use client";

import Link from "next/link";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1.5rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
          color: "var(--navy, #0f1f2e)",
        }}
      >
        Coś poszło nie tak
      </h2>
      <p style={{ color: "var(--slate, #6b7280)", maxWidth: "30rem", lineHeight: 1.7 }}>
        Wystąpił nieoczekiwany błąd. Odśwież stronę lub wróć na stronę główną.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={reset}
          className="wp-btn-primary"
        >
          Spróbuj ponownie
        </button>
        <Link href="/" className="wp-btn-outline">
          Strona główna
        </Link>
      </div>
    </div>
  );
}
