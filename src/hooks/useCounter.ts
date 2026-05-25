"use client";

import { useState, useEffect } from "react";
import { fetchCounterValue, incrementCounterValue } from "@/utils/counter";
import { isBrowser } from "@/utils/env";

interface ExtendedWindow {
  requestIdleCallback: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback: (id: number) => void;
}

export function useCounter(key: string, fallbackValue: number) {
  const [count, setCount] = useState<number>(fallbackValue);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;

    const runWhenIdle = (fn: () => void): number | ReturnType<typeof setTimeout> => {
      if (isBrowser && "requestIdleCallback" in window) {
        return (window as unknown as ExtendedWindow).requestIdleCallback(fn, { timeout: 3000 });
      } else {
        return setTimeout(fn, 1000);
      }
    };

    const cancelIdle = (id: number | ReturnType<typeof setTimeout> | undefined): void => {
      if (id === undefined) return;
      if (isBrowser && "cancelIdleCallback" in window) {
        (window as unknown as ExtendedWindow).cancelIdleCallback(id as number);
      } else {
        clearTimeout(id as ReturnType<typeof setTimeout>);
      }
    };

    const loadCounter = async () => {
      try {
        const sessionKey = `cjp-counter-session-${key}`;
        const hasVisited = sessionStorage.getItem(sessionKey) === "true";
        let newCount: number | null = null;

        if (!hasVisited) {
          // New session: increment the counter
          newCount = await incrementCounterValue(key);
          if (newCount !== null) {
            sessionStorage.setItem(sessionKey, "true");
          }
        } else {
          // Existing session: just fetch the current counter value
          newCount = await fetchCounterValue(key);
        }

        if (active && newCount !== null) {
          setCount(newCount);
        }
      } catch {
        // Fail silently and preserve fallback count
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    // Schedule the counter API call when the browser is idle
    const handle = runWhenIdle(() => {
      loadCounter();
    });

    return () => {
      active = false;
      cancelIdle(handle);
    };
  }, [key]);

  return { count, isLoading };
}
