import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { destinations } from "@/data/destinations";
import DestinationCard from "@/components/DestinationCard";
import InteractiveGlobe from "@/components/InteractiveGlobe";

const DIFFICULTY_OPTIONS = ["All", "Easy", "Moderate", "Challenging", "Expert"];
const REGION_OPTIONS = ["All", ...Array.from(new Set(destinations.map((d) => d.region))).sort()];

export default function Destinations() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [region, setRegion] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = destinations.filter((d) => {
    const matchesQuery =
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.region.toLowerCase().includes(query.toLowerCase());
    const matchesDifficulty = difficulty === "All" || d.difficulty === difficulty;
    const matchesRegion = region === "All" || d.region === region;
    return matchesQuery && matchesDifficulty && matchesRegion;
  });

  const hasActiveFilters = difficulty !== "All" || region !== "All";

  const clearFilters = () => {
    setDifficulty("All");
    setRegion("All");
  };

  return (
    <div className="min-h-screen pt-24 pb-20 relative">

      {/* No particles here - moved to AI Planner */}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Curated Collection</p>
          <h1 className="text-4xl md:text-5xl font-bold font-display">
            <span className="text-gradient-teal">Explore</span>{" "}
            <span className="text-foreground">Destinations</span>
          </h1>
        </motion.div>

        {/* 3D Global Explorer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full mt-8 md:mt-2 mb-4 relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px]"
        >
          <div className="absolute inset-0 bg-accent/5 rounded-[3rem] blur-3xl -z-10 animate-pulse"></div>
          <InteractiveGlobe />
        </motion.div>

        {/* ── Search + Filter Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 mx-auto max-w-2xl"
        >
          <div className="flex items-center gap-3">
            {/* Search input */}
            <div className="glass-card glow-teal flex items-center gap-3 px-4 py-3 flex-1">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search by name or region..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>

            {/* Filter icon button */}
            <div className="relative">
              <button
                onClick={() => setFilterOpen((o) => !o)}
                className={`glass-card p-3.5 flex items-center justify-center transition-all duration-300 hover:glow-teal ${
                  hasActiveFilters ? "border border-primary/50 text-primary" : "text-muted-foreground"
                }`}
                aria-label="Toggle filters"
              >
                <SlidersHorizontal className="h-5 w-5" />
                {hasActiveFilters && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center">
                    {(difficulty !== "All" ? 1 : 0) + (region !== "All" ? 1 : 0)}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {filterOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  className="absolute right-0 top-full mt-2 w-72 glass-card p-5 z-50 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Filters</h3>
                    <div className="flex items-center gap-2">
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="text-[10px] font-bold text-primary hover:text-accent transition-colors uppercase tracking-wider"
                        >
                          Clear All
                        </button>
                      )}
                      <button onClick={() => setFilterOpen(false)} className="text-muted-foreground hover:text-foreground">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="mb-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 block">
                      Challenge Level
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {DIFFICULTY_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setDifficulty(opt)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                            difficulty === opt
                              ? "bg-primary text-white shadow-md"
                              : "bg-secondary/60 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Region */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 block">
                      Region
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {REGION_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setRegion(opt)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                            region === opt
                              ? "bg-accent text-white shadow-md"
                              : "bg-secondary/60 text-muted-foreground hover:bg-accent/10 hover:text-accent"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Active filter pills */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center gap-2 mt-3 flex-wrap"
            >
              {difficulty !== "All" && (
                <span className="badge-teal text-xs flex items-center gap-1.5">
                  {difficulty}
                  <button onClick={() => setDifficulty("All")} className="hover:text-primary/60">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {region !== "All" && (
                <span className="badge-gold text-xs flex items-center gap-1.5">
                  {region}
                  <button onClick={() => setRegion("All")} className="hover:text-accent/60">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((d, i) => (
            <DestinationCard key={d.id} destination={d} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">No destinations match your search.</p>
            <button onClick={clearFilters} className="mt-4 text-primary text-sm font-semibold hover:underline">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
