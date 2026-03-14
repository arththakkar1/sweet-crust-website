"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [30, 0]);

  const leftOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const leftY = useTransform(scrollYProgress, [0.1, 0.4], [40, 0]);

  const rightOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const rightY = useTransform(scrollYProgress, [0.2, 0.5], [40, 0]);

  return (
    <section
      id="contact"
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
            Get in Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">
            Let&apos;s <span className="text-[var(--accent)]">connect</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            className="card-bordered rounded-2xl p-8 md:p-10 flex flex-col gap-6"
            style={{ opacity: leftOpacity, y: leftY }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.15em] uppercase text-[var(--text-secondary)]">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-transparent border-b-2 border-[var(--border)] pb-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors duration-200"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.15em] uppercase text-[var(--text-secondary)]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-transparent border-b-2 border-[var(--border)] pb-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors duration-200"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[0.15em] uppercase text-[var(--text-secondary)]">
                Subject
              </label>
              <input
                type="text"
                placeholder="Subject"
                className="bg-transparent border-b-2 border-[var(--border)] pb-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[0.15em] uppercase text-[var(--text-secondary)]">
                Message
              </label>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="bg-transparent border-b-2 border-[var(--border)] pb-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors duration-200 resize-none"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="bg-[var(--accent)] text-white font-medium py-3.5 px-8 rounded-full text-sm tracking-wide w-fit"
              whileHover={{
                backgroundColor: "#a85a38",
                scale: 1.03,
                transition: { duration: 0.2, ease },
              }}
              whileTap={{ scale: 0.97 }}
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* Info + Map */}
          <motion.div 
            className="flex flex-col gap-8" 
            style={{ opacity: rightOpacity, y: rightY }}
          >
            <div className="card-bordered rounded-2xl p-8 space-y-6">
              {[
                {
                  icon: <MapPin className="w-5 h-5 text-white" />,
                  label: "Address",
                  value: "123 Sweet Street, Dessertville",
                },
                {
                  icon: <Phone className="w-5 h-5 text-white" />,
                  label: "Phone",
                  value: "(123) 456-7890",
                },
                {
                  icon: <Mail className="w-5 h-5 text-white" />,
                  label: "Email",
                  value: "hello@sweetcrust.com",
                },
                {
                  icon: <Clock className="w-5 h-5 text-white" />,
                  label: "Hours",
                  value: "Mon–Sat: 7 AM – 8 PM",
                },
              ].map((info, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="mt-0.5 p-2.5 bg-[var(--accent)] rounded-full transition-transform duration-300 group-hover:scale-110">
                    {info.icon}
                  </div>
                  <div className="mt-1">
                    <p className="text-xs text-[var(--text-secondary)] uppercase tracking-[0.15em] mb-0.5">
                      {info.label}
                    </p>
                    <p className="text-sm text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden flex-1 min-h-[200px] border border-[var(--border)]">
              <iframe
                title="Sweet Crust Location"
                className="w-full h-full min-h-[200px] rounded-2xl"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151!2d144.9630576!3d-37.8141079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ4JzUxLjAiUyAxNDTCsDU3JzQ3LjAiRQ!5e0!3m2!1sen!2sus!4v1633412142000!5m2!1sen!2sus"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
