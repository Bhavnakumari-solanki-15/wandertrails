import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I book a trip with WanderTrails India?",
    a: "Simply browse our destinations, choose a place that excites you, and click 'Inquire Now.' Our expedition designers will contact you within 24 hours with a bespoke itinerary and payment details.",
  },
  {
    q: "Are these trips safe for solo travelers?",
    a: "Absolutely! All our expeditions are led by certified local guides with years of experience. Solo travelers are welcome and often join small groups of like-minded explorers.",
  },
  {
    q: "What is included in the trip price?",
    a: "Our packages typically include accommodation, all meals, local transportation, guide fees, permits, and activity gear. International/domestic flights to the starting point are not included unless stated.",
  },
  {
    q: "Can I customize my itinerary?",
    a: "Yes! Every expedition can be tailored to your preferences. Use our AI Planner for instant suggestions, or speak directly with our team for a fully bespoke experience.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Free cancellation up to 30 days before departure. 50% refund for cancellations 15–29 days prior. No refund within 14 days of departure. Travel insurance is strongly recommended.",
  },
  {
    q: "Do you offer group discounts?",
    a: "Yes! Groups of 4+ get 10% off, and groups of 8+ get 15% off. Contact us for custom group pricing and private expedition options.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-accent mb-3"
          >
            Got Questions?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-display"
          >
            <span className="text-gradient-teal">Frequently</span>{" "}
            <span className="text-foreground">Asked Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full glass-card px-6 py-5 flex items-center justify-between gap-4 text-left hover:glow-teal transition-all duration-300"
              >
                <span className="text-sm md:text-base font-semibold text-foreground">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${
                    openIdx === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIdx === i ? "auto" : 0,
                  opacity: openIdx === i ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
