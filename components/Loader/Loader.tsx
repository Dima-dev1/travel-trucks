type LoaderSize = "sm" | "md" | "lg" | "xl";

const sizes: Record<LoaderSize, string> = {
  sm: "size-4 border-2",
  md: "size-5 border-2",
  lg: "size-10 border-4",
  xl: "size-12 border-4",
};

export default function Loader({
  label,
  size = "md",
}: {
  label?: string;
  size?: LoaderSize;
}) {
  return (
    <span
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={`inline-block animate-spin rounded-full border-gray-light border-t-grey-green ${sizes[size]}`}
      role={label ? "status" : undefined}
    />
  );
}
