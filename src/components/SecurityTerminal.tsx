"use client";

import React, { useState, useMemo } from "react";
import { FlaggedDomain } from "@/types/security";
import { verifyDomainUrl } from "@/utils/security";

interface SecurityTerminalProps {
  flaggedDomains: FlaggedDomain[];
}

export default function SecurityTerminal({ flaggedDomains }: SecurityTerminalProps) {
  const [checkUrl, setCheckUrl] = useState("");

  const result = useMemo(() => verifyDomainUrl(checkUrl, flaggedDomains), [checkUrl, flaggedDomains]);

  return (
    <div className="bg-ink border-2 border-ink text-paper p-5 relative shadow-[6px_6px_0_var(--color-ink)]">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-blood" />
        <span className="w-2.5 h-2.5 rounded-full bg-gold" />
        <span className="w-2.5 h-2.5 rounded-full bg-green" />
        <span className="font-mono text-[10px] tracking-wider text-paper/40 ms-2 font-bold">CJP-GUARD VERIFICATION ENGINE v2.2</span>
      </div>

      <h3 className="font-condensed text-[18px] sm:text-[20px] font-bold tracking-wider uppercase text-paper mb-2">
        Link Safety & Domain Checker
      </h3>
      <p className="font-sans text-[13px] text-paper/70 mb-4 leading-relaxed">
        Enter any domain or link (e.g. `cjpgenz.com` or `cockroachjantaparty.org`) below to immediately analyze safety records, threat risks, or official movement registration status.
      </p>

      {/* Terminal Input prompt */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 inline-start-0 ps-3.5 flex items-center pointer-events-none font-mono text-[13px] text-saffron-2 font-bold">
          cjp-guard:~$
        </div>
        <input
          type="text"
          value={checkUrl}
          onChange={(e) => setCheckUrl(e.target.value)}
          placeholder="paste-suspicious-link-here..."
          className="w-full bg-ink-2 border-2 border-paper/20 rounded-none py-3 ps-[120px] pe-4 font-mono text-[13.5px] text-paper focus:outline-none focus:border-saffron-2 transition-all placeholder:text-paper/20"
        />
        {checkUrl && (
          <button
            onClick={() => setCheckUrl("")}
            className="absolute inset-y-0 inline-end-0 px-3 font-mono text-[11px] text-paper/40 hover:text-paper uppercase font-bold"
          >
            Clear
          </button>
        )}
      </div>

      {/* Diagnostic Result Block */}
      <div className="border border-paper/10 bg-ink p-4 font-mono text-[12px] leading-relaxed relative min-h-[90px] flex flex-col justify-center">
        {result.status === "EMPTY" && (
          <div className="text-paper/40 italic text-center">
            ⚡ System standing by. Paste a URL or domain link to run diagnostics.
          </div>
        )}

        {result.status === "SAFE" && (
          <div className="text-green-2 flex flex-col gap-1.5">
            <div className="font-bold flex items-center gap-2 uppercase tracking-wider text-[13px]">
              <span>[✅ SAFE / VERIFIED OFFICIAL RESOURCE]</span>
            </div>
            <div className="text-paper/85">
              Domain <strong className="text-paper underline">{result.domain}</strong> is an officially audited, verified, and endorsed CJP site. Safe for form submissions and viewing the Manifesto.
            </div>
          </div>
        )}

        {result.status === "FLAGGED" && (
          <div className="text-blood flex flex-col gap-2">
            <div className="font-bold flex items-center gap-2 uppercase tracking-wider text-[13px] animate-pulse">
              <span>[🚨 CRITICAL THREAT: COPYCAT WARNING]</span>
            </div>
            <div className="text-paper/85">
              Domain <strong className="text-blood underline font-bold">{result.domain}</strong> is flagged in our database!
            </div>
            <div className="bg-blood/10 border-s-2 border-blood p-2 text-paper text-[11.5px] flex flex-col gap-1">
              <div><strong>Category:</strong> {result.data?.category}</div>
              <div><strong>Tactics Detected:</strong> {result.data?.reason}</div>
              {result.data?.detected_activities && result.data.detected_activities.length > 0 && (
                <div>
                  <strong>Behaviors:</strong> {result.data.detected_activities.map((a: string) => `"${a}"`).join(", ")}
                </div>
              )}
            </div>
            <div className="text-paper/50 italic text-[11px]">
              ⚠️ CJP does NOT charge signup fees or accept donations. Never send funds or credentials.
            </div>
          </div>
        )}

        {result.status === "EXTERNAL" && (
          <div className="text-gold flex flex-col gap-1.5">
            <div className="font-bold flex items-center gap-2 uppercase tracking-wider text-[13px]">
              <span>[⚠️ UNKNOWN / EXTERNAL ADDRESS]</span>
            </div>
            <div className="text-paper/85">
              Address <strong className="text-paper underline">{result.domain}</strong> is not an official CJP site. It operates outside the verified safe core.
            </div>
            <div className="text-paper/60 text-[11px] leading-relaxed border-t border-paper/10 pt-1.5 mt-1">
              🚫 **Crucial Caution**: CJP takes absolutely zero donations, UPI funds, or membership registration fees. If this external page requests bank details, card numbers, UPI PINs, or ID uploads, close the tab immediately.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
