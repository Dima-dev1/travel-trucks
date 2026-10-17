"use client";

import { useState } from "react";
import StarRating from "@/components/StarRating/StarRating";
import { Button } from "@/components/ui/Button/Button";
import { getCamperReviews } from "@/lib/api";
import type { CamperReview } from "@/types/camper";

export default function CamperReviews({
  camperId,
  initiallyFailed,
  initialReviews,
}: {
  camperId: string;
  initiallyFailed: boolean;
  initialReviews: CamperReview[];
}) {
  const [reviews, setReviews] = useState(initialReviews);
  const [hasError, setHasError] = useState(initiallyFailed);
  const [isLoading, setIsLoading] = useState(false);

  const retry = async () => {
    setIsLoading(true);
    try {
      const nextReviews = await getCamperReviews(camperId);
      setReviews(nextReviews);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section aria-labelledby="reviews-heading">
      <h2 className="mb-5 text-xl font-semibold text-main" id="reviews-heading">
        Reviews
      </h2>
      {hasError ? (
        <div
          className="rounded-2xl bg-inputs p-6 text-sm text-text"
          role="alert"
        >
          <p>Could not load reviews. Please try again.</p>
          <Button
            className="mt-3 h-auto border-transparent bg-transparent px-0 text-main underline hover:border-transparent hover:bg-transparent"
            disabled={isLoading}
            onClick={() => void retry()}
            size="sm"
            type="button"
            variant="outline"
          >
            {isLoading ? "Loading reviews..." : "Try again"}
          </Button>
        </div>
      ) : reviews.length === 0 ? (
        <p className="rounded-2xl bg-inputs p-6 text-sm text-text">
          No reviews yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {reviews.map((review) => (
            <li className="rounded-2xl bg-inputs p-6" key={review.id}>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center rounded-full bg-white text-base font-semibold text-grey-green"
                >
                  {review.reviewer_name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="text-sm font-medium text-main">
                    {review.reviewer_name}
                  </p>
                  <StarRating className="mt-1" value={review.reviewer_rating} />
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-text">
                {review.comment}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
