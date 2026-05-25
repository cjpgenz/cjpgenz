"use client";

import React, { useState, useEffect, useRef } from "react";
import { isBrowser } from "@/utils/env";
import { DownloadIcon } from "@/components/Icons";

export default function AnthemPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Set isMounted to true on mount (protects SSR/hydration checks)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Set up the audio player and user interaction listeners
  useEffect(() => {
    if (!isBrowser || isDismissed || !isMounted) return;

    const audio = new Audio("/CJP_We_Are_Back_Official_Song.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    // Direct playback and expansion upon first user interaction on the page
    const handleInteraction = (e?: Event) => {
      // Ignore interactions inside the player widget itself
      if (e && e.target && (e.target as HTMLElement).closest(".cjp-player-widget")) {
        return;
      }
      
      setIsExpanded(true);

      if (audioRef.current && !audioRef.current.paused) {
        return;
      }

      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            removeInteractionListeners();
          })
          .catch((err) => {
            console.log("Interactive play failed:", err);
          });
      }
    };

    const removeInteractionListeners = () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };

    // Bind interaction listeners to document
    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);
    document.addEventListener("keydown", handleInteraction);

    // Cleanup
    return () => {
      removeInteractionListeners();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isDismissed, isMounted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Failed to play audio:", err);
        });
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleCircleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsExpanded(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Circle click play failed:", err);
        });
    }
  };

  if (!isMounted || isDismissed) return null;

  // Render collapsed circular badge by default
  if (!isExpanded) {
    return (
      <div 
        onClick={handleCircleClick}
        className="fixed bottom-6 inset-s-6 z-50 w-14 h-14 bg-paper border-[3px] border-ink rounded-full shadow-[4px_4px_0_var(--color-ink)] hover:shadow-[6px_6px_0_var(--color-ink)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 cursor-pointer flex items-center justify-center animate-slideup select-none"
        title="Play CJP Anthem"
      >
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-saffron border-2 border-ink rounded-full animate-livepulse" />
        <span className="text-[22px] inline-block cjp-bounce-note">🎵</span>
      </div>
    );
  }

  // Render the fully expanded neobrutalist card after click/interaction
  return (
    <div className="fixed bottom-6 inset-s-6 z-50 max-w-[320px] w-[calc(100vw-48px)] bg-paper border-[3px] border-ink shadow-[6px_6px_0_var(--color-ink)] p-4 animate-slideup select-none flex flex-col gap-3 cjp-player-widget">
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-saffron animate-livepulse' : 'bg-ink-3'}`} />
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink-3">
            {isPlaying ? "On Air" : "Anthem Player"}
          </span>
        </div>
        <button
          onClick={handleDismiss}
          className="text-ink-3 hover:text-ink font-mono text-[12px] font-bold cursor-pointer transition-colors leading-none"
          aria-label="Dismiss player"
        >
          ✕
        </button>
      </div>

      {/* Main Track Detail Area */}
      <div className="flex items-center gap-3.5">
        {/* Waveform / Visualizer Visual */}
        <div className={`w-11 h-11 shrink-0 border-2 border-ink bg-paper-2 flex items-center justify-center gap-[3px] overflow-hidden ${isPlaying ? 'cjp-playing' : ''}`}>
          <div className="cjp-vis-bar cjp-bar-1 h-3" />
          <div className="cjp-vis-bar cjp-bar-2 h-5" />
          <div className="cjp-vis-bar cjp-bar-3 h-2" />
          <div className="cjp-vis-bar cjp-bar-4 h-4" />
        </div>

        {/* Text information */}
        <div className="flex flex-col min-w-0 flex-1">
          <h5 className="font-display text-[15px] leading-none uppercase tracking-wide text-ink truncate">
            CJP Anthem
          </h5>
          <span className="font-sans text-[11px] font-semibold text-saffron-deep leading-tight mt-1 truncate">
            We Are Back! (Official Song)
          </span>
        </div>
      </div>

      {/* Button Row */}
      <div className="flex gap-2 items-center">
        <button
          onClick={togglePlay}
          className={`flex-1 text-center font-condensed text-[12px] font-bold tracking-[0.15em] uppercase py-2 border-2 border-ink transition-all duration-150 active:translate-x-[1px] active:translate-y-[1px] ${
            isPlaying
              ? 'bg-blood text-paper hover:bg-[#a62424] shadow-[3px_3px_0_var(--color-ink)]'
              : 'bg-gold text-ink hover:bg-[#d9b237] shadow-[3px_3px_0_var(--color-ink)]'
          }`}
        >
          {isPlaying ? "⏸ Stop Anthem" : "▶ Play Anthem"}
        </button>
        <a
          href="/CJP_We_Are_Back_Official_Song.mp3"
          download="CJP_We_Are_Back_Official_Song.mp3"
          className="w-9 h-9 border-2 border-ink bg-paper shadow-[3px_3px_0_var(--color-ink)] flex items-center justify-center cursor-pointer transition-all duration-150 hover:bg-paper-2 active:translate-x-[1px] active:translate-y-[1px] shrink-0"
          title="Download CJP Anthem MP3"
          aria-label="Download Anthem"
        >
          <DownloadIcon className="w-4 h-4 text-ink" />
        </a>
      </div>
    </div>
  );
}
