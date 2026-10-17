import { FiDroplet, FiMapPin, FiSettings, FiStar } from "react-icons/fi";
import type {
  Amenity,
  CamperDetails as CamperDetailsType,
} from "@/types/camper";

const amenityLabels: Record<Amenity, string> = {
  ac: "AC",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  tv: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};

const formatLabel = (value: string) =>
  value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function CamperDescription({
  camper,
}: {
  camper: CamperDetailsType;
}) {
  const location = camper.location
    .split(",")
    .map((part) => part.trim())
    .reverse()
    .join(", ");
  const badges = [
    { label: formatLabel(camper.transmission), icon: FiSettings },
    { label: formatLabel(camper.engine), icon: FiDroplet },
    ...camper.amenities.map((amenity) => ({
      label: amenityLabels[amenity],
      icon: null,
    })),
    { label: formatLabel(camper.form), icon: null },
  ];
  const specs = [
    ["Form", formatLabel(camper.form)],
    ["Length", camper.length],
    ["Width", camper.width],
    ["Height", camper.height],
    ["Tank", camper.tank],
    ["Consumption", camper.consumption],
  ];

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-2xl bg-(--inputs) p-6">
        <h1 className="text-2xl font-semibold text-(--main)">{camper.name}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-(--text)">
          <span className="inline-flex items-center gap-1">
            <FiStar aria-hidden="true" className="text-(--rating)" />
            {camper.rating.toFixed(1)} ({camper.totalReviews} Reviews)
          </span>
          <span className="inline-flex items-center gap-1">
            <FiMapPin aria-hidden="true" />
            {location}
          </span>
        </div>
        <p className="mt-4 text-2xl font-semibold text-(--main)">
          €{camper.price}
        </p>
        <p className="mt-4 text-sm leading-6 text-(--text)">
          {camper.description}
        </p>
      </section>

      <section className="rounded-2xl bg-(--inputs) p-6">
        <h2 className="text-xl font-semibold text-(--main)">Vehicle details</h2>
        <ul aria-label="Vehicle features" className="mt-4 flex flex-wrap gap-2">
          {badges.map(({ icon: Icon, label }) => (
            <li
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-(--badges) px-3 text-sm font-medium text-(--main)"
              key={label}
            >
              {Icon && <Icon aria-hidden="true" className="text-base" />}
              {label}
            </li>
          ))}
        </ul>
        <dl className="mt-4 border-t border-(--gray-light) pt-3">
          {specs.map(([label, value]) => (
            <div
              className="flex justify-between gap-4 py-1.5 text-sm"
              key={label}
            >
              <dt className="text-(--text)">{label}</dt>
              <dd className="text-right font-medium text-(--main)">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
