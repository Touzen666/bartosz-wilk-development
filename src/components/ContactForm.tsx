"use client";

import { useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Imię i nazwisko: minimum 2 znaki"),
  email: z.string().email("Podaj poprawny adres e-mail"),
  phone: z.string().min(9, "Numer telefonu: minimum 9 znaków"),
  message: z.string().min(10, "Wiadomość: minimum 10 znaków"),
});

type ContactInput = z.infer<typeof contactSchema>;

const defaultValues: ContactInput = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactInput>(defaultValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
      result.error.flatten().fieldErrors &&
        Object.entries(result.error.flatten().fieldErrors).forEach(([key, messages]) => {
          if (messages?.[0]) fieldErrors[key as keyof ContactInput] = messages[0];
        });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    // Placeholder: replace with actual API call or form submission
    setStatus("success");
    setForm(defaultValues);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-charcoal">
          Imię i nazwisko <span className="text-amber">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-charcoal/20 bg-white px-4 py-2 text-charcoal focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-charcoal">
          E-mail <span className="text-amber">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-charcoal/20 bg-white px-4 py-2 text-charcoal focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-charcoal">
          Telefon <span className="text-amber">*</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-charcoal/20 bg-white px-4 py-2 text-charcoal focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-charcoal">
          Wiadomość <span className="text-amber">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          className="mt-1 w-full resize-y rounded-lg border border-charcoal/20 bg-white px-4 py-2 text-charcoal focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {status === "success" && (
        <p className="rounded-lg bg-green-50 p-3 text-sm text-green-800" role="status">
          Wiadomość została wysłana. Odpowiemy w ciągu 24 godzin.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-800" role="alert">
          Wystąpił błąd. Spróbuj ponownie lub skontaktuj się mailowo.
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-amber px-6 py-3 font-medium text-white transition hover:bg-amber/90 focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2"
      >
        Wyślij wiadomość
      </button>
    </form>
  );
}
