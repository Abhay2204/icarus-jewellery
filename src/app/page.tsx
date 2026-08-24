"use client";

import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Menu,
  X,
  Eye,
  Heart,
  MessageCircle,
  Gem,
  HandHeart,
  ShieldCheck,
  Recycle,
  Gift,
  Users,
  Award,
  Instagram,
  Facebook,
  Mail,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const heroSlides = [
  { id: "01", tag: "EVERYDAY ELEGANCE", title: "EFFORTLESS", subtitle: "FINE JEWELLERY FOR EVERY MOMENT", cta: "DISCOVER COLLECTION" },
  { id: "02", tag: "HAUTE JOAILLERIE", title: "TIMELESS", subtitle: "HANDCRAFTED IN NOBLE METALS & LIGHT", cta: "EXPLORE CREATIONS" },
  { id: "03", tag: "RARE GEMSTONES", title: "RADIANCE", subtitle: "COLOMBIAN EMERALDS & BRILLIANT CUTS", cta: "VIEW HIGH JEWELLERY" },
  { id: "04", tag: "MAISON HERITAGE", title: "SOVEREIGN", subtitle: "ARTISANAL LEGACY & FINE DETAILS", cta: "BOOK PRIVATE SALON" },
];

const signaturePieces = [
  { id: "sig-1", name: "AURELIA NECKLACE", material: "18K Gold", image: "/assets/sig-aurelia-necklace.jpg", alt: "Aurelia necklace", categoryKey: "necklaces", price: 5200, priceInr: "₹1,85,000", carat: "Solid 18K Yellow Gold (38g)", desc: "A fluid torque collar sculpted to contour gracefully against the collarbone." },
  { id: "sig-2", name: "VERDE RING", material: "18K Gold, Emerald & Diamonds", image: "/assets/sig-verde-ring.jpg", alt: "Verde ring", categoryKey: "rings", price: 4650, priceInr: "₹1,45,000", carat: "1.85ct Colombian Emerald • 0.42ct Diamonds", desc: "Vivid green emerald encased in a micro-pavé diamond halo." },
  { id: "sig-3", name: "LUMIÈRE EARRINGS", material: "18K Gold & Diamonds", image: "/assets/sig-lumiere-earrings.jpg", alt: "Lumière earrings", categoryKey: "earrings", price: 3400, priceInr: "₹1,15,000", carat: "0.95ctw VVS Diamonds", desc: "Triple graduated teardrops paved with diamonds." },
  { id: "sig-4", name: "AZURE PENDANT", material: "18K Gold, Sapphire & Diamonds", image: "/assets/sig-azure-pendant.jpg", alt: "Azure pendant", categoryKey: "necklaces", price: 3950, priceInr: "₹1,28,000", carat: "2.10ct Royal Blue Sapphire", desc: "Velvet blue sapphire suspended from an astral diamond star motif." },
  { id: "sig-5", name: "NOVA BANGLE", material: "18K Gold & Diamonds", image: "/assets/sig-nova-bangle.jpg", alt: "Nova bangle", categoryKey: "bracelets", price: 2850, priceInr: "₹95,000", carat: "Solid 18K Gold • 0.15ct Pavé", desc: "An infinity knot symbolizing eternal connection." },
];

const mostLovedProducts = [
  { id: "bestseller-1", name: "EMERALD HALO NECKLACE", material: "18K Gold, Emerald & Diamonds", priceInr: "₹65,000", priceUsd: 1850, image: "/assets/col-necklace.jpg", categoryKey: "necklaces", carat: "1.25ct Emerald", desc: "Signature step-cut emerald in a diamond halo setting." },
  { id: "bestseller-2", name: "LUMIÈRE DROP EARRINGS", material: "18K Gold & Diamonds", priceInr: "₹72,000", priceUsd: 2200, image: "/assets/sig-lumiere-earrings.jpg", categoryKey: "earrings", carat: "0.85ctw Diamonds", desc: "Sculptural drops with micro-pavé diamonds." },
  { id: "bestseller-3", name: "SOLITAIRE SIGNATURE RING", material: "18K Gold & Diamond", priceInr: "₹58,000", priceUsd: 3800, image: "/assets/promise-ring.jpg", categoryKey: "rings", carat: "1.50ct F/VVS1 Solitaire", desc: "Four-prong cathedral mount on an 18k gold shank." },
  { id: "bestseller-4", name: "INFINITY KNOT BANGLE", material: "18K Gold", priceInr: "₹85,000", priceUsd: 2650, image: "/assets/sig-nova-bangle.jpg", categoryKey: "bracelets", carat: "Solid 18K Gold (24g)", desc: "Hand-bent gold knot bangle with mirror polish." },
];

const curatedCategories = [
  { num: "01", name: "NECKLACES", categoryKey: "necklaces", image: "/assets/col-necklace.jpg", alt: "Fine emerald necklace" },
  { num: "02", name: "EARRINGS", categoryKey: "earrings", image: "/assets/col-earrings.jpg", alt: "Diamond drop earrings" },
  { num: "03", name: "RINGS", categoryKey: "rings", image: "/assets/col-ring.jpg", alt: "Emerald halo ring" },
  { num: "04", name: "BRACELETS", categoryKey: "bracelets", image: "/assets/col-bracelet.jpg", alt: "Gold bracelet" },
];

const journalArticles = [
  { id: "art-1", tag: "DESIGN", title: "The Art Behind Every Advika Piece", desc: "From the first sketch to the final polish—inside our design process.", image: "/assets/sig-azure-pendant.jpg" },
  { id: "art-2", tag: "JEWELLERY GUIDE", title: "How to Choose Jewellery That Lasts Forever", desc: "Expert tips on picking pieces you'll cherish for a lifetime.", image: "/assets/col-necklace.jpg" },
  { id: "art-3", tag: "TRENDS", title: "Timeless Trends We Love in 2025", desc: "Our edit of modern classics that never go out of style.", image: "/assets/promise-ring.jpg" },
  { id: "art-4", tag: "CRAFTSMANSHIP", title: "Crafted With Patience, Made to Be Treasured", desc: "Meet the hands and techniques behind our fine jewellery.", image: "/assets/pillar-craftsmanship.jpg" },
];

export interface Product {
  id: string; name: string; category: "necklaces" | "earrings" | "rings" | "bracelets";
  gemstone: string; metal: string; price: number; priceInr?: string; badge?: string;
  image: string; subtitle: string; description: string; carat: string; isNew?: boolean;
}

const productCatalog: Product[] = [
  { id: "ring-01", name: "The Emerald Sovereign Ring", category: "rings", gemstone: "emerald", metal: "18k Yellow Gold", price: 4650, priceInr: "₹1,45,000", badge: "MAISON SIGNATURE", image: "/assets/col-ring.jpg", subtitle: "1.85ct Natural Colombian Emerald • Diamond Halo", description: "A rare step-cut Colombian emerald flanked by a pavé halo of VVS diamonds on solid 18k gold.", carat: "1.85ct Emerald, 0.42ct Diamonds", isNew: true },
  { id: "neck-01", name: "Aura Emerald Pendant Necklace", category: "necklaces", gemstone: "emerald", metal: "18k Yellow Gold", price: 3850, priceInr: "₹65,000", badge: "BESTSELLER", image: "/assets/col-necklace.jpg", subtitle: "1.50ct Octagonal Emerald • 18k Cable Chain", description: "Effortless luxury designed for daily distinction—natural Colombian gemstone in a diamond bezel.", carat: "1.50ct Emerald, 0.35ct Diamonds" },
  { id: "ear-01", name: "Verdant Halo Huggie Drops", category: "earrings", gemstone: "emerald", metal: "18k Yellow Gold", price: 3200, priceInr: "₹72,000", badge: "LIMITED ATELIER", image: "/assets/col-earrings.jpg", subtitle: "Matching Pair 2.10ctw Emeralds • Diamond Hoops", description: "Paired emerald drops from luminous diamond-encrusted huggie hoops.", carat: "2.10ctw Emeralds, 0.28ct Diamonds", isNew: true },
  { id: "brac-01", name: "Elysian Emerald Charm Bracelet", category: "bracelets", gemstone: "emerald", metal: "18k Yellow Gold", price: 2950, priceInr: "₹85,000", badge: "MAISON SIGNATURE", image: "/assets/col-bracelet.jpg", subtitle: "1.10ct Bezel Emerald • Diamond Halo", description: "Supple 18k gold link chain crowned with a miniature emerald halo.", carat: "1.10ct Emerald, 0.22ct Diamonds" },
  { id: "sig-neck-01", name: "Aurelia Torque Collar", category: "necklaces", gemstone: "diamond", metal: "18k Yellow Gold", price: 5200, priceInr: "₹1,85,000", badge: "MAISON SIGNATURE", image: "/assets/sig-aurelia-necklace.jpg", subtitle: "Solid 18K Sculpted Torque Collar", description: "A fluid torque collar sculpted to contour gracefully against the collarbone.", carat: "Solid 18K Yellow Gold (38g)", isNew: true },
  { id: "sig-ear-01", name: "Lumière Cascade Earrings", category: "earrings", gemstone: "diamond", metal: "18k Yellow Gold", price: 3400, priceInr: "₹1,15,000", badge: "LIMITED ATELIER", image: "/assets/sig-lumiere-earrings.jpg", subtitle: "Triple Teardrop Diamond Cascade", description: "Triple graduated teardrops paved with radiant diamonds.", carat: "0.95ctw VVS Diamonds" },
  { id: "ring-02", name: "Luminescence Solitaire Ring", category: "rings", gemstone: "diamond", metal: "18k Yellow Gold", price: 7800, priceInr: "₹58,000", badge: "LIMITED ATELIER", image: "/assets/promise-ring.jpg", subtitle: "2.05ct Round Brilliant Diamond • F Color, VVS1", description: "Bespoke diamond solitaire in our signature cathedral mount.", carat: "2.05ct Diamond" },
  { id: "ring-03", name: "Eternal Pavé Micro-Band", category: "rings", gemstone: "diamond", metal: "18k Yellow Gold", price: 1850, priceInr: "₹52,000", badge: "BESTSELLER", image: "/assets/prod-diamond-band.jpg", subtitle: "Full Eternity Band • 0.85ct Micro-Set Diamonds", description: "An ethereal full-circle band of handcrafted brilliance.", carat: "0.85ctw Diamonds" },
  { id: "sig-brac-01", name: "Nova Knot Cuff Bangle", category: "bracelets", gemstone: "diamond", metal: "18k Yellow Gold", price: 2850, priceInr: "₹95,000", image: "/assets/sig-nova-bangle.jpg", subtitle: "Solid 18k Gold Infinity Knot Motif", description: "Infinity knot symbolizing eternal connection in weighty solid 18k gold.", carat: "Solid 18K Gold • 0.15ct Pavé" },
];

// ─────────────────────────────────────────────────────────────────────────────
// GSAP useLayoutEffect hook (client-safe)
// ─────────────────────────────────────────────────────────────────────────────
function useGSAP(cb: () => (() => void) | void, deps: any[] = []) {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const cleanup = cb();
    return () => { if (cleanup) cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL REVEAL — simple fade-up
// ─────────────────────────────────────────────────────────────────────────────
function FadeUp({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  style,
  start = "top 95%",
  duration = 0.5,
  y = 20,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  start?: string;
  duration?: number;
  y?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
        },
      }
    );
  });
  // @ts-ignore
  return <Tag ref={ref} className={className} style={{ opacity: 0, ...style }}>{children}</Tag>;
}

// Stagger children
function StaggerUp({
  children,
  className = "",
  start = "top 96%",
  stagger = 0.035,
  duration = 0.4,
  y = 15,
}: {
  children: React.ReactNode;
  className?: string;
  start?: string;
  stagger?: number;
  duration?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(
      Array.from(ref.current.children),
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
        },
      }
    );
  }, [children]);
  return <div ref={ref} className={className}>{children}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────
// CURTAIN REVEAL on a simple fixed-size container
// ─────────────────────────────────────────────────────────────────────────────
// CURTAIN REVEAL on a simple container
// ─────────────────────────────────────────────────────────────────────────────
function CurtainImage({ src, alt, className = "", style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: wrapRef.current, start: "top 78%", toggleActions: "play none none none" },
    });
    if (imgRef.current) tl.fromTo(imgRef.current, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
    if (leftRef.current) tl.fromTo(leftRef.current, { scaleX: 1 }, { scaleX: 0, duration: 1.0, ease: "expo.inOut", transformOrigin: "left center" }, 0.1);
    if (rightRef.current) tl.fromTo(rightRef.current, { scaleX: 1 }, { scaleX: 0, duration: 1.0, ease: "expo.inOut", transformOrigin: "right center" }, 0.1);
  });

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`} style={style}>
      <div ref={imgRef} className="absolute inset-0">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" quality={95} className="object-cover object-center" />
      </div>
      <div ref={leftRef} className="absolute inset-y-0 left-0 w-1/2 z-10 bg-[#f5f4eb]" />
      <div ref={rightRef} className="absolute inset-y-0 right-0 w-1/2 z-10 bg-[#f5f4eb]" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHUTTER IMAGE — venetian blind open reveal
// ─────────────────────────────────────────────────────────────────────────────
function ShutterImage({ src, alt, className = "", darkBg = false, style }: { src: string; alt: string; className?: string; darkBg?: boolean; style?: React.CSSProperties }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const slatsRef = useRef<HTMLDivElement[]>([]);
  const SLATS = 7;
  const bg = darkBg ? "#0d0d0d" : "#f5f4eb";

  useGSAP(() => {
    if (!wrapRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: wrapRef.current, start: "top 80%", toggleActions: "play none none none" },
    });
    if (imgRef.current) tl.fromTo(imgRef.current, { scale: 1.18 }, { scale: 1, duration: 1.7, ease: "power3.out" }, 0);
    slatsRef.current.forEach((slat, i) => {
      if (slat) tl.fromTo(slat, { scaleY: 1 }, {
        scaleY: 0, duration: 0.55, ease: "power3.inOut",
        transformOrigin: i % 2 === 0 ? "top center" : "bottom center",
      }, 0.05 * i);
    });
  });

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`} style={style}>
      <div ref={imgRef} className="absolute inset-0">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" quality={94} className="object-cover object-center" />
      </div>
      {Array.from({ length: SLATS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) slatsRef.current[i] = el; }}
          className="absolute left-0 right-0 z-10"
          style={{ backgroundColor: bg, top: `${(i / SLATS) * 100}%`, height: `${100 / SLATS + 0.3}%`, transformOrigin: i % 2 === 0 ? "top center" : "bottom center" }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PARALLAX IMAGE — scroll-scrubbed vertical shift
// ─────────────────────────────────────────────────────────────────────────────
function ParallaxImg({ src, alt, className = "", speed = 25 }: { src: string; alt: string; className?: string; speed?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapRef.current || !imgRef.current) return;
    gsap.to(imgRef.current, {
      yPercent: -speed,
      ease: "none",
      scrollTrigger: { trigger: wrapRef.current, scrub: 1.2, start: "top bottom", end: "bottom top" },
    });
  });

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <div ref={imgRef} className="absolute inset-0 scale-125">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" quality={95} className="object-cover object-center" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SPLASH SCREEN — pristine luxury entrance, smooth text dissolve, 6 vertical curtain panels wipe
// ─────────────────────────────────────────────────────────────────────────────
function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const taglineRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const PANELS = 6;
  const letters = ["A", "D", "V", "I", "K", "A"];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const tl = gsap.timeline();

    // 1. Letters fade in with upward drift and subtle tracking
    tl.fromTo(
      lettersRef.current,
      { opacity: 0, y: 35, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      },
      0.2
    );

    // 2. Tagline with gold divider smoothly rises in
    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        1.1
      );
    }

    // 3. Hold for brand appreciation
    tl.addLabel("exit", 2.2);

    // 4. Ultra-smooth text dissolve (NO jumping / shrinking)
    if (centerRef.current) {
      tl.to(
        centerRef.current,
        {
          opacity: 0,
          y: -18,
          filter: "blur(6px)",
          duration: 0.6,
          ease: "power2.inOut",
        },
        "exit"
      );
    }

    // 5. 6 vertical curtain panels slide UP with a gorgeous, fluid staggered wave
    panelsRef.current.forEach((panel, i) => {
      if (panel) {
        tl.to(
          panel,
          {
            yPercent: -101,
            duration: 1.15,
            ease: "power4.inOut",
          },
          `exit+=${0.18 + i * 0.07}`
        );
      }
    });

    // 6. Complete after all panels finish sliding
    tl.call(
      () => {
        onComplete();
      },
      [],
      `exit+=${0.18 + (PANELS - 1) * 0.07 + 1.15}`
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto"
      style={{ overflow: "hidden" }}
    >
      {/* 6 vertical curtain rectangles */}
      {Array.from({ length: PANELS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) panelsRef.current[i] = el;
          }}
          className="absolute top-0 bottom-0"
          style={{
            left: `${(i / PANELS) * 100}%`,
            width: `${100 / PANELS + 0.3}%`,
            backgroundColor: i % 2 === 0 ? "#0c0c0c" : "#111111",
            borderRight: "1px solid rgba(197,164,126,0.06)",
            zIndex: 999,
          }}
        />
      ))}

      {/* Brand center — z-[1000] */}
      <div
        ref={centerRef}
        className="absolute inset-0 flex flex-col items-center justify-center select-none"
        style={{ zIndex: 1000, pointerEvents: "none" }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#c5a47e]/25 to-transparent" />

        <div className="flex items-baseline space-x-[0.02em]">
          {letters.map((letter, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) lettersRef.current[i] = el;
              }}
              style={{
                fontFamily: "var(--font-cinzel), 'Cinzel', serif",
                fontSize: "clamp(56px, 11vw, 118px)",
                letterSpacing: "0.22em",
                opacity: 0,
                display: "inline-block",
                lineHeight: 1,
                color: "#ffffff",
                fontWeight: 400,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        <div ref={taglineRef} style={{ opacity: 0 }} className="mt-5 text-center">
          <div className="w-10 h-[1px] bg-[#c5a47e] mx-auto mb-3.5" />
          <p
            className="uppercase font-medium"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: 10.5,
              letterSpacing: "0.36em",
              color: "#c5a47e",
            }}
          >
            IMITATION JEWELLERY
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LIQUID GLASS STICKY NAV
// ─────────────────────────────────────────────────────────────────────────────
function GlassNav({
  currency,
  setCurrency,
  onCategoryClick,
}: {
  currency: "INR" | "USD";
  setCurrency: (c: "INR" | "USD") => void;
  onCategoryClick: (cat: string) => void;
}) {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "BESTSELLERS", href: "#bestsellers" },
    { name: "SIGNATURE", href: "#signature-collection" },
    { name: "RESPONSIBILITY", href: "#responsibility" },
    { name: "JOURNAL", href: "#journal" },
    { name: "COLLECTION", href: "#curated-editions" },
  ];

  return (
    <>
      <motion.header
        ref={navRef}
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 3.4 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(8px) saturate(120%)",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(8px) saturate(120%)",
          backgroundColor: scrolled ? "rgba(13,13,13,0.72)" : "rgba(13,13,13,0.15)",
          borderBottom: scrolled ? "1px solid rgba(197,164,126,0.15)" : "1px solid rgba(255,255,255,0.05)",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12 lg:px-16 py-4 sm:py-5 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="relative block w-[155px] sm:w-[190px] h-8 sm:h-10 transition-transform duration-300 hover:scale-[1.03]"
          >
            <Image
              src="/assets/advika-logo-white.png"
              alt="Advika Imitation Jewellery"
              fill
              priority
              quality={100}
              className="object-contain object-left"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-9 lg:space-x-11">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-sans text-[10.5px] lg:text-[11px] tracking-[0.2em] text-white/75 hover:text-white transition-colors duration-300 relative group"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a47e] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Currency */}
            <div className="flex items-center space-x-0.5 text-[10px] font-sans bg-white/8 rounded-full border border-white/10 overflow-hidden">
              {(["INR", "USD"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1 transition-all duration-200 ${currency === c ? "bg-[#c5a47e] text-black font-semibold" : "text-white/70 hover:text-white"}`}
                >
                  {c === "INR" ? "₹ INR" : "$ USD"}
                </button>
              ))}
            </div>

            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/?text=Hello%20Advika%20Imitation%20Jewellery,%20I%20would%20like%20to%20inquire%20about%20your%20jewellery%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-[10.5px] font-sans text-white hover:text-white bg-[#25D366]/25 hover:bg-[#25D366] border border-[#25D366]/50 hover:border-[#25D366] px-3.5 py-1.5 rounded-full transition-all duration-300 group"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              <MessageCircle size={13} className="text-[#25D366] group-hover:text-white transition-colors" />
              <span className="tracking-[0.14em] font-semibold text-[10px] uppercase">WhatsApp</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(true)} className="md:hidden text-white p-1.5">
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col justify-center items-center md:hidden"
            style={{ backdropFilter: "blur(30px)", backgroundColor: "rgba(13,13,13,0.92)" }}
          >
            <button onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 text-white/80"><X size={24} strokeWidth={1.5} /></button>
            <div className="relative w-[220px] h-[65px] mb-10">
              <Image
                src="/assets/advika-logo-white.png"
                alt="Advika Imitation Jewellery"
                fill
                quality={100}
                className="object-contain"
              />
            </div>
            <nav className="flex flex-col space-y-6 items-center">
              {navLinks.map((item) => (
                <a key={item.name} href={item.href} onClick={() => setMobileOpen(false)}
                  className="font-sans text-xs tracking-[0.24em] text-white/80 hover:text-[#c5a47e] transition-colors"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  {item.name}
                </a>
              ))}
              <a
                href="https://wa.me/?text=Hello%20Advika%20Imitation%20Jewellery,%20I%20would%20like%20to%20inquire%20about%20your%20jewellery%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs font-sans text-white bg-[#25D366] px-5 py-2.5 rounded-full tracking-[0.18em] font-semibold mt-4"
              >
                <MessageCircle size={15} />
                <span>CONTACT ON WHATSAPP</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ARTISTIC MODEL SECTION — circular scroll reveal (no parallax) + exact Hero font left texts
// ─────────────────────────────────────────────────────────────────────────────
function ModelSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const circleRingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // 1. Scroll-driven circle aperture reveal (NO parallax on the image)
    if (imageContainerRef.current) {
      gsap.fromTo(
        imageContainerRef.current,
        { clipPath: "circle(0% at 50% 50%)" },
        {
          clipPath: "circle(100% at 50% 50%)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 1.2,
          },
        }
      );
    }

    // 2. Delicate gold decorative ring expanding with the circle
    if (circleRingRef.current) {
      gsap.fromTo(
        circleRingRef.current,
        { scale: 0.1, opacity: 0.8 },
        {
          scale: 1.4,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 1.2,
          },
        }
      );
    }

    // 3. Left text staggered reveal on scroll entrance
    if (leftTextRef.current) {
      gsap.fromTo(
        Array.from(leftTextRef.current.children),
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col lg:flex-row overflow-hidden border-t border-[#222]"
      style={{ minHeight: "92vh", backgroundColor: "#0b0b0b" }}
    >
      {/* ── LEFT TEXT COLUMN (Exact Hero typography & hierarchy) ── */}
      <div
        className="relative flex-shrink-0 flex flex-col justify-center px-8 sm:px-14 lg:px-18 xl:px-20 py-16 lg:py-24"
        style={{
          width: "100%",
          maxWidth: 580,
          backgroundColor: "#0b0b0b",
          zIndex: 10,
        }}
      >
        <div ref={leftTextRef} className="max-w-md">
          {/* Brand Logo Header */}
          <div className="relative w-[170px] sm:w-[200px] h-[50px] sm:h-[58px] mb-6">
            <Image
              src="/assets/advika-logo-white.png"
              alt="Advika Imitation Jewellery"
              fill
              quality={100}
              className="object-contain object-left"
            />
          </div>

          {/* Tagline — exact same font and tracking as hero */}
          <span
            className="font-sans block text-[11px] tracking-[0.24em] text-[#c5a47e] uppercase mb-3 font-semibold"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            HAUTE JOAILLERIE • THE MUSE
          </span>

          {/* Hero separator line */}
          <div className="w-10 h-[1px] bg-[#c5a47e] mb-0" />

          {/* Big Headline — exact Cormorant Garamond with Hero sizing and styling */}
          <h2
            className="font-serif font-normal leading-[0.88] text-white mt-5 mb-6 select-none"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(56px, 6.5vw, 104px)",
              letterSpacing: "0.02em",
            }}
          >
            EFFORTLESS
            <br />
            <span
              className="italic font-light"
              style={{ color: "#c5a47e" }}
            >
              RADIANCE
            </span>
          </h2>

          {/* Subtitle — exact hero subtitle styling */}
          <p
            className="font-sans text-[11.5px] tracking-[0.22em] text-[#ded9d0] mb-6 uppercase"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            FINE JEWELLERY FOR EVERY MOMENT
          </p>

          {/* Narrative Body Copy */}
          <p
            className="font-sans text-[12.5px] leading-relaxed text-[#a8a39a] mb-8"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Advika imitation jewellery is made for the woman who carries herself with quiet certainty. Handcrafted with exquisite artistry and radiant detailing — where every piece becomes part of her story.
          </p>

          {/* Quote Accent */}
          <div className="border-l border-[#c5a47e]/40 pl-4 py-1 mb-8">
            <p
              className="font-serif italic text-base text-[#c5a47e]/90 leading-snug"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              "She moves through light with grace, adorned in timeless brilliance."
            </p>
          </div>

          {/* CTA Link — exact Hero CTA styling */}
          <a
            href="#curated-editions"
            className="group inline-flex items-center space-x-3 pb-0.5 border-b border-[#c5a47e] text-white hover:text-[#c5a47e] transition-colors duration-300"
          >
            <span
              className="font-sans text-[11px] tracking-[0.2em] uppercase font-semibold"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              DISCOVER THE MUSE
            </span>
            <span className="font-serif text-base transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Thin vertical border separator for desktop */}
        <div className="hidden lg:block absolute right-0 top-1/6 bottom-1/6 w-[1px] bg-gradient-to-b from-transparent via-[#c5a47e]/20 to-transparent" />
      </div>

      {/* ── RIGHT COLUMN: CIRCULAR SCROLL REVEAL (NO PARALLAX) ── */}
      <div
        className="relative flex-1 overflow-hidden flex items-center justify-center bg-[#070707]"
        style={{ minHeight: 560 }}
      >
        {/* Expanding Circle Aperture Wrapper */}
        <div
          ref={imageContainerRef}
          className="absolute inset-0 w-full h-full"
          style={{ clipPath: "circle(0% at 50% 50%)" }}
        >
          {/* Static crystal-clear image (NO parallax jitter) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/assets/girlmodel.png"
              alt="The muse wearing Advika imitation jewellery"
              fill
              quality={100}
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Subtle cinematic left vignette for smooth blend */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(11,11,11,0.65) 0%, rgba(11,11,11,0.15) 30%, transparent 60%)",
            }}
          />
        </div>

        {/* Delicate Gold Expanding Circular Ring */}
        <div
          ref={circleRingRef}
          className="absolute pointer-events-none rounded-full border border-[#c5a47e]/40 z-20"
          style={{
            width: "50vmin",
            height: "50vmin",
            boxShadow: "0 0 40px rgba(197,164,126,0.15)",
          }}
        />

        {/* Maison Watermark */}
        <div className="absolute bottom-6 right-8 z-20 pointer-events-none select-none opacity-25">
          <div className="relative w-28 h-10 sm:w-36 sm:h-12">
            <Image
              src="/assets/advika-logo-white.png"
              alt="Advika Watermark"
              fill
              quality={90}
              className="object-contain object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PREMIUM FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function PremiumFooter({ onCategoryClick }: { onCategoryClick: (cat: string) => void }) {
  const newsletterRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (newsletterRef.current) {
      gsap.fromTo(newsletterRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: newsletterRef.current, start: "top 90%", toggleActions: "play none none none" },
      });
    }
    if (colsRef.current) {
      gsap.fromTo(Array.from(colsRef.current.querySelectorAll(".footer-col")), { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: colsRef.current, start: "top 92%", toggleActions: "play none none none" },
      });
    }
  });

  return (
    <footer className="w-full bg-[#0a0a0a] text-[#ded9d0]">

      {/* STAY INSPIRED — newsletter strip */}
      <div ref={newsletterRef} style={{ opacity: 0 }} className="border-b border-white/8 px-8 sm:px-16 lg:px-20 py-14 sm:py-16">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[52px] font-normal leading-[1.0] text-white mb-3 select-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              STAY<br />INSPIRED
            </h2>
            <div className="w-8 h-[1px] bg-[#c5a47e] mt-1 mb-4" />
            <p className="font-sans text-[12px] text-[#a8a39a] leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Subscribe to receive stories, early access to new collections, and timeless inspiration.
            </p>
          </div>
          <div className="lg:col-span-8 lg:pl-16">
            <form onSubmit={(e) => e.preventDefault()}>
              <div
                className="flex items-end border-b pb-3 transition-colors duration-300 focus-within:border-[#c5a47e]"
                style={{ borderColor: "rgba(255,255,255,0.2)" }}
              >
                <input type="email" placeholder="Enter your email address"
                  className="flex-1 bg-transparent font-sans text-[13px] tracking-wide text-white placeholder-[#4a4642] focus:outline-none"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }} />
                <button type="submit"
                  className="flex-shrink-0 font-sans text-[10.5px] font-bold tracking-[0.28em] text-[#c5a47e] hover:text-white transition-colors flex items-center space-x-2 pl-6">
                  <span>SUBSCRIBE</span>
                  <span className="font-serif text-base">→</span>
                </button>
              </div>
              <p className="font-sans text-[10px] tracking-wider text-[#3a3732] mt-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                By subscribing you agree to our Privacy Policy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* MAIN COLUMNS */}
      <div ref={colsRef} className="px-8 sm:px-16 lg:px-20 py-16 sm:py-20">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="footer-col col-span-2 md:col-span-3 lg:col-span-4 pr-0 lg:pr-8" style={{ opacity: 0 }}>
            <div className="relative w-[185px] h-[55px] mb-4">
              <Image
                src="/assets/advika-logo-white.png"
                alt="Advika Imitation Jewellery"
                fill
                quality={100}
                className="object-contain object-left"
              />
            </div>
            <p className="font-sans text-[12px] text-[#a8a39a] leading-relaxed mb-6 max-w-[280px]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Timeless imitation jewellery, thoughtfully crafted for every moment that matters.
            </p>
            <div className="w-8 h-[1px] bg-[#c5a47e]/30 mb-6" />
            <ul className="space-y-3">
              {[
                { icon: <Gem size={13} strokeWidth={1.4} />, label: "ETHICAL SOURCING" },
                { icon: <HandHeart size={13} strokeWidth={1.4} />, label: "EXPERT CRAFTSMANSHIP" },
                { icon: <ShieldCheck size={13} strokeWidth={1.4} />, label: "CERTIFIED QUALITY" },
                { icon: <Gift size={13} strokeWidth={1.4} />, label: "SIGNATURE PACKAGING" },
                { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>, label: "WORLDWIDE DELIVERY" },
              ].map((item) => (
                <li key={item.label} className="flex items-center space-x-2.5">
                  <span className="text-[#c5a47e]">{item.icon}</span>
                  <span className="font-sans text-[9.5px] tracking-[0.18em] text-[#7a7670] uppercase" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Collection */}
          <div className="footer-col col-span-1 md:col-span-1 lg:col-span-2" style={{ opacity: 0 }}>
            <h4 className="font-sans text-[10px] font-bold tracking-[0.24em] text-white uppercase mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>COLLECTION</h4>
            <div className="w-5 h-[1px] bg-[#c5a47e] mb-5" />
            <ul className="space-y-3">
              {["Necklaces", "Earrings", "Rings", "Bracelets", "Wedding", "Bestsellers", "New Arrivals"].map((item) => (
                <li key={item}>
                  <button onClick={() => onCategoryClick(item.toLowerCase())}
                    className="font-sans text-[11.5px] text-[#a8a39a] hover:text-white transition-colors tracking-wide text-left"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="footer-col col-span-1 md:col-span-1 lg:col-span-2" style={{ opacity: 0 }}>
            <h4 className="font-sans text-[10px] font-bold tracking-[0.24em] text-white uppercase mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>ABOUT</h4>
            <div className="w-5 h-[1px] bg-[#c5a47e] mb-5" />
            <ul className="space-y-3">
              {["Our Story", "Craftsmanship", "Responsible Luxury", "Materials", "Care Guide", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-[11.5px] text-[#a8a39a] hover:text-white transition-colors tracking-wide" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="footer-col col-span-1 md:col-span-1 lg:col-span-2" style={{ opacity: 0 }}>
            <h4 className="font-sans text-[10px] font-bold tracking-[0.24em] text-white uppercase mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>CUSTOMER CARE</h4>
            <div className="w-5 h-[1px] bg-[#c5a47e] mb-5" />
            <ul className="space-y-3">
              {["Contact Us", "Shipping & Delivery", "Returns & Exchanges", "Size Guide", "Jewellery Care", "Warranty"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-[11.5px] text-[#a8a39a] hover:text-white transition-colors tracking-wide" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover */}
          <div className="footer-col col-span-1 md:col-span-1 lg:col-span-2" style={{ opacity: 0 }}>
            <h4 className="font-sans text-[10px] font-bold tracking-[0.24em] text-white uppercase mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>DISCOVER</h4>
            <div className="w-5 h-[1px] bg-[#c5a47e] mb-5" />
            <ul className="space-y-3">
              {["The Journal", "Our Stores", "Lookbook", "Events", "Press", "Careers"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-[11.5px] text-[#a8a39a] hover:text-white transition-colors tracking-wide" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t px-8 sm:px-16 lg:px-20 py-6" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-5">
            {[
              { icon: <Instagram size={15} strokeWidth={1.4} />, label: "Instagram" },
              { icon: <Facebook size={15} strokeWidth={1.4} />, label: "Facebook" },
              { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 0c2.76 0 5 4.48 5 10s-2.24 10-5 10-5-4.48-5-10 2.24-10 5-10zm-7 10h14"/></svg>, label: "Pinterest" },
              { icon: <Mail size={15} strokeWidth={1.4} />, label: "Email" },
            ].map((item) => (
              <a key={item.label} href="#" aria-label={item.label} className="text-[#4a4642] hover:text-[#c5a47e] transition-colors duration-300">{item.icon}</a>
            ))}
          </div>
          <div className="font-sans text-[10px] tracking-[0.18em] text-[#3a3732] text-center" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            © 2025 ADVIKA IMITATION JEWELLERY. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-4 font-sans text-[10px] tracking-[0.14em] text-[#3a3732]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            {["PRIVACY POLICY", "TERMS & CONDITIONS", "COOKIE POLICY"].map((link, i) => (
              <React.Fragment key={link}>
                {i > 0 && <span className="opacity-20">|</span>}
                <a href="#" className="hover:text-white transition-colors">{link}</a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function LuxuryJewelleryPage() {
  const [splashDone, setSplashDone] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMetal, setSelectedMetal] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedRingSize, setSelectedRingSize] = useState("6");
  const [compareMode, setCompareMode] = useState(false);

  const catalogRef = useRef<HTMLDivElement>(null);
  const currentSlide = heroSlides[activeSlide];

  const getWhatsAppUrl = (productName?: string, price?: string, ringSize?: string) => {
    let msg = "Hello Advika Imitation Jewellery, I am interested in your jewellery collections.";
    if (productName) {
      msg = `Hello Advika Imitation Jewellery, I would like to inquire/order "${productName}"${price ? ` (${price})` : ""}${ringSize ? ` (Ring Size: ${ringSize})` : ""}. Please share more details!`;
    }
    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  };

  // Hero text entrance
  const heroContentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!splashDone || !heroContentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(Array.from(heroContentRef.current!.children), { opacity: 0, y: 35 }, {
        opacity: 1, y: 0, duration: 1.0, stagger: 0.14, ease: "power3.out", delay: 0.1,
      });
    });
    return () => ctx.revert();
  }, [splashDone]);

  const filteredProducts = useMemo(() => {
    return productCatalog
      .filter((item) => {
        if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
        if (selectedMetal !== "all" && item.metal !== selectedMetal) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0;
      });
  }, [selectedCategory, selectedMetal, sortBy]);

  const handleCategoryClick = (catKey: string) => {
    setSelectedCategory(catKey);
    setTimeout(() => catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const openQuickView = (piece: typeof signaturePieces[0]) => {
    const p = productCatalog.find((x) => x.name.toLowerCase().includes(piece.name.split(" ")[0].toLowerCase()));
    if (p) { setQuickViewProduct(p); return; }
    setQuickViewProduct({
      id: piece.id, name: piece.name, category: piece.categoryKey as any,
      gemstone: "emerald", metal: "18k Yellow Gold", price: piece.price,
      priceInr: piece.priceInr, image: piece.image, subtitle: piece.carat,
      description: piece.desc, carat: piece.carat, badge: "MAISON SIGNATURE",
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f4eb] text-[#161616] selection:bg-[#c5a47e] selection:text-black overflow-x-hidden">

      {/* SPLASH */}
      <AnimatePresence>
        {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      </AnimatePresence>

      {/* GLASS NAV */}
      <GlassNav
        currency={currency}
        setCurrency={setCurrency}
        onCategoryClick={handleCategoryClick}
      />

      {/* ═══ 1. HERO ═══ */}
      <section className="relative w-full h-[100svh] min-h-[600px] sm:h-screen sm:min-h-[700px] max-h-[1080px] overflow-hidden bg-[#161514] select-none">
        <div className="absolute inset-0">
          <Image
            src="/hero.png"
            alt="Hero"
            fill
            priority
            quality={100}
            className="object-cover object-[64%_68%] sm:object-center"
            sizes="100vw"
          />

          {/* Top subtle vignette on mobile so navigation is always readable */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none z-10 sm:hidden" />

          {/* Mobile backdrop gradient so entire text area is 100% readable & high contrast */}
          <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-[#f5f4eb] via-[#f5f4eb]/95 via-50% to-transparent pointer-events-none z-10 sm:hidden" />

          <AnimatePresence>
            {compareMode && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 pointer-events-none">
                <Image src="/image.png" alt="Reference" fill quality={100} className="object-cover object-center" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-14 sm:pb-32 px-6 sm:px-14 lg:px-16">
          <div ref={heroContentRef} className="max-w-xl sm:max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="font-sans block text-[10.5px] sm:text-[11px] tracking-[0.24em] text-[#2c2a27] mb-2 sm:mb-3 font-bold uppercase"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {currentSlide.tag}
                </span>
                <div className="w-8 sm:w-10 h-[1.5px] bg-[#2c2a27] mb-2 sm:mb-0" />
                <h1
                  className="font-serif font-normal leading-[0.92] sm:leading-[0.88] text-[#111111] mt-3 sm:mt-5 mb-3 sm:mb-6 select-none drop-shadow-sm"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "clamp(46px, 11vw, 138px)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {currentSlide.title}
                </h1>
                <p
                  className="font-sans text-[11px] sm:text-[11.5px] tracking-[0.2em] sm:tracking-[0.22em] text-[#33312e] font-medium mb-5 sm:mb-9 max-w-xl uppercase"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {currentSlide.subtitle}
                </p>
                <a
                  href="#bestsellers"
                  className="group inline-flex items-center space-x-3 pb-0.5 border-b-2 border-[#111111] text-[#111111] font-semibold"
                >
                  <span
                    className="font-sans text-[10.5px] sm:text-[11px] tracking-[0.2em]"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {currentSlide.cta}
                  </span>
                  <span className="font-serif text-base transform transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-5 sm:bottom-8 left-6 sm:left-16 z-20 flex items-center space-x-2.5 sm:space-x-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`rounded-full transition-all duration-400 ${
                activeSlide === idx
                  ? "w-6 h-[2px] bg-[#111111]"
                  : "w-1.5 h-1.5 bg-[#111111]/40 hover:bg-[#111111]/70"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Compare toggle */}
        <div className="absolute bottom-6 right-10 z-20 hidden sm:block">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className="flex items-center space-x-1.5 text-[10px] tracking-[0.18em] text-[#5a5754] hover:text-[#2c2a27] bg-black/5 hover:bg-black/10 border border-black/10 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all"
          >
            <Eye size={11} className={compareMode ? "text-emerald-700" : ""} />
            <span className="font-sans" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              {compareMode ? "EXIT COMPARE" : "COMPARE REF"}
            </span>
          </button>
        </div>
      </section>

      {/* ═══ 2. MOST LOVED PIECES ═══ */}
      <section id="bestsellers" className="w-full bg-[#f5f4eb] py-20 sm:py-28 px-6 sm:px-14 lg:px-16 border-t border-[#dfd9d0]">
        <div className="max-w-[1600px] mx-auto">

          {/* Header row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
            <FadeUp className="lg:col-span-5">
              <span className="font-sans block text-[10.5px] font-semibold tracking-[0.24em] text-[#3a3632] uppercase mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>BESTSELLERS</span>
              <div className="w-8 h-[1px] bg-[#3a3632] mb-5" />
              <h2 className="font-serif text-[52px] sm:text-[64px] lg:text-[72px] font-normal leading-[0.95] text-[#161616] mb-5 select-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                Most Loved<br />Pieces
              </h2>
              <p className="font-sans text-[12.5px] leading-relaxed text-[#5c5953] mb-8" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Timeless designs, loved by many. Handcrafted to be cherished forever.
              </p>
              <button onClick={() => handleCategoryClick("all")} className="group inline-flex items-center space-x-2 text-[10.5px] font-semibold tracking-[0.2em] text-[#161616] pb-0.5 border-b border-[#161616]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                <span>VIEW ALL PIECES</span><span className="font-serif text-sm transform transition-transform group-hover:translate-x-1">→</span>
              </button>
            </FadeUp>

            <FadeUp className="lg:col-span-7" delay={0.15}>
              <CurtainImage src="/assets/col-necklace.jpg" alt="Best-selling emerald necklace" className="w-full" style={{ aspectRatio: "21/9" } as React.CSSProperties} />
            </FadeUp>
          </div>

          {/* Product cards */}
          <StaggerUp className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mostLovedProducts.map((prod) => {
              const isWishlisted = wishlist.includes(prod.id);
              return (
                <div key={prod.id} className="group bg-[#e8e2d8] border border-[#ddd6ca] flex flex-col overflow-hidden hover:shadow-lg transition-all duration-400">
                  <div className="relative w-full overflow-hidden bg-[#d9d2c7]" style={{ aspectRatio: "1/1" }}>
                    <Image src={prod.image} alt={prod.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" quality={90} className="object-cover transition-transform duration-700 ease-out group-hover:scale-106" />
                    <button onClick={() => toggleWishlist(prod.id)} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all">
                      <Heart size={14} className={isWishlisted ? "fill-red-700 text-red-700" : "text-[#161616]"} />
                    </button>
                  </div>
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <h4 className="font-sans text-[10.5px] font-semibold tracking-[0.18em] text-[#161616] uppercase mb-1.5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{prod.name}</h4>
                      <div className="w-5 h-[1px] bg-[#333230] my-2" />
                      <p className="font-sans text-[11px] text-[#6b6762] tracking-wide mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{prod.material}</p>
                    </div>
                    <div className="pt-3 border-t border-[#d9d2c7] flex items-center justify-between">
                      <span className="font-serif text-lg font-medium text-[#161616]" style={{ fontFamily: "var(--font-cormorant), serif" }}>{currency === "INR" ? prod.priceInr : `$${prod.priceUsd.toLocaleString()}`}</span>
                      <button onClick={() => { const p = productCatalog.find((x) => x.name.toLowerCase().includes(prod.name.split(" ")[0].toLowerCase())); if (p) setQuickViewProduct(p); }} className="font-sans text-[10px] font-semibold tracking-[0.18em] text-[#161616] hover:text-[#7d6951] uppercase flex items-center space-x-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                        <span>QUICK VIEW</span><span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </StaggerUp>
        </div>
      </section>

      {/* ═══ 3. WORN & LOVED ═══ */}
      <section id="worn-and-loved" className="w-full bg-[#f5f4eb] py-20 sm:py-28 px-6 sm:px-14 lg:px-16 border-t border-[#dfd9d0]">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
            <FadeUp className="lg:col-span-5">
              <span className="font-sans block text-[10.5px] font-semibold tracking-[0.24em] text-[#3a3632] uppercase mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>WORN & LOVED</span>
              <div className="w-8 h-[1px] bg-[#3a3632] mb-5" />
              <h2 className="font-serif text-[52px] sm:text-[64px] lg:text-[72px] font-normal leading-[0.95] text-[#161616] mb-4 select-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                Worn.<br />Loved.
              </h2>
              <p className="font-sans text-[10.5px] font-semibold tracking-[0.2em] text-[#3a3632] uppercase mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                REAL STORIES. REAL MOMENTS. TIMELESS CONNECTIONS.
              </p>
              <p className="font-sans text-[12.5px] leading-relaxed text-[#5c5953] mb-8 max-w-md" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                From everyday elegance to life's most special moments—our jewellery becomes part of your story.
              </p>
              <a href="#" className="group inline-flex items-center space-x-2 text-[10.5px] font-semibold tracking-[0.2em] text-[#161616] pb-0.5 border-b border-[#161616]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                <span>SEE WHAT OUR CLIENTS SAY</span><span className="font-serif text-sm transform transition-transform group-hover:translate-x-1">→</span>
              </a>
            </FadeUp>

            {/* UGC Grid — fixed height containers */}
            <StaggerUp className="lg:col-span-7 grid grid-cols-12 gap-3 h-[380px] sm:h-[440px] lg:h-[480px]">
              {/* Left tall portrait */}
              <div className="col-span-5 relative overflow-hidden bg-[#161514] h-full group">
                <Image src="/assets/col-necklace.jpg" alt="Client with necklace" fill sizes="(max-width: 768px) 50vw, 30vw" quality={92} className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 font-sans text-[9.5px] tracking-wider text-white/85" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>@thegoldenhour.diaries</span>
              </div>

              {/* Middle 2 stacked */}
              <div className="col-span-3 flex flex-col gap-3 h-full">
                <div className="relative overflow-hidden bg-[#161514] flex-1 group">
                  <Image src="/assets/sig-nova-bangle.jpg" alt="Gold bangle" fill sizes="(max-width: 768px) 30vw, 20vw" quality={90} className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 font-sans text-[8.5px] tracking-wider text-white/85" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>@style.with.sia</span>
                </div>
                <div className="relative overflow-hidden bg-[#161514] flex-1 group">
                  <Image src="/assets/sig-lumiere-earrings.jpg" alt="Diamond earrings" fill sizes="(max-width: 768px) 30vw, 20vw" quality={90} className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 font-sans text-[8.5px] tracking-wider text-white/85" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>@everydayelegance</span>
                </div>
              </div>

              {/* Right tall portrait */}
              <div className="col-span-4 relative overflow-hidden bg-[#161514] h-full group">
                <Image src="/assets/col-ring.jpg" alt="Ring on hand" fill sizes="(max-width: 768px) 40vw, 25vw" quality={92} className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 font-sans text-[9.5px] tracking-wider text-white/85" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>@moments.with.mehar</span>
              </div>
            </StaggerUp>
          </div>

          {/* Reviews + Stats */}
          <FadeUp className="pt-10 border-t border-[#d8d1c5]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:pr-8 lg:border-r lg:border-[#d8d1c5]">
                {[
                  { name: "ANANYA S.", text: "Absolutely in love with my piece from Advika. The craftsmanship is exceptional and it feels so personal. I wear it every day." },
                  { name: "RIDDHIMA M.", text: "Timeless designs and such beautiful quality. It's more than jewellery, it's a memory.", indent: true },
                ].map((r) => (
                  <div key={r.name} className={r.indent ? "sm:border-l sm:border-[#d8d1c5] sm:pl-6" : ""}>
                    <div className="text-[#c5a47e] text-xs mb-2">{"★★★★★"}</div>
                    <p className="font-serif italic text-sm text-[#2c2a27] leading-relaxed mb-3" style={{ fontFamily: "var(--font-cormorant), serif" }}>"{r.text}"</p>
                    <div className="font-sans text-[10px] tracking-[0.18em] text-[#161616] uppercase font-semibold">— {r.name}</div>
                    <div className="font-sans text-[9px] tracking-wider text-[#7a7670] mt-0.5">VERIFIED CUSTOMER ✓</div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                  { icon: <Users size={20} strokeWidth={1.25} />, val: "12K+", label: "HAPPY CLIENTS" },
                  { icon: <Gem size={20} strokeWidth={1.25} />, val: "50+", label: "SIGNATURE DESIGNS" },
                  { icon: <Award size={20} strokeWidth={1.25} />, val: "4.9/5", label: "CUSTOMER RATING", sub: "2K+ REVIEWS" },
                  { icon: <Instagram size={20} strokeWidth={1.25} />, val: "25K+", label: "MOMENTS SHARED", sub: "ON INSTAGRAM" },
                ].map((s) => (
                  <div key={s.val} className="flex flex-col items-center">
                    <div className="text-[#161616] mb-1.5">{s.icon}</div>
                    <div className="font-serif text-3xl font-normal text-[#161616]" style={{ fontFamily: "var(--font-cormorant), serif" }}>{s.val}</div>
                    <div className="font-sans text-[9px] tracking-[0.16em] text-[#6b6762] uppercase mt-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{s.label}{s.sub && <span className="block text-[8px] opacity-70">{s.sub}</span>}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Press bar */}
          <FadeUp className="pt-8 mt-10 border-t border-[#d8d1c5] flex flex-col md:flex-row items-center justify-between gap-5" delay={0.1}>
            <div className="font-sans text-[10px] font-semibold tracking-[0.24em] text-[#5e5a54] uppercase flex items-center space-x-2">
              <span>AS SEEN IN</span><span className="w-6 h-[1px] bg-[#5e5a54]" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 font-serif text-xl sm:text-2xl text-[#161616]/75 tracking-[0.14em] select-none">
              {["VOGUE", "ELLE", "BAZAAR", "FEMINA", "GRAZIA", "Wedding Affair"].map((p) => (
                <span key={p} className="hover:text-[#c5a47e] transition-colors cursor-default font-normal">{p}</span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ 4. BEAUTY, WITH RESPONSIBILITY ═══ */}
      <section id="responsibility" className="w-full bg-[#f5f4eb] py-20 sm:py-28 px-6 sm:px-14 lg:px-16 border-t border-[#dfd9d0]">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
            <FadeUp className="lg:col-span-5">
              <span className="font-sans block text-[10.5px] font-semibold tracking-[0.24em] text-[#3a3632] uppercase mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>RESPONSIBLE LUXURY</span>
              <div className="w-8 h-[1px] bg-[#3a3632] mb-5" />
              <h2 className="font-serif text-[52px] sm:text-[60px] lg:text-[68px] font-normal leading-[0.95] text-[#161616] mb-5 select-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                Beauty,<br />With<br />Responsibility.
              </h2>
              <p className="font-sans text-[10.5px] font-semibold tracking-[0.2em] text-[#3a3632] uppercase mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                LUXURY TODAY MEANS CARING FOR TOMORROW.
              </p>
              <p className="font-sans text-[12.5px] leading-relaxed text-[#5c5953] mb-8 max-w-md" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                At Advika, we are committed to ethical sourcing, thoughtful craftsmanship, and a lighter footprint for a more beautiful future.
              </p>
              <a href="#" className="group inline-flex items-center space-x-2 text-[10.5px] font-semibold tracking-[0.2em] text-[#161616] pb-0.5 border-b border-[#161616]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                <span>EXPLORE OUR COMMITMENT</span><span className="font-serif text-sm transform transition-transform group-hover:translate-x-1">→</span>
              </a>
            </FadeUp>

            {/* Photo grid — explicit matching heights */}
            <StaggerUp className="lg:col-span-7 grid grid-cols-12 gap-3 h-[380px] sm:h-[440px] lg:h-[480px]">
              {/* Left tall portrait */}
              <div className="col-span-6 relative overflow-hidden bg-[#1a1918] h-full">
                <CurtainImage src="/assets/promise-ring.jpg" alt="Ethical diamond ring" className="absolute inset-0 w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white z-20">
                  <h4 className="font-sans text-[10.5px] font-semibold tracking-[0.2em] uppercase mb-1.5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>ETHICAL SOURCING</h4>
                  <p className="font-sans text-[10px] text-[#ded9d0] leading-snug">We source only from trusted partners who share our values of integrity and fairness.</p>
                </div>
              </div>

              {/* Right 2 stacked */}
              <div className="col-span-6 flex flex-col gap-3 h-full">
                <div className="relative overflow-hidden bg-[#1a1918] flex-1">
                  <ShutterImage src="/assets/pillar-craftsmanship.jpg" alt="Thoughtful craftsmanship" className="absolute inset-0 w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white z-20">
                    <h4 className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase mb-0.5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>THOUGHTFUL CRAFTSMANSHIP</h4>
                    <p className="font-sans text-[9.5px] text-[#ded9d0] leading-snug">Each piece meticulously handcrafted to last for generations.</p>
                  </div>
                </div>
                <div className="relative overflow-hidden bg-[#1a1918] flex-1">
                  <ShutterImage src="/assets/pillar-earrings.jpg" alt="Lighter footprint" className="absolute inset-0 w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white z-20">
                    <h4 className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase mb-0.5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>LIGHTER FOOTPRINT</h4>
                    <p className="font-sans text-[9.5px] text-[#ded9d0] leading-snug">From responsible materials to mindful packaging.</p>
                  </div>
                </div>
              </div>
            </StaggerUp>
          </div>

          {/* 4 pillars + quote */}
          <FadeUp className="pt-10 border-t border-[#d8d1c5] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <StaggerUp className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <Gem size={18} strokeWidth={1.3} />, title: "RESPONSIBLE SOURCING", desc: "Conflict-free diamonds and responsibly sourced gemstones." },
                { icon: <Recycle size={18} strokeWidth={1.3} />, title: "RECYCLED & REFINED", desc: "Recycled gold and refined metals to preserve natural resources." },
                { icon: <HandHeart size={18} strokeWidth={1.3} />, title: "FAIR & ETHICAL", desc: "Artisan partnerships with respect, fairness and transparency." },
                { icon: <Gift size={18} strokeWidth={1.3} />, title: "MINDFUL PACKAGING", desc: "Minimal, recyclable packaging made with care for the planet." },
              ].map((p) => (
                <div key={p.title}>
                  <div className="text-[#161616] mb-2.5">{p.icon}</div>
                  <h4 className="font-sans text-[10px] font-bold tracking-[0.18em] text-[#161616] uppercase mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{p.title}</h4>
                  <p className="font-sans text-[11px] text-[#6b6762] leading-snug" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{p.desc}</p>
                </div>
              ))}
            </StaggerUp>
            <div className="lg:col-span-4 lg:border-l lg:border-[#d8d1c5] lg:pl-8">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#161616] leading-tight mb-4" style={{ fontFamily: "var(--font-cormorant), serif" }}>True beauty<br />leaves a legacy.</h3>
              <a href="#journal" className="group inline-flex items-center space-x-2 text-[10px] font-semibold tracking-[0.2em] text-[#161616] pb-0.5 border-b border-[#161616]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                <span>READ OUR SUSTAINABILITY JOURNEY</span><span className="font-serif text-sm transform transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ 5. GIRL MODEL — ARTISTIC REVEAL ═══ */}
      <ModelSection />

      {/* ═══ 6. THE JOURNAL ═══ */}
      <section id="journal" className="w-full bg-[#f5f4eb] py-20 sm:py-28 px-6 sm:px-14 lg:px-16 border-t border-[#dfd9d0]">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
            <FadeUp className="lg:col-span-3">
              <div className="font-serif text-5xl font-light text-[#aca89e] mb-3 select-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>09</div>
              <span className="font-sans block text-[10.5px] font-semibold tracking-[0.24em] text-[#3a3632] uppercase mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>THE JOURNAL</span>
              <div className="w-8 h-[1px] bg-[#3a3632] mb-5" />
              <h2 className="font-serif text-4xl sm:text-5xl font-normal leading-[1.02] text-[#161616] mb-4 select-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                Stories That<br />Inspire
              </h2>
              <p className="font-sans text-[12.5px] leading-relaxed text-[#5c5953] mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Timeless reads on design, craftsmanship, and the moments that make life beautiful.
              </p>
              <a href="#" className="group inline-flex items-center space-x-2 text-[10.5px] font-semibold tracking-[0.2em] text-[#161616] pb-0.5 border-b border-[#161616]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                <span>EXPLORE ALL ARTICLES</span><span className="font-serif text-sm transform transition-transform group-hover:translate-x-1">→</span>
              </a>
            </FadeUp>

            <StaggerUp className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {journalArticles.map((art) => (
                <div key={art.id} className="group flex flex-col cursor-pointer">
                  <div className="relative overflow-hidden bg-[#161514] mb-4" style={{ aspectRatio: "1/1" }}>
                    <Image src={art.image} alt={art.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" quality={90} className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  </div>
                  <span className="font-sans block text-[9.5px] font-bold tracking-[0.22em] text-[#7a7670] uppercase mb-1.5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{art.tag}</span>
                  <h4 className="font-serif text-xl font-normal text-[#161616] leading-snug group-hover:text-[#7d6951] transition-colors mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>{art.title}</h4>
                  <p className="font-sans text-[11px] leading-relaxed text-[#6b6762] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{art.desc}</p>
                  <span className="inline-flex items-center space-x-1 text-[10px] font-semibold tracking-[0.18em] text-[#161616] group-hover:text-[#7d6951] uppercase transition-colors" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    <span>READ MORE</span><span className="font-serif text-xs">→</span>
                  </span>
                </div>
              ))}
            </StaggerUp>
          </div>
        </div>

        {/* Dark highlights band */}
        <div className="w-full bg-[#0d0d0d] text-[#ded9d0] py-16 sm:py-20 px-6 sm:px-14 lg:px-16">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left image */}
            <FadeUp className="lg:col-span-4 relative overflow-hidden" style={{ aspectRatio: "4/3" } as React.CSSProperties}>
              <ShutterImage src="/assets/pillar-packaging.jpg" alt="Advika jewellery box" className="absolute inset-0 w-full h-full" darkBg />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            </FadeUp>

            <FadeUp className="lg:col-span-5 px-0 lg:px-6" delay={0.1}>
              <span className="font-sans block text-[10px] font-semibold tracking-[0.26em] text-[#c5a47e] uppercase mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>JOURNAL HIGHLIGHTS</span>
              <div className="w-7 h-[1px] bg-[#c5a47e]/50 mb-5" />
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.05] text-white mb-4 select-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                Thoughts. Inspiration.<br /><span className="italic" style={{ color: "#c5a47e" }}>Timeless Perspectives.</span>
              </h3>
              <p className="font-sans text-[12px] leading-relaxed text-[#a8a39a] mb-8 max-w-sm" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                A space for ideas, stories and inspiration — curated for those who appreciate the finer things.
              </p>
              <a href="#" className="group inline-flex items-center space-x-2 text-[10.5px] font-semibold tracking-[0.2em] text-white pb-0.5 border-b hover:border-[#c5a47e] transition-colors" style={{ borderColor: "rgba(255,255,255,0.5)", fontFamily: "var(--font-montserrat), sans-serif" }}>
                <span>VISIT THE JOURNAL</span><span className="font-serif text-sm transform transition-transform group-hover:translate-x-1">→</span>
              </a>
            </FadeUp>

            <StaggerUp className="lg:col-span-3 flex flex-col space-y-5">
              {[
                { tag: "MOMENTS", title: "Jewellery for Life's Meaningful Moments", date: "MAY 20, 2025", img: "/assets/col-necklace.jpg" },
                { tag: "BEHIND THE SCENES", title: "A Day in the Studio", date: "MAY 14, 2025", img: "/assets/sig-azure-pendant.jpg" },
                { tag: "MATERIALS", title: "The Beauty of 18K Recycled Gold", date: "MAY 07, 2025", img: "/assets/prod-diamond-band.jpg" },
              ].map((item, idx) => (
                <div key={item.title} className={`flex items-center space-x-3.5 group cursor-pointer ${idx > 0 ? "pt-5 border-t border-white/8" : ""}`}>
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-black/40">
                    <Image src={item.img} alt={item.title} fill sizes="64px" quality={85} className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div>
                    <span className="font-sans block text-[8.5px] font-semibold tracking-[0.2em] text-[#c5a47e] uppercase mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{item.tag}</span>
                    <h5 className="font-serif text-[13px] font-normal text-white group-hover:text-[#c5a47e] transition-colors leading-snug mb-0.5" style={{ fontFamily: "var(--font-cormorant), serif" }}>{item.title}</h5>
                    <span className="font-sans text-[8.5px] tracking-wider text-[#7a7670]">{item.date}</span>
                  </div>
                </div>
              ))}
              <a href="#" className="font-sans text-[10px] tracking-[0.2em] text-white/70 hover:text-white uppercase inline-flex items-center space-x-1 pt-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                <span>BROWSE ALL ARTICLES</span><span>→</span>
              </a>
            </StaggerUp>
          </div>
        </div>
      </section>

      {/* ═══ 7. SIGNATURE COLLECTION ═══ */}
      <section id="signature-collection" className="w-full bg-[#f5f4eb] py-20 sm:py-28 px-6 sm:px-14 lg:px-16 border-t border-[#dfd9d0]">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            <FadeUp className="lg:col-span-4 flex flex-col justify-between" style={{ minHeight: 540 }}>
              <div>
                <span className="font-sans block text-[10.5px] font-semibold tracking-[0.24em] text-[#3a3632] uppercase mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>SIGNATURE COLLECTION</span>
                <div className="w-8 h-[1px] bg-[#3a3632] mb-5" />
                <h2 className="font-serif text-[52px] sm:text-[64px] font-normal leading-[0.95] text-[#161616] mb-5 select-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                  Signature<br />Collection
                </h2>
                <p className="font-sans text-[12.5px] leading-relaxed text-[#5c5953] mb-8" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Timeless designs. Made to be remembered.</p>
                <button onClick={() => handleCategoryClick("all")} className="group inline-flex items-center space-x-2 text-[10.5px] font-semibold tracking-[0.2em] text-[#161616] pb-0.5 border-b border-[#161616]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  <span>EXPLORE ALL COLLECTIONS</span><span className="font-serif text-sm transform transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
              <StaggerUp className="grid grid-cols-3 gap-4 pt-8 border-t border-[#d8d1c5] mt-8">
                {[
                  { icon: <Gem size={18} strokeWidth={1.3} />, title: "FINE MATERIALS", desc: "18K Gold, Natural Diamonds & Precious Stones" },
                  { icon: <HandHeart size={18} strokeWidth={1.3} />, title: "EXPERTLY CRAFTED", desc: "Meticulously handcrafted by skilled artisans" },
                  { icon: <ShieldCheck size={18} strokeWidth={1.3} />, title: "MADE TO LAST", desc: "Timeless pieces, crafted to be cherished" },
                ].map((b, i) => (
                  <div key={b.title} className={i > 0 ? "border-l border-[#d8d1c5] pl-3" : ""}>
                    <div className="text-[#161616] mb-2">{b.icon}</div>
                    <h4 className="font-sans text-[9.5px] font-bold tracking-[0.16em] text-[#161616] uppercase mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{b.title}</h4>
                    <p className="font-sans text-[10.5px] text-[#6b6762] leading-snug" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{b.desc}</p>
                  </div>
                ))}
              </StaggerUp>
            </FadeUp>

            {/* Mosaic */}
            <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-5">
              {/* Row 1: Featured Pair (Equal Height: 440px on desktop) */}
              <StaggerUp className="grid grid-cols-12 gap-4 sm:gap-5">
                {[signaturePieces[0], signaturePieces[1]].map((piece, i) => (
                  <div
                    key={piece.id}
                    onClick={() => openQuickView(piece)}
                    className={`${
                      i === 0 ? "col-span-12 md:col-span-7" : "col-span-12 md:col-span-5"
                    } group relative overflow-hidden bg-[#161514] cursor-pointer border border-black/5 hover:border-[#c5a47e]/50 transition-all duration-500 shadow-sm hover:shadow-xl h-[340px] sm:h-[400px] lg:h-[440px]`}
                  >
                    <Image
                      src={piece.image}
                      alt={piece.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      quality={95}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                    {/* Top gradient for tag visibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
                    {/* Bottom gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                    {/* Top chip badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className="font-sans text-[9px] tracking-[0.22em] text-[#c5a47e] bg-black/50 backdrop-blur-md px-3 py-1 border border-white/10 uppercase"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        {i === 0 ? "MAISON ICON" : "HIGH JEWELLERY"}
                      </span>
                    </div>

                    {/* Bottom info bar */}
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white z-10">
                      <div>
                        <h4
                          className="font-serif text-2xl lg:text-[26px] font-normal leading-tight group-hover:text-[#c5a47e] transition-colors"
                          style={{ fontFamily: "var(--font-cormorant), serif" }}
                        >
                          {piece.name}
                        </h4>
                        <p
                          className="font-sans text-[10.5px] text-[#ded9d0] tracking-wider mt-1"
                          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                          {piece.material}
                        </p>
                        <p
                          className="font-serif text-lg text-[#c5a47e] font-medium mt-1.5"
                          style={{ fontFamily: "var(--font-cormorant), serif" }}
                        >
                          {currency === "INR" ? piece.priceInr : `$${piece.price.toLocaleString()}`}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full group-hover:bg-[#c5a47e] group-hover:text-black group-hover:border-[#c5a47e] transition-all duration-300">
                        <span
                          className="font-sans text-[9px] font-semibold tracking-[0.18em] uppercase hidden sm:inline"
                          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                          EXPLORE
                        </span>
                        <span className="font-serif text-sm transform transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </StaggerUp>

              {/* Row 2: Atelier Trio (Equal Height: 320px on desktop) */}
              <StaggerUp className="grid grid-cols-12 sm:grid-cols-3 gap-4 sm:gap-5">
                {[signaturePieces[2], signaturePieces[3], signaturePieces[4]].map((piece) => (
                  <div
                    key={piece.id}
                    onClick={() => openQuickView(piece)}
                    className="col-span-12 sm:col-span-1 group relative overflow-hidden bg-[#161514] cursor-pointer border border-black/5 hover:border-[#c5a47e]/50 transition-all duration-500 shadow-sm hover:shadow-xl h-[260px] sm:h-[300px] lg:h-[320px]"
                  >
                    <Image
                      src={piece.image}
                      alt={piece.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      quality={92}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                    {/* Top category chip */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span
                        className="font-sans text-[8.5px] tracking-[0.2em] text-[#ded9d0] bg-black/40 backdrop-blur-md px-2.5 py-0.5 border border-white/10 uppercase"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        {piece.categoryKey}
                      </span>
                    </div>

                    {/* Bottom info bar */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white z-10">
                      <div>
                        <h4
                          className="font-serif text-xl font-normal leading-tight group-hover:text-[#c5a47e] transition-colors"
                          style={{ fontFamily: "var(--font-cormorant), serif" }}
                        >
                          {piece.name}
                        </h4>
                        <p
                          className="font-sans text-[9.5px] text-[#ded9d0] tracking-wider mt-0.5"
                          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                          {piece.material}
                        </p>
                        <p
                          className="font-serif text-base text-[#c5a47e] font-medium mt-1"
                          style={{ fontFamily: "var(--font-cormorant), serif" }}
                        >
                          {currency === "INR" ? piece.priceInr : `$${piece.price.toLocaleString()}`}
                        </p>
                      </div>

                      <span className="font-serif text-base text-white/80 group-hover:text-[#c5a47e] group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </div>
                  </div>
                ))}
              </StaggerUp>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 8. THE MAISON EDITIONS ═══ */}
      <section id="curated-editions" className="w-full bg-[#f5f4eb] pt-16 sm:pt-20 pb-14 px-6 sm:px-14 lg:px-16 border-t border-[#dfd9d0]">
        <div className="max-w-[1600px] mx-auto">
          <FadeUp className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
            <div>
              <span className="font-sans block text-[10.5px] font-semibold tracking-[0.24em] text-[#3a3632] uppercase mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>THE MAISON EDITIONS</span>
              <div className="w-7 h-[1px] bg-[#3a3632] mb-4" />
              <h2 className="font-serif text-[52px] sm:text-[64px] font-normal leading-[1.0] text-[#161616] select-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>The Curated Edit</h2>
              <p className="font-sans text-[11px] font-medium tracking-[0.22em] text-[#6b6762] uppercase mt-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>PIECES THAT REFLECT YOU</p>
            </div>
            <div className="mt-8 lg:mt-0 max-w-md lg:text-right">
              <p className="font-sans text-[12px] leading-relaxed text-[#5c5953] mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Explore our fine jewellery collections, thoughtfully designed to complement every moment of your life.</p>
              <button onClick={() => handleCategoryClick("all")} className="group inline-flex items-center space-x-2 text-[10.5px] font-semibold tracking-[0.2em] text-[#161616] pb-0.5 border-b border-[#161616]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                <span>VIEW ALL CREATIONS</span><span className="font-serif text-sm transform transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </FadeUp>

          <StaggerUp className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14">
            {curatedCategories.map((cat) => {
              const isSelected = selectedCategory === cat.categoryKey;
              return (
                <div key={cat.num} onClick={() => handleCategoryClick(cat.categoryKey)}
                  className={`group relative overflow-hidden bg-[#1a1918] cursor-pointer transition-all duration-500 ${isSelected ? "ring-2 ring-[#c5a47e] shadow-2xl scale-[1.01]" : "hover:shadow-xl"}`} style={{ aspectRatio: "3/4" }}>
                  <Image src={cat.image} alt={cat.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" quality={90} className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 group-hover:from-black/55 transition-colors" />
                  <div className="absolute top-6 left-6 right-6 z-10 text-white">
                    <div className="font-sans text-[10.5px] tracking-[0.2em] text-white/75 mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{cat.num}</div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>{cat.name}</h3>
                    <div className="w-5 h-[1px] bg-white/60 mb-3 group-hover:w-10 transition-all duration-300" />
                    <div className="inline-flex items-center space-x-1.5 text-[10px] font-medium tracking-[0.2em] text-white/85 group-hover:text-white" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      <span>EXPLORE</span><span className="transform transition-transform duration-300 group-hover:translate-x-1 font-serif text-xs">→</span>
                    </div>
                  </div>
                  {isSelected && <div className="absolute bottom-4 right-4 z-20 bg-[#c5a47e] text-black text-[9.5px] tracking-widest font-semibold px-2.5 py-1 uppercase">Active</div>}
                </div>
              );
            })}
          </StaggerUp>
        </div>
      </section>

      {/* ═══ 9. PRODUCTS CATALOGUE ═══ */}
      <section ref={catalogRef} id="products-catalog" className="w-full bg-[#f5f4eb] py-16 sm:py-20 px-6 sm:px-14 lg:px-16 border-t border-[#dfd9d0]">
        <div className="max-w-[1600px] mx-auto">
          <FadeUp className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-[#dfd9d0] gap-6">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {[{ label: "ALL CREATIONS", key: "all" }, { label: "NECKLACES", key: "necklaces" }, { label: "EARRINGS", key: "earrings" }, { label: "RINGS", key: "rings" }, { label: "BRACELETS", key: "bracelets" }].map((tab) => (
                <button key={tab.key} onClick={() => setSelectedCategory(tab.key)}
                  className={`font-sans text-[10.5px] tracking-[0.2em] uppercase px-4 py-2 rounded transition-all duration-300 ${selectedCategory === tab.key ? "bg-[#161616] text-white font-medium" : "bg-[#e8e2d8]/70 text-[#4a4742] hover:bg-[#ded6ca]"}`}
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-5">
              {[{ label: "Metal", state: selectedMetal, setState: setSelectedMetal, options: [["all", "All Metals"], ["18k Yellow Gold", "18k Yellow Gold"], ["18k White Gold", "18k White Gold"], ["Platinum", "Platinum"]] },
                { label: "Sort", state: sortBy, setState: setSortBy, options: [["featured", "Featured Selection"], ["price-asc", "Price: Low to High"], ["price-desc", "Price: High to Low"], ["newest", "Newest Creations"]] },
              ].map((sel) => (
                <div key={sel.label} className="flex items-center space-x-2">
                  <span className="font-sans text-[10.5px] tracking-[0.18em] text-[#6b6762] uppercase">{sel.label}:</span>
                  <select value={sel.state} onChange={(e) => sel.setState(e.target.value)} className="bg-[#e8e2d8] border border-[#d3ccbe] rounded text-[11px] tracking-wide text-[#161616] py-1.5 px-3 focus:outline-none cursor-pointer">
                    {sel.options.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </FadeUp>

          <div className="py-4 flex items-center justify-between text-[10.5px] tracking-wider text-[#6b6762]">
            <span>Showing {filteredProducts.length} {filteredProducts.length === 1 ? "Creation" : "Creations"}</span>
            {(selectedCategory !== "all" || selectedMetal !== "all") && (
              <button onClick={() => { setSelectedCategory("all"); setSelectedMetal("all"); }} className="text-[#161616] underline hover:text-[#7d6951] transition-colors">Reset Filters</button>
            )}
          </div>

          <StaggerUp className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 mt-4">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              return (
                <div key={product.id} className="group bg-[#ece7e0] flex flex-col overflow-hidden border border-[#ded7cc] hover:shadow-xl transition-all duration-500">
                  <div className="relative overflow-hidden bg-[#ded7cc]" style={{ aspectRatio: "1/1" }}>
                    <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" quality={90} className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                    {product.badge && (
                      <div className="absolute top-3 left-3 z-10 bg-[#161616]/85 text-[#e8e4df] text-[9px] font-sans font-medium tracking-[0.2em] px-2.5 py-1 uppercase">{product.badge}</div>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white hover:scale-110 transition-all">
                      <Heart size={14} className={isWishlisted ? "fill-red-700 text-red-700" : "text-[#161616]"} />
                    </button>
                    <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button onClick={() => setQuickViewProduct(product)} className="w-full bg-[#161616]/90 hover:bg-[#161616] text-white text-[10.5px] tracking-[0.2em] py-2.5 uppercase font-medium transition-colors">Quick View</button>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <h4 className="font-serif text-xl sm:text-[22px] font-normal text-[#161616] mb-1.5 group-hover:text-[#7d6951] transition-colors leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>{product.name}</h4>
                      <p className="font-sans text-[11px] text-[#6b6762] tracking-wide mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{product.subtitle}</p>
                    </div>
                    <div className="pt-3 border-t border-[#ded7cc] flex items-center justify-between">
                      <span className="font-serif text-lg font-medium text-[#161616]" style={{ fontFamily: "var(--font-cormorant), serif" }}>{currency === "INR" && product.priceInr ? product.priceInr : `$${product.price.toLocaleString()}`}</span>
                      <a
                        href={getWhatsAppUrl(product.name, currency === "INR" && product.priceInr ? product.priceInr : `$${product.price.toLocaleString()}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-[10px] font-semibold tracking-[0.16em] text-[#161616] hover:text-[#25D366] uppercase transition-colors flex items-center space-x-1.5"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        <MessageCircle size={12} className="text-[#25D366]" />
                        <span>Contact on WhatsApp</span>
                        <span className="font-serif text-sm">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </StaggerUp>
        </div>
      </section>

      {/* ═══ 10. PREMIUM FOOTER ═══ */}
      <PremiumFooter onCategoryClick={handleCategoryClick} />

      {/* ═══ QUICK VIEW MODAL ═══ */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6" onClick={() => setQuickViewProduct(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-[#f5f4eb] max-w-4xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 shadow-2xl relative">
              <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-[#161616] transition-colors"><X size={18} /></button>
              <div className="relative bg-[#dfd7cc]" style={{ minHeight: 340 }}>
                <Image src={quickViewProduct.image} alt={quickViewProduct.name} fill sizes="(max-width: 768px) 100vw, 50vw" quality={95} className="object-cover object-center" />
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  {quickViewProduct.badge && <span className="inline-block bg-[#161616] text-[#c5a47e] text-[9px] font-semibold tracking-[0.2em] px-2 py-0.5 uppercase mb-3">{quickViewProduct.badge}</span>}
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#161616] font-normal mb-2 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>{quickViewProduct.name}</h3>
                  <div className="font-serif text-2xl text-[#161616] font-medium mb-4">{currency === "INR" && quickViewProduct.priceInr ? quickViewProduct.priceInr : `$${quickViewProduct.price.toLocaleString()}`}</div>
                  <p className="font-sans text-xs leading-relaxed text-[#5c5953] mb-6">{quickViewProduct.description}</p>
                  <div className="space-y-2 py-4 border-y border-[#d8d1c5] text-xs font-sans mb-6">
                    <div className="flex justify-between"><span className="text-[#7a7670]">Gemstone / Details:</span><span className="font-medium text-[#161616]">{quickViewProduct.carat}</span></div>
                    <div className="flex justify-between"><span className="text-[#7a7670]">Metal:</span><span className="font-medium text-[#161616]">{quickViewProduct.metal}</span></div>
                    <div className="flex justify-between"><span className="text-[#7a7670]">Artisan Origin:</span><span className="font-medium text-[#161616]">Handcrafted in Valenza Atelier</span></div>
                  </div>
                  {quickViewProduct.category === "rings" && (
                    <div className="mb-6">
                      <label className="block text-[10.5px] font-sans tracking-[0.18em] text-[#5c5953] uppercase mb-2">Select Ring Size:</label>
                      <div className="flex space-x-2">
                        {["5", "6", "7", "8", "9"].map((size) => (
                          <button key={size} onClick={() => setSelectedRingSize(size)} className={`w-9 h-9 text-xs font-sans border rounded transition-colors ${selectedRingSize === size ? "bg-[#161616] text-white border-[#161616]" : "bg-white/60 text-[#161616] border-[#d0c8bb] hover:bg-white"}`}>{size}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="pt-4">
                  <a
                    href={getWhatsAppUrl(
                      quickViewProduct.name,
                      currency === "INR" && quickViewProduct.priceInr ? quickViewProduct.priceInr : `$${quickViewProduct.price.toLocaleString()}`,
                      quickViewProduct.category === "rings" ? selectedRingSize : undefined
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] tracking-[0.2em] font-semibold py-3.5 uppercase transition-all duration-300 flex items-center justify-center space-x-2.5 shadow-md hover:shadow-lg"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    <MessageCircle size={16} />
                    <span>CONTACT ON WHATSAPP</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING WHATSAPP BUTTON — Compact icon only */}
      <a
        href="https://wa.me/?text=Hello%20Advika%20Imitation%20Jewellery,%20I%20am%20interested%20in%20your%20jewellery%20collection."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 border border-white/20"
        aria-label="Contact on WhatsApp"
        title="Contact on WhatsApp"
      >
        <MessageCircle size={24} className="fill-white/15" />
      </a>
    </div>
  );
}
