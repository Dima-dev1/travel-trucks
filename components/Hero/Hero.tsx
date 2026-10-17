import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button/Button";

export default function Hero() {
  return (
    <section className="relative isolate h-[calc(100svh-72px)] w-full overflow-hidden bg-main text-white">
      <Image
        src="/images/home-hero.png"
        alt="Camper van parked beside a lake at sunset"
        fill
        priority
        decoding="sync"
        sizes="100vw"
        className="object-cover object-[50%_70%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-black/50 via-black/25 to-black/10"
      />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-page items-center px-8 lg:px-16">
        <div className="max-w-180">
          <h1 className="whitespace-nowrap text-5xl leading-[1.15] font-semibold tracking-tight">
            Campers of your dreams
          </h1>
          <p className="mt-2 text-2xl leading-[1.33] font-semibold text-white">
            You can find everything you want in our catalog
          </p>
          <ButtonLink
            className="mt-9 w-[173px] px-15 tracking-[-0.01em] whitespace-nowrap focus-visible:outline-white"
            href="/catalog"
            size="lg"
          >
            View Now
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
