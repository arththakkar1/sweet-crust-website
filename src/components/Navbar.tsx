"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "motion/react";
import { useLenis } from "lenis/react";

const ease = [0.22, 1, 0.36, 1] as const;

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lenis = useLenis();

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "philosophy", label: "Philosophy" },
    { id: "menu", label: "Menu" },
    { id: "gallery", label: "Gallery" },
    { id: "testimonials", label: "Reviews" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveLink(id);
    if (lenis) lenis.scrollTo(`#${id}`, { offset: -80 });
  };

  const navbarVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease },
    },
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 py-5 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
      variants={navbarVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Logo */}
      <motion.a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick("home");
        }}
        className="font-display text-2xl md:text-3xl text-[var(--text-primary)] tracking-tight"
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      >
        Sweet Crust
      </motion.a>

      {/* Links */}
      <div className="hidden md:flex items-center gap-0.5">
        {navItems.map((item) => (
          <motion.a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.id);
            }}
            className={`relative px-3.5 py-2 text-xs tracking-[0.15em] uppercase transition-colors duration-200 ${
              activeLink === item.id
                ? "text-[var(--accent)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            {item.label}
            {activeLink === item.id && (
              <motion.div
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-[var(--accent)]"
                layoutId="activeNav"
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              />
            )}
          </motion.a>
        ))}
      </div>

      {/* Order Button */}
      <motion.button
        className="hidden md:block bg-[var(--accent)] text-white font-medium py-2.5 px-7 rounded-full text-xs tracking-[0.1em] uppercase"
        whileHover={{
          backgroundColor: "var(--accent-hover)",
          scale: 1.03,
          transition: { duration: 0.2, ease },
        }}
        whileTap={{ scale: 0.97 }}
      >
        Order Now
      </motion.button>
    </motion.nav>
  );
};

export default Navbar;
