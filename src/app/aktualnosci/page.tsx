import type { Metadata } from "next";
import Image from "next/image";
import { createCaller } from "~/server/api/trpc/server";
import { canonical } from "~/lib/seo";
import type { NewsItem } from "~/data/content";
import { Breadcrumbs } from "~/components/Breadcrumbs";

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
  const caller = await createCaller();
  const news = await caller.content.getNews();

  return (
    <div className="wp-section mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: "/" },
          { label: "Aktualności", href: "/aktualnosci" },
        ]}
      />
      <header>
        <h1 className="text-3xl font-bold text-charcoal">Aktualności</h1>
        <p className="mt-2 text-charcoal/80">
          Postępy na budowach, realizacje i informacje z Wilk Development.
        </p>
      </header>

      <ul className="mt-10 space-y-10" role="list">
        {news.map((item: NewsItem) => (
          <li key={item.id}>
            <article className="overflow-hidden rounded-xl border border-charcoal/10 bg-white shadow-sm">
              <div className="relative aspect-video bg-charcoal/5">
                <Image
                  src={item.image_url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
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
                  {item.title}
                </h2>
                <p className="mt-2 text-charcoal/80">{item.excerpt}</p>
                <p className="mt-4 text-charcoal/90">{item.body}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
