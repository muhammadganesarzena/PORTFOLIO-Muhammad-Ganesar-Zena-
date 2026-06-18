import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);

  const [thumbHeight, setThumbHeight] = useState(40);
  const [visible, setVisible] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const thumbTop = useSpring(0, { stiffness: 200, damping: 30 });

  const getScrollMetrics = useCallback(() => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const trackHeight = window.innerHeight - 32;
    const ratio = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    const minThumb = 32;
    const maxThumb = trackHeight * 0.4;
    const tHeight = Math.max(minThumb, Math.min(maxThumb, (window.innerHeight / document.documentElement.scrollHeight) * trackHeight));
    const tTop = ratio * (trackHeight - tHeight) + 16;
    return { ratio, tHeight, tTop, trackHeight };
  }, []);

  const update = useCallback(() => {
    const { tHeight, tTop } = getScrollMetrics();
    setThumbHeight(tHeight);
    thumbTop.set(tTop);
    setVisible(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => setVisible(false), 1500);
  }, [getScrollMetrics, thumbTop]);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [update]);

  const onTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top - 16;
    const { trackHeight, tHeight } = getScrollMetrics();
    const ratio = Math.max(0, Math.min(1, clickY / (trackHeight - tHeight)));
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * scrollHeight, behavior: "smooth" });
  }, [getScrollMetrics]);

  const onThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging.current = true;
    dragStartY.current = e.clientY;
    dragStartScroll.current = window.scrollY;
    document.body.style.userSelect = "none";

    const onMouseMove = (ev: MouseEvent) => {
      if (!isDragging.current) return;
      const { trackHeight, tHeight } = getScrollMetrics();
      const deltaY = ev.clientY - dragStartY.current;
      const scrollRatio = deltaY / (trackHeight - tHeight);
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: dragStartScroll.current + scrollRatio * scrollHeight });
    };

    const onMouseUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }, [getScrollMetrics]);

  return (
    <div
      ref={trackRef}
      onClick={onTrackClick}
      className="fixed right-3 top-0 bottom-0 z-[9998] flex items-start pointer-events-auto"
      style={{ width: 6 }}
    >
      {/* Track */}
      <motion.div
        className="absolute inset-y-4 left-0 right-0 rounded-full"
        style={{ background: "rgba(255,255,255,0.04)" }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Thumb */}
      <motion.div
        ref={thumbRef}
        onMouseDown={onThumbMouseDown}
        onClick={(e) => e.stopPropagation()}
        className="absolute left-0 right-0 rounded-full"
        style={{
          top: thumbTop,
          height: thumbHeight,
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(4px)",
          cursor: "none",
          boxShadow: "0 0 8px rgba(255,255,255,0.15)",
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          background: "rgba(255,255,255,0.5)",
          boxShadow: "0 0 12px rgba(255,255,255,0.3)",
        }}
      />
    </div>
  );
}
