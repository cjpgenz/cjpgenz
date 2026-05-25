import React from "react";
import { MARQUEE_SLOGANS } from "@/constants/data";

export default function Marquee() {
  // Repeat the array exactly 4 times (16 items total) to match the Wayback markup
  const repeatedSlogans = [...MARQUEE_SLOGANS, ...MARQUEE_SLOGANS, ...MARQUEE_SLOGANS, ...MARQUEE_SLOGANS];

  return (
    <div className="bg-ink text-paper py-6 overflow-hidden border-t-4 border-saffron border-b-4">
      <div className="flex gap-12 whitespace-nowrap w-max animate-marquee font-display text-[20px] sm:text-[26px] lg:text-[32px] tracking-[0.015em]">
        {repeatedSlogans.map((slogan, idx) => (
          <React.Fragment key={idx}>
            <span className="text-saffron-2">{slogan}</span>
            <span className="dot text-green-2 text-[22px] self-center">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
