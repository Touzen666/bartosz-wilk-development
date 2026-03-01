"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export type FaqItem = { question: string; answer: string };

export function GeoFaq({ items, id = "geo-faq" }: { items: FaqItem[]; id?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section id={id} className="geo-speakable" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="faq-item" data-open={isOpen ? "true" : "false"}>
              <button
                type="button"
                className="faq-trigger"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span>{item.question}</span>
                <span className="faq-chevron" data-open={isOpen ? "true" : "false"} aria-hidden>
                  {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </button>

              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                className="faq-body"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div>
                  <div className="faq-answer">{item.answer}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
