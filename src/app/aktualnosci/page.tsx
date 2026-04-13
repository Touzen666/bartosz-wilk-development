import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { canonical } from "~/lib/seo";
import type { NewsItem } from "~/data/content";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { getCachedNews, getCachedSiteConfig } from "~/lib/data-cache";

export const revalidate = 600; // aktualności – regeneruj co 10 min

export const metadata: Metadata = {
  title: "Aktualności",
  description:
    "Najnowsze informacje z Wilk Development: postępy na budowach, realizacje i plany na przyszłość.",
  alternates: { canonical: canonical("/aktualnosci") },
  openGraph: {
    url: canonical("/aktualnosci"),
    title: "Aktualności | Wilk Development",
    description:
      "Postępy na budowach, realizacje domów szeregowych i remontów pod klucz. Wilk Development.",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function AktualnosciPage() {
  const [news, cfg] = await Promise.all([getCachedNews(), getCachedSiteConfig()]);
  const heading    = cfg.aktualnosci_heading   ?? "Aktualności";
  const intro      = cfg.aktualnosci_intro     ?? "";
  const readMore   = cfg.aktualnosci_read_more ?? "Czytaj więcej";
  const navHome    = cfg.nav_home              ?? "Strona główna";
  const navAkt     = cfg.nav_aktualnosci       ?? "Aktualności";

  return (
    <div className="wp-section mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: navHome, href: "/" },
          { label: navAkt,  href: "/aktualnosci" },
        ]}
      />
      <header>
        <h1 className="text-3xl font-bold text-charcoal">{heading}</h1>
        <p className="mt-2 text-charcoal/80">{intro}</p>
      </header>

      <ul className="mt-10 space-y-10" role="list">
        {news.map((item: NewsItem, idx: number) => (
          <li key={item.id}>
            <article className="overflow-hidden rounded-xl border border-charcoal/10 bg-white shadow-sm">
              <div className="relative aspect-video bg-charcoal/5">
                <Image
                  src={item.image_url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority={idx === 0}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </div>
              <div className="p-6">
                <time
                  dateTime={item.date}
                  className="text-sm text-charcoal/60"
                >
                  {formatDate(item.date)}
                </time>
                <h2 className="mt-2 text-xl font-semibold text-charcoal">
                  <Link
                    href={`/aktualnosci/${item.id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {item.title}
                  </Link>
                </h2>
                <p className="mt-2 text-charcoal/80">{item.excerpt}</p>
                <div style={{ marginTop: "1rem" }}>
                  <Link
                    href={`/aktualnosci/${item.id}`}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.3rem",
                      fontSize: "0.875rem", fontWeight: 600, color: "var(--gold)",
                      textDecoration: "none",
                    }}
                  >
                    {readMore} <ArrowRight size={14} aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
