"use client";

import { Button } from "@/components/ui/Button/Button";

export default function CamperError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-page flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="text-3xl font-semibold text-main">
        We couldn&apos;t load this camper
      </h1>
      <p className="max-w-lg text-text">
        Please check your connection and try loading the camper details again.
      </p>
      <Button onClick={reset} size="lg" type="button">
        Try again
      </Button>
    </section>
  );
}
