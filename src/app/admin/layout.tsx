import { auth } from "~/auth";
import { redirect } from "next/navigation";
import { signOut } from "~/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Topbar */}
      <header style={{
        background: "var(--navy, #0a121e)",
        padding: "0 1.5rem",
        height: "3.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{
          fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
          fontWeight: 700,
          fontSize: "0.9375rem",
          color: "white",
          letterSpacing: "0.02em",
        }}>
          Wilk Development — Admin
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)" }}>
            {session.user.email}
          </span>
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}>
            <button type="submit" style={{
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.7)",
              background: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "0.3rem 0.75rem",
              cursor: "pointer",
            }}>
              Wyloguj
            </button>
          </form>
        </div>
      </header>

      {/* Treść */}
      <main style={{ padding: "2rem 1.5rem" }}>
        {children}
      </main>
    </div>
  );
}
