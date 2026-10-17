import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderNavigation from "./HeaderNavigation";

export default function Header() {
  return (
    <header className="h-[72px] border-b border-gray-light bg-inputs">
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] items-center px-8 lg:px-16">
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label="TravelTrucks home"
        >
          <Image
            alt="TravelTrucks"
            height={16}
            priority
            src="/images/logo.png"
            width={136}
          />
        </Link>
        <Suspense
          fallback={
            <nav
              aria-label="Main navigation"
              className="absolute left-1/2 flex -translate-x-1/2 items-center gap-8"
            >
              <Link className="text-base font-medium text-(--main)" href="/">
                Home
              </Link>
              <Link
                className="text-base font-medium text-(--main)"
                href="/catalog"
                prefetch={false}
              >
                Catalog
              </Link>
            </nav>
          }
        >
          <HeaderNavigation />
        </Suspense>
      </div>
    </header>
  );
}
