export default function Loading() {
  return (
    <div
      aria-label="Ładowanie strony"
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <span
        style={{
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "50%",
          border: "3px solid var(--offwhite-warm, #f0ede8)",
          borderTopColor: "var(--gold, #c8920a)",
          display: "inline-block",
          animation: "spin 0.75s linear infinite",
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
          fontSize: "0.875rem",
          color: "var(--slate, #6b7280)",
          letterSpacing: "0.04em",
        }}
      >
        Ładowanie…
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
