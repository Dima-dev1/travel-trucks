import type { Metadata } from "next";

export const SITE_NAME = "TravelTrucks";
export const SITE_URL = "https://travel-trucks-eight-iota.vercel.app";

export function getOgImageUrl(title: string): string {
  return `/og?title=${encodeURIComponent(title)}`;
}

export function buildSocialMetadata({
  title,
  description,
  image,
  cardTitle,
}: {
  title: string;
  description: string;
  image?: string;
  cardTitle?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const fallbackTitle = cardTitle ?? title;
  const ogImage = getOgImageUrl(fallbackTitle);

  return {
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      title,
      description,
      images: image
        ? [image]
        : [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: fallbackTitle,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image ?? ogImage],
    },
  };
}
