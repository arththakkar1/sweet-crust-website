"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const galleryImages = [
  {
    src: "/images/gallery_interior.png",
    alt: "Bakery Interior",
    label: "Our Space",
    className: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto h-full",
  },
  {
    src: "/images/gallery_ingredients.png",
    alt: "Raw Ingredients",
    label: "Ingredients",
    className: "aspect-square",
  },
  {
    src: "/images/menu_cake.png",
    alt: "Chocolate Cake Macro",
    label: "Fresh Baked",
    className: "aspect-square",
  },
];

export default function Gallery() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease },
    },
  };

  return (
    <motion.section
      id="gallery"
      className="py-12 md:py-20 px-6 md:px-12 lg:px-16 bg-[var(--bg-primary)]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[380px]">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              variants={imageVariants}
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
          ))}
        </div>
      </div>
    </motion.section>
  );
}
