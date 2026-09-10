import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://primetimebiolabs.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/pb-console", "/api/", "/account", "/checkout", "/order-confirmation"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
