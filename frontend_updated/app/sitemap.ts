export const runtime = "nodejs";

import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/url";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["/", "/about", "/contact"].map((p) => ({
    url: absoluteUrl(p),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  await connectToDatabase();
  const posts = await Blog.find(
    { status: "publish" },
    { slug: 1, updatedAt: 1 }
  ).lean();

  const blogRoutes =
    posts?.map((p: any) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) ?? [];

  return [...staticRoutes, ...blogRoutes];
}
