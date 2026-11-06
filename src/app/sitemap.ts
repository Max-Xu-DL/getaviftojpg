import type { MetadataRoute } from "next";
import { siteUrls } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrls.home,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: siteUrls.privacy,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: siteUrls.terms,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
