"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/services/api";
import type { CamperSearchParams } from "@/types/camper";
import CamperList from "./CamperList";
import FilterPanel from "./FilterPanel";

export type AppliedFilters = Pick<
  CamperSearchParams,
  "location" | "form" | "engine" | "transmission"
>;

const PAGE_SIZE = 4;

export default function CatalogClient() {
  const [filters, setFilters] = useState<AppliedFilters>({});
  const [draftFilters, setDraftFilters] = useState<AppliedFilters>({});

  const campersQuery = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam, signal }) =>
      getCampers({ page: pageParam, perPage: PAGE_SIZE, ...filters }, signal),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const clearFilters = () => {
    setFilters({});
    setDraftFilters({});
  };

  return (
    <>
      <h1 className="sr-only">Camper catalog</h1>
      <div className="mx-auto flex w-full max-w-page items-start gap-16 px-16 py-14 max-xl:gap-10 max-xl:px-10 max-lg:flex-col max-lg:px-6">
        <FilterPanel
          draftFilters={draftFilters}
          onDraftFiltersChange={setDraftFilters}
          onSearch={setFilters}
          onClear={clearFilters}
        />
        <CamperList query={campersQuery} onClearFilters={clearFilters} />
      </div>
    </>
  );
}
