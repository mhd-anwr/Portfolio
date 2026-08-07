"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Send, Award, Layers } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-accent-blue/20 rounded-full filter blur-[140px] animate-aurora pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-accent-purple/20 rounded-full filter blur-[160px] animate-aurora pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col items-start gap-6">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-card border border-white/10 text-xs font-semibold text-accent-blue uppercase tracking-wider shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-accent-yellow" />
            <span>Available for Freelance & Full-time Roles</span>
          </motion.div>

          {/* Huge Main Headline with Line-Mask Reveals */}
          <div className="space-y-1 my-2">
            <div className="line-mask">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold text-5xl sm:text-7xl lg:text-9xl uppercase tracking-tight text-white leading-[0.95]"
              >
                WORK WITH
              </motion.h1>
            </div>
            <div className="line-mask">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold text-5xl sm:text-7xl lg:text-9xl uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-blue to-accent-purple leading-[0.95]"
              >
                PURPOSE, WITH
              </motion.h1>
            </div>
            <div className="line-mask">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold text-5xl sm:text-7xl lg:text-9xl uppercase tracking-tight text-white leading-[0.95]"
              >
                PASSION.
              </motion.h1>
            </div>
          </div>

          {/* Subtitle & Sticker Badge Grid */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="lg:col-span-6 text-lg sm:text-xl text-muted font-normal leading-relaxed"
            >
              Hi, I'm <strong className="text-white">Muhammed Anwar (FAWELL)</strong> — a Graphic Designer & UI/UX Specialist crafting high-converting brand identities, interactive digital products, and web design systems.
            </motion.p>

            {/* Floating Sticker Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="lg:col-span-6 flex flex-wrap gap-4 items-center"
            >
              <div className="glass-card p-4 rounded-2xl flex items-center gap-3 border border-white/10 shadow-xl hover:border-accent-blue/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-accent-blue/20 flex items-center justify-center text-accent-blue">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-2xl font-bold font-display text-white">5+ Years</span>
                  <span className="text-xs text-muted">Creative Experience</span>
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl flex items-center gap-3 border border-white/10 shadow-xl hover:border-accent-purple/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-2xl font-bold font-display text-white">+320 Projects</span>
                  <span className="text-xs text-muted">Completed Globally</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              data-cursor="View"
              className="px-8 py-4 rounded-full bg-accent-blue text-white font-semibold text-base hover:bg-blue-600 transition-all shadow-xl shadow-accent-blue/25 hover:shadow-accent-blue/40 hover:-translate-y-1"
            >
              Explore Works
            </a>
            <a
              href="#contact"
              data-cursor="Connect"
              className="px-8 py-4 rounded-full bg-surface-card border border-white/10 text-white font-semibold text-base hover:bg-white/10 transition-all hover:-translate-y-1"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-white transition-colors"
      >
        <span className="text-xs uppercase tracking-widest font-mono">Scroll Down</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-accent-blue" />
      </motion.a>
    </section>
  );
}
