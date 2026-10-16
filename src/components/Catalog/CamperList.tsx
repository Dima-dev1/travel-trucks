"use client";

import Image from "next/image";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import type { CamperListResponse } from "@/types/camper";
import CamperCard from "./CamperCard";
import type { InfiniteData } from "@tanstack/react-query";

export default function CamperList({
  query,
  onClearFilters,
}: {
  query: UseInfiniteQueryResult<InfiniteData<CamperListResponse>, Error>;
  onClearFilters: () => void;
}) {
  if (query.isPending) {
    return (
      <section
        aria-label="Camper search results"
        className="flex min-h-96 flex-1 items-center justify-center"
      >
        <div
          aria-label="Loading campers"
          className="size-10 animate-spin rounded-full border-4 border-(--gray-light) border-t-(--grey-green)"
          role="status"
        />
      </section>
    );
  }

  if (query.isError && !query.data) {
    return (
      <section
        aria-label="Camper search results"
        className="flex min-h-96 flex-1 flex-col items-center justify-center gap-4 text-center"
      >
        <p className="text-lg text-(--text)">
          We couldn&apos;t load campers. Please try again.
        </p>
        <button
          className="rounded-full bg-(--grey-green) px-8 py-4 font-medium text-white transition hover:bg-(--green-hover)"
          onClick={() => void query.refetch()}
          type="button"
        >
          Try again
        </button>
      </section>
    );
  }

  const campers = query.data.pages.flatMap((page) => page.campers);

  if (campers.length === 0) {
    return (
      <section className="flex min-h-96 flex-1 flex-col items-center justify-center gap-4 py-10 text-center">
        <Image
          alt=""
          className="h-auto w-56"
          height={314}
          src="/images/not-found.png"
          width={314}
        />
        <h1 className="text-2xl font-semibold text-(--main)">
          No campers found
        </h1>
        <p className="max-w-md text-(--text)">
          Try changing your search criteria or clear the filters to see all
          available campers.
        </p>
        <button
          className="rounded-full bg-(--grey-green) px-8 py-4 font-medium text-white transition hover:bg-(--green-hover)"
          onClick={onClearFilters}
          type="button"
        >
          Clear filters
        </button>
      </section>
    );
  }

  return (
    <section aria-label="Camper search results" className="min-w-0 flex-1">
      <div className="flex flex-col gap-8">
        {campers.map((camper) => (
          <CamperCard camper={camper} key={camper.id} />
        ))}
      </div>

      {query.isFetchNextPageError && (
        <div
          className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-(--olive) p-4 text-sm text-(--text)"
          role="alert"
        >
          <p>Could not load more campers.</p>
          <button
            className="font-medium text-(--main) underline"
            onClick={() => void query.fetchNextPage()}
            type="button"
          >
            Try again
          </button>
        </div>
      )}

      {query.hasNextPage && (
        <div className="flex justify-center pt-10">
          <button
            className="min-h-14 min-w-36 rounded-full border border-(--gray-light) px-8 text-base font-medium text-(--main) transition hover:border-(--grey-green) hover:bg-(--olive) disabled:cursor-wait disabled:opacity-60"
            disabled={query.isFetchingNextPage}
            onClick={() => void query.fetchNextPage()}
            type="button"
          >
            {query.isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
      {!query.hasNextPage && (
        <p className="pt-10 text-center text-sm text-(--gray)">
          You&apos;ve reached the end of the list.
        </p>
      )}
    </section>
  );
}
