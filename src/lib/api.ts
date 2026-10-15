import axios from "axios";
import type {
  BookingRequest,
  BookingResponse,
  CamperDetails,
  CamperFilters,
  CamperListResponse,
  CamperReview,
  CamperSearchParams,
} from "@/types/camper";

const api = axios.create({
  baseURL: "https://campers-api.goit.study",
});

export async function getCampers(
  params: CamperSearchParams,
  signal?: AbortSignal,
): Promise<CamperListResponse> {
  const response = await api.get<CamperListResponse>("/campers", {
    params,
    signal,
  });
  return response.data;
}

export async function getCamperFilters(
  signal?: AbortSignal,
): Promise<CamperFilters> {
  const response = await api.get<CamperFilters>("/campers/filters", { signal });
  return response.data;
}

export async function getCamperById(
  camperId: string,
  signal?: AbortSignal,
): Promise<CamperDetails> {
  const response = await api.get<CamperDetails>(`/campers/${camperId}`, {
    signal,
  });
  return response.data;
}

export async function getCamperReviews(
  camperId: string,
  signal?: AbortSignal,
): Promise<CamperReview[]> {
  const response = await api.get<CamperReview[]>(
    `/campers/${camperId}/reviews`,
    { signal },
  );
  return response.data;
}

export async function createBookingRequest(
  camperId: string,
  booking: BookingRequest,
): Promise<BookingResponse> {
  const response = await api.post<BookingResponse>(
    `/campers/${camperId}/booking-requests`,
    booking,
  );
  return response.data;
}
