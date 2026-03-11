import { auth } from "~/auth";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard | Admin" };

export default async function AdminDashboardPage() {
  const session = await auth();

  return (
    <div style={{ maxWidth: "48rem" }}>
      <h1 style={{
        fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
        fontWeight: 800,
        fontSize: "1.75rem",
        color: "var(--navy, #0a121e)",
        letterSpacing: "-0.02em",
      }}>
        Dashboard
      </h1>
      <p style={{ marginTop: "0.5rem", color: "#64748b", fontSize: "0.9375rem" }}>
        Witaj, <strong>{session?.user?.name ?? session?.user?.email}</strong>. Rola:{" "}
        <code style={{
          background: "#f1f5f9",
          padding: "0.1rem 0.4rem",
          fontSize: "0.8125rem",
          fontWeight: 700,
          color: "var(--navy, #0a121e)",
        }}>
          {session?.user?.role}
        </code>
      </p>

      {/* Placeholder — funkcjonalności do dodania w kolejnym etapie */}
      <div style={{
        marginTop: "2.5rem",
        padding: "3rem 2rem",
        border: "2px dashed #cbd5e1",
        textAlign: "center",
        color: "#94a3b8",
      }}>
        <p style={{ fontSize: "1rem", fontWeight: 600 }}>Funkcjonalności w przygotowaniu</p>
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>
          Zarządzanie projektami, aktualnościami i treściami strony.
        </p>
      </div>
    </div>
  );
}
