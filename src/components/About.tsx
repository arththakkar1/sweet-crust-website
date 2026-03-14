"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const leftVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
  };

  const rightVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
  };

  const stats = [
    { value: "15+", label: "Recipes" },
    { value: "5", label: "Years" },
    { value: "10k+", label: "Happy Customers" },
  ];

  return (
    <motion.section
      id="about"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
        {/* Image with offset shadow */}
        <motion.div className="relative" variants={leftVariants}>
          <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl bg-[var(--accent)]/10 -z-10" />
          <div className="relative overflow-hidden rounded-2xl aspect-[4/5] lg:aspect-[3/4] border border-[var(--border)]">
            <Image
              src="/images/about_cinematic.png"
              alt="Slicing fresh rustic sourdough"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div className="flex flex-col gap-6" variants={rightVariants}>
          <p className="text-[var(--accent)] tracking-[0.25em] uppercase text-xs font-medium">
            Our Story
          </p>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Baked with passion,{" "}
            <span className="text-[var(--accent)]">served with love</span>
          </h2>

          <div className="section-divider" />

          <div className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed space-y-5">
            <p>
              At Sweet Crust, we believe baking is more than making food — it&apos;s
              creating memories. Our story began in a cozy kitchen where the aroma
              of freshly baked bread filled the air and inspired us to share that
              joy with others.
            </p>
            <p>
              Every recipe is crafted with the finest ingredients — golden butter,
              farm-fresh flour, hand-picked fruits — ensuring each bite melts in
              your mouth with unmatched flavor and comfort.
            </p>
          </div>

          {/* Pull-quote */}
          <blockquote className="border-l-2 border-[var(--accent)] pl-6 py-2 italic text-[var(--text-primary)] text-lg font-display">
            &ldquo;When you step into Sweet Crust, you&apos;re not just a customer —
            you&apos;re part of our family.&rdquo;
          </blockquote>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl text-[var(--accent)]">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--text-secondary)] tracking-[0.15em] uppercase mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <motion.a
            href="#menu"
            className="mt-2 text-[var(--accent)] text-sm tracking-wide flex items-center gap-2 w-fit group"
            whileHover={{ x: 4, transition: { duration: 0.2 } }}
          >
            Discover our menu
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
