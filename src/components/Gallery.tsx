"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const galleryImages = [
  {
    src: "/images/gallery_interior.png",
    alt: "Bakery Interior",
    label: "Our Space",
    className: "md:col-span-2 md:row-span-2 w-full h-full",
    yRange: [0, 0], // The main large image stays steady
  },
  {
    src: "/images/gallery_ingredients.png",
    alt: "Raw Ingredients",
    label: "Ingredients",
    className: "w-full h-full",
    yRange: [40, -40], // Parallax up during scroll
  },
  {
    src: "/images/menu_cake.png",
    alt: "Chocolate Cake Macro",
    label: "Fresh Baked",
    className: "w-full h-full",
    yRange: [80, -80], // Stronger parallax up
  },
];

export default function Gallery() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="py-12 md:py-20 px-6 md:px-12 lg:px-16 bg-[var(--bg-primary)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[380px]">
          {galleryImages.map((img, idx) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [0, 1], img.yRange);

            return (
              <motion.div
                key={idx}
                style={{ y }}
                className={`relative overflow-hidden rounded-2xl group border border-[var(--border)] ${img.className}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Hover caption overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <p className="text-white text-sm tracking-[0.15em] uppercase font-medium">
                    {img.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
