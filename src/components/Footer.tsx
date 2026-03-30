import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="py-20 relative z-10 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Brand Column */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logoImg} alt="WanderTrails" className="h-10 w-10 rounded-lg object-contain transition-transform group-hover:scale-110" />
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-primary leading-none">WanderTrails</span>
                <span className="text-[10px] tracking-[0.3em] font-bold text-accent uppercase mt-1">India</span>
              </div>
            </Link>
            <p className="max-w-[280px] text-sm text-muted-foreground text-center lg:text-left leading-relaxed">
              Curating extraordinary journeys through the heart of the Indian subcontinent.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/destinations" className="hover:text-primary transition-colors">Destinations</Link>
            <Link to="/planner" className="hover:text-primary transition-colors">AI Planner</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>

          {/* Social Column */}
          <div className="flex flex-col items-center lg:items-end gap-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent">Follow Our Journey</h4>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, link: "#", color: "hover:text-[#E4405F]" },
                { Icon: Facebook, link: "#", color: "hover:text-[#1877F2]" },
                { Icon: Twitter, link: "#", color: "hover:text-[#1DA1F2]" },
                { Icon: Youtube, link: "#", color: "hover:text-[#FF0000]" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.link} 
                  className={`p-2 text-muted-foreground transition-all duration-300 hover:scale-125 ${social.color}`}
                >
                  <social.Icon size={20} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
          <p>© 2026 WanderTrails India • All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
