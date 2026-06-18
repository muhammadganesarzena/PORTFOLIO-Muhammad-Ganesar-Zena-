import { useEffect, useRef } from "react";

export function useUISound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/click.mp3");
    audio.volume = 0.35;
    audioRef.current = audio;

    function playSound() {
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

      if (isInteractive) {
        playSound();
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("mouseover", handleHover);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mouseover", handleHover);
    };
  }, []);
}
