import { useCallback, useEffect, useState } from "react";

export interface SoundFunctions {
  playClick: () => void;
  playSuccess: () => void;
  playFailure: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const STORAGE_KEY = "biolearn-muted";

// Singleton AudioContext — only one is ever created across all hook instances
let sharedAudioContext: AudioContext | null = null;

function getSharedAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedAudioContext) {
    try {
      sharedAudioContext = new (
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      )();
    } catch {
      return null;
    }
  }
  return sharedAudioContext;
}

export function useSounds(): SoundFunctions {
  // Read mute pref: respect prefers-reduced-motion, then localStorage
  const getInitialMuted = (): boolean => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return true;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "true";
  };

  const [isMuted, setIsMuted] = useState<boolean>(getInitialMuted);

  // Sync mute with prefers-reduced-motion changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMuted(true);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const ensureCtx = useCallback((): AudioContext | null => {
    const ctx = getSharedAudioContext();
    // Resume if suspended (browser autoplay policy)
    if (ctx?.state === "suspended") {
      ctx.resume();
    }
    return ctx;
  }, []);

  const playTone = useCallback(
    (
      frequency: number,
      duration: number,
      gain: number,
      endFrequency?: number,
      delay = 0,
    ) => {
      const ctx = ensureCtx();
      if (!ctx) return;

      const gainNode = ctx.createGain();
      gainNode.connect(ctx.destination);

      const oscillator = ctx.createOscillator();
      oscillator.type = "sine";
      oscillator.connect(gainNode);

      const startTime = ctx.currentTime + delay;
      oscillator.frequency.setValueAtTime(frequency, startTime);

      if (endFrequency !== undefined) {
        oscillator.frequency.exponentialRampToValueAtTime(
          endFrequency,
          startTime + duration / 1000,
        );
      }

      gainNode.gain.setValueAtTime(gain, startTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        startTime + duration / 1000,
      );

      oscillator.start(startTime);
      oscillator.stop(startTime + duration / 1000 + 0.01);
    },
    [ensureCtx],
  );

  const playClick = useCallback(() => {
    if (isMuted) return;
    playTone(800, 80, 0.15);
  }, [isMuted, playTone]);

  const playSuccess = useCallback(() => {
    if (isMuted) return;
    playTone(523, 150, 0.12, undefined, 0);
    playTone(659, 150, 0.12, undefined, 0.16);
  }, [isMuted, playTone]);

  const playFailure = useCallback(() => {
    if (isMuted) return;
    playTone(330, 200, 0.1, 262, 0);
  }, [isMuted, playTone]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  return { playClick, playSuccess, playFailure, isMuted, toggleMute };
}
