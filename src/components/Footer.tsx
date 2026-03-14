"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Footer() {
  const footerLinks = {
    "Quick Links": ["Home", "About", "Menu", "Contact"],
    Specialties: ["Pastries", "Cakes", "Breads", "Cookies"],
  };

  const socials = ["Instagram", "Facebook", "WhatsApp"];

  return (
    <footer className="bg-[var(--bg-card)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        {/* Top bar — logo left, links right */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          <div className="space-y-3">
            <h3 className="font-display text-3xl text-[var(--text-primary)]">
              Sweet Crust
            </h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs">
              Artisan bakery crafting moments of joy since 2020. Made with love,
              tradition, and the finest ingredients.
            </p>
          </div>

          <div className="flex gap-4">
            {socials.map((s) => (
              <motion.a
                key={s}
                href="#"
                className="text-xs tracking-[0.15em] uppercase text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200"
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2, ease },
                }}
              >
                {s}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Terracotta separator */}
        <div className="w-full h-px bg-[var(--accent)]/20 mb-12" />

        {/* Link columns + hours */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] font-medium">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href={`#${link.toLowerCase()}`}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200"
                      whileHover={{
                        x: 3,
                        transition: { duration: 0.2, ease },
                      }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] font-medium">
              Hours
            </h4>
            <div className="text-sm text-[var(--text-secondary)] space-y-1">
              <p>Mon–Fri: 7 AM – 8 PM</p>
              <p>Sat–Sun: 8 AM – 6 PM</p>
            </div>
          </div>

          {/* Newsletter mini */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] font-medium">
              Stay Updated
            </h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Fresh specials and seasonal creations, straight to your inbox.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-secondary)]">
            © 2025 Sweet Crust Bakery. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            Crafted with Love and Flour
          </p>
        </div>
      </div>
    </footer>
  );
}
