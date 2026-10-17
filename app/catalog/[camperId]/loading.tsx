export default function CamperLoading() {
  return (
    <section
      aria-label="Loading camper details"
      className="mx-auto flex min-h-[70vh] max-w-page items-center justify-center px-6"
    >
      <div
        aria-label="Loading"
        className="size-12 animate-spin rounded-full border-4 border-gray-light border-t-grey-green"
        role="status"
      />
    </section>
  );
}
