import type { MetadataRoute } from "next";
import { collections } from "../lib/collections";

const base = "https://kzoptical.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/eyeglasses", "/lenses", "/about", "/contact", "/shipping-returns", "/terms", "/privacy", "/prescription-help"];
  const now = new Date();
  return [
    ...pages.map((p) => ({ url: base + p, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...collections.map((c) => ({ url: `${base}/collections/${c.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 })),
  ];
}
