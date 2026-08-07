"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layout, Palette, Smartphone, ArrowUpRight, CheckCircle, Sparkles } from "lucide-react";

const services = [
  {
    title: "UI/UX Product Design",
    icon: Layout,
    featured: false,
    description: "User-centered mobile and web app interfaces, interactive wireframes, design systems, and rapid Figma prototypes.",
    deliverables: ["User Research & Flows", "Figma Design System", "High-Fidelity Wireframes", "Interactive Prototypes"],
  },
  {
    title: "Brand Identity & Systems",
    icon: Palette,
    featured: true,
    description: "Complete visual branding packages including minimalist logo suites, brand books, typography, and marketing assets.",
    deliverables: ["Logo Suite & Variations", "Comprehensive Brand Guidelines", "Color & Type Hierarchy", "Social Media Assets"],
  },
  {
    title: "Web & Mobile Development",
    icon: Smartphone,
    featured: false,
    description: "Blazing fast, SEO-optimized web applications crafted with Next.js 15, Tailwind CSS, GSAP, and smooth motion.",
    deliverables: ["Next.js & React 19", "Tailwind & GSAP Animations", "Responsive Mobile Layouts", "SEO & Performance Audit"],
  },
  {
    title: "Print & Graphic Design",
    icon: Sparkles,
    featured: false,
    description: "High-impact poster designs, magazine covers, packaging graphics, and digital promotional collateral.",
    deliverables: ["Custom Poster Artwork", "Print-Ready Vector Files", "Product Packaging", "Social Media Graphics"],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-start gap-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-yellow/10 border border-accent-yellow/20 text-xs font-semibold text-accent-yellow uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>04 // What I Can Do To Help You</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight uppercase">
            HIGH-IMPACT <span className="text-accent-yellow">SERVICES</span> & SOLUTIONS.
          </h2>
        </div>

        {/* Services 4-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, idx) => {
            const IconComp = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`p-8 sm:p-10 rounded-3xl relative overflow-hidden transition-all duration-500 ${
                  svc.featured
                    ? "bg-accent-yellow text-black shadow-2xl shadow-accent-yellow/20 scale-[1.02]"
                    : "glass-card border border-white/10 text-white glass-card-hover"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    svc.featured ? "bg-black text-accent-yellow" : "bg-accent-blue/10 text-accent-blue"
                  }`}>
                    <IconComp className="w-7 h-7" />
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    svc.featured ? "bg-black/10 text-black" : "bg-white/10 text-white"
                  }`}>
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <h3 className={`font-display font-extrabold text-2xl sm:text-3xl mb-4 ${
                  svc.featured ? "text-black" : "text-white"
                }`}>
                  {svc.title}
                </h3>

                <p className={`text-base leading-relaxed mb-8 ${
                  svc.featured ? "text-black/80 font-medium" : "text-muted"
                }`}>
                  {svc.description}
                </p>

                <div className="space-y-3 pt-6 border-t border-black/10 dark:border-white/10">
                  {svc.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle className={`w-4 h-4 ${svc.featured ? "text-black" : "text-accent-blue"}`} />
                      <span className={`text-sm font-medium ${svc.featured ? "text-black" : "text-gray-300"}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
