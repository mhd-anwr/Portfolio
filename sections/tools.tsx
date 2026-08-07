"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wrench, Code2, Paintbrush, Flame, Terminal, Eye } from "lucide-react";

const toolsList = [
  { name: "Figma", category: "UI/UX & Prototyping", icon: Eye },
  { name: "Adobe Photoshop", category: "Raster Artwork", icon: Paintbrush },
  { name: "Adobe Illustrator", category: "Vector Brand Suites", icon: Wrench },
  { name: "Next.js 15 & React 19", category: "Frontend Framework", icon: Code2 },
  { name: "Tailwind CSS", category: "Styling Engine", icon: Terminal },
  { name: "GSAP & Framer Motion", category: "Motion Architecture", icon: Flame },
];

export default function ToolsSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-xs font-semibold text-accent-purple uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>06 // Software Arsenal & Ecosystem</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight uppercase">
            TOOLS THAT POWER <span className="text-accent-purple">CREATIVITY.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {toolsList.map((t, idx) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center justify-center hover:border-accent-purple/50 transition-all glass-card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent-purple mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-1">{t.name}</h3>
                <span className="text-[10px] text-muted font-mono">{t.category}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
