"use client";

import React, { useState, useEffect, use } from "react";
import { STAT_ITEMS, DEFAULT_STATS } from "@/constants/data";
import { useCounter } from "@/hooks/useCounter";
import { COUNTER_KEY } from "@/utils/counter";

interface StatsGridProps {
  membersCountPromise?: Promise<number>;
  visitorsCountPromise?: Promise<number>;
}

interface StatsGridLayoutProps {
  getDisplayValue: (label: string, defaultValue: string) => string;
  loading?: boolean;
}

function StatsGridLayout({ getDisplayValue, loading }: StatsGridLayoutProps) {
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

        const displayValue = getDisplayValue(item.label, item.value);

        return (
          <div key={item.label} className={`flex flex-col gap-[6px] pe-[18px] ${borderClass}`}>
            <div className="flex items-center gap-2">
              {item.hasPulse && (
                <span className="w-2.5 h-2.5 rounded-full bg-blood animate-livepulse shrink-0" />
              )}
              <strong className={`font-display text-[28px] sm:text-[36px] font-normal text-ink leading-none ${loading ? "opacity-60" : ""}`}>
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

export default function StatsGrid({ 
  membersCountPromise, 
  visitorsCountPromise 
}: StatsGridProps) {
  const initialMembersCount = membersCountPromise ? use(membersCountPromise) : DEFAULT_STATS.MEMBERS_COUNT;
  const initialVisitorsCount = visitorsCountPromise ? use(visitorsCountPromise) : DEFAULT_STATS.VISITORS_COUNT;

  const { count: visitorCount } = useCounter(COUNTER_KEY, 0);

  const [membersCount, setMembersCount] = useState(initialMembersCount);
  const [visitorsCount, setVisitorsCount] = useState(initialVisitorsCount);

  // Sync with client-side localStorage count to prevent rollback
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cachedMembers = localStorage.getItem("cjp-members-count");
      if (cachedMembers) {
        setMembersCount(Math.max(initialMembersCount, parseInt(cachedMembers, 10)));
      } else {
        localStorage.setItem("cjp-members-count", initialMembersCount.toString());
      }

      const cachedVisitors = localStorage.getItem("cjp-visitors-count");
      if (cachedVisitors) {
        setVisitorsCount(Math.max(initialVisitorsCount, parseInt(cachedVisitors, 10)));
      } else {
        localStorage.setItem("cjp-visitors-count", initialVisitorsCount.toString());
      }
    }
  }, [initialMembersCount, initialVisitorsCount]);

  const getDisplayValue = (label: string, defaultValue: string) => {
    if (label === "Members") {
      return membersCount.toLocaleString();
    }
    if (label === "Visitors") {
      const totalVisitors = Math.max(visitorsCount, initialVisitorsCount) + visitorCount;
      return `${totalVisitors.toLocaleString()}+`;
    }
    return defaultValue;
  };

  return <StatsGridLayout getDisplayValue={getDisplayValue} />;
}

export function StatsGridFallback() {
  return <StatsGridLayout getDisplayValue={(_, defaultValue) => defaultValue} loading />;
}
