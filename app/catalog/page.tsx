import type { Metadata } from "next";
import CatalogClient from "@/components/Catalog/CatalogClient";

export const metadata: Metadata = {
  title: "Camper Catalog",
  description: "Browse and filter available camper vans for your next trip.",
  openGraph: {
    type: "website",
    siteName: "TravelTrucks",
    locale: "en_US",
    title: "Camper Catalog",
    description: "Browse and filter available camper vans for your next trip.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TravelTrucks camper rentals",
      },
    ],
  },
};

export default function CatalogPage() {
  return <CatalogClient />;
}
