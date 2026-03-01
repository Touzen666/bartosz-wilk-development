import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { canonical } from "~/lib/seo";
import { getCachedNews, getCachedNewsItem } from "~/lib/data-cache";
import { Breadcrumbs } from "~/components/Breadcrumbs";

export const revalidate = 600;

type Props = { params: { id: string } };

export async function generateStaticParams() {
  const news = await getCachedNews();
  return news.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getCachedNewsItem(params.id);
  if (!item) return { title: "Aktualność | Wilk Development" };

  return {
    title: `${item.title} | Aktualności | Wilk Development`,
    description: item.excerpt,
    alternates: { canonical: canonical(`/aktualnosci/${params.id}`) },
    openGraph: {
      url: canonical(`/aktualnosci/${params.id}`),
      title: item.title,
      description: item.excerpt,
      images: [{ url: item.image_url, width: 1200, height: 630, alt: item.title }],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsItemPage({ params }: Props) {
  const item = await getCachedNewsItem(params.id);
  if (!item) notFound();

  return (
    <article className="wp-section mx-auto max-w-3xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: "/" },
          { label: "Aktualności", href: "/aktualnosci" },
          { label: item.title, href: `/aktualnosci/${params.id}` },
        ]}
      />

      <Link
        href="/aktualnosci"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.875rem",
          color: "var(--gold)",
          fontWeight: 600,
          marginBottom: "1.5rem",
          textDecoration: "none",
        }}
      >
        <ArrowLeft size={15} aria-hidden /> Wróć do aktualności
      </Link>

      <header style={{ marginBottom: "2rem" }}>
        <time
          dateTime={item.date}
          style={{ fontSize: "0.875rem", color: "var(--slate)", display: "block", marginBottom: "0.75rem" }}
        >
          {formatDate(item.date)}
        </time>
        <h1
          style={{
            fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 800,
            color: "var(--navy)",
            lineHeight: 1.15,
          }}
        >
          {item.title}
        </h1>
        <p
          style={{
            marginTop: "1rem",
            fontSize: "1.0625rem",
            color: "var(--slate)",
            lineHeight: 1.7,
          }}
        >
          {item.excerpt}
        </p>
      </header>

      <div
        style={{
          position: "relative",
          aspectRatio: "16/9",
          borderRadius: "var(--radius-lg, 12px)",
          overflow: "hidden",
          marginBottom: "2.5rem",
        }}
      >
        <Image
          src={item.image_url}
          alt={item.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <div
        style={{
          lineHeight: 1.8,
          color: "var(--charcoal-soft)",
          fontSize: "1.0625rem",
        }}
      >
        {item.body}
      </div>

      <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
        <Link href="/aktualnosci" className="wp-btn-outline">
          <ArrowLeft size={15} aria-hidden /> Wszystkie aktualności
        </Link>
      </div>
    </article>
  );
}
