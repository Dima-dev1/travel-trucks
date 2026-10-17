import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://travel-trucks-eight-iota.vercel.app"),
  title: {
    default: "TravelTrucks | Camper rentals",
    template: "%s | TravelTrucks",
  },
  description: "Find the right camper for your next trip with TravelTrucks.",
  openGraph: {
    type: "website",
    siteName: "TravelTrucks",
    locale: "en_US",
    title: "TravelTrucks | Camper rentals",
    description: "Find the right camper for your next trip with TravelTrucks.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TravelTrucks camper rentals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
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
