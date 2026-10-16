"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="absolute left-1/2 flex -translate-x-1/2 items-center gap-8"
    >
      {[
        { href: "/", label: "Home" },
        { href: "/catalog", label: "Catalog" },
      ].map(({ href, label }) => {
        const isActive =
          pathname === href ||
          (href === "/catalog" && pathname.startsWith("/catalog/"));

        return (
          <Link
            key={href}
            href={href}
            prefetch={href !== "/catalog"}
            aria-current={isActive ? "page" : undefined}
            className={`text-base font-medium transition-colors hover:text-grey-green ${
              isActive ? "text-grey-green" : "text-main"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
