import type { Metadata } from "next";
import CatalogClient from "@/components/Catalog/CatalogClient";

export const metadata: Metadata = {
  title: "Camper Catalog",
  description: "Browse and filter available camper vans for your next trip.",
};

export default function CatalogPage() {
  return <CatalogClient />;
}
