import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { buildSocialMetadata, SITE_URL } from "@/lib/metadata";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TravelTrucks | Camper rentals",
    template: "%s | TravelTrucks",
  },
  description: "Find the right camper for your next trip with TravelTrucks.",
  ...buildSocialMetadata({
    title: "TravelTrucks | Camper rentals",
    description: "Find the right camper for your next trip with TravelTrucks.",
    cardTitle: "Campers of your dreams",
  }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Toaster position="top-right" />
        </TanStackProvider>
      </body>
    </html>
  );
}
