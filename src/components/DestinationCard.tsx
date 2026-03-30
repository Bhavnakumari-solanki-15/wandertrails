import { useRef, MouseEvent as RMouseEvent } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import type { Destination } from "@/data/destinations";

interface Props {
  destination: Destination;
  index: number;
}

export default function DestinationCard({ destination, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: RMouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateY = ((x - cx) / cx) * 15;
    const rotateX = ((cy - y) / cy) * 15;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="floating-card glow-teal group"
        style={{ transition: "transform 0.2s cubic-bezier(.4,0,.2,1), box-shadow 0.3s ease" }}
      >
        <Link to={`/destination/${destination.id}`} className="block">
          {/* Image */}
          <div className="relative h-56 overflow-hidden rounded-t-2xl">
            <img
              src={destination.image}
              alt={destination.name}
              loading="lazy"
              width={1280}
              height={832}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-115"
            />

            {/* Best time badge */}
            <div className="absolute top-4 left-4">
              <span className="badge-teal">{destination.bestTime}</span>
            </div>

            {/* Slide-up details layer on hover */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <div className="p-4" style={{ background: "hsla(0, 0%, 100%, 0.92)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">{destination.region}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {destination.highlights.map((h) => (
                    <span key={h} className="text-[10px] font-medium rounded-full px-2 py-0.5 bg-secondary/80 text-foreground">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-bold text-foreground font-display">{destination.name}</h3>
              <span className="badge-gold shrink-0">₹{destination.price.toLocaleString("en-IN")}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{destination.bio}</p>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
