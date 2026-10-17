import axios from "axios";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import CamperDescription from "@/components/CamperDetails/CamperDescription";
import CamperGallery from "@/components/CamperDetails/CamperGallery";
import CamperReviews from "@/components/CamperDetails/CamperReviews";
import BookingForm from "@/components/CamperDetails/BookingForm";
import { getCamperById, getCamperReviews } from "@/services/api";

type CamperPageProps = {
  params: Promise<{ camperId: string }>;
};

const getCamper = cache((camperId: string) => getCamperById(camperId));

const isNotFoundError = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === 404;

export async function generateMetadata({
  params,
}: CamperPageProps): Promise<Metadata> {
  const { camperId } = await params;

  try {
    const camper = await getCamper(camperId);
    const description = camper.description.replace(/\s+/g, " ").trim();
    const metaDescription =
      description.length > 160
        ? `${description.slice(0, 157).trimEnd()}...`
        : description;

    return {
      title: camper.name,
      description: metaDescription,
      openGraph: {
        type: "website",
        siteName: "TravelTrucks",
        locale: "en_US",
        title: camper.name,
        description: metaDescription,
        images: [camper.gallery[0]?.original || "/og-image.png"],
      },
    };
  } catch (error) {
    if (isNotFoundError(error)) {
      return {
        title: "Camper not found",
        description: "This camper is no longer available.",
      };
    }

    throw error;
  }
}

export default async function CamperPage({ params }: CamperPageProps) {
  const { camperId } = await params;
  const [camperResult, reviewsResult] = await Promise.allSettled([
    getCamper(camperId),
    getCamperReviews(camperId),
  ]);

  if (camperResult.status === "rejected") {
    if (isNotFoundError(camperResult.reason)) notFound();

    throw camperResult.reason;
  }

  const reviews =
    reviewsResult.status === "fulfilled" ? reviewsResult.value : [];
  const reviewsFailed = reviewsResult.status === "rejected";

  return (
    <div className="mx-auto w-full max-w-page px-16 py-12 max-xl:px-10 max-md:px-6">
      <div className="grid grid-cols-2 items-start gap-5 max-lg:grid-cols-1">
        <CamperGallery
          name={camperResult.value.name}
          gallery={camperResult.value.gallery}
        />
        <CamperDescription camper={camperResult.value} />
      </div>

      <div className="mt-12 grid grid-cols-2 items-start gap-10 max-lg:grid-cols-1">
        <CamperReviews
          camperId={camperId}
          initiallyFailed={reviewsFailed}
          initialReviews={reviews}
        />
        <BookingForm camperId={camperId} />
      </div>
    </div>
  );
}
