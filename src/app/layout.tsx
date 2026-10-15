import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import SiteHeader from "@/components/layout/site-header";
import QueryProvider from "@/components/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TravelTrucks | Camper rentals",
    template: "%s | TravelTrucks",
  },
  description: "Find the right camper for your next trip with TravelTrucks.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <SiteHeader />
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
