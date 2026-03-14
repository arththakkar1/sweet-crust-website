"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    number: "01",
    title: "The Mix",
    description:
      "Cold water, organic flour, and our decades-old starter are gently combined, initiating the long, slow fermentation process that builds flavor and structure.",
    image: "/images/process_mixing.png",
  },
  {
    number: "02",
    title: "The Shape",
    description:
      "Every loaf and pastry is divided and shaped entirely by hand. This gentle handling preserves the delicate gas pockets generated during fermentation.",
    image: "/images/about_cinematic.png",
  },
  {
    number: "03",
    title: "The Bake",
    description:
      "Baked on stone hearths at scorching temperatures. The intense heat creates the signature blistered crust while keeping the crumb incredibly tender.",
    image: "/images/process_baking.png",
  },
];

export default function Process() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };

  return (
    <motion.section
      id="process"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <p className="text-[var(--accent)] tracking-[0.25em] uppercase text-xs font-medium mb-4">
            The Process
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">
            Crafted by <span className="text-[var(--accent)]">hand</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[60px] left-0 right-0 h-px bg-[var(--border)]" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                {/* Number circle */}
                <div className="relative z-10 w-[120px] h-[120px] rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent)] flex items-center justify-center mb-8">
                  <span className="font-display text-3xl text-[var(--accent)]">
                    {step.number}
                  </span>
                </div>

                {/* Image */}
                <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden rounded-2xl border border-[var(--border)]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Text */}
                <h3 className="font-display text-2xl lg:text-3xl mb-3 text-[var(--text-primary)]">
                  {step.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
