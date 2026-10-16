import Link from "next/link";

export default function CamperNotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="text-3xl font-semibold text-(--main)">Camper not found</h1>
      <p className="max-w-lg text-(--text)">
        This camper may no longer be available. Browse the catalog to find
        another one.
      </p>
      <Link
        className="inline-flex min-h-14 items-center justify-center rounded-full bg-(--grey-green) px-8 font-medium text-white transition hover:bg-(--green-hover)"
        href="/catalog"
      >
        Back to catalog
      </Link>
    </section>
  );
}
