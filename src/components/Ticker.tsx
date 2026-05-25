import React from "react";
import { TICKER_ITEMS } from "@/constants/data";

export default function Ticker() {
  // Duplicate items once to allow seamless infinite looping (10 items total)
  const repeatedItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="bg-ink text-paper font-mono text-[11px] tracking-[0.14em] uppercase py-[9px] overflow-hidden border-b-2 border-saffron">
      <div className="flex gap-[56px] whitespace-nowrap w-max animate-ticker">
        {repeatedItems.map((item, idx) => (
          <span key={idx} className="flex items-center">
            <span className="text-saffron-2 me-[12px]">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
