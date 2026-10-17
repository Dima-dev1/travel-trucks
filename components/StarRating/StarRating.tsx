import { FiStar } from "react-icons/fi";

export default function StarRating({
  className = "",
  value,
}: {
  className?: string;
  value: number;
}) {
  const rating = Math.min(Math.max(value, 0), 5);

  return (
    <span
      aria-label={`${value} out of 5 stars`}
      className={`inline-flex gap-1 ${className}`}
      role="img"
    >
      {Array.from({ length: 5 }, (_, index) => {
        const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;

        return (
          <span className="relative inline-flex" key={index}>
            <FiStar aria-hidden="true" className="size-4 text-gray-light" />
            <span
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <FiStar
                aria-hidden="true"
                className="size-4 max-w-none fill-rating text-rating"
              />
            </span>
          </span>
        );
      })}
    </span>
  );
}
