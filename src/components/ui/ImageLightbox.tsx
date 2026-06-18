import { useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { FluidGlassLens } from "./FluidGlassLens";

interface ImageLightboxProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, open, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fallback image — visible when WebGL unavailable */}
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-contain bg-card"
              style={{ maxHeight: "85vh", display: "block" }}
            />

            {/* FluidGlass lens overlay — renders image + glass effect via Three.js */}
            <div
              className="absolute inset-0"
              style={{ maxHeight: "85vh" }}
            >
              <Suspense fallback={null}>
                <FluidGlassLens imageUrl={src} />
              </Suspense>
            </div>

            {/* Close button — z-index above Canvas */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors border border-white/20"
            >
              <X size={18} />
            </button>

            {/* Caption */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 text-xs text-white/50 bg-black/50 px-3 py-1 rounded-full border border-white/10 whitespace-nowrap">
              {alt} · gerakkan kursor untuk efek lensa
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ImagePreviewHint() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity rounded-xl cursor-zoom-in">
      <div className="flex items-center gap-1.5 text-white text-xs font-medium bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
        <ZoomIn size={13} />
        Klik untuk perbesar
      </div>
    </div>
  );
}
