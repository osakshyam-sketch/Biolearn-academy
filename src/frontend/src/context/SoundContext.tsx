import { type SoundFunctions, useSounds } from "@/hooks/useSounds";
import { type ReactNode, createContext, useContext } from "react";

const SoundContext = createContext<SoundFunctions | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const sounds = useSounds();
  return (
    <SoundContext.Provider value={sounds}>{children}</SoundContext.Provider>
  );
}

export function useSoundContext(): SoundFunctions {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return ctx;
}
