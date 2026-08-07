"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, MessageSquare } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CEO, TechFlow Agency",
    quote: "Anwar's UI/UX vision completely transformed our SaaS product. Our user conversion rate jumped by 42% within weeks of launch!",
    stars: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "Marketing Director, Artisanal Teas",
    quote: "The brand identity and tea cafe web platform Anwar created surpassed all expectations. Elegant, modern, and perfectly crafted.",
    stars: 5,
  },
  {
    name: "Marcus Vance",
    role: "Founder, Fintech Global",
    quote: "Unbelievable attention to detail in motion and design systems. Working with FAWELL is smooth, professional, and ultra-high quality.",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-28 relative bg-surface/50 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-xs font-semibold text-accent-blue uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>05 // Endorsements & Feedback</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight uppercase">
            WHAT CLIENTS <span className="text-accent-blue">SAY</span> ABOUT MY WORK.
          </h2>
        </div>

        {/* Infinite Auto-Marquee */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between glass-card-hover"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-accent-yellow">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-yellow text-accent-yellow" />
                  ))}
                </div>
                <p className="text-gray-300 text-base leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="block font-bold text-white text-base font-display">{t.name}</span>
                  <span className="text-xs text-muted font-medium">{t.role}</span>
                </div>
                <Quote className="w-8 h-8 text-white/10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
