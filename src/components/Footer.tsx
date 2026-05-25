import Link from "next/link";
import { FOOTER_COLUMNS, SITE_INFO } from "@/constants/data";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper mt-auto">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[56px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-[80px] pt-[64px] lg:pt-[80px] pb-[48px] lg:pb-[60px]">
          <div className="flex flex-col">
            <div className="flex items-center gap-[14px] mb-[18px]">
              <span className="w-12 h-12 grid place-items-center">
                <Logo variant="dark" />
              </span>
              <span className="flex flex-col gap-[6px] leading-none">
                <span className="font-display text-[14px] sm:text-[16px] tracking-[0.01em] leading-[0.94] text-paper">
                  COCKROACH
                  <br />
                  JANTA PARTY
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-saffron-2">
                  कॉकरोच जनता पार्टी
                </span>
              </span>
            </div>
            <p className="font-sans text-[15px] leading-[1.6] text-[rgba(244,235,215,0.6)] max-w-[320px]">
              A political party for the lazy, the unemployed, and the chronically correct. Headquartered wherever the wifi works.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[36px]">
            {FOOTER_COLUMNS.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col">
                <h4 className="font-mono text-[11px] tracking-[0.22em] uppercase text-saffron-2 font-semibold mb-[18px] pb-[12px] border-b border-[rgba(255,255,255,0.18)]">
                  {col.title}
                </h4>
                <ul className="list-none flex flex-col gap-[11px]">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          className="font-sans text-[15px] text-[rgba(244,235,215,0.72)] transition-colors duration-150 hover:text-saffron-2"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="font-sans text-[15px] text-[rgba(244,235,215,0.72)] transition-colors duration-150 hover:text-saffron-2"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          </div>

        <div className="border-t border-[rgba(255,255,255,0.12)] py-[22px]">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center font-mono text-[10.5px] tracking-[0.2em] uppercase text-[rgba(244,235,215,0.55)] flex-wrap gap-4 sm:gap-[16px]">
            <div>© 2026 {SITE_INFO.SITE_FULL_NAME} · All rants reserved.</div>
            <span className="bg-saffron text-paper py-[4px] px-[12px] tracking-[0.22em]">
              ⚠ A work of satire
            </span>
            <div className="flex gap-[8px]">
              <a href="#" className="text-[rgba(244,235,215,0.55)] transition-colors duration-150 hover:text-saffron-2">Privacy</a>
              {" · "}
              <a href="#" className="text-[rgba(244,235,215,0.55)] transition-colors duration-150 hover:text-saffron-2">Press</a>
              {" · "}
              <Link
                href="/#contact"
                className="text-[rgba(244,235,215,0.55)] transition-colors duration-150 hover:text-saffron-2"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
