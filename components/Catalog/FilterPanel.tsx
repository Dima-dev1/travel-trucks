"use client";

import { type Dispatch, type FormEvent, type SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiMapPin, FiX } from "react-icons/fi";
import { formatCamperForm } from "@/lib/formatters";
import { getCamperFilters } from "@/services/api";
import type { CamperFilters } from "@/types/camper";
import type { AppliedFilters } from "./CatalogClient";
import { Button } from "@/components/ui/Button/Button";

type FilterField = "form" | "engine" | "transmission";

const filterGroups: {
  key: FilterField;
  title: string;
  labels?: Record<string, string>;
}[] = [
  {
    key: "form",
    title: "Camper form",
  },
  {
    key: "engine",
    title: "Engine",
    labels: {
      diesel: "Diesel",
      petrol: "Petrol",
      hybrid: "Hybrid",
      electric: "Electric",
    },
  },
  {
    key: "transmission",
    title: "Transmission",
    labels: { automatic: "Automatic", manual: "Manual" },
  },
];

const filterOptions = (filters?: CamperFilters) => ({
  form: filters?.forms ?? [],
  transmission: filters?.transmissions ?? [],
  engine: filters?.engines ?? [],
});

export default function FilterPanel({
  draftFilters,
  onDraftFiltersChange,
  onSearch,
  onClear,
}: {
  draftFilters: AppliedFilters;
  onDraftFiltersChange: Dispatch<SetStateAction<AppliedFilters>>;
  onSearch: (filters: AppliedFilters) => void;
  onClear: () => void;
}) {
  const filtersQuery = useQuery({
    queryKey: ["camper-filters"],
    queryFn: ({ signal }) => getCamperFilters(signal),
  });
  const options = filterOptions(filtersQuery.data);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextFilters: AppliedFilters = {};
    const normalizedLocation = draftFilters.location?.trim();

    if (normalizedLocation) nextFilters.location = normalizedLocation;
    if (draftFilters.form) nextFilters.form = draftFilters.form;
    if (draftFilters.engine) nextFilters.engine = draftFilters.engine;
    if (draftFilters.transmission) {
      nextFilters.transmission = draftFilters.transmission;
    }

    onSearch(nextFilters);
  };

  const handleClear = () => {
    onClear();
  };

  const handleSelection = <K extends FilterField>(
    key: K,
    value: NonNullable<AppliedFilters[K]>,
  ) => {
    onDraftFiltersChange((current) => ({
      ...current,
      [key]: current[key] === value ? undefined : value,
    }));
  };

  return (
    <aside className="w-96 shrink-0 rounded-2xl bg-inputs p-5 max-lg:w-full">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1 text-sm font-medium text-text">
          Location
          <span className="relative block">
            <FiMapPin
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-main"
            />
            <input
              className="h-10 w-full rounded-xl border border-transparent bg-white pl-12 pr-4 text-sm text-main outline-none transition placeholder:text-gray focus:border-grey-green"
              name="location"
              onChange={(event) =>
                onDraftFiltersChange((current) => ({
                  ...current,
                  location: event.target.value,
                }))
              }
              placeholder="City"
              type="text"
              value={draftFilters.location ?? ""}
            />
          </span>
        </label>

        <div>
          <p className="mb-4 text-base font-medium text-text">Filters</p>
          {filtersQuery.isPending && (
            <div
              className="mb-4 flex items-center gap-2 text-sm text-gray"
              role="status"
            >
              <span
                aria-hidden="true"
                className="size-4 animate-spin rounded-full border-2 border-gray-light border-t-grey-green"
              />
              Loading filters...
            </div>
          )}
          {filtersQuery.isError && (
            <div
              className="mb-4 flex items-center gap-3 text-sm text-text"
              role="alert"
            >
              <p>Could not load filter options.</p>
              <Button
                className="h-auto border-transparent bg-transparent px-0 text-grey-green underline hover:border-transparent hover:bg-transparent"
                onClick={() => void filtersQuery.refetch()}
                size="sm"
                type="button"
                variant="outline"
              >
                Try again
              </Button>
            </div>
          )}
          <div className="flex flex-col gap-4">
            {filterGroups.map(({ key, title, labels }) => (
              <fieldset className="border-0" key={key}>
                <legend className="mb-1 text-sm font-medium text-text">
                  {title}
                </legend>
                {filtersQuery.isSuccess && (
                  <div className="flex flex-col">
                    {options[key].map((value) => (
                      <label
                        className="flex min-h-5 cursor-pointer items-center gap-2 text-sm text-main"
                        key={value}
                      >
                        <input
                          checked={draftFilters[key] === value}
                          className="size-4 accent-main"
                          name={key}
                          onChange={() => handleSelection(key, value)}
                          type="radio"
                          value={value}
                        />
                        {key === "form"
                          ? formatCamperForm(value)
                          : (labels?.[value] ?? value.replaceAll("_", " "))}
                      </label>
                    ))}
                  </div>
                )}
              </fieldset>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button className="w-full" size="sm" type="submit">
            Search
          </Button>
          <Button
            className="w-full px-5"
            onClick={handleClear}
            size="sm"
            type="button"
            variant="outline"
          >
            <FiX aria-hidden="true" />
            Clear filters
          </Button>
        </div>
      </form>
    </aside>
  );
}
