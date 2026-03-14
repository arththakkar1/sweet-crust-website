"use client";

import { motion, Variants } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Philosophy() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };

  return (
    <motion.section
      id="philosophy"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[var(--bg-elevated)] relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Decorative terracotta strips */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent)]/20" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--accent)]/20" />

      {/* Giant background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20rem] md:text-[28rem] text-[var(--accent)]/[0.04] select-none pointer-events-none leading-none">
        48h
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex gap-8 md:gap-12">
          {/* Left accent line */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex flex-col items-center gap-4 pt-2"
          >
            <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <div className="w-px flex-1 bg-[var(--accent)]/30" />
          </motion.div>

          {/* Text block */}
          <div className="flex flex-col gap-8">
            <motion.p
              variants={itemVariants}
              className="text-[var(--accent)] tracking-[0.25em] uppercase text-xs font-medium"
            >
              Our Philosophy
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.15]"
            >
              Patience,{" "}
              <span className="text-[var(--accent)]">Ingredients</span>
              , and Time.
            </motion.h2>

            <motion.div variants={itemVariants} className="section-divider" />

            <motion.p
              variants={itemVariants}
              className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed max-w-3xl"
            >
              We believe there are no shortcuts to greatness. Our sourdough
              ferments slowly over 48 hours to develop its deep, complex flavor.
              We source our stone-ground organic flour from local mills, use
              high-butterfat European-style butter for our laminated pastries,
              and rely on wild yeasts cultivated right here in our bakery.
            </motion.p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
