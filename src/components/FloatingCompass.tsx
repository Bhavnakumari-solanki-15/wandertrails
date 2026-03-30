import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export default function FloatingCompass() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setRotation(pct * 360);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 rounded-full p-3 glass-card glow-teal"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: "spring" }}
      style={{ cursor: "none" }}
    >
      <Compass
        className="h-7 w-7 text-primary"
        style={{ transform: `rotate(${rotation}deg)`, transition: "transform 0.15s ease-out" }}
      />
    </motion.div>
  );
}
