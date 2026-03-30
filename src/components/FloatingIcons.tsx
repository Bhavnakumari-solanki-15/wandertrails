import { motion } from "framer-motion";
import { Compass, MapPin, Camera } from "lucide-react";

const icons = [
  { Icon: Compass, x: -200, y: -50, delay: 0, duration: 8 },
  { Icon: MapPin, x: 180, y: -90, delay: 2, duration: 10 },
  { Icon: Camera, x: 240, y: 70, delay: 4, duration: 9 },
];

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
      {icons.map(({ Icon, x, y, delay, duration }, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ opacity: 0, x, y }}
          animate={{
            opacity: [0, 0.2, 0.2, 0],
            y: [y, y - 25, y + 15, y],
            x: [x, x + 12, x - 8, x],
          }}
          transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="rounded-2xl p-4" style={{
            background: "hsla(183, 80%, 35%, 0.06)",
            border: "1px solid hsla(183, 80%, 35%, 0.1)",
            backdropFilter: "blur(6px)",
          }}>
            <Icon className="h-10 w-10 text-primary/30" strokeWidth={1} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
