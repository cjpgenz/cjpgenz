import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteer",
  alternates: {
    canonical: "/volunteer",
  },
  openGraph: {
    title: "Volunteer | Cockroach Janata Party",
    description:
      "Get Off Your Couch Youth Suggestion & Labor Form. Donate your skills and time to the CJP.",
    url: "/volunteer",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "Volunteer — Cockroach Janta Party",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Volunteer | Cockroach Janata Party",
    description:
      "Get Off Your Couch Youth Suggestion & Labor Form. Donate your skills and time to the CJP.",
    images: ["/banner.webp"],
  },
};

export default function VolunteerPage() {
  return (
    <section className="py-[80px] lg:py-[120px] bg-paper min-h-screen border-b-2 border-ink">
      <div className="max-w-[900px] mx-auto px-5 sm:px-8">
        <div className="mb-[64px]">
          <h1 className="font-display font-normal text-[clamp(40px,5vw,64px)] leading-[0.92] tracking-[-0.005em] text-ink mb-6">
            &quot;Get Off Your Couch&quot;
            <br />
            <span className="text-saffron-deep">Youth Suggestion &amp; Labor Form</span>
          </h1>
          <p className="font-sans text-[18px] leading-[1.55] text-ink-2">
            Look, we know you’re tired. But the country is a mess, and us cockroaches need to do some heavy lifting. CJP will raise the issues that are actually ruining your life, and will demand solutions on your behalf. Not things like chai samosa prices or data plans being just 28 days and not 30, of course.
          </p>
        </div>
        <div className="w-full flex justify-center">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfbRAw51reJHtk6DN6fDgK66usmw0G6tL76tzSpnszs11xjCg/viewform?embedded=true"
            width="100%"
            height="950"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            style={{ maxWidth: "640px", border: "none" }}
            title="Volunteer Form"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </section>
  );
}
