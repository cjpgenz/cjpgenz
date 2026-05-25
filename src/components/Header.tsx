import React from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/constants/data";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="bg-[rgba(244,235,215,0.94)] backdrop-blur-sm border-b-2 border-ink sticky top-0 z-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[56px] py-4 grid grid-cols-[1fr_auto] lg:grid-cols-[auto_1fr_auto] items-center gap-4 lg:gap-10">
        <Link href="/" className="flex items-center gap-[14px]">
          <span className="w-12 h-12 grid place-items-center">
            <Logo variant="light" />
          </span>
          <span className="flex flex-col gap-[6px] leading-none">
            <span className="font-display text-[14px] sm:text-[16px] tracking-[0.01em] leading-[0.94] text-ink">
              COCKROACH
              <br />
              JANTA PARTY
            </span>
            <span className="hidden sm:block font-mono text-[10px] tracking-[0.16em] uppercase text-saffron-deep">
              कॉकरोच जनता पार्टी · Est. 2026
            </span>
          </span>
        </Link>

        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="list-none flex justify-center gap-[36px]">
            {NAV_ITEMS.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className="font-condensed text-[14px] font-medium tracking-[0.18em] uppercase text-ink py-[6px] relative after:content-[''] after:absolute after:inset-s-0 after:inset-e-0 after:bottom-0 after:h-[2px] after:bg-saffron after:scale-x-0 after:origin-start after:transition-transform after:duration-250 hover:text-saffron-deep hover:after:scale-x-100"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/#join"
          className="bg-ink text-paper font-condensed text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] sm:tracking-[0.2em] uppercase px-[14px] py-[9px] sm:px-[22px] sm:py-[12px] border-2 border-ink transition-all duration-150 hover:bg-saffron-deep hover:border-saffron-deep hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_var(--color-ink)]"
        >
          Join the Party
        </Link>
      </div>
    </header>
  );
}
