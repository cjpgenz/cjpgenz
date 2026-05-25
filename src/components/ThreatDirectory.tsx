"use client";

import React, { useState, useMemo } from "react";
import { FlaggedDomain } from "@/types/security";

interface ThreatDirectoryProps {
  flaggedDomains: FlaggedDomain[];
}

export default function ThreatDirectory({ flaggedDomains }: ThreatDirectoryProps) {
  const [showDomains, setShowDomains] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);

  // Filtered Threat List based on search query and category filters
  const filteredDomains = useMemo(() => {
    return flaggedDomains.filter((item) => {
      const matchesSearch =
        item.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.reason.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedCategory === "ALL") return matchesSearch;
      
      if (selectedCategory === "FINANCIAL") {
        return (
          matchesSearch &&
          (/donation|financial|upi|fee|payment|money|merchandise/i.test(item.category || "") ||
            /donation|financial|upi|fee|payment|money|merchandise/i.test(item.reason || ""))
        );
      }
      
      if (selectedCategory === "PHISHING") {
        return (
          matchesSearch &&
          (/phishing|credential|identity|theft|harvesting/i.test(item.category || "") ||
            /phishing|credential|identity|theft|harvesting/i.test(item.reason || ""))
        );
      }
      
      if (selectedCategory === "MALWARE") {
        return (
          matchesSearch &&
          (/malware|adware|spyware|redirect|hijack/i.test(item.category || "") ||
            /malware|adware|spyware|redirect|hijack/i.test(item.reason || ""))
        );
      }
      
      return matchesSearch;
    });
  }, [flaggedDomains, searchQuery, selectedCategory]);

  return (
    <div className="border-[2px] border-ink bg-paper-2 p-5 shadow-[4px_4px_0_var(--color-ink)] flex flex-col gap-4">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h4 className="font-condensed text-[16px] font-bold uppercase tracking-wider text-ink">
            Threat Directory & Intel Feed
          </h4>
          <p className="font-sans text-[12.5px] text-ink-3">
            View all registered lookalikes flagged by CJP threat intelligence scanner.
          </p>
        </div>

        <button
          onClick={() => setShowDomains(!showDomains)}
          className="bg-blood hover:bg-blood/90 text-paper font-condensed text-[12px] font-bold tracking-[0.1em] uppercase py-2.5 px-4 border-2 border-ink shadow-[3px_3px_0_var(--color-ink)] transition-all cursor-pointer inline-flex items-center gap-2"
        >
          {showDomains ? "Close Threat Feed" : "Explore Threat Feed"}
          <span>{showDomains ? "▲" : "▼"}</span>
        </button>
      </div>

      {showDomains && (
        <div className="bg-paper border border-ink/20 p-4 flex flex-col gap-4 font-mono text-[12px]">
          {/* Search & Category Filter Controls */}
          <div className="flex flex-col gap-2.5 border-b border-ink/10 pb-3.5">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search domains, tactics, categories..."
              className="w-full bg-paper-2 border border-ink py-2 px-3 focus:outline-none focus:border-blood text-[12.5px] font-sans placeholder:italic"
            />

            {/* Filter Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {["ALL", "FINANCIAL", "PHISHING", "MALWARE"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 text-[9.5px] font-mono font-bold tracking-wider border transition-all ${
                    selectedCategory === cat
                      ? "bg-ink text-paper border-ink"
                      : "bg-paper-2 text-ink-2 border-ink/20 hover:border-ink"
                  }`}
                >
                  {cat === "ALL" && "📁 All Verified Threats"}
                  {cat === "FINANCIAL" && "💸 UPI / QR Copycats"}
                  {cat === "PHISHING" && "🔑 Phishing / KYC"}
                  {cat === "MALWARE" && "👾 Malware / Redirs"}
                </button>
              ))}
            </div>
          </div>

          {/* Results list */}
          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pe-1">
            {filteredDomains.length === 0 ? (
              <div className="text-ink-3 italic text-center py-6">
                No flagged domains found matching your search.
              </div>
            ) : (
              filteredDomains.map((item, idx) => {
                const isExpanded = expandedDomain === item.domain;
                const isCritical = item.risk_level.toLowerCase() === "critical";

                return (
                  <div
                    key={idx}
                    className={`border ${
                      isExpanded ? "border-ink bg-paper-2" : "border-ink/10 bg-paper hover:border-ink/40"
                    } transition-all`}
                  >
                    {/* Header Card */}
                    <div
                      onClick={() => setExpandedDomain(isExpanded ? null : item.domain)}
                      className="p-3 flex justify-between items-center cursor-pointer select-none gap-2 flex-wrap sm:flex-nowrap"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-blood shrink-0 font-sans">❌</span>
                        <strong className="text-ink font-mono text-[13px]">{item.domain}</strong>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[8px] uppercase tracking-widest font-mono font-bold ${
                            isCritical
                              ? "bg-blood/10 text-blood border border-blood/20"
                              : "bg-gold/10 text-gold border border-gold/20"
                          }`}
                        >
                          {item.risk_level}
                        </span>
                        <span className="text-ink-3 text-[10px]">{isExpanded ? "▲" : "▼"}</span>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="p-3.5 border-t border-ink/10 bg-paper text-[11px] text-ink-2 leading-relaxed flex flex-col gap-2.5">
                        <div>
                          <span className="font-bold text-ink block mb-0.5 uppercase tracking-wide text-[9px] text-ink-3">Threat Category:</span>
                          <span className="font-sans text-[12.5px] font-bold text-ink">{item.category}</span>
                        </div>
                        <div>
                          <span className="font-bold text-ink block mb-0.5 uppercase tracking-wide text-[9px] text-ink-3">Modus Operandi & Audit Notes:</span>
                          <span className="font-sans text-[12px]">{item.reason}</span>
                        </div>

                         {item.detected_activities && item.detected_activities.length > 0 && (
                          <div>
                            <span className="font-bold text-ink block mb-1 uppercase tracking-wide text-[9px] text-ink-3">Tactical Behaviors Identified:</span>
                            <ul className="flex flex-col gap-1.5 font-sans ps-1">
                              {item.detected_activities.map((act, aIdx) => (
                                <li key={aIdx} className="flex gap-2 items-start text-blood">
                                  <span className="text-blood shrink-0">⚠</span>
                                  <span>{act}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="pt-2 border-t border-ink/10 flex justify-between items-center gap-2 flex-wrap">
                          <span className="font-sans text-[10.5px] text-blood font-bold">
                            🛡️ Zero-Donation Guard active
                          </span>
                          <a
                            href="tel:1930"
                            className="bg-ink hover:bg-ink-2 text-paper font-sans text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 border border-ink"
                          >
                            Report to Helpline (1930)
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="text-ink-3 font-sans text-[11px] leading-relaxed border-t border-ink/10 pt-3">
            <strong>Automatic Threat Intelligence Feed:</strong> This list syncs dynamically. Legitimate requests only happen on official domains. Never share OTPs, credit cards, or register on non-org URLs.
          </div>
        </div>
      )}
    </div>
  );
}
