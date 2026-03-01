import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BASE_URL } from "~/lib/seo";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Jeśli true — jasny styl (na ciemnym tle) */
  light?: boolean;
}

export function Breadcrumbs({ items, light = false }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(index < items.length - 1 ? { item: `${BASE_URL}${item.href}` } : {}),
    })),
  };

  const colorBase  = light ? "rgba(255,255,255,0.5)"  : "var(--slate)";
  const colorHover = light ? "var(--gold)"             : "var(--gold)";
  const colorLast  = light ? "var(--white)"            : "var(--charcoal)";

  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: "1.25rem" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.25rem",
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {items.map((item, index) => {
          const isLast  = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li
              key={item.href}
              style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              {/* Separator */}
              {index > 0 && (
                <ChevronRight
                  size={13}
                  aria-hidden
                  style={{ color: colorBase, flexShrink: 0, opacity: 0.7 }}
                />
              )}

              {isLast ? (
                <span
                  aria-current="page"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                    color: colorLast,
                    background: light ? "rgba(255,255,255,0.1)" : "var(--gold-muted)",
                    borderLeft: `3px solid var(--gold)`,
                    paddingInline: "0.6rem 0.75rem",
                    paddingBlock: "0.2rem",
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.8125rem",
                    color: colorBase,
                    textDecoration: "none",
                    transition: "color var(--transition)",
                    fontWeight: 500,
                  }}
                  className="breadcrumb-link"
                >
                  {isFirst && <Home size={12} aria-hidden style={{ flexShrink: 0 }} />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
