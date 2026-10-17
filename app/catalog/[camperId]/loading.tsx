import Loader from "@/components/Loader/Loader";

export default function CamperLoading() {
  return (
    <section
      aria-label="Loading camper details"
      className="mx-auto flex min-h-[70vh] max-w-page items-center justify-center px-6"
    >
      <Loader label="Loading" size="xl" />
    </section>
  );
}
