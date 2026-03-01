"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "~/data/content";

type CategoryFilter = "wszystkie" | "domy-szeregowe" | "remonty";
type StatusFilter   = "wszystkie" | "W sprzedaży" | "Zakończone";

type Props = { projects: Project[] };

const CATEGORY_FILTERS: { label: string; value: CategoryFilter }[] = [
  { label: "Wszystkie typy",  value: "wszystkie"      },
  { label: "Domy szeregowe",  value: "domy-szeregowe" },
  { label: "Remonty",         value: "remonty"        },
];

const STATUS_FILTERS: { label: string; value: StatusFilter }[] = [
  { label: "Wszystkie statusy", value: "wszystkie"  },
  { label: "W sprzedaży",       value: "W sprzedaży" },
  { label: "Zakończone",        value: "Zakończone"  },
];

export function ProjectsGallery({ projects }: Props) {
  const [catFilter,    setCatFilter]    = useState<CategoryFilter>("wszystkie");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("wszystkie");
  const [activeIndex,  setActiveIndex]  = useState(0);
  const trackRef = useRef<HTMLUListElement>(null);

  const filtered = projects.filter((p) => {
    if (catFilter    !== "wszystkie" && p.category !== catFilter)    return false;
    if (statusFilter !== "wszystkie" && p.status   !== statusFilter) return false;
    return true;
  });

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const items = track.querySelectorAll<HTMLLIElement>("li");
    const target = items[index];
    if (!target) return;
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(filtered.length - 1, activeIndex + 1));

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = track.querySelectorAll<HTMLLIElement>("li");
    let closest = 0;
    let minDist  = Infinity;
    items.forEach((item, i) => {
      const dist = Math.abs(item.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  }, []);

  function applyFilter(type: "cat" | "status", value: CategoryFilter | StatusFilter) {
    if (type === "cat")    setCatFilter(value as CategoryFilter);
    else                    setStatusFilter(value as StatusFilter);
    setActiveIndex(0);
    requestAnimationFrame(() => {
      const track = trackRef.current;
      if (track) track.scrollLeft = 0;
    });
  }

  return (
    <div>
      {/* Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}>
        {CATEGORY_FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => applyFilter("cat", item.value)}
            className={`wp-tag ${catFilter === item.value ? "wp-tag-active" : ""}`}
          >
            {item.label}
          </button>
        ))}
        {STATUS_FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => applyFilter("status", item.value)}
            className={`wp-tag ${statusFilter === item.value ? "wp-tag-active" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "3rem", color: "var(--slate)" }}>
          Brak realizacji dla wybranych filtrów.
        </p>
      ) : (
        <div style={{ marginTop: "2.5rem" }}>
          {/* Slider track */}
          <div style={{ position: "relative" }}>
            <ul
              ref={trackRef}
              onScroll={handleScroll}
              style={{
                display: "flex",
                gap: "1.5rem",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                listStyle: "none",
                paddingBottom: "0.5rem",
              }}
            >
              {filtered.map((project, idx) => (
                <li
                  key={project.id}
                  style={{
                    flex: "0 0 clamp(260px, 32vw, 360px)",
                    scrollSnapAlign: "start",
                  }}
                >
                  <article className="wp-card" style={{ overflow: "hidden", height: "100%" }}>
                    <div style={{ position: "relative", aspectRatio: "4/3", background: "var(--offwhite-warm)" }}>
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        loading={idx < 3 ? "eager" : "lazy"}
                        className="object-cover"
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                      />
                      <span
                        style={{
                          position: "absolute", top: "0.625rem", right: "0.625rem",
                          background: "rgba(10,18,30,0.85)", color: "var(--white)",
                          fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em",
                          padding: "0.25rem 0.625rem", borderRadius: "var(--radius-full)",
                        }}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div style={{ padding: "1.25rem 1.5rem" }}>
                      <p style={{
                        fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
                        fontWeight: 700, fontSize: "1rem", color: "var(--charcoal)",
                      }}>
                        {project.title}
                      </p>
                      <p style={{
                        marginTop: "0.4rem", fontSize: "0.875rem", color: "var(--slate)",
                        lineHeight: 1.55, overflow: "hidden", display: "-webkit-box",
                        WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                      }}>
                        {project.description}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            {/* Arrow buttons */}
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              aria-label="Poprzedni projekt"
              style={{
                position: "absolute", top: "50%", left: "-1.25rem",
                transform: "translateY(-50%)",
                width: "2.75rem", height: "2.75rem",
                borderRadius: "var(--radius-full)",
                background: "var(--white)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-md)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                color: "var(--charcoal)",
                transition: "background var(--transition), color var(--transition), opacity var(--transition)",
                opacity: activeIndex === 0 ? 0.35 : 1,
                zIndex: 10,
              }}
            >
              <ChevronLeft size={20} aria-hidden />
            </button>

            <button
              onClick={next}
              disabled={activeIndex === filtered.length - 1}
              aria-label="Następny projekt"
              style={{
                position: "absolute", top: "50%", right: "-1.25rem",
                transform: "translateY(-50%)",
                width: "2.75rem", height: "2.75rem",
                borderRadius: "var(--radius-full)",
                background: "var(--white)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-md)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                color: "var(--charcoal)",
                transition: "background var(--transition), color var(--transition), opacity var(--transition)",
                opacity: activeIndex === filtered.length - 1 ? 0.35 : 1,
                zIndex: 10,
              }}
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>

          {/* Dot indicators */}
          <div
            role="tablist"
            aria-label="Nawigacja slidera"
            style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}
          >
            {filtered.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Projekt ${i + 1}`}
                onClick={() => scrollTo(i)}
                style={{
                  width: i === activeIndex ? "1.75rem" : "0.5rem",
                  height: "0.5rem",
                  borderRadius: "var(--radius-full)",
                  background: i === activeIndex ? "var(--gold)" : "var(--border-strong)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
