"use client";

import React, { useState, useEffect, useRef, useCallback, use, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Ticker from "@/components/Ticker";
import { CockroachParticle } from "@/types";
import { filterImageWhiteBackground } from "@/utils/image";
import { drawCockroach } from "@/helper/canvas";
import { isBrowser } from "@/utils/env";

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

interface SignatureCounterProps {
  countPromise: Promise<number>;
  signatures: number;
}

function SignatureCounter({ countPromise, signatures }: SignatureCounterProps) {
  const initialCount = use(countPromise);

  const isBrowser = typeof window !== "undefined";
  const cachedCountStr = isBrowser ? localStorage.getItem("sack-petition-count") : null;
  const cachedCount = cachedCountStr ? parseInt(cachedCountStr, 10) : 0;

  const totalCount = Math.max(initialCount, cachedCount) + signatures;

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem("sack-petition-count", totalCount.toString());
    }
  }, [totalCount, isBrowser]);

  return (
    <p className="font-display text-[48px] sm:text-[56px] leading-none font-bold text-blood mb-2">
      {totalCount.toLocaleString()}
    </p>
  );
}

function SignatureCounterFallback() {
  return (
    <div className="w-[140px] h-[48px] bg-paper-2 animate-pulse rounded border border-ink/10 mx-auto mb-2 flex items-center justify-center">
      <span className="w-4 h-4 rounded-full border-2 border-blood border-t-transparent animate-spin" />
    </div>
  );
}

interface SackPetitionClientProps {
  countPromise: Promise<number>;
}

export default function SackPetitionClient({ countPromise }: SackPetitionClientProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [signatures, setSignatures] = useState<number>(0);
  const [isIframeMounted, setIsIframeMounted] = useState(false);

  // Refs for elements and canvas physics
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cockroachImageRef = useRef<HTMLImageElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const hasSignedRef = useRef(false);
  const lastTimeRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Reset scroll position to top instantly when page mounts
  useEffect(() => {
    if (isBrowser) {
      window.scrollTo({ top: 0, behavior: "instant" });

      const voted = localStorage.getItem("sack-petition-voted") === "true";
      if (voted) {
        Promise.resolve().then(() => {
          setHasVoted(true);
        });
      }
    }
  }, []);

  // Defer rendering of the heavy Google Form iframe to prevent render blocking
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIframeMounted(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Pre-load the cockroach.webp asset and create transparent mask context
  useEffect(() => {
    const img = new window.Image();
    img.src = "/cockroach.webp";
    img.onload = () => {
      const devMemory = (navigator as NavigatorWithMemory).deviceMemory || 4;
      if (devMemory <= 2) {
        cockroachImageRef.current = img;
      } else {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const maskedSrc = filterImageWhiteBackground(canvas, img);
        const maskedImg = new window.Image();
        maskedImg.src = maskedSrc;
        maskedImg.onload = () => {
          cockroachImageRef.current = maskedImg;
        };
      }
    };
  }, []);

  // The custom cockroach swarming/eating canvas loop
  const handleSack = useCallback(() => {
    if (isAnimating || !canvasRef.current || !imageRef.current) return;
    setIsAnimating(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    if (!ctx || !parent) return;

    // Dimensions
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    const imgBound = imageRef.current.getBoundingClientRect();
    const parentBound = parent.getBoundingClientRect();

    // Center point of Dharmendra Pradhan image relative to the canvas
    const targetX = imgBound.left - parentBound.left + imgBound.width / 2;
    const targetY = imgBound.top - parentBound.top + imgBound.height / 2;
    const eatingRadius = 0.4 * Math.min(imgBound.width, imgBound.height);

    // Dynamic cockroach count based on display width and device memories
    const screenWidth = window.innerWidth;
    const isLowPower = ((navigator as NavigatorWithMemory).deviceMemory || 4) <= 2;
    const cockroachCount = screenWidth > 768
      ? (isLowPower ? 100 : 400)
      : screenWidth > 480
        ? (isLowPower ? 40 : 120)
        : (isLowPower ? 30 : 80);

    // Initialize cockroach swarms around standard screen borders
    const cockroaches: CockroachParticle[] = Array.from({ length: cockroachCount }).map(() => {
      let x = 0, y = 0;
      switch (Math.floor(Math.random() * 4)) {
        case 0: // Top
          x = Math.random() * canvas.width;
          y = -40;
          break;
        case 1: // Right
          x = canvas.width + 40;
          y = Math.random() * canvas.height;
          break;
        case 2: // Bottom
          x = Math.random() * canvas.width;
          y = canvas.height + 40;
          break;
        case 3: // Left
          x = -40;
          y = Math.random() * canvas.height;
          break;
      }
      return {
        x,
        y,
        speed: 1.5 + Math.random() * 4,
        angle: 0,
        isEating: false,
        scatterAngle: 0,
      };
    });

    let eatenCount = 0;
    let phase = 0; // 0: Crawling to photo & eating, 1: Scattering away
    const startTime = performance.now();
    let frameTicker = 0;
    const frameSkip = isLowPower ? 2 : 1; // frame skips on older devices

    const animateLoop = (timestamp: number) => {
      if (frameTicker++ % frameSkip !== 0) {
        animationFrameIdRef.current = requestAnimationFrame(animateLoop);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sizing of cockroach sprite
      const roachSize = screenWidth > 1280
        ? 120
        : screenWidth > 1024
          ? 90
          : screenWidth > 768
            ? 60
            : 40;

      let allScattered = true;

      cockroaches.forEach((roach) => {
        if (phase === 0) {
          const dx = targetX - roach.x;
          const dy = targetY - roach.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < eatingRadius + 40) {
            if (!roach.isEating) {
              roach.isEating = true;
              eatenCount++;
            }
            roach.angle += (Math.random() - 0.5) * 1.5;
            if (dist > eatingRadius + 80) {
              roach.angle = Math.atan2(dy, dx);
            }
            // Slowly crawl in eating radius
            roach.x += Math.cos(roach.angle) * (0.9 * roach.speed);
            roach.y += Math.sin(roach.angle) * (0.9 * roach.speed);
          } else {
            const wave = 0.4 * Math.sin(timestamp / 180 + roach.x);
            roach.angle = Math.atan2(dy, dx) + wave;
            roach.x += Math.cos(roach.angle) * roach.speed;
            roach.y += Math.sin(roach.angle) * roach.speed;
          }
        } else if (phase === 1) {
          // Scattering phase
          roach.x += Math.cos(roach.scatterAngle) * roach.speed;
          roach.y += Math.sin(roach.scatterAngle) * roach.speed;
          roach.angle = roach.scatterAngle;

          // Check if roach is still visible
          if (
            roach.x > -150 &&
            roach.x < canvas.width + 150 &&
            roach.y > -150 &&
            roach.y < canvas.height + 150
          ) {
            allScattered = false;
          }
        }

        // Draw roach
        if (cockroachImageRef.current) {
          drawCockroach(
            ctx,
            cockroachImageRef.current,
            roach.x,
            roach.y,
            roach.angle,
            roachSize
          );
        }
      });

      if (phase === 0 && imageRef.current) {
        // Calculate dissolve progress
        const eatenRatio = Math.min(eatenCount / (0.8 * cockroachCount), 1);
        imageRef.current.style.opacity = (1 - eatenRatio).toString();
        imageRef.current.style.transform = `scale(${1 - 0.5 * eatenRatio})`;

        // Trigger scatter after 2 seconds of full eating
        if (eatenRatio >= 1 && timestamp - startTime > 2000) {
          phase = 1;
          cockroaches.forEach((roach) => {
            const dx = roach.x - targetX;
            const dy = roach.y - targetY;
            roach.scatterAngle = Math.atan2(dy, dx) + (Math.random() - 0.5);
            roach.speed = 2 + Math.random() * 3;
          });
        }
        animationFrameIdRef.current = requestAnimationFrame(animateLoop);
      } else if (phase === 1) {
        if (allScattered) {
          // Terminate animation loop
          if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
          }
          setIsAnimating(false);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (imageRef.current) {
            imageRef.current.style.opacity = "1";
            imageRef.current.style.transform = "scale(1)";
          }
        } else {
          animationFrameIdRef.current = requestAnimationFrame(animateLoop);
        }
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(animateLoop);
  }, [isAnimating]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (!isAnimating && canvasRef.current) {
        const canvas = canvasRef.current;
        const parent = canvas.parentElement;
        if (parent) {
          canvas.width = parent.offsetWidth;
          canvas.height = parent.offsetHeight;
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isAnimating]);

  // Keep references to states fresh inside triggers
  const triggersRef = useRef({ hasVoted, isAnimating, handleSack });
  useEffect(() => {
    triggersRef.current = { hasVoted, isAnimating, handleSack };
  }, [hasVoted, isAnimating, handleSack]);

  // Handle successful form submission by monitoring load events in the iframe
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      const now = Date.now();
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = now;
        // Prevent Google Form iframe from hijacking scroll and jumping to bottom on initial load
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "instant" });
        }, 80);
      } else if (now - lastTimeRef.current > 3000 && !hasSignedRef.current) {
        hasSignedRef.current = true;

        // Scroll target to view center on mobile
        if (window.innerWidth < 1024 && imageRef.current) {
          imageRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        const state = triggersRef.current;
        if (!state.hasVoted) {
          setSignatures((prev) => prev + 1);
          setHasVoted(true);
          localStorage.setItem("sack-petition-voted", "true");
        }

        // Trigger cockroach swarms to celebrate sacking
        if (!state.isAnimating) {
          setTimeout(() => {
            state.handleSack();
          }, 600);
        }
      }
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [isIframeMounted]);

  return (
    <>
      {/* Top rolling ticker */}
      <Ticker />

      {/* Main Content Area */}
      <main className="min-h-[calc(100vh-200px)]">
        <section
          id="sack-petition"
          className="relative border-b-[3px] border-ink bg-paper-2 py-[72px] lg:py-[100px] overflow-hidden"
          data-screen-label="Petition"
        >
          {/* Crawl canvas overlay */}
          <canvas ref={canvasRef} className="absolute inset-0 z-50 pointer-events-none" />

          {/* Back Button */}
          <div className="w-max mb-10 ms-10 z-50 px-3 py-1 bg-paper-2 border-2 border-ink shadow-[8px_8px_0_var(--color-ink)] cursor-pointer hover:shadow-[12px_12px_0_var(--color-ink)] transition-all">
            <Link href="/">
              Go Back
            </Link>
          </div>

          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[56px] relative z-10 flex flex-col items-center text-center">

            {/* Header */}
            <h1 className="font-display text-[42px] sm:text-[64px] leading-[0.9] tracking-[-0.015em] mb-[24px] text-ink">
              Petition to Sack the
              <br />
              <span className="text-blood italic font-['Georgia',serif]">Education Minister</span>
            </h1>

            {/* Subheading */}
            <p className="font-sans text-[16px] max-w-[700px] text-ink-2 mb-[48px]">
              The education system is compromised. From the tragic loss of students who died by suicide, to the millions of futures broken by a decade of paper leaks, this failure cannot go ignored. There must be consequences.
              <br />
              Sign below to demand the immediate removal of the Education Minister.
            </p>

            {/* Two-Column Layout */}
            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-12 w-full max-w-[1100px] mx-auto">

              {/* Column 1: Minister Image & Signature Stats */}
              <div className="w-full lg:w-[40%] flex flex-col items-center justify-center lg:sticky lg:top-[100px] lg:self-start gap-8">

                {/* Image Container with stamp overlay interaction */}
                <div className="relative transition-transform duration-300">
                  <Image
                    ref={imageRef}
                    src="/education_minister.webp"
                    alt="Education Minister"
                    width={280}
                    height={280}
                    priority
                    unoptimized
                    onClick={handleSack}
                    className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] object-contain mix-blend-multiply transition-all duration-300 ease-in-out cursor-pointer hover:scale-105"
                    style={{ opacity: 1, transform: "scale(1)" }}
                  />

                  <p className="font-sans text-[12px] text-ink-3 mt-2 text-center italic">
                    (Click the image to preview the sacking)
                  </p>
                </div>

                {/* Live Signature Block */}
                <div className="text-center bg-paper border-[3px] border-ink shadow-[6px_6px_0_var(--color-ink)] p-6 w-full max-w-[320px]">
                  <p className="font-sans text-[16px] sm:text-[18px] text-ink-2 mb-[8px] font-bold">
                    Petitions signed so far
                  </p>
                  <Suspense fallback={<SignatureCounterFallback />}>
                    <SignatureCounter countPromise={countPromise} signatures={signatures} />
                  </Suspense>
                </div>

              </div>

              {/* Column 2: Embedded Google Form */}
              <div className="w-full lg:w-[60%] flex flex-col items-center bg-paper border-[3px] border-ink shadow-[8px_8px_0_var(--color-ink)] p-4 sm:p-6 relative z-20">
                <h3 className="font-condensed text-[24px] sm:text-[28px] font-bold tracking-wider uppercase mb-4 text-ink w-full text-start">
                  Sign the Petition
                </h3>

                <div className="w-full bg-paper-2 border-2 border-ink-2 relative h-[600px] sm:h-[800px] lg:h-[961px] overflow-hidden flex items-center justify-center">
                  {isIframeMounted ? (
                    <iframe
                      ref={iframeRef}
                      src="https://docs.google.com/forms/d/e/1FAIpQLSexPWW9l2FHt27Gnq_0huADzR9lXZ3undgSg03cNnMB_lhbjg/viewform?embedded=true"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      marginHeight={0}
                      marginWidth={0}
                      className="absolute inset-0"
                    >
                      Loading…
                    </iframe>
                  ) : (
                    <div className="font-mono text-[14px] text-ink-2 animate-pulse flex flex-col items-center gap-3">
                      <span className="w-6.5 h-6.5 rounded-full border-2 border-blood border-t-transparent animate-spin" />
                      <span>Loading petition...</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
