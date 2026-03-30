import { useState, FormEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, X, MessageSquare } from "lucide-react";
import { destinations } from "@/data/destinations";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const prefilledDest = searchParams.get("destination") || "";
  const prefilledPeople = searchParams.get("people") || "";
  const [submitted, setSubmitted] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle prefilled custom destinations dynamically
  const isPrefilledCustom = prefilledDest && !destinations.find(d => d.name === prefilledDest);
  const [destSelection, setDestSelection] = useState<string>(isPrefilledCustom ? "Custom" : prefilledDest);
  const [customDest, setCustomDest] = useState<string>(isPrefilledCustom ? prefilledDest : "");

  const [mobileDestSelection, setMobileDestSelection] = useState<string>("");
  const [mobileCustomDest, setMobileCustomDest] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    
    // Override destination if Custom is selected
    if (data.destination === "Custom") {
      data.destination = data.customDestination || "Custom";
    }
    // Delete custom field so the row mapping fits cleanly with Google Sheets setup
    delete data.customDestination;

    setIsSubmitting(true);
    const scriptURL = import.meta.env.VITE_GOOGLE_SHEET_URL;

    try {
      if (scriptURL) {
        // Send data to Google Apps Script
        const formData = new URLSearchParams(data as unknown as Record<string, string>);
        
        await fetch(scriptURL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString()
        });
      } else {
        console.warn("VITE_GOOGLE_SHEET_URL is not set in .env. Simulating success.");
      }
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
      alert("Something went wrong while submitting the inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl bg-secondary/80 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition";

  return (
    <div className="min-h-screen pt-24 pb-20 flex">
      {/* Left: Info */}
      <div className="flex-1 container mx-auto px-4 flex flex-col justify-center max-w-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="badge-gold text-xs tracking-widest uppercase mb-4 inline-block">
            Inquiries
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight">
            <span className="text-gradient-gold">Start Your</span>
            <br />
            <span className="text-foreground">Journey</span>
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            Share your travel vision with our expedition designers. We respond within 24 hours with a bespoke itinerary tailored to your style.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { num: "500+", label: "Trails" },
              { num: "50+", label: "Destinations" },
              { num: "10K+", label: "Travelers" },
            ].map((s) => (
              <div key={s.label} className="glass-card p-4 text-center glow-teal">
                <div className="text-2xl font-bold text-gradient-teal font-display">{s.num}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right: Floating Sidebar Form */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="hidden md:block w-[420px] shrink-0 pr-4"
      >
        <div className="contact-panel glow-teal sticky top-24 p-8 rounded-2xl">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <h2 className="text-xl font-bold font-display text-foreground">Inquiry Sent!</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Our expedition designers will craft your bespoke itinerary within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 btn-gold px-6 py-2.5 text-sm"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold font-display text-foreground mb-1">Quick Inquiry</h3>
                <p className="text-xs text-muted-foreground mb-4">Fill in your details and we'll handle the rest.</p>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1 block">Name</label>
                  <input name="name" required placeholder="Your full name" className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1 block">Email</label>
                    <input name="email" type="email" required placeholder="you@email.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1 block">Phone</label>
                    <input name="phone" type="tel" placeholder="+91 98765 43210" className={inputClass} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1 block">Destination</label>
                  <select
                    name="destination"
                    required
                    className={inputClass}
                    value={destSelection}
                    onChange={(e) => setDestSelection(e.target.value)}
                  >
                    <option value="">Choose a destination</option>
                    {destinations.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                    <option value="Custom">Custom</option>
                  </select>
                  {destSelection === "Custom" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                      <input
                        name="customDestination"
                        type="text"
                        required
                        placeholder="Type your destination..."
                        value={customDest}
                        onChange={(e) => setCustomDest(e.target.value)}
                        className={inputClass}
                      />
                    </motion.div>
                  )}
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1 block">No. of People</label>
                  <input name="people" type="number" min="1" placeholder="2" defaultValue={prefilledPeople} className={inputClass} />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1 block">Travel Dates</label>
                  <input name="dates" type="text" placeholder="e.g. 15 Jul – 20 Jul 2026" className={inputClass} />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-premium w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-50">
                  <Send className="h-4 w-4" /> {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Mobile: Full-width form */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 p-4">
        <AnimatePresence>
          {!panelOpen && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setPanelOpen(true)}
              className="btn-premium rounded-full w-14 h-14 flex items-center justify-center mx-auto"
            >
              <span><MessageSquare className="h-5 w-5" /></span>
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="contact-panel glow-teal p-6 rounded-t-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold font-display">Quick Inquiry</h3>
                <button onClick={() => setPanelOpen(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
              </div>
              {submitted ? (
                <div className="text-center py-6">
                  <CheckCircle className="h-10 w-10 text-accent mx-auto mb-3" />
                  <p className="text-sm text-foreground font-semibold">Inquiry Sent!</p>
                  <button onClick={() => setSubmitted(false)} className="btn-gold mt-4 px-5 py-2 text-sm">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input name="name" required placeholder="Full name" className={inputClass} />
                  <input name="email" type="email" required placeholder="Email" className={inputClass} />
                  <input name="phone" type="tel" placeholder="Phone" className={inputClass} />
                  
                  <div className="space-y-2">
                    <select
                      name="destination"
                      required
                      className={inputClass}
                      value={mobileDestSelection}
                      onChange={(e) => setMobileDestSelection(e.target.value)}
                    >
                      <option value="">Destination</option>
                      {destinations.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                      <option value="Custom">Custom</option>
                    </select>
                    {mobileDestSelection === "Custom" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                        <input
                          name="customDestination"
                          type="text"
                          required
                          placeholder="Type your destination..."
                          value={mobileCustomDest}
                          onChange={(e) => setMobileCustomDest(e.target.value)}
                          className={inputClass}
                        />
                      </motion.div>
                    )}
                  </div>

                  <input name="dates" placeholder="Travel dates" className={inputClass} />
                  <button type="submit" disabled={isSubmitting} className="btn-premium w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50">
                    <Send className="h-4 w-4" /> {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
