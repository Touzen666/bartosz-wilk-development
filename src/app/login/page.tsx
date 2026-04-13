"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Nieprawidłowy email lub hasło.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--navy, #0a121e)",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "24rem",
        padding: "2.5rem",
        background: "white",
        boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
      }}>
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <p style={{
            fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
            fontWeight: 800,
            fontSize: "1.5rem",
            color: "var(--navy, #0a121e)",
            letterSpacing: "-0.02em",
          }}>
            Wilk Development
          </p>
          <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#64748b" }}>
            Panel administracyjny
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#374151", marginBottom: "0.375rem" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{
                width: "100%",
                padding: "0.625rem 0.875rem",
                border: "1px solid #d1d5db",
                fontSize: "0.9375rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#374151", marginBottom: "0.375rem" }}>
              Hasło
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "0.625rem 0.875rem",
                border: "1px solid #d1d5db",
                fontSize: "0.9375rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <p style={{ fontSize: "0.8125rem", color: "#dc2626", background: "#fef2f2", padding: "0.625rem 0.875rem", border: "1px solid #fecaca" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem",
              background: loading ? "#94a3b8" : "var(--navy, #0a121e)",
              color: "white",
              fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.02em",
            }}
          >
            {loading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>
      </div>
    </div>
  );
}
