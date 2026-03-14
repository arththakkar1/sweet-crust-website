"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type MenuItem = {
  title: string;
  price: string;
  description: string;
  image: string;
  alt: string;
};

const menuItems: MenuItem[] = [
  {
    title: "Delicate Pastries",
    price: "$4.50",
    description:
      "Flaky, buttery layers filled with rich cream or seasonal fruit — perfect for any time of day.",
    image: "/images/menu_pastry.png",
    alt: "Delicate Pastries",
  },
  {
    title: "Classic Croissant",
    price: "$4.00",
    description:
      "A beautifully golden flaky croissant, hand-rolled and baked to perfection.",
    image: "/images/menu_croissant.png",
    alt: "Classic Croissant",
  },
  {
    title: "Pain au Chocolat",
    price: "$4.50",
    description:
      "Golden brown flaky layers packed with two generous batons of rich, dark chocolate.",
    image: "/images/menu_painauchocolat.png",
    alt: "Pain au Chocolat",
  },
  {
    title: "French Macarons",
    price: "$12.00",
    description:
      "Elegant, colorful almond meringue cookies with rich ganache fillings in various flavors.",
    image: "/images/menu_macaron.png",
    alt: "French Macarons",
  },
  {
    title: "Celebration Cakes",
    price: "$45.00",
    description:
      "Custom-designed cakes made with love for birthdays, weddings, and milestones.",
    image: "/images/menu_cake.png",
    alt: "Celebration Cakes",
  },
  {
    title: "Fresh Fruit Tart",
    price: "$6.50",
    description:
      "Crisp buttery pastry shell filled with silky vanilla cream and crowned with glossy seasonal fruits.",
    image: "/images/menu_fruittart.png",
    alt: "Fresh Fruit Tart",
  },
  {
    title: "Artisan Breads",
    price: "$8.00",
    description:
      "Baked fresh every morning — golden crust, airy crumb, and wholesome flavor.",
    image: "/images/menu_bread.png",
    alt: "Artisan Breads",
  },
  {
    title: "Cinnamon Roll",
    price: "$5.50",
    description:
      "Freshly baked cinnamon roll topped with a generous drizzle of cream cheese icing.",
    image: "/images/menu_cinnamonroll.png",
    alt: "Cinnamon Roll",
  },
  {
    title: "Blueberry Muffin",
    price: "$4.50",
    description:
      "Soft and moist blueberry muffin with a golden crumble topping, baked fresh daily.",
    image: "/images/menu_muffin.png",
    alt: "Blueberry Muffin",
  },
  {
    title: "Signature Cookies",
    price: "$3.50",
    description:
      "Soft center, crisp edges, loaded with irresistible flavors that keep you coming back.",
    image: "/images/menu_cookie.png",
    alt: "Signature Cookies",
  },
];

export default function Menu() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [30, 0]);

  const featuredOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const featuredY = useTransform(scrollYProgress, [0.05, 0.2], [40, 0]);

  const featured = menuItems[0];
  const rest = menuItems.slice(1);

  return (
    <section
      id="menu"
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[var(--bg-elevated)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16" 
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <p className="text-[var(--accent)] tracking-[0.25em] uppercase text-xs font-medium mb-4">
            Specialties
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">
            Our <span className="text-[var(--accent)]">Creations</span>
          </h2>
        </motion.div>

        {/* Featured item — full width */}
        <motion.div
          style={{ opacity: featuredOpacity, y: featuredY }}
          className="card-bordered rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 mb-6 group cursor-pointer"
        >
          <div className="overflow-hidden aspect-[4/3] lg:aspect-auto">
            <Image
              src={featured.image}
              alt={featured.alt}
              width={800}
              height={600}
              className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center gap-4">
            <span className="bg-[var(--accent)] text-white text-xs tracking-[0.1em] uppercase font-medium px-4 py-1.5 rounded-full w-fit">
              {featured.price}
            </span>
            <h3 className="font-display text-3xl md:text-4xl text-[var(--text-primary)]">
              {featured.title}
            </h3>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-md">
              {featured.description}
            </p>
          </div>
        </motion.div>

        {/* Rest — 3 column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((item, idx) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const itemOpacity = useTransform(scrollYProgress, [0.1 + (idx * 0.02), 0.25 + (idx * 0.02)], [0, 1]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const itemY = useTransform(scrollYProgress, [0.1 + (idx * 0.02), 0.25 + (idx * 0.02)], [40, 0]);

            return (
              <motion.div
                key={idx}
                style={{ opacity: itemOpacity, y: itemY }}
                className="group card-bordered rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="overflow-hidden aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <span className="bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium px-3 py-0.5 rounded-full">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    {item.description}
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
