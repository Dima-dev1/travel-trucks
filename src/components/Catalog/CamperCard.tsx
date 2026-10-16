import Image from "next/image";
import Link from "next/link";
import {
  FiDroplet,
  FiMapPin,
  FiSettings,
  FiStar,
  FiTruck,
} from "react-icons/fi";
import type { CamperListItem } from "@/types/camper";

const featureLabel = (value: string) =>
  value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function CamperCard({ camper }: { camper: CamperListItem }) {
  const rating = camper.rating.toFixed(1);
  const detailHref = `/catalog/${camper.id}`;
  const location = camper.location
    .split(",")
    .map((part) => part.trim())
    .reverse()
    .join(", ");
  const features = [
    { icon: FiDroplet, label: camper.engine },
    { icon: FiSettings, label: camper.transmission },
    { icon: FiTruck, label: camper.form.replaceAll("_", " ") },
  ];

  return (
    <article className="flex min-h-[332px] gap-6 rounded-2xl bg-(--inputs) p-6 max-md:flex-col">
      <div className="relative h-[260px] w-[236px] shrink-0 overflow-hidden rounded-xl max-md:w-full">
        <Image
          alt={camper.name}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 236px"
          src={camper.coverImage}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-2 flex items-start justify-between gap-4">
          <h2 className="truncate text-2xl font-semibold text-(--main)">
            {camper.name}
          </h2>
          <p className="shrink-0 text-2xl font-semibold text-(--main)">
            €{camper.price}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-(--text)">
          <span className="inline-flex items-center gap-1">
            <FiStar aria-hidden="true" className="text-(--rating)" />
            <span>
              {rating} ({camper.totalReviews} Reviews)
            </span>
          </span>
          <span className="inline-flex items-center gap-1">
            <FiMapPin aria-hidden="true" />
            {location}
          </span>
        </div>

        <p className="mb-6 line-clamp-1 text-base text-(--text)">
          {camper.description}
        </p>

        <ul aria-label="Camper features" className="mb-6 flex flex-wrap gap-2">
          {features.map(({ icon: Icon, label }) => (
            <li
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-(--badges) px-4 text-sm font-medium text-(--main)"
              key={label}
            >
              <Icon aria-hidden="true" className="text-lg" />
              {featureLabel(label)}
            </li>
          ))}
        </ul>

        <Link
          className="mt-auto inline-flex min-h-14 w-fit items-center justify-center rounded-full bg-(--grey-green) px-8 text-base font-medium text-white transition hover:bg-(--green-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--grey-green)"
          href={detailHref}
          prefetch={false}
          rel="noopener noreferrer"
          target="_blank"
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
