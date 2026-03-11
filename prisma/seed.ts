import { PrismaClient } from "@prisma/client";
import {
  PROJECTS,
  NEWS,
  USLUGI,
  OFFER,
  GEO_CITATIONS,
} from "../src/data/content";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.deleteMany();
  await prisma.newsItem.deleteMany();
  await prisma.service.deleteMany();
  await prisma.offerSection.deleteMany();
  await prisma.geoCitation.deleteMany();

  await prisma.project.createMany({
    data: PROJECTS.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.description,
      imageUrl: p.image_url,
      status: p.status,
    })),
  });

  await prisma.newsItem.createMany({
    data: NEWS.map((n) => ({
      id: n.id,
      title: n.title,
      excerpt: n.excerpt,
      body: n.body,
      date: n.date,
      imageUrl: n.image_url,
    })),
  });

  await prisma.service.createMany({
    data: USLUGI.map((name, i) => ({
      id: `s-${i}`,
      name,
      order: i,
    })),
  });

  await prisma.offerSection.createMany({
    data: [
      {
        id: "offer-domy",
        slug: "domy-szeregowe",
        title: OFFER.domySzeregowe.title,
        subtitle: OFFER.domySzeregowe.subtitle,
        description: OFFER.domySzeregowe.description,
        highlights: JSON.stringify(OFFER.domySzeregowe.highlights),
      },
      {
        id: "offer-remonty",
        slug: "remonty-pod-klucz",
        title: OFFER.remontyPodKlucz.title,
        subtitle: OFFER.remontyPodKlucz.subtitle,
        description: OFFER.remontyPodKlucz.description,
        highlights: JSON.stringify(OFFER.remontyPodKlucz.highlights),
      },
    ],
  });

  await prisma.geoCitation.createMany({
    data: GEO_CITATIONS.map((g) => ({
      id:       g.id,
      category: g.category,
      text:     g.text,
      order:    g.order,
    })),
  });

  console.log("Seed OK: projects, news, services, offer sections, geo citations.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
