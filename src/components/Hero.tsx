"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax values
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-elevated)]" />

      {/* Content grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Text side */}
        <motion.div 
          className="flex flex-col gap-6 lg:gap-8"

        >
          {/* Badges */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs tracking-[0.15em] uppercase font-medium">
              Est. 2020
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs tracking-[0.15em] uppercase font-medium">
              Handmade Daily
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-[var(--text-primary)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            Artisan
            <br />
            <span className="text-gradient-warm">Bakery</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-[var(--text-secondary)] text-base md:text-lg max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
          >
            Crafting moments of joy, one bite at a time. Handmade with love,
            tradition, and the finest ingredients.
          </motion.p>

          {/* CTA */}
          <motion.a
            href="#menu"
            className="mt-2 bg-[var(--accent)] text-white font-medium py-4 px-10 rounded-full text-sm tracking-wide inline-block w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.6 }}
            whileHover={{
              backgroundColor: "#a85a38",
              scale: 1.03,
              y: -2,
              transition: { duration: 0.2, ease },
            }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Our Menu
          </motion.a>
        </motion.div>

        {/* Image side */}
        <motion.div
          className="relative aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
          style={{ y: imgY }}
        >
          <Image
            src="/images/hero_cinematic.png"
            alt="Fresh artisan bread"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ opacity: indicatorOpacity }}
      >
        <span className="text-[var(--text-secondary)] text-xs tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-[var(--accent)]/50"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
