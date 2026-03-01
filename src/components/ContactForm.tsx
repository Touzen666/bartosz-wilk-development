"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactInput } from "~/lib/schemas";

const defaultValues: ContactInput = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  fontFamily: "inherit",
  fontSize: "0.9375rem",
  color: "var(--charcoal)",
  background: "var(--offwhite)",
  border: "1px solid var(--border)",
  borderRadius: 0,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8125rem",
  fontWeight: 700,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color: "var(--charcoal-soft)",
  marginBottom: "0.4rem",
};

export function ContactForm() {
  const [form, setForm]     = useState<ContactInput>(defaultValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
      Object.entries(result.error.flatten().fieldErrors).forEach(([key, messages]) => {
        if (messages?.[0]) fieldErrors[key as keyof ContactInput] = messages[0];
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("sending");
    // Symulacja wysyłki — zastąp prawdziwym API
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setForm(defaultValues);
  };

  if (status === "success") {
    return (
      <div
        style={{
          padding: "3rem 2rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <CheckCircle2 size={48} style={{ color: "var(--gold)" }} aria-hidden />
        <h3 style={{
          fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
          fontWeight: 800, fontSize: "1.25rem", color: "var(--charcoal)",
        }}>
          Wiadomość wysłana!
        </h3>
        <p style={{ fontSize: "0.9375rem", color: "var(--slate)", lineHeight: 1.7, maxWidth: "24rem" }}>
          Dziękujemy za kontakt. Odpiszemy na podany adres e-mail w ciągu 24 godzin roboczych.
        </p>
        <button
          onClick={() => setStatus("idle")}
          style={{
            marginTop: "0.5rem",
            background: "none",
            border: "none",
            color: "var(--gold)",
            fontWeight: 700,
            fontSize: "0.875rem",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Wyślij kolejną wiadomość
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* Imię i nazwisko */}
      <div>
        <label htmlFor="contact-name" style={labelStyle}>
          Imię i nazwisko <span style={{ color: "var(--gold)" }}>*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Jan Kowalski"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          style={{
            ...inputStyle,
            borderColor: errors.name ? "#ef4444" : "var(--border)",
          }}
          onFocus={(e) => { e.target.style.borderColor = "var(--gold)"; e.target.style.boxShadow = "0 0 0 3px rgba(240,165,0,0.15)"; }}
          onBlur={(e)  => { e.target.style.borderColor = errors.name ? "#ef4444" : "var(--border)"; e.target.style.boxShadow = "none"; }}
        />
        {errors.name && <p id="name-error" role="alert" style={{ marginTop: "0.3rem", fontSize: "0.8125rem", color: "#ef4444" }}>{errors.name}</p>}
      </div>

      {/* E-mail + Telefon side by side */}
      <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "1fr 1fr" }} className="sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" style={labelStyle}>
            E-mail <span style={{ color: "var(--gold)" }}>*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jan@firma.pl"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            style={{
              ...inputStyle,
              borderColor: errors.email ? "#ef4444" : "var(--border)",
            }}
            onFocus={(e) => { e.target.style.borderColor = "var(--gold)"; e.target.style.boxShadow = "0 0 0 3px rgba(240,165,0,0.15)"; }}
            onBlur={(e)  => { e.target.style.borderColor = errors.email ? "#ef4444" : "var(--border)"; e.target.style.boxShadow = "none"; }}
          />
          {errors.email && <p id="email-error" role="alert" style={{ marginTop: "0.3rem", fontSize: "0.8125rem", color: "#ef4444" }}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="contact-phone" style={labelStyle}>
            Telefon <span style={{ color: "var(--gold)" }}>*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+48 600 000 000"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            style={{
              ...inputStyle,
              borderColor: errors.phone ? "#ef4444" : "var(--border)",
            }}
            onFocus={(e) => { e.target.style.borderColor = "var(--gold)"; e.target.style.boxShadow = "0 0 0 3px rgba(240,165,0,0.15)"; }}
            onBlur={(e)  => { e.target.style.borderColor = errors.phone ? "#ef4444" : "var(--border)"; e.target.style.boxShadow = "none"; }}
          />
          {errors.phone && <p id="phone-error" role="alert" style={{ marginTop: "0.3rem", fontSize: "0.8125rem", color: "#ef4444" }}>{errors.phone}</p>}
        </div>
      </div>

      {/* Temat */}
      <div>
        <label htmlFor="contact-subject" style={labelStyle}>
          Temat zapytania
        </label>
        <select
          id="contact-subject"
          name="subject"
          defaultValue=""
          style={{ ...inputStyle, cursor: "pointer" }}
          onFocus={(e) => { e.target.style.borderColor = "var(--gold)"; e.target.style.boxShadow = "0 0 0 3px rgba(240,165,0,0.15)"; }}
          onBlur={(e)  => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
        >
          <option value="" disabled>Wybierz temat…</option>
          <option value="domy-szeregowe">Budowa domu szeregowego</option>
          <option value="remont">Remont pod klucz</option>
          <option value="wykończenie">Wykończenie wnętrz</option>
          <option value="taras">Budowa tarasu / werandy</option>
          <option value="inne">Inne zapytanie</option>
        </select>
      </div>

      {/* Wiadomość */}
      <div>
        <label htmlFor="contact-message" style={labelStyle}>
          Wiadomość <span style={{ color: "var(--gold)" }}>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          placeholder="Opisz swoje potrzeby — rodzaj prac, orientacyjny termin, lokalizacja…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          style={{
            ...inputStyle,
            resize: "vertical",
            minHeight: "120px",
            borderColor: errors.message ? "#ef4444" : "var(--border)",
          }}
          onFocus={(e) => { e.target.style.borderColor = "var(--gold)"; e.target.style.boxShadow = "0 0 0 3px rgba(240,165,0,0.15)"; }}
          onBlur={(e)  => { e.target.style.borderColor = errors.message ? "#ef4444" : "var(--border)"; e.target.style.boxShadow = "none"; }}
        />
        {errors.message && <p id="message-error" role="alert" style={{ marginTop: "0.3rem", fontSize: "0.8125rem", color: "#ef4444" }}>{errors.message}</p>}
      </div>

      {status === "error" && (
        <p role="alert" style={{ padding: "0.875rem 1rem", background: "#fef2f2", border: "1px solid #fecaca", fontSize: "0.875rem", color: "#dc2626" }}>
          Wystąpił błąd. Spróbuj ponownie lub skontaktuj się telefonicznie.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="wp-btn-primary"
        style={{ justifyContent: "center", fontSize: "0.9375rem", opacity: status === "sending" ? 0.7 : 1 }}
      >
        {status === "sending" ? "Wysyłanie…" : (
          <>Wyślij zapytanie <Send size={15} aria-hidden /></>
        )}
      </button>

      <p style={{ fontSize: "0.75rem", color: "var(--slate)", lineHeight: 1.6 }}>
        Pola oznaczone <span style={{ color: "var(--gold)", fontWeight: 700 }}>*</span> są wymagane. Dane nie są przekazywane osobom trzecim.
      </p>
    </form>
  );
}
