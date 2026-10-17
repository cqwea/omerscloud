import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return site.url ? [{ url: site.url, changeFrequency: "weekly", priority: 1 }] : [];
}
