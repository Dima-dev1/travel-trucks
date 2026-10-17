"use client";

export default function CamperError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="text-3xl font-semibold text-(--main)">
        We couldn&apos;t load this camper
      </h1>
      <p className="max-w-lg text-(--text)">
        Please check your connection and try loading the camper details again.
      </p>
      <button
        className="min-h-14 rounded-full bg-(--grey-green) px-8 font-medium text-white transition hover:bg-(--green-hover)"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </section>
  );
}
