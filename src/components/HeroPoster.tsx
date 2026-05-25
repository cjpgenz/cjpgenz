"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HERO_SLIDES } from "@/constants/data";

export default function HeroPoster() {
  const [showAlt, setShowAlt] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowAlt((prev) => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative lg:-translate-y-40">
      <div className="bg-paper-2 border-[3px] border-ink relative transform lg:rotate-[1.5deg] shadow-[5px_5px_0_var(--color-ink),5px_5px_0_4px_var(--color-saffron-deep)] lg:shadow-[12px_12px_0_var(--color-ink),12px_12px_0_4px_var(--color-saffron-deep)] overflow-hidden">
        <div className="bg-saffron-deep text-paper py-[10px] px-[18px] font-mono text-[10.5px] tracking-[0.28em] uppercase flex justify-between border-b-2 border-ink">
          <span>Official Poster · No. 001</span>
          <span>★ ★ ★</span>
        </div>

        {/* Smooth layered crossfade container */}
        <div className="relative w-full aspect-1024/1180 border-b-2 border-ink bg-paper-2">
          {HERO_SLIDES.map((slide) => {
            const isAltKey = slide.key === "alt";
            const isVisible = isAltKey ? showAlt : !showAlt;
            return (
              <Image
                key={slide.key}
                src={slide.src}
                alt={slide.alt}
                fill
                priority={slide.fetchPriority === "high"}
                unoptimized
                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ease-in-out ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            );
          })}
        </div>

        <div className="bg-ink text-paper py-[18px] px-[18px] pb-[20px] lg:py-[22px] lg:px-[24px] lg:pb-[26px] text-center">
          <p className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-saffron-2 mb-[12px]">
            Together · Resilient · Unstoppable
          </p>
          <p className="font-display text-[18px] sm:text-[22px] leading-[1.15] text-paper tracking-[-0.005em]">
            &quot;They tried to step on us.
            <br />
            We came back.&quot;
          </p>
        </div>
      </div>

      {/* Angle "Approved" badge */}
      <span className="absolute top-[40px] lg:top-[56px] inset-e-[-22px] lg:inset-e-[-28px] transform rotate-15 bg-blood text-paper py-[6px] px-[22px] lg:py-[8px] lg:px-[32px] font-condensed font-bold text-[12px] sm:text-[15px] tracking-[0.22em] uppercase border-2 border-paper shadow-[0_0_0_2px_var(--color-blood)] z-3">
        Approved
      </span>
    </div>
  );
}
