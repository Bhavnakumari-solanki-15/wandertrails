import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, MapPin, Clock, Sunrise, Sun, Moon, ChevronDown } from "lucide-react";
import { destinations, detailedItineraries, type DayPlan } from "@/data/destinations";
import Particles from "@/components/Particles";


type TravelStyle = "luxury" | "adventure";

export default function Planner() {
  const [destination, setDestination] = useState("");
  const [customDestination, setCustomDestination] = useState("");
  const [daysSelection, setDaysSelection] = useState<string>("3");
  const [customDays, setCustomDays] = useState<number>(3);
  const [style, setStyle] = useState<TravelStyle>("luxury");
  const [plan, setPlan] = useState<DayPlan[] | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  const generate = async () => {
    const finalDestination = destination === "custom" ? customDestination : destination;
    const finalDays = daysSelection === "custom" ? customDays : Number(daysSelection);

    if (!finalDestination) return;
    setIsScanning(true);
    setPlan(null);
    setActiveDay(0);

    const clampedDays = Math.min(Math.max(finalDays, 1), 10);

    try {
      const prompt = `Create a ${clampedDays}-day ${style} travel itinerary for ${finalDestination}. 
      Return ONLY a JSON array of objects. Do not include any markdown formatting like \`\`\`json.
      Each object must have these exactly 4 keys: 
      "title" (string, short day title), "morning" (string, short description limit 10 words), "afternoon" (string, short description limit 10 words), "evening" (string, short description limit 10 words).
      Example format:
      [
        {"title": "Day 1: Arrival", "morning": "Arrive and check-in", "afternoon": "Explore the city", "evening": "Dinner at local spot"}
      ]`;

      const [response] = await Promise.all([
        fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
          })
        }),
        new Promise(resolve => setTimeout(resolve, 1500))
      ]);

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      const jsonStr = content.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedPlan: DayPlan[] = JSON.parse(jsonStr);
      setPlan(parsedPlan);
    } catch (e) {
      console.error(e);
      setPlan([{ title: "Error", morning: "Failed to generate plan. Please try again.", afternoon: "Check API key or network.", evening: "Ensure custom inputs are valid." }]);
    } finally {
      setIsScanning(false);
    }
  };

  const timeSlots = [
    { key: "morning" as const, label: "Morning", icon: Sunrise, color: "text-accent" },
    { key: "afternoon" as const, label: "Afternoon", icon: Sun, color: "text-primary" },
    { key: "evening" as const, label: "Evening", icon: Moon, color: "text-muted-foreground" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 relative">

      {/* ── Particles Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.8 }}>
        <Particles
          particleColors={["#0d9488", "#0f766e", "#b45309", "#5eead4", "#065f46"]}
          particleCount={250}
          particleSpread={12}
          speed={0.08}
          particleBaseSize={90}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={Math.min(window.devicePixelRatio, 2)}
        />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold badge-gold mb-4">
            <Sparkles className="h-3 w-3" /> AI Concierge
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display">
            <span className="text-gradient-teal">Itinerary</span>{" "}
            <span className="text-foreground">Planner</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Select your destination, duration and travel style — our AI crafts your bespoke expedition.
          </p>
        </motion.div>

        {/* ── Command Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card glow-teal flex flex-col md:flex-row items-stretch"
        >
          {/* Destination */}
          <div className="command-segment flex flex-col justify-center gap-2">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-semibold">Destination</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="command-input"
              >
                <option value="">Select destination</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
                <option value="custom">Custom</option>
              </select>
            </div>
            {destination === "custom" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <input
                  type="text"
                  placeholder="Enter custom destination..."
                  value={customDestination}
                  onChange={(e) => setCustomDestination(e.target.value)}
                  className="command-input cursor-text border-t border-white/10 pt-2 mt-1"
                />
              </motion.div>
            )}
          </div>

          {/* Duration */}
          <div className="command-segment flex flex-col justify-center gap-2">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-semibold">Duration</label>
              <select
                value={daysSelection}
                onChange={(e) => setDaysSelection(e.target.value)}
                className="command-input"
              >
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            {daysSelection === "custom" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Days (Max 10)"
                  value={customDays || ""}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) {
                      setCustomDays(Math.min(val, 10));
                    } else {
                      setCustomDays(0 as unknown as number);
                    }
                  }}
                  className="command-input cursor-text border-t border-white/10 pt-2 mt-1"
                />
              </motion.div>
            )}
          </div>

          {/* Travel Style */}
          <div className="command-segment flex flex-col justify-center">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-semibold">Travel Style</label>
            <div className="flex gap-2 mt-0.5">
              {(["luxury", "adventure"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`text-xs font-semibold rounded-full px-3 py-1 transition-all ${
                    style === s
                      ? s === "luxury" ? "badge-gold" : "badge-teal"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s === "luxury" ? "✦ Luxury" : "⛰ Adventure"}
                </button>
              ))}
            </div>
          </div>

          {/* Generate */}
          <div className="flex items-center px-4 py-3 md:py-0">
            <button
              onClick={generate}
              disabled={(!destination || (destination === "custom" && !customDestination) || (daysSelection === "custom" && (!customDays || customDays < 1))) || isScanning}
              className="btn-premium w-full md:w-auto px-6 py-3 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
            >
              <Bot className="h-4 w-4" />
              {isScanning ? "Scanning..." : "Generate"}
            </button>
          </div>
        </motion.div>

        {/* ── Scanning Animation ── */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 glass-card glow-teal relative overflow-hidden"
              style={{ minHeight: 200 }}
            >
              <div className="scan-line" />
              <div className="p-8 flex flex-col items-center justify-center" style={{ minHeight: 200 }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Bot className="h-10 w-10 text-primary/40" />
                </motion.div>
                <p className="mt-4 text-sm text-muted-foreground animate-pulse">
                  Analyzing terrain data & local insights via AI...
                </p>
                <div className="mt-3 flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Digital Passport Timeline ── */}
        <AnimatePresence>
          {plan && !isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              {/* Day Tabs */}
              <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
                {plan.map((day, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveDay(i)}
                    className={`flex-none min-w-[120px] glass-card px-4 py-3 text-center transition-all duration-300 ${
                      activeDay === i ? "glow-teal border border-primary/30" : "hover:glow-teal"
                    }`}
                  >
                    <div className={`text-xs font-bold uppercase tracking-wider ${activeDay === i ? "text-primary" : "text-muted-foreground"}`}>
                      Day {i + 1}
                    </div>
                    <div className={`text-sm font-semibold mt-1 truncate ${activeDay === i ? "text-foreground" : "text-muted-foreground"}`}>
                      {day.title}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Day Content — Vertical Timeline */}
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="glass-card glow-teal p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-accent" />
                    <h3 className="text-xl font-bold font-display text-foreground">
                      Day {activeDay + 1}: {plan[activeDay]?.title}
                    </h3>
                  </div>
                  <span className="badge-gold text-[10px] md:ml-auto w-fit">{style === "luxury" ? "✦ Luxury" : "⛰ Adventure"}</span>
                </div>

                <div className="relative pl-10 space-y-0">
                  <div className="timeline-line" />

                  {timeSlots.map((slot, si) => (
                    <motion.div
                      key={slot.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: si * 0.1 }}
                      className="relative pb-6 last:pb-0"
                    >
                      <div className={`timeline-dot ${si === 0 ? "active" : ""}`} style={{ top: 6 }} />
                      <div className="glass-card p-4 ml-4 hover:glow-teal transition-all duration-300">
                        <div className="flex items-center gap-2 mb-1.5">
                          <slot.icon className={`h-4 w-4 ${slot.color}`} />
                          <span className={`text-xs font-bold uppercase tracking-wider ${slot.color}`}>
                            {slot.label}
                          </span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">
                          {plan[activeDay] ? plan[activeDay][slot.key] : ""}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
