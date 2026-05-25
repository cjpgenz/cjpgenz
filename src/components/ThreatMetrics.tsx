"use client";

import React, { useMemo } from "react";
import { FlaggedDomain } from "@/types/security";
import { getThreatMetrics } from "@/utils/security";

interface ThreatMetricsProps {
  flaggedDomains: FlaggedDomain[];
}

export default function ThreatMetrics({ flaggedDomains }: ThreatMetricsProps) {
  const stats = useMemo(() => getThreatMetrics(flaggedDomains), [flaggedDomains]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {/* Total threats badge */}
      <div className="bg-blood/10 border-2 border-blood p-3 text-center shadow-[3px_3px_0_rgba(139,26,26,0.2)]">
        <div className="font-display text-[26px] leading-none text-blood mb-1">{stats.total}</div>
        <div className="font-mono text-[9px] uppercase tracking-wider text-ink-2 font-bold">Threats Logged</div>
      </div>
      
      {/* UPI / donation copycats badge */}
      <div className="bg-saffron-deep/10 border-2 border-saffron-deep p-3 text-center shadow-[3px_3px_0_rgba(184,73,21,0.2)]">
        <div className="font-display text-[26px] leading-none text-saffron-deep mb-1">{stats.financial}</div>
        <div className="font-mono text-[9px] uppercase tracking-wider text-ink-2 font-bold">UPI / Fake Fees</div>
      </div>
      
      {/* Phishing / ID theft badge */}
      <div className="bg-gold/15 border-2 border-gold p-3 text-center shadow-[3px_3px_0_rgba(201,162,39,0.2)]">
        <div className="font-display text-[26px] leading-none text-gold mb-1">{stats.phishing}</div>
        <div className="font-mono text-[9px] uppercase tracking-wider text-ink-2 font-bold">Phishing & KYC</div>
      </div>
      
      {/* Adware / redirections badge */}
      <div className="bg-green/10 border-2 border-green p-3 text-center shadow-[3px_3px_0_rgba(31,90,46,0.2)]">
        <div className="font-display text-[26px] leading-none text-green mb-1">{stats.malware}</div>
        <div className="font-mono text-[9px] uppercase tracking-wider text-ink-2 font-bold">Adware/Redirs</div>
      </div>
    </div>
  );
}
