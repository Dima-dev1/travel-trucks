import type { Metadata } from "next";
import Hero from "@/components/Hero/Hero";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <Hero />;
}
