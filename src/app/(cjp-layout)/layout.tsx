import React from "react";
import dynamic from "next/dynamic";
import Ticker from "@/components/Ticker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SackPopup = dynamic(() => import("@/components/SackPopup"));
const AnthemPlayer = dynamic(() => import("@/components/AnthemPlayer"));

export default function CJPWebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Dynamic rolling ticker */}
      <Ticker />

      {/* Sticky Header with inline Brand SVG logo */}
      <Header />

      {/* Main Container */}
      <main className="flex-1">{children}</main>

      {/* Footer component */}
      <Footer />

      {/* Scroll-triggered petition alert popup */}
      <SackPopup />

      {/* CJP Official Anthem floating player */}
      <AnthemPlayer />
    </>
  );
}
