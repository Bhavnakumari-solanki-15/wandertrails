import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Sparkles, Globe, ArrowDown } from "lucide-react";
import { destinations } from "@/data/destinations";
import DestinationCard from "@/components/DestinationCard";
import FAQ from "@/components/FAQ";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hero background scroll setup
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const fgY = useTransform(heroScroll, [0, 1], ["0%", "15%"]);

  // Global page scroll setup for the airplane
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Airplane flight path transforms
  // Moving from top-left offset to bottom-right across the viewport
  const planeY = useTransform(scrollYProgress, [0, 1], ["10vh", "85vh"]);
  const planeX = useTransform(scrollYProgress, [0, 1], ["20vw", "80vw"]);
  // Rotation points down-right (around 135 degrees), banking slightly during "flight"
  const planeRotate = useTransform(scrollYProgress, [0, 0.5, 1], [125, 140, 130]);
  // Scale down as it flies "away" (down the page)
  const planeScale = useTransform(scrollYProgress, [0, 0.5, 1], [3, 1.5, 0.8]);
  // Fade out a bit near the footer
  const planeOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]);

  const featured = destinations.slice(0, 4);

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 text-slate-900 relative selection:bg-primary/20">
      
      {/* ── Realistic Floating Airplane Parallax ── */}
      <motion.div
        className="fixed z-40 pointer-events-none"
        style={{
          top: planeY,
          left: planeX,
          rotate: planeRotate,
          scale: planeScale,
          opacity: planeOpacity,
          x: "-50%",
          y: "-50%",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]">
          <defs>
            <linearGradient id="fuselage" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d1d5db" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#9ca3af" />
            </linearGradient>
            <linearGradient id="wing" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f3f4f6" />
              <stop offset="100%" stopColor="#9ca3af" />
            </linearGradient>
          </defs>
          
          {/* Main Wings */}
          <path d="M49 40 L10 65 L10 70 L49 55 Z" fill="url(#wing)" />
          <path d="M51 40 L90 65 L90 70 L51 55 Z" fill="url(#wing)" />
          
          {/* Engines (Attached to underwings) */}
          <rect x="28" y="52" width="6" height="14" rx="3" fill="#4b5563" />
          <rect x="66" y="52" width="6" height="14" rx="3" fill="#4b5563" />
          
          {/* Horizontal Stabilizers */}
          <path d="M49 82 L30 92 L30 95 L49 88 Z" fill="url(#wing)" />
          <path d="M51 82 L70 92 L70 95 L51 88 Z" fill="url(#wing)" />
          
          {/* Main Fuselage */}
          <path d="M 46 12 C 46 4, 54 4, 54 12 L 53 90 C 53 98, 47 98, 47 90 Z" fill="url(#fuselage)" />
          
          {/* Tail Fin */}
          <path d="M49.5 75 L50.5 75 L50.5 95 L49.5 95 Z" fill="#9ca3af" />
          
          {/* Cockpit Window */}
          <path d="M 48 10 C 48 8, 52 8, 52 10 L 53 14 L 47 14 Z" fill="#1f2937" />
        </svg>
      </motion.div>

      {/* ── Outer padding wrapper to create the floating hero look ── */}
      <div className="p-4 md:p-6 lg:p-8 min-h-screen flex flex-col pt-24 md:pt-28 lg:pt-32 relative z-10">
        <div
          ref={heroRef}
          className="relative flex-1 rounded-[2.5rem] overflow-hidden flex items-end pb-12 md:pb-24 px-6 md:px-16 shadow-[0_20px_60px_rgba(0,0,0,0.15)] bg-slate-900"
        >
          {/* Background image covering the inner rounded container */}
          <motion.img
            src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1920&q=80"
            alt="Lush tropical island from above"
            className="absolute inset-0 w-full h-[120%] object-cover opacity-90"
            style={{ y: bgY }}
          />

          {/* Slight dark gradient overlay so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/70" />

          {/* ── Inner Content ── */}
          <motion.div
            className="relative z-20 w-full flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16 pt-32"
            style={{ y: fgY }}
          >
            {/* Title (Left Aligned) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-bold font-display leading-[1.05] tracking-tight text-white drop-shadow-xl">
                Unforgettable
                <br /> Travel Moments
                <br /> by WanderTrails
              </h1>
            </motion.div>

            {/* Subtext and Arrow (Right Aligned to the bottom) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-start md:items-end text-left md:text-right max-w-sm shrink-0 relative"
            >
              <p className="text-sm md:text-base lg:text-lg text-white/95 leading-relaxed font-medium drop-shadow-md mb-8 md:mb-12">
                We take you beyond the ordinary, to places where cultures come alive, landscapes leave you breathless, and every moment becomes a story to tell.
              </p>
              
              {/* Down Arrow Button at the bottom right */}
              <button
                onClick={scrollDown}
                className="group flex flex-col w-12 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 items-center justify-center transition-all duration-300 md:absolute md:-bottom-2 md:right-0 cursor-pointer pointer-events-auto backdrop-blur-md shadow-lg"
                aria-label="Scroll Down"
              >
                <ArrowDown className="text-white w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Services / Pillars Area ── */}
      <section className="py-24 relative z-20 bg-slate-50">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8">
          {[
            { icon: Shield, title: "Exclusive Access", desc: "Private routes unavailable to mass tourism." },
            { icon: Globe, title: "Curated by Locals", desc: "Every trail handpicked by regional experts." },
            { icon: Sparkles, title: "AI Concierge", desc: "Intelligent itinerary planning in seconds." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-white border border-slate-200 shadow-sm p-7 lg:p-10 rounded-[2rem] text-center hover:shadow-md transition-all duration-500 hover:-translate-y-1"
            >
              <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 mb-6">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Featured Destinations ── */}
      <section className="py-24 relative z-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3"
            >
              Handpicked Collection
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold font-display text-slate-900"
            >
              Featured Destinations
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((d, i) => (
              <DestinationCard key={d.id} destination={d} index={i} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/destinations" className="btn-premium inline-flex items-center justify-center px-8 py-4 text-sm font-semibold rounded-full transition-colors shadow-lg">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <div className="bg-slate-50 pt-10 pb-24 relative z-20">
        <FAQ />
      </div>
    </div>
  );
}
