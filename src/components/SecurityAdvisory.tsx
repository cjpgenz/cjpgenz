"use client";

import React from "react";
import dynamic from "next/dynamic";
import { FlaggedDomain } from "@/types/security";
import ThreatMetrics from "./ThreatMetrics";

const SecurityTerminal = dynamic(() => import("./SecurityTerminal"), { ssr: false });
const ThreatDirectory = dynamic(() => import("./ThreatDirectory"), { ssr: false });

interface SecurityAdvisoryProps {
  initialFlaggedDomains: FlaggedDomain[];
}

export default function SecurityAdvisory({ initialFlaggedDomains }: SecurityAdvisoryProps) {
  const flaggedDomainsList = initialFlaggedDomains;

  return (
    <section
      id="security-advisory"
      className="py-[80px] lg:py-[110px] border-b-2 border-ink"
      style={{
        background: "repeating-linear-gradient(-45deg, var(--color-paper), var(--color-paper) 10px, var(--color-paper-2) 10px, var(--color-paper-2) 20px)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[56px]">
        
        {/* Neobrutalist Alert Block */}
        <div className="bg-paper border-[3px] border-ink shadow-[8px_8px_0_var(--color-ink)] p-6 sm:p-10 relative overflow-hidden">
          
          {/* Black/Yellow Warning Stripe Top */}
          <div 
            className="absolute top-0 inset-x-0 h-3 pointer-events-none" 
            style={{ 
              background: "repeating-linear-gradient(45deg, var(--color-blood), var(--color-blood) 15px, var(--color-ink) 15px, var(--color-ink) 30px)" 
            }} 
          />
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mt-4">
            
            {/* Left Column: Big Bold Warning Icon & Heading */}
            <div className="lg:w-[42%] flex flex-col items-start shrink-0">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-blood bg-blood/10 py-1.5 px-3 border border-blood rounded-full mb-6 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-blood animate-livepulse" />
                Security Alert
              </span>
              
              <h2 className="font-display font-normal text-[clamp(36px,5vw,60px)] leading-[0.95] tracking-[-0.015em] text-ink mb-6">
                Zero-Donation
                <br />
                <span className="text-blood font-['Georgia',serif] italic tracking-[-0.02em] font-normal">Policy.</span>
              </h2>

              <p className="font-sans text-[16px] leading-[1.6] text-ink-2 mb-6 font-medium">
                The Cockroach Janta Party (CJP) is a satirical, 100% free, zero-sponsor, and zero-donation youth movement. We **NEVER** solicit donations, charge membership registration fees, or request payment information of any kind.
              </p>

              <div className="border-s-4 border-blood ps-4 py-3 bg-paper-2 border-y border-e pe-4 mb-8">
                <p className="font-sans text-[14px] italic text-blood font-bold leading-relaxed">
                  &ldquo;If any website, WhatsApp link, Instagram page, Telegram channel, or coordinator asks you for even a single rupee to &apos;join&apos; or &apos;verify your ID&apos;, you are being targeted by a malicious imposter.&rdquo;
                </p>
              </div>

              {/* Safety Rules Panel */}
              <div className="w-full bg-paper-2 border-2 border-ink p-5 shadow-[4px_4px_0_var(--color-ink)]">
                <h3 className="font-condensed text-[18px] font-bold uppercase tracking-wider text-ink mb-4 pb-1 border-b border-ink/10">
                  Rules of Safety:
                </h3>
                <ul className="flex flex-col gap-3 font-sans text-[13.5px] text-ink-2 leading-relaxed">
                  <li className="flex gap-2.5">
                    <span className="text-blood font-bold font-mono">❶</span>
                    <span><strong>TLD Verification:</strong> Only `cjpgenz.com` and its official subdomains (e.g., `petition.cjpgenz.com`, `www.cjpgenz.com`) are official. Ignore other lookalikes.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-blood font-bold font-mono">❷</span>
                    <span><strong>No UPI/QR Demands:</strong> CJP handles zero funds. Report any coordinator displaying QR codes or demanding money.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-blood font-bold font-mono">❸</span>
                    <span><strong>Report Threats:</strong> Dial national helpline <strong>1930</strong> or notify local cybercrime authorities.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Advanced Modular Threat Terminal Panels */}
            <div className="lg:w-[58%] w-full flex flex-col gap-6">
              
              {/* Dynamic Threat Metrics Grid */}
              <ThreatMetrics flaggedDomains={flaggedDomainsList} />

              {/* Interactive Safety Diagnostics Checker */}
              <SecurityTerminal flaggedDomains={flaggedDomainsList} />

              {/* Toggleable Threat Directory Search & Feed Panel */}
              <ThreatDirectory flaggedDomains={flaggedDomainsList} />

            </div>

          </div>

        </div>
        
      </div>
    </section>
  );
}
