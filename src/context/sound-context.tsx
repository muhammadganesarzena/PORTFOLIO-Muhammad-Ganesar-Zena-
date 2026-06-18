import { createContext, useContext, useEffect, useRef, useState } from "react";

interface SoundContextValue {
  muted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextValue>({
  muted: false,
  toggleMute: () => {},
});

export function useSoundContext() {
  return useContext(SoundContext);
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mutedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio("/click.mp3");
    audio.volume = 0.35;
    audioRef.current = audio;

    function playSound() {
      if (mutedRef.current) return;
      const sound = audioRef.current;
      if (!sound) return;
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }

    function handleClick() {
      playSound();
    }

    function handleHover(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.getAttribute("role") === "button" ||
        target.closest("[role='button']") !== null ||
        target.classList.contains("cursor-target") ||
        target.closest(".cursor-target") !== null;

      if (isInteractive) playSound();
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("mouseover", handleHover);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mouseover", handleHover);
    };
  }, []);

  function toggleMute() {
    setMuted((prev) => {
      mutedRef.current = !prev;
      return !prev;
    });
  }

  return (
    <SoundContext.Provider value={{ muted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
}
