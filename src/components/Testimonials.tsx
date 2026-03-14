"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-d_AAvDdwOIJGtgnsZgFZpkw0oAtfdeRgMOrkm2DFXUzKiVNkpXo0WDoEo_nD98tkLG_JIm82W_17C4HlvcWZ2bya8x0vx_QyqLI4T8z0JloSFuVrMQ-JaOTWUOuFAFk0gHIIeaqMQXIARsjzsWEVd3HsAGN_0T3Z7Z_t9kp2rf_Vwl1QtNLCJwtbzE_yQyuYDa7aXqDAA5wNBH5zS9ce_Sip72hjcnRpt6fpoH_XGfrQ9v5TJD1erdRycgNMsSz35HwMr7CQ2iQ",
    quote:
      "Sweet Crust's pastries are simply divine! The flavors are exquisite, and the presentation is beautiful. Their almond croissants changed my life.",
    name: "Sophia Bennett",
    role: "Food Blogger",
    stars: 5,
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-d_AAvDdwOIJGtgnsZgFZpkw0oAtfdeRgMOrkm2DFXUzKiVNkpXo0WDoEo_nD98tkLG_JIm82W_17C4HlvcWZ2bya8x0vx_QyqLI4T8z0JloSFuVrMQ-JaOTWUOuFAFk0gHIIeaqMQXIARsjzsWEVd3HsAGN_0T3Z7Z_t9kp2rf_Vwl1QtNLCJwtbzE_yQyuYDa7aXqDAA5wNBH5zS9ce_Sip72hjcnRpt6fpoH_XGfrQ9v5TJD1erdRycgNMsSz35HwMr7CQ2iQ",
    quote:
      "Their custom cake made my wedding unforgettable. Moist, flavorful, and decorated beyond my dreams. Sweet Crust is pure magic.",
    name: "Daniel Carter",
    role: "Happy Customer",
    stars: 5,
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-d_AAvDdwOIJGtgnsZgFZpkw0oAtfdeRgMOrkm2DFXUzKiVNkpXo0WDoEo_nD98tkLG_JIm82W_17C4HlvcWZ2bya8x0vx_QyqLI4T8z0JloSFuVrMQ-JaOTWUOuFAFk0gHIIeaqMQXIARsjzsWEVd3HsAGN_0T3Z7Z_t9kp2rf_Vwl1QtNLCJwtbzE_yQyuYDa7aXqDAA5wNBH5zS9ce_Sip72hjcnRpt6fpoH_XGfrQ9v5TJD1erdRycgNMsSz35HwMr7CQ2iQ",
    quote:
      "From sourdough to cookies, everything tastes handmade with love. I drive 30 minutes just for their morning bread. Worth every mile.",
    name: "Emily Rose",
    role: "Regular Customer",
    stars: 5,
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [30, 0]);

  const featuredOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const featuredY = useTransform(scrollYProgress, [0.1, 0.3], [40, 0]);

  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16" 
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <p className="text-[var(--accent)] tracking-[0.25em] uppercase text-xs font-medium mb-4">
            Testimonials
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">
            What people <span className="text-[var(--accent)]">say</span>
          </h2>
        </motion.div>

        {/* Featured testimonial — large centered */}
        <motion.div
          style={{ opacity: featuredOpacity, y: featuredY }}
          className="card-elevated rounded-3xl p-10 md:p-14 text-center mb-8 relative max-w-4xl mx-auto"
        >
          {/* Large quote marks */}
          <span className="font-display text-8xl md:text-9xl text-[var(--accent)]/15 leading-none absolute top-4 left-8 select-none">
            &ldquo;
          </span>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: featured.stars }).map((_, i) => (
              <span key={i} className="text-[var(--accent)] text-lg">
                ★
              </span>
            ))}
          </div>

          {/* Quote */}
          <p className="font-display text-2xl md:text-3xl leading-relaxed text-[var(--text-primary)] mb-8 max-w-2xl mx-auto">
            &ldquo;{featured.quote}&rdquo;
          </p>

          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            <Image
              src={featured.image}
              alt={featured.name}
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[var(--accent)]/30 ring-offset-2 ring-offset-[var(--bg-elevated)]"
            />
            <div className="text-left">
              <p className="font-semibold text-[var(--text-primary)]">
                {featured.name}
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                {featured.role}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Remaining testimonials — 2 column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {rest.map((t, idx) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const itemOpacity = useTransform(scrollYProgress, [0.2 + (idx * 0.1), 0.4 + (idx * 0.1)], [0, 1]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const itemY = useTransform(scrollYProgress, [0.2 + (idx * 0.1), 0.4 + (idx * 0.1)], [40, 0]);

            return (
              <motion.div
                key={idx}
                style={{ opacity: itemOpacity, y: itemY }}
                className="card-bordered rounded-2xl p-8 flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-[var(--accent)] text-sm">
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-[var(--border)]">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[var(--accent)]/20"
                  />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
