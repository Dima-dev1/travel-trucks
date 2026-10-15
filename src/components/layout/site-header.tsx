import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-gray-light bg-white">
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-8 lg:px-16">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-main"
          aria-label="TravelTrucks home"
        >
          TravelTrucks
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-10">
          <Link
            href="/"
            className="text-base font-medium text-main transition-colors hover:text-button"
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className="text-base font-medium text-main transition-colors hover:text-button"
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
