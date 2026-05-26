import Link from "next/link";
import { FOOTER_COLUMNS, SITE_INFO } from "@/constants/data";
import Logo from "@/components/Logo";

const TwitterIcon = ({ className = "w-[16px] h-[16px] shrink-0", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.632 5.905-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ className = "w-[16px] h-[16px]", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 0 0 0 0-2.881z" />
  </svg>
);

const RedditIcon = ({ className = "w-[16px] h-[16px]", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

const DiscordIcon = ({ className = "w-[16px] h-[16px]", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const ICONS_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "Twitter / X": TwitterIcon,
  "Instagram": InstagramIcon,
  "Reddit": RedditIcon,
  "Discord": DiscordIcon,
  "@abhijeet_dipke": TwitterIcon,
  "@abhijeetdipke": InstagramIcon,
};

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

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-[36px]">
            {FOOTER_COLUMNS.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col">
                <h4 className="font-mono text-[11px] tracking-[0.22em] uppercase text-saffron-2 font-semibold mb-[18px] pb-[12px] border-b border-[rgba(255,255,255,0.18)]">
                  {col.title}
                </h4>
                {col.sections.map((section, secIdx) => (
                  <div key={secIdx} className={secIdx > 0 ? "mt-8 flex flex-col" : "flex flex-col"}>
                    {section.title && (
                      <h4 className="font-mono text-[11px] tracking-[0.22em] uppercase text-saffron-2 font-semibold mb-[18px] pb-[12px] border-b border-[rgba(255,255,255,0.18)]">
                        {section.title}
                      </h4>
                    )}
                    <ul className="list-none flex flex-col gap-[11px]">
                      {section.links.map((link, linkIdx) => {
                        const className = "font-sans text-[15px] text-[rgba(244,235,215,0.72)] transition-colors duration-150 hover:text-saffron-2 inline-flex items-center gap-[9px]";
                        const Icon = ICONS_MAP[link.name];
                        const linkContent = (
                          <>
                            {Icon && <Icon />}
                            <span>{link.name}</span>
                          </>
                        );
                        const linkProps = {
                          href: link.href,
                          className,
                        };

                        return (
                          <li key={linkIdx}>
                            {link.external ? (
                              <a
                                {...linkProps}
                                target="_blank"
                                rel="noopener"
                              >
                                {linkContent}
                              </a>
                            ) : (
                              <Link
                                {...linkProps}
                              >
                                {linkContent}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
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
