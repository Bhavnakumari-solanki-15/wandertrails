import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import logoImg from "@/assets/logo.png";
import "./StaggeredMenu.css";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Destinations", path: "/destinations" },
  { label: "AI Planner", path: "/planner" },
  { label: "Contact", path: "/contact" },
];

const socialItems = [
  { label: "Instagram", link: "#" },
  { label: "Facebook", link: "#" },
  { label: "Twitter", link: "#" },
];

const COLORS = ["hsla(183, 80%, 90%, 0.4)", "hsla(183, 80%, 35%, 0.3)"];
const ACCENT = "hsl(183, 80%, 35%)";
const MENU_BTN_COLOR = "hsl(220, 20%, 12%)";
const OPEN_BTN_COLOR = "hsl(220, 20%, 12%)";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const openRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Switch colors when scrolled past the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const panelRef = useRef<HTMLDivElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const textWrapRef = useRef<HTMLSpanElement>(null);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll(".sm-prelayer")) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      gsap.set([panel, ...preLayers], { xPercent: 100 });
      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: MENU_BTN_COLOR });
    });
    return () => ctx.revert();
  }, []);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) { closeTweenRef.current.kill(); closeTweenRef.current = null; }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel")) as HTMLElement[];
    const numberEls = Array.from(panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")) as HTMLElement[];
    const socialTitle = panel.querySelector(".sm-socials-title") as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link")) as HTMLElement[];
    const ctaBtn = panel.querySelector(".sm-panel-cta") as HTMLElement | null;

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, "xPercent")) }));
    const panelStart = Number(gsap.getProperty(panel, "xPercent"));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 } as any);
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
    if (ctaBtn) gsap.set(ctaBtn, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: "power4.out" }, i * 0.07);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(panel, { xPercent: panelStart }, { xPercent: 0, duration: panelDuration, ease: "power4.out" }, panelInsertTime);

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: "power4.out", stagger: { each: 0.1, from: "start" } }, itemsStart);
      if (numberEls.length) {
        tl.to(numberEls, { duration: 0.6, ease: "power2.out", "--sm-num-opacity": 1, stagger: { each: 0.08, from: "start" } } as any, itemsStart + 0.1);
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: "power2.out" }, socialsStart);
      if (socialLinks.length) {
        tl.to(socialLinks, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: { each: 0.08, from: "start" } }, socialsStart + 0.04);
      }
    }

    if (ctaBtn) {
      tl.to(ctaBtn, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, panelInsertTime + panelDuration * 0.5);
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) { tl.eventCallback("onComplete", () => { busyRef.current = false; }); tl.play(0); }
    else { busyRef.current = false; }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;
    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to(all, {
      xPercent: 100, duration: 0.32, ease: "power3.in", overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel")) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const numberEls = Array.from(panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")) as HTMLElement[];
        if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 } as any);
        const socialTitle = panel.querySelector(".sm-socials-title") as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link")) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      }
    });
  }, []);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    spinTweenRef.current = opening
      ? gsap.to(icon, { rotate: 225, duration: 0.8, ease: "power4.out", overwrite: "auto" })
      : gsap.to(icon, { rotate: 0, duration: 0.35, ease: "power3.inOut", overwrite: "auto" });
  }, []);

  const animateColor = useCallback((opening: boolean) => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    colorTweenRef.current?.kill();
    const targetColor = opening ? OPEN_BTN_COLOR : MENU_BTN_COLOR;
    colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: "power2.out" });
  }, []);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();
    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const cycles = 3;
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) { last = last === "Menu" ? "Close" : "Menu"; seq.push(last); }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, { yPercent: -finalShift, duration: 0.5 + lineCount * 0.07, ease: "power4.out" });
  }, []);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) playOpen(); else playClose();
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText]);

  const handleNavClick = useCallback((path: string) => {
    closeMenu();
    setTimeout(() => navigate(path), 300);
  }, [closeMenu, navigate]);

  React.useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current && !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, closeMenu]);

  return (
    <div
      className="staggered-menu-wrapper fixed-wrapper"
      style={{ "--sm-accent": ACCENT } as React.CSSProperties}
      data-position="right"
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {COLORS.map((c, i) => (
          <div key={i} className="sm-prelayer" style={{ background: c }} />
        ))}
      </div>

      <header className={`staggered-menu-header ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation header">
        <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick("/"); }} className="sm-logo">
          <img src={logoImg} alt="WanderTrails" className="sm-logo-img" draggable={false} width={40} height={40} />
          <div className="sm-logo-text">
            <span className="sm-logo-name">WanderTrails</span>
            <span className="sm-logo-sub">India</span>
          </div>
        </a>

        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={toggleMenu}
          type="button"
        >
          <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => (
                <span className="sm-toggle-line" key={i}>{l}</span>
              ))}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      <aside ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering>
            {navItems.map((item, idx) => (
              <li className="sm-panel-itemWrap" key={item.path}>
                <a
                  className="sm-panel-item"
                  href={item.path}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }}
                  data-index={idx + 1}
                  style={location.pathname === item.path ? { color: ACCENT } : undefined}
                >
                  <span className="sm-panel-itemLabel">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); handleNavClick("/contact"); }}
            className="sm-panel-cta"
          >
            Book Now
          </a>

          <div className="sm-socials" aria-label="Social links">
            <h3 className="sm-socials-title">Socials</h3>
            <ul className="sm-socials-list" role="list">
              {socialItems.map((s, i) => (
                <li key={s.label + i} className="sm-socials-item">
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
