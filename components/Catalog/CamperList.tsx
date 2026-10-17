"use client";

import Image from "next/image";
import { FiX } from "react-icons/fi";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import type { CamperListResponse } from "@/types/camper";
import { Button } from "@/components/ui/Button/Button";
import CamperCard from "./CamperCard";
import type { InfiniteData } from "@tanstack/react-query";

export default function CamperList({
  isPlaceholderData,
  query,
  onClearFilters,
}: {
  isPlaceholderData: boolean;
  query: UseInfiniteQueryResult<InfiniteData<CamperListResponse>, Error>;
  onClearFilters: () => void;
}) {
  if (!query.data && query.isPending) {
    return (
      <section
        aria-label="Camper search results"
        className="flex min-h-96 flex-1 flex-col items-center justify-center gap-3"
      >
        <div
          aria-label="Loading campers"
          className="size-10 animate-spin rounded-full border-4 border-gray-light border-t-grey-green"
          role="status"
        />
        <p className="text-sm text-text">Loading campers...</p>
      </section>
    );
  }

  if (query.isError && !query.data) {
    return (
      <section
        aria-label="Camper search results"
        className="flex min-h-96 flex-1 flex-col items-center justify-center gap-4 text-center"
      >
        <p className="text-lg text-text">
          We couldn&apos;t load campers. Please try again.
        </p>
        <Button
          className="px-8"
          onClick={() => void query.refetch()}
          size="lg"
          type="button"
        >
          Try again
        </Button>
      </section>
    );
  }

  const campers = query.data.pages.flatMap((page) => page.campers);

  if (campers.length === 0) {
    return (
      <section
        aria-label="Camper search results"
        aria-busy={isPlaceholderData}
        className="relative flex min-h-[598px] flex-1 rounded-2xl bg-inputs"
      >
        <div
          className={`flex flex-1 flex-col items-center justify-center gap-4 px-8 py-10 text-center ${
            isPlaceholderData ? "opacity-60" : ""
          }`}
        >
          <Image
            alt=""
            className="h-auto w-[314px] max-w-full"
            height={926}
            src="/images/not-found.png"
            width={976}
          />
          <h2 className="text-2xl font-semibold text-main">No campers found</h2>
          <p className="max-w-md text-text">
            We couldn&apos;t find any campers that match your filters. Try
            adjusting your search or clearing some filters.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <Button
              className="px-7"
              onClick={onClearFilters}
              size="sm"
              type="button"
              variant="outline"
            >
              <FiX aria-hidden="true" />
              Clear filters
            </Button>
            <Button
              className="px-7"
              onClick={onClearFilters}
              size="sm"
              type="button"
            >
              View all campers
            </Button>
          </div>
        </div>
        {isPlaceholderData && <PlaceholderSpinner />}
      </section>
    );
  }

  return (
    <section
      aria-label="Camper search results"
      aria-busy={isPlaceholderData}
      className="relative min-w-0 flex-1"
    >
      <div
        className={`flex flex-col gap-8 ${isPlaceholderData ? "opacity-60" : ""}`}
      >
        {campers.map((camper) => (
          <CamperCard camper={camper} key={camper.id} />
        ))}
      </div>

      {isPlaceholderData && <PlaceholderSpinner />}

      {query.isFetchNextPageError && !isPlaceholderData && (
        <div
          className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-olive p-4 text-sm text-text"
          role="alert"
        >
          <p>Could not load more campers.</p>
          <Button
            className="h-auto border-transparent bg-transparent px-0 text-main underline hover:border-transparent hover:bg-transparent"
            onClick={() => void query.fetchNextPage()}
            size="sm"
            type="button"
            variant="outline"
          >
            Try again
          </Button>
        </div>
      )}

      {query.hasNextPage && (
        <div className="flex justify-center pt-10">
          <Button
            className="min-w-36"
            disabled={query.isFetchingNextPage || isPlaceholderData}
            onClick={() => void query.fetchNextPage()}
            size="lg"
            type="button"
            variant="outline"
          >
            {query.isFetchingNextPage ? (
              <span className="inline-flex items-center gap-2">
                <span
                  aria-label="Loading campers"
                  className="size-4 animate-spin rounded-full border-2 border-gray-light border-t-grey-green"
                  role="status"
                />
                Loading campers...
              </span>
            ) : (
              "Load more"
            )}
          </Button>
        </div>
      )}
      {!query.hasNextPage && !isPlaceholderData && (
        <p className="pt-10 text-center text-sm text-gray">
          You&apos;ve reached the end of the list.
        </p>
      )}
    </section>
  );
}

function PlaceholderSpinner() {
  return (
    <div
      aria-label="Updating camper results"
      className="absolute top-4 right-4 z-10 rounded-full bg-white p-2 shadow"
      role="status"
    >
      <span
        aria-hidden="true"
        className="block size-5 animate-spin rounded-full border-2 border-gray-light border-t-grey-green"
      />
    </div>
  );
}
