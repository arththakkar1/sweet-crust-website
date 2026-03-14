"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Philosophy() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax the watermark
  const watermarkY = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  
  // Scroll reveal the text
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.5], [40, 0]);

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[var(--bg-elevated)] relative overflow-hidden"
    >
      {/* Decorative terracotta strips */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent)]/20" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--accent)]/20" />

      {/* Giant background watermark - parallaxed */}
      <motion.div 
        style={{ y: watermarkY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20rem] md:text-[28rem] text-[var(--accent)]/[0.04] select-none pointer-events-none leading-none"
      >
        48h
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex gap-8 md:gap-12">
          {/* Left accent line */}
          <div className="hidden md:flex flex-col items-center gap-4 pt-2">
            <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <motion.div 
              className="w-px flex-1 bg-[var(--accent)]/30 origin-top"
              style={{ scaleY: scrollYProgress }} 
            />
          </div>

          {/* Text block */}
          <motion.div 
            className="flex flex-col gap-8"
            style={{ opacity: textOpacity, y: textY }}
          >
            <p className="text-[var(--accent)] tracking-[0.25em] uppercase text-xs font-medium">
              Our Philosophy
            </p>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.15]">
              Patience,{" "}
              <span className="text-[var(--accent)]">Ingredients</span>
              , and Time.
            </h2>

            <div className="section-divider" />

            <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed max-w-3xl">
              We believe there are no shortcuts to greatness. Our sourdough
              ferments slowly over 48 hours to develop its deep, complex flavor.
              We source our stone-ground organic flour from local mills, use
              high-butterfat European-style butter for our laminated pastries,
              and rely on wild yeasts cultivated right here in our bakery.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
