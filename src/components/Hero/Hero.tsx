import Image from "next/image";
import Link from "next/link";

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
        className="object-cover object-[50%_70%] [transform:scaleX(-1.23)_scaleY(1.23)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-black/50 via-black/25 to-black/10"
      />
      <div className="relative z-10 mx-auto h-full w-full max-w-[1440px] px-8 pt-[184px] lg:px-16">
        <div className="max-w-[720px]">
          <h1 className="whitespace-nowrap text-5xl leading-[1.15] font-semibold tracking-tight">
            Campers of your dreams
          </h1>
          <p className="mt-2 text-2xl leading-[1.33] font-semibold text-white">
            You can find everything you want in our catalog
          </p>
          <Link
            href="/catalog"
            prefetch={false}
            className="mt-9 inline-flex h-14 w-[173px] items-center justify-center rounded-[200px] bg-grey-green px-[60px] py-4 text-base leading-6 font-medium tracking-[-0.01em] whitespace-nowrap text-white transition-colors hover:bg-green-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            View Now
          </Link>
        </div>
      </div>
    </section>
  );
}
