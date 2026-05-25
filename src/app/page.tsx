import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Ticker from "@/components/Ticker";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import HeroPoster from "@/components/HeroPoster";
import StatsGrid from "@/components/StatsGrid";
import SecurityAdvisory from "@/components/SecurityAdvisory";
import { ELIGIBILITY_ITEMS, MANIFESTO_DEMANDS, CONTACT_ITEMS, SITE_INFO } from "@/constants/data";
import flaggedData from "../../scripts/flagged_domains.json";

const SackPopup = dynamic(() => import("@/components/SackPopup"));
const AnthemPlayer = dynamic(() => import("@/components/AnthemPlayer"));



export default function Home() {
  return (
    <>
      {/* Dynamic rolling ticker */}
      <Ticker />

      {/* Sticky Header with inline Brand SVG logo */}
      <Header />

      {/* Main Container */}
      <main className="flex-1">

        {/* HERO SECTION */}
        <section className="relative border-b-[3px] border-ink overflow-hidden" data-screen-label="01 Hero">
          <div
            className="absolute inset-0 pointer-events-none before:content-['CJP'] before:absolute before:bottom-[-120px] before:inset-e-[-40px] before:font-display before:text-[520px] before:text-ink before:opacity-5 before:leading-[0.8]"
            aria-hidden="true"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 85% 15%, rgba(224,101,30,0.12), transparent 60%),
                           radial-gradient(ellipse 50% 50% at 10% 90%, rgba(31,90,46,0.10), transparent 60%)`
            }}
          />

          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[56px] pt-[40px] lg:pt-[72px] pb-[56px] lg:pb-[90px] grid grid-cols-1 lg:grid-cols-[1.15fr_0.95fr] gap-9 lg:gap-16 items-center relative z-2">

            {/* Column 1: Info and Slogans */}
            <div className="flex flex-col items-start">
              <div className="flex flex-wrap items-center gap-3.5 mb-[32px]">
                {/* Party Launch Badge */}
                <div className="inline-flex items-center gap-[10px] font-mono text-[11px] tracking-[0.22em] uppercase text-blood py-[7px] px-[14px] border border-blood rounded-full bg-paper/50">
                  <span className="w-[7px] h-[7px] rounded-full bg-blood animate-livepulse" />
                  <span>Party Launch · Live since yesterday</span>
                </div>

                {/* Verified Official Website Badge */}
                <div className="inline-flex items-center gap-2 bg-green py-[6px] px-[14px] rounded-full shadow-[0_0_14px_rgba(31,90,46,0.22)] border border-green-2/30">
                  {/* Circular check icon container */}
                  <span className="w-[18px] h-[18px] rounded-full bg-green-2 flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-paper)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-2.5 h-2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="font-sans text-[10.5px] font-extrabold tracking-[0.16em] uppercase text-paper leading-none pt-[1px]">
                    Official Website
                  </span>
                </div>
              </div>

              <h1 className="font-display font-normal text-[52px] sm:text-[clamp(58px,9.5vw,138px)] leading-[0.86] tracking-[-0.015em] mb-[28px] text-ink">
                Voice of the
                <br />
                <span className="text-saffron-deep">Lazy</span> &amp;
                <br />
                <span className="text-green font-['Georgia',serif] italic tracking-[-0.02em]">Unemployed.</span>
              </h1>

              <p className="font-sans text-[19px] leading-[1.55] max-w-[520px] mb-[38px] text-ink-2">
                A political party for the people the system forgot to count. Five demands. Zero sponsors. One large, stubborn swarm.
              </p>

              <div className="flex items-center gap-5 sm:gap-6 mb-14 flex-wrap">
                <a
                  href="#join"
                  className="bg-saffron-deep text-paper font-condensed text-[14px] font-bold tracking-[0.2em] uppercase py-[18px] px-[32px] border-2 border-ink shadow-[6px_6px_0_var(--color-ink)] transition-all duration-150 inline-flex items-center gap-[14px] group hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_var(--color-ink)]"
                >
                  Join the Party
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>

                <Link
                  href="/sack"
                  className="bg-[#E53E3E] hover:bg-[#F55252] text-paper font-condensed tracking-widest py-[12px] px-[24px] border-2 border-ink shadow-[6px_6px_0_var(--color-ink)] transition-all duration-150 flex flex-col items-start gap-0.5 group hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_var(--color-ink)] relative overflow-hidden"
                >
                  <div className="flex items-center gap-[8px] flex-wrap sm:flex-nowrap">
                    <span className="w-2.5 h-2.5 rounded-full bg-gold animate-livepulse shrink-0" />
                    <span className="font-bold text-[14px] sm:text-[16px] uppercase tracking-[0.15em] text-paper leading-tight">
                      Sack the Education Minister
                    </span>
                  </div>
                  <div className="font-sans text-[11px] font-medium tracking-wider text-paper/80 flex items-center gap-1.5 ps-[18px]">
                    <span>File the petition!</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">➔</span>
                  </div>
                </Link>

                <a
                  href="#manifesto"
                  className="font-condensed text-[14px] font-medium tracking-[0.2em] uppercase text-ink border-b border-ink pb-[6px] transition-colors duration-200 hover:text-saffron-deep hover:border-saffron-deep"
                >
                  Read the Manifesto
                </a>
              </div>

              {/* Dynamic Stats Grid */}
              <StatsGrid />
            </div>

            {/* Column 2: Poster Slideshow and Stamp Badge */}
            <HeroPoster />

          </div>
        </section>

        {/* MIDDLE SLOGANS MARQUEE */}
        <Marquee />

        {/* VISION SECTION */}
        <section id="vision" className="py-[80px] lg:py-[110px] border-b-2 border-ink" style={{ background: "linear-gradient(180deg, var(--color-paper) 0%, var(--color-paper-2) 100%)" }}>
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[56px]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-14 lg:gap-20 items-start">

              <div className="flex flex-col items-start">
                <span className="inline-block font-mono text-[11px] tracking-[0.22em] uppercase text-saffron-deep mb-[22px]">
                  Chapter One
                </span>
                <h2 className="font-display font-normal text-[clamp(44px,6vw,80px)] leading-[0.92] tracking-[-0.005em] text-ink">
                  Our Movement&#x27;s
                  <br />
                  <em className="italic font-['Georgia',serif] font-normal text-green tracking-[-0.01em]">Vision.</em>
                </h2>

                <p className="font-sans text-[18px] leading-[1.55] max-w-[520px] mb-[38px] text-ink-2 mt-4">
                  We are not here to set up another PM CARES, holiday in Davos on the taxpayer&#x27;s salary slip, or rebrand corruption as &quot;strategic spending.&quot; We are here to ask — loudly, repeatedly, in writing — where the money went.
                </p>

                <div className="mt-10 border-2 border-ink bg-paper py-[28px] px-[30px] relative shadow-[8px_8px_0_var(--color-ink)]">
                  <span className="inline-block font-mono text-[10.5px] tracking-[0.22em] uppercase text-green bg-paper-2 py-1 px-2.5 border border-green mb-4">
                    Our Mission
                  </span>
                  <p className="font-sans text-[17px] leading-[1.6] text-ink-2">
                    Build a party for the young people who keep getting called lazy, chronically online, and — most recently — cockroaches. That&#x27;s it. That&#x27;s the mission. The rest is satire.
                  </p>
                </div>
              </div>

              <aside className="w-full">
                <div className="border-2 border-ink shadow-[5px_5px_0_var(--color-saffron-deep),5px_5px_0_2px_var(--color-ink)] sm:shadow-[10px_10px_0_var(--color-saffron-deep),10px_10px_0_2px_var(--color-ink)] overflow-hidden bg-paper">
                  <Image
                    src="/cockroach_speaking.webp"
                    alt={`${SITE_INFO.SITE_FULL_NAME} banner with the crowd raising fists`}
                    width={800}
                    height={600}
                    unoptimized
                    className="w-full h-auto lg:h-full block object-cover border-b-2 border-ink aspect-3/4 sm:aspect-4/3 lg:aspect-auto"
                    loading="lazy"
                  />
                  <div className="flex justify-between py-3 px-[18px] font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-2 bg-paper-2">
                    <span>Rally · The People&#x27;s Banner</span>
                    <span>16 . 05 . 2026</span>
                  </div>
                </div>
              </aside>

            </div>
          </div>
        </section>

        {/* MANIFESTO SECTION */}
        <section id="manifesto" className="bg-ink text-paper py-[80px] lg:py-[120px] relative overflow-hidden border-b-2 border-ink">
          <div className="absolute top-[-200px] inset-s-[-200px] w-[700px] h-[700px] opacity-[0.22] pointer-events-none" style={{ background: "radial-gradient(circle, var(--color-saffron-deep), transparent 70%)" }} />
          <div className="absolute bottom-[-200px] inset-e-[-200px] w-[700px] h-[700px] opacity-[0.22] pointer-events-none" style={{ background: "radial-gradient(circle, var(--color-green), transparent 70%)" }} />

          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[56px] relative z-2">
            <div className="text-center mb-[72px] relative z-2">
              <span className="inline-block font-mono text-[11px] tracking-[0.22em] uppercase text-saffron-2 mb-[22px]">
                The Five Demands
              </span>
              <h2 className="font-display font-normal text-[clamp(44px,6vw,80px)] leading-[0.92] tracking-[-0.005em] text-paper">
                The Manifesto.
              </h2>
              <p className="font-sans text-[18px] leading-[1.55] text-[rgba(244,235,215,0.78)] max-w-[560px] mx-auto mt-6">
                Read it once. Read it twice. Then send it to someone who needs to read it.
              </p>
            </div>

            <ul className="list-none grid gap-0 max-w-[980px] mx-auto relative z-2 border-t border-[rgba(244,235,215,0.18)]">
              {MANIFESTO_DEMANDS.map((demand, idx) => (
                <li key={idx} className="grid grid-cols-[70px_1fr] sm:grid-cols-[90px_1fr] lg:grid-cols-[140px_1fr] gap-[18px] sm:gap-[24px] lg:gap-[36px] py-[36px] border-b border-[rgba(244,235,215,0.18)] items-start transition-all duration-250 hover:px-4 hover:bg-[rgba(224,101,30,0.07)]">
                  <span className="font-display text-[44px] sm:text-[60px] lg:text-[88px] leading-[0.85] text-saffron-2 tracking-[-0.02em]">{demand.num}</span>
                  <div className="font-sans text-[16.5px] sm:text-[18px] lg:text-[21px] leading-normal text-[rgba(244,235,215,0.92)] font-normal pt-[10px] lg:pt-[16px]">
                    {demand.textBefore}
                    <strong
                      className="text-paper font-bold px-0.5"
                      style={{ background: "linear-gradient(180deg, transparent 62%, rgba(224,101,30,0.45) 62%)" }}
                    >
                      {demand.textHighlight}
                    </strong>
                    {demand.textAfter}
                    {demand.textHighlight2 && (
                      <>
                        <strong
                          className="text-paper font-bold px-0.5"
                          style={{ background: "linear-gradient(180deg, transparent 62%, rgba(224,101,30,0.45) 62%)" }}
                        >
                          {demand.textHighlight2}
                        </strong>
                        {demand.textAfter2}
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>

          </div>
        </section>

        {/* SECURITY ADVISORY WARNING SECTION */}
        <SecurityAdvisory initialFlaggedDomains={flaggedData.flagged_domains || []} />

        {/* ELIGIBILITY CHECKLIST SECTION */}
        <section id="join" className="relative py-[80px] lg:py-[120px] bg-paper border-b-2 border-ink">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[56px]">

            <div className="text-center max-w-[760px] mx-auto mb-[64px]">
              <span className="inline-block font-mono text-[11px] tracking-[0.22em] uppercase text-saffron-deep mb-[22px]">
                Membership
              </span>
              <h2 className="font-display font-normal text-[clamp(44px,6vw,80px)] leading-[0.92] tracking-[-0.005em] text-ink">
                Are you eligible
                <br />
                to <em className="italic font-['Georgia',serif] font-normal text-green tracking-[-0.01em]">join?</em>
              </h2>
              <p className="font-sans text-[18px] leading-[1.55] text-ink-2 mt-6 max-w-[560px] mx-auto">
                We do not check religion, caste, or gender. We do, however, have four (4) standards.
              </p>
            </div>

            <ul className="list-none flex flex-col gap-4 max-w-[920px] mx-auto">
              {ELIGIBILITY_ITEMS.map((item, idx) => (
                <li key={idx} className="flex flex-row items-center gap-4 sm:gap-7 p-[18px_20px] sm:p-[22px_28px] bg-paper-2 border-2 border-ink shadow-[5px_5px_0_var(--color-ink)] transition-all duration-200 cursor-default group hover:bg-paper-3 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_var(--color-ink)]">
                  <div className="flex flex-col sm:flex-row sm:items-center flex-1 min-w-0">
                    <span className="font-mono text-[11px] tracking-[0.22em] text-saffron-deep font-semibold mb-1 sm:mb-0 sm:w-[110px] lg:w-[140px] shrink-0">
                      {item.id}
                    </span>
                    <div className="flex flex-col flex-1 min-w-0">
                      <strong className="font-display text-[22px] sm:text-[24px] lg:text-[28px] text-ink tracking-[-0.005em] leading-none">
                        {item.title}
                      </strong>
                      <span className="font-sans text-[14.5px] italic text-ink-2 mt-1.5">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                  <div className="w-[48px] h-[48px] shrink-0 border-2 border-ink rounded-full grid place-items-center text-[22px] text-green bg-paper transition-colors duration-200 group-hover:bg-green group-hover:text-paper">✓</div>
                </li>
              ))}
            </ul>

            <div className="mt-[56px] text-center">
              <a
                href="#contact"
                className="bg-saffron-deep text-paper font-condensed text-[14px] lg:text-[16px] font-bold tracking-[0.2em] uppercase py-[18px] lg:py-[22px] px-[32px] lg:px-[40px] border-2 border-ink shadow-[6px_6px_0_var(--color-ink)] transition-all duration-150 inline-flex items-center gap-[14px] group hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_var(--color-ink)]"
              >
                Join the Party
                <span className="text-[20px] transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <p className="mt-6 font-sans text-[14px] italic text-ink-3 leading-[1.6]">
                Membership is free, lifelong, and revocable only by you.
                <br />
                No fees. No selfies with the leader. No &quot;missed call to register.&quot;
              </p>
            </div>

          </div>
        </section>

        {/* FULL WIDTH POSTER BANNER */}
        <div className="border-b-2 border-ink bg-paper relative overflow-hidden">
          <Image
            src="/banner.webp"
            alt="Stronger Together — Become a Member of the Cockroach Janta Party"
            width={1200}
            height={630}
            unoptimized
            className="w-full h-auto block sm:object-fill object-cover max-h-[56vw] sm:max-h-none"
            loading="lazy"
          />
        </div>

        {/* CONTACT & REGISTRATION FORM */}
        <section id="contact" className="py-[80px] lg:py-[120px] bg-paper border-b-2 border-ink">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[56px]">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-[80px] items-start">

              <div className="flex flex-col">
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-2 mb-4 block">
                  Get in touch
                </span>
                <h2 className="font-display font-normal text-[clamp(44px,6vw,80px)] leading-[0.92] tracking-[-0.005em] text-ink mb-4">
                  Connect
                  <br />
                  with us.
                </h2>
                <p className="font-sans text-[18px] leading-[1.55] text-ink-2 max-w-[560px]">
                  Want to join, volunteer, complain, or send a meme? Use the form. We read everything. We reply to most things.
                </p>

                <ul className="list-none mt-10 flex flex-col gap-[18px]">
                  {CONTACT_ITEMS.map((item) => (
                    <li key={item.label} className="grid grid-cols-[110px_1fr] gap-6 pb-4 border-b border-[rgba(26,17,8,0.15)] items-baseline">
                      <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-3">{item.label}</span>
                      <span className="font-sans text-[16px] text-ink font-medium flex flex-col gap-1">
                        {item.value}
                        {item.subValue && (
                          <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink-3 font-normal">
                            {item.subValue}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Campaign Poster occupying empty left side space */}
                <div className="mt-12 relative max-w-[480px] w-full border-[3px] border-ink shadow-[8px_8px_0_var(--color-ink)] bg-paper overflow-hidden">
                  <a
                    href="https://github.com/cjpgenz/cjpgenz#-cockroach-janta-party-cjp--official-repository"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group cursor-pointer overflow-hidden"
                  >
                    <Image
                      src="/Cockroach_Janta_Party_Campaign_Poster.webp"
                      alt={`${SITE_INFO.SITE_FULL_NAME} Campaign Poster`}
                      width={800}
                      height={1000}
                      unoptimized
                      className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </a>
                  <div className="bg-paper-2 py-3 px-4 font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink-3 border-t-2 border-ink text-center">
                    CJP Campaign Poster · Join the Swarm
                  </div>
                </div>
              </div>

              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSdYx7uN2ozYteN7kK_Ne5a90yxZhrmp_wlhVJGaPhK6SuUmjQ/viewform?embedded=true"
                width="100%"
                height="1565"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full min-w-0"
              >
                Loading…
              </iframe>

            </div>
          </div>
        </section>

      </main>

      {/* Footer component */}
      <Footer />

      {/* Scroll-triggered petition alert popup */}
      <SackPopup />

      {/* CJP Official Anthem floating player */}
      <AnthemPlayer />
    </>
  );
}
