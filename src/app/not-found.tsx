import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Strona nie istnieje | Wilk Development",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--navy)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(240,165,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(240,165,0,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: "clamp(300px, 60vw, 700px)",
          height: "clamp(300px, 60vw, 700px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(240,165,0,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "0",
        }}
      >
        <span className="section-label-dash" style={{ marginBottom: "1.5rem" }}>
          Błąd strony
        </span>

        <div
          style={{
            fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
            fontSize: "clamp(7rem, 22vw, 16rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.05em",
            color: "transparent",
            WebkitTextStroke: "2px var(--gold)",
            textShadow: "0 0 80px rgba(240,165,0,0.18)",
            userSelect: "none",
            marginBottom: "1rem",
          }}
        >
          404
        </div>

        <div
          style={{
            width: "4rem",
            height: "3px",
            background: "var(--gold)",
            borderRadius: "2px",
            marginBottom: "1.75rem",
          }}
        />

        <h1
          style={{
            fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 700,
            color: "var(--white)",
            marginBottom: "1rem",
          }}
        >
          Strona nie istnieje
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            maxWidth: "28rem",
            lineHeight: 1.75,
            fontSize: "1rem",
            marginBottom: "2.25rem",
          }}
        >
          Mogła zostać przeniesiona lub usunięta. Skorzystaj z nawigacji
          lub wróć na stronę główną.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link href="/" className="wp-btn-primary">
            ← Strona główna
          </Link>
          <Link href="/kontakt" className="wp-btn-outline">
            Kontakt
          </Link>
        </div>
      </div>
    </div>
  );
}
