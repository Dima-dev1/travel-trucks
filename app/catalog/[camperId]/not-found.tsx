import { ButtonLink } from "@/components/ui/Button/Button";

export default function CamperNotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-page flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="text-3xl font-semibold text-main">Camper not found</h1>
      <p className="max-w-lg text-text">
        This camper may no longer be available. Browse the catalog to find
        another one.
      </p>
      <ButtonLink href="/catalog" size="lg">
        Back to catalog
      </ButtonLink>
    </section>
  );
}
