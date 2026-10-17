import Image from "next/image";
import Link from "next/link";
import HeaderNavigation from "./HeaderNavigation";

export default function Header() {
  return (
    <header className="h-18 border-b border-gray-light bg-inputs">
      <div className="relative mx-auto flex h-full w-full max-w-page items-center px-8 lg:px-16">
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
        <HeaderNavigation />
      </div>
    </header>
  );
}
