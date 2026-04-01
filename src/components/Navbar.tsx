"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "philosophy", label: "Philosophy" },
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    if (latest > 50 && !scrolled) {
      setScrolled(true);
    } else if (latest <= 50 && scrolled) {
      setScrolled(false);
    }
    
    if (latest > previous && latest > 100) {
      if (isVisible) setIsVisible(false);
    } else {
      if (!isVisible) setIsVisible(true);
    }
  });

  // Intersection Observer for active link
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setActiveLink(id);
    setIsOpen(false);
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

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.4, ease },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease },
    },
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 py-5 transition-[background-color,backdrop-filter] duration-300 ${
          scrolled || isOpen
            ? "bg-[var(--bg-primary)]/95 backdrop-blur-md"
            : "bg-transparent"
        }`}
        variants={navbarVariants}
        initial="hidden"
        animate={isVisible || isOpen ? "visible" : "hidden"}
      >
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          className="font-display text-2xl md:text-3xl text-[var(--text-primary)] tracking-tight relative z-[60]"
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

        {/* Action Buttons */}
        <div className="flex items-center gap-4 relative z-[60]">
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

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors rounded-full focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-[var(--bg-primary)] pt-24 px-6 flex flex-col md:hidden"
          >
            <div className="flex flex-col gap-6 mt-8">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: idx * 0.05 + 0.1 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className={`text-2xl font-display tracking-wide ${
                    activeLink === item.id
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-primary)]"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: navItems.length * 0.05 + 0.1 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="mt-auto mb-10 bg-[var(--accent)] text-white font-medium py-4 px-8 rounded-full text-sm tracking-[0.1em] uppercase w-full max-w-xs mx-auto text-center"
              onClick={() => setIsOpen(false)}
            >
              Order Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
