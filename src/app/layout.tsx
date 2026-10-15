import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Find a camper for your next trip.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
