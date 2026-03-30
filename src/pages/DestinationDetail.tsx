import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Mountain, Calendar, Star, Users, CheckCircle, Send } from "lucide-react";
import { destinations, detailedItineraries } from "@/data/destinations";
import { useState } from "react";

export default function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dest = destinations.find((d) => d.id === id);
  const itinerary = id ? detailedItineraries[id] : undefined;
  const [selectedImg, setSelectedImg] = useState(0);

  if (!dest) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Destination not found</h1>
          <Link to="/destinations" className="btn-premium px-6 py-3">Back to Destinations</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-32 lg:pb-20">
      {/* Hero Banner */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden bg-slate-100">
        <img
          src={dest.gallery[selectedImg] || dest.image}
          alt={dest.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 md:left-6 z-10 glass-card px-3 py-2 md:px-4 flex items-center gap-2 text-xs md:text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </motion.button>

        {/* Title overlay */}
        <div className="absolute bottom-6 md:bottom-8 left-0 right-0 px-4 md:px-12">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                <span className="text-xs md:text-sm font-medium text-primary">{dest.region}</span>
                <span className="badge-teal ml-2 text-[10px] md:text-xs">{dest.bestTime}</span>
              </div>
              <h1 className="text-3xl md:text-6xl font-bold font-display text-foreground leading-tight">{dest.name}</h1>
              <p className="mt-2 text-sm md:text-lg text-muted-foreground max-w-2xl line-clamp-2 md:line-clamp-none leading-relaxed">
                {dest.bio}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gallery Thumbnails */}
      <div className="container mx-auto px-4 -mt-4 md:-mt-6 relative z-10">
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {dest.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImg(i)}
              className={`shrink-0 w-20 h-14 md:w-32 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                selectedImg === i ? "border-primary glow-teal scale-105" : "border-border/30 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`${dest.name} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 md:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-8 md:space-y-10">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            >
              {[
                { icon: Clock, label: "Duration", value: dest.duration },
                { icon: Mountain, label: "Altitude", value: dest.altitude },
                { icon: Star, label: "Difficulty", value: dest.difficulty },
                { icon: Calendar, label: "Best Time", value: dest.bestTime },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-3 md:p-4 text-center glow-teal flex flex-col justify-center min-h-[90px]">
                  <stat.icon className="h-4 w-4 md:h-5 md:w-5 text-primary mx-auto mb-1.5 md:mb-2" />
                  <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                  <div className="text-xs md:text-sm font-bold text-foreground mt-0.5 md:mt-1">{stat.value}</div>
                </div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-3 md:mb-4">About This Destination</h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-[15px]">{dest.description}</p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-3 md:mb-4">Highlights</h2>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {dest.highlights.map((h) => (
                  <span key={h} className="badge-teal text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2">{h}</span>
                ))}
              </div>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-3 md:mb-4">What's Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                {dest.included.map((item) => (
                  <div key={item} className="flex items-center gap-2 md:gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Itinerary */}
            {itinerary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 md:mb-6">Sample Itinerary</h2>
                <div className="space-y-3 md:space-y-4">
                  {itinerary.map((day, i) => (
                    <div key={i} className="glass-card p-4 md:p-6 glow-teal">
                      <div className="flex items-center gap-3 mb-3 md:mb-4">
                        <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs md:text-sm border border-primary/20 shrink-0">
                          D{i + 1}
                        </span>
                        <h3 className="text-base md:text-lg font-bold text-foreground">{day.title}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 ml-11 md:ml-0">
                        {[
                          { label: "Morning", value: day.morning },
                          { label: "Afternoon", value: day.afternoon },
                          { label: "Evening", value: day.evening },
                        ].map((slot) => (
                          <div key={slot.label}>
                            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-accent font-semibold">{slot.label}</span>
                            <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1">{slot.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Sticky Inquiry Card (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24"
            >
              <div className="glass-card glow-gold p-7">
                <div className="text-center mb-6">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Starting from</div>
                  <div className="text-4xl font-bold font-display text-gradient-gold">
                    ₹{dest.price.toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">per person</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="text-foreground font-medium">{dest.duration}</span>
                  </div>
                  <div className="border-t border-border/30" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Difficulty</span>
                    <span className="text-foreground font-medium">{dest.difficulty}</span>
                  </div>
                  <div className="border-t border-border/30" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Group Size</span>
                    <span className="text-foreground font-medium">2–12 people</span>
                  </div>
                </div>

                <Link
                  to={`/contact?destination=${encodeURIComponent(dest.name)}&people=2`}
                  className="btn-premium w-full py-4 flex items-center justify-center gap-2 text-base"
                >
                  <Send className="h-4 w-4" /> Inquire Now
                </Link>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>12 travelers inquired this week</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4 pb-safe flex items-center justify-between">
        <div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-0.5">Starting from</div>
          <div className="text-xl font-bold font-display text-gradient-gold leading-none">
            ₹{dest.price.toLocaleString("en-IN")}
          </div>
        </div>
        <Link
          to={`/contact?destination=${encodeURIComponent(dest.name)}&people=2`}
          className="btn-premium py-3 px-6 text-sm flex items-center justify-center gap-2 shadow-lg scale-95"
        >
          <Send className="h-4 w-4" /> Book Now
        </Link>
      </div>
    </div>
  );
}

