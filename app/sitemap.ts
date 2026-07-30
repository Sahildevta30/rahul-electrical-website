import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rahul-electrical-website.vercel.app";
  const routes = ["", "/about", "/services", "/products", "/bookings", "/contact", "/faq", "/gallery"];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
