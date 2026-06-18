import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let start: number | null = null;
    const duration = 2200;

    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tick = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const raw = Math.min(elapsed / duration, 1);
      setProgress(Math.round(ease(raw) * 100));

      if (raw < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 700);
        }, 200);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Subtle grid lines */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Glow orb */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ZENA — main text */}
          <div className="relative mb-16 select-none">
            <motion.h1
              className="text-[clamp(5rem,15vw,12rem)] font-bold tracking-[0.15em] text-white leading-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              ZENA
            </motion.h1>

            {/* thin line under text */}
            <motion.div
              className="absolute -bottom-3 left-0 h-px bg-white/30"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            />
          </div>

          {/* Loading bar container */}
          <div className="w-[clamp(220px,40vw,480px)] flex flex-col gap-3">
            {/* Track */}
            <div className="relative h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.9))",
                  boxShadow: "0 0 12px rgba(255,255,255,0.6)",
                }}
                transition={{ ease: "linear", duration: 0.05 }}
              />

              {/* Shimmer */}
              <motion.div
                className="absolute top-0 h-full w-16 opacity-60"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                }}
                animate={{ left: [`-64px`, "calc(100% + 64px)"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Percentage */}
            <div className="flex justify-between items-center">
              <motion.span
                className="text-xs tracking-[0.3em] text-white/30 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Loading
              </motion.span>
              <motion.span
                className="text-xs font-mono text-white/50 tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {String(progress).padStart(3, "0")}%
              </motion.span>
            </div>
          </div>

          {/* Bottom tagline */}
          <motion.p
            className="absolute bottom-10 text-xs tracking-[0.4em] text-white/20 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Muhammad Ganesar Zena · Portfolio
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
