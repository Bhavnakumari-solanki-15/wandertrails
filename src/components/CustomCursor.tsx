import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const clickable = t.closest("a, button, [role='button'], input, select, textarea, label");
      setHovering(!!clickable);
    };

    let raf: number;
    const tick = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Hide on touch devices
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  return (
    <>
      <div ref={ringRef} className={`cursor-ring ${hovering ? "hovering" : ""}`} />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
