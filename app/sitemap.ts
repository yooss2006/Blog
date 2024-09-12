import type { MetadataRoute } from "next";

import { searchPostStructure } from "@/actions/search-post-structure";

type PostStructure = Record<string, any>;

function extractPaths(obj: PostStructure): string[] {
  const result: string[] = [];

  function traverse(current: PostStructure, path: string[] = []) {
    Object.keys(current).forEach((key) => {
      if (typeof current[key] === "object" && current[key] !== null) {
        if ("post" in current[key]) {
          result.push(path.concat(key).join("/"));
        } else {
          traverse(current[key], path.concat(key));
        }
      }
    });
  }

  traverse(obj);
  return result;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapFromPosts: MetadataRoute.Sitemap = await searchPostStructure(
    ""
  ).then((res) =>
    extractPaths(res).map((path) => ({
      url: `https://geek-gangster.vercel.app/blog/${path}`,
      lastModified: new Date(),
    }))
  );
  return [
    {
      url: "https://geek-gangster.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://geek-gangster.vercel.app/blog",
      lastModified: new Date(),
    },
    ...sitemapFromPosts,
  ];
}
