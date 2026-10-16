"use client";

import { useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiMapPin, FiX } from "react-icons/fi";
import { getCamperFilters } from "@/lib/api";
import type { CamperFilters } from "@/types/camper";
import type { AppliedFilters } from "./CatalogClient";

type FilterField = "form" | "engine" | "transmission";

const filterGroups: {
  key: FilterField;
  title: string;
  labels: Record<string, string>;
}[] = [
  {
    key: "form",
    title: "Camper form",
    labels: {
      panel_van: "Panel Van",
      alcove: "Alcove",
      integrated: "Integrated",
      semi_integrated: "Semi-Integrated",
    },
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
  onSearch,
  onClear,
}: {
  onSearch: (filters: AppliedFilters) => void;
  onClear: () => void;
}) {
  const [location, setLocation] = useState("");
  const [selected, setSelected] = useState<AppliedFilters>({});
  const filtersQuery = useQuery({
    queryKey: ["camper-filters"],
    queryFn: ({ signal }) => getCamperFilters(signal),
  });
  const options = filterOptions(filtersQuery.data);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextFilters: AppliedFilters = {};
    const normalizedLocation = location.trim();

    if (normalizedLocation) nextFilters.location = normalizedLocation;
    if (selected.form) nextFilters.form = selected.form;
    if (selected.engine) nextFilters.engine = selected.engine;
    if (selected.transmission) {
      nextFilters.transmission = selected.transmission;
    }

    onSearch(nextFilters);
  };

  const handleClear = () => {
    setLocation("");
    setSelected({});
    onClear();
  };

  const handleSelection = <K extends FilterField>(
    key: K,
    value: NonNullable<AppliedFilters[K]>,
  ) => {
    setSelected((current) => ({
      ...current,
      [key]: current[key] === value ? undefined : value,
    }));
  };

  return (
    <aside className="w-[384px] shrink-0 rounded-2xl bg-(--inputs) p-6 max-lg:w-full">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm font-medium text-(--text)">
          Location
          <span className="relative block">
            <FiMapPin
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-(--main)"
            />
            <input
              className="h-12 w-full rounded-xl border border-transparent bg-white pl-12 pr-4 text-base text-(--main) outline-none transition placeholder:text-(--gray) focus:border-(--grey-green)"
              name="location"
              onChange={(event) => setLocation(event.target.value)}
              placeholder="City"
              type="text"
              value={location}
            />
          </span>
        </label>

        <div>
          <p className="mb-8 text-base font-medium text-(--text)">Filters</p>
          {filtersQuery.isPending && (
            <p className="mb-4 text-sm text-(--gray)" role="status">
              Loading filter options...
            </p>
          )}
          {filtersQuery.isError && (
            <div
              className="mb-4 flex items-center gap-3 text-sm text-(--text)"
              role="alert"
            >
              <p>Could not load filter options.</p>
              <button
                className="font-medium text-(--grey-green) underline"
                onClick={() => void filtersQuery.refetch()}
                type="button"
              >
                Try again
              </button>
            </div>
          )}
          <div className="flex flex-col gap-6">
            {filterGroups.map(({ key, title, labels }) => (
              <fieldset
                className="border-0"
                key={key}
              >
                <legend className="mb-2 text-sm font-medium text-(--text)">
                  {title}
                </legend>
                {filtersQuery.isSuccess && (
                  <div className="flex flex-col">
                    {options[key].map((value) => (
                      <label
                        className="flex min-h-8 cursor-pointer items-center gap-2 text-sm text-(--main)"
                        key={value}
                      >
                        <input
                          checked={selected[key] === value}
                          className="size-4 accent-(--main)"
                          name={key}
                          onChange={() => handleSelection(key, value)}
                          type="radio"
                          value={value}
                        />
                        {labels[value] ?? value.replaceAll("_", " ")}
                      </label>
                    ))}
                  </div>
                )}
              </fieldset>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            className="h-12 w-full rounded-full bg-(--grey-green) px-6 text-base font-medium text-white transition hover:bg-(--green-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--grey-green)"
            type="submit"
          >
            Search
          </button>
          <button
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-(--gray-light) bg-white px-5 text-base font-medium text-(--main) transition hover:border-(--grey-green)"
            onClick={handleClear}
            type="button"
          >
            <FiX aria-hidden="true" />
            Clear filters
          </button>
        </div>
      </form>
    </aside>
  );
}
