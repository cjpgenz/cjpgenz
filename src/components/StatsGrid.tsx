"use client";

import React from "react";
import { STAT_ITEMS } from "@/constants/data";
import { useCounter } from "@/hooks/useCounter";
import { COUNTER_KEY } from "@/utils/counter";

export default function StatsGrid() {
  const { count: visitorCount } = useCounter(COUNTER_KEY, 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-[18px] border-t border-[rgba(26,17,8,0.2)] pt-[22px] w-full">
      {STAT_ITEMS.map((item, idx) => {
        let borderClass = "";
        if (idx === 0 || idx === 2) {
          borderClass = "border-e border-[rgba(26,17,8,0.12)]";
        } else if (idx === 1) {
          borderClass = "lg:border-e border-[rgba(26,17,8,0.12)] border-e-0 lg:border-e-[rgba(26,17,8,0.12)]";
        } else if (idx >= 4) {
          borderClass = "border-e border-[rgba(26,17,8,0.12)] last:border-e-0";
        }

        const isVisitors = item.label === "Visitors";
        const displayValue = isVisitors && visitorCount > 0 ? `${visitorCount}+` : item.value;

        return (
          <div key={item.label} className={`flex flex-col gap-[6px] pe-[18px] ${borderClass}`}>
            <div className="flex items-center gap-2">
              {item.hasPulse && (
                <span className="w-2.5 h-2.5 rounded-full bg-blood animate-livepulse shrink-0" />
              )}
              <strong className="font-display text-[28px] sm:text-[36px] font-normal text-ink leading-none">
                {displayValue}
              </strong>
            </div>
            <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink-3">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

