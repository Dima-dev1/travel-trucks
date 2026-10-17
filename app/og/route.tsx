import { ImageResponse } from "next/og";
import { Simple } from "@/components/og/simple";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedTitle = searchParams.get("title")?.trim().slice(0, 80);
  const title = requestedTitle || "Camper rentals";

  return new ImageResponse(
    <Simple
      label="Camper rental"
      title={title}
      description="Find the right camper for your next trip."
      brand="TravelTrucks"
    />,
    { width: 1200, height: 630 },
  );
}
