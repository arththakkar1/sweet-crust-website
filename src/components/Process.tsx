"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

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
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);

  return (
    <section
      id="process"
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-20" 
          style={{ opacity: headerOpacity, y: headerY }}
        >
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
            {steps.map((step, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const stepOpacity = useTransform(scrollYProgress, [0.2 + index * 0.1, 0.5 + index * 0.1], [0, 1]);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const stepY = useTransform(scrollYProgress, [0.2 + index * 0.1, 0.5 + index * 0.1], [40, 0]);

              return (
                <motion.div
                  key={index}
                  style={{ opacity: stepOpacity, y: stepY }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Number circle */}
                  <div className="relative z-10 w-[120px] h-[120px] rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent)] flex items-center justify-center mb-8">
                    <span className="font-display text-3xl text-[var(--accent)]">
                      {step.number}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden rounded-2xl border border-[var(--border)] group">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
