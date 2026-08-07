"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Cpu, Sparkles, GraduationCap, MapPin } from "lucide-react";

const skills = [
  { name: "UI/UX Design", level: "98%", category: "Core Design" },
  { name: "Figma & Prototyping", level: "95%", category: "Design System" },
  { name: "Brand Identity", level: "92%", category: "Branding" },
  { name: "React & Next.js", level: "90%", category: "Frontend" },
  { name: "Tailwind CSS & GSAP", level: "94%", category: "Animation" },
  { name: "3D Visuals & Motion", level: "88%", category: "Creative" },
];

const highlights = [
  "Bachelor in Computer Applications (BCA), Calicut University",
  "Based in Malappuram, Kerala — Available Globally",
  "Specialized in Conversion-Driven Digital Product Design",
  "100+ Brands Transformed with High-Impact Visual Systems",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-28 relative bg-surface/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-xs font-semibold text-accent-blue uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>01 // Discover My Journey</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight uppercase">
            CRAFTING DIGITAL <span className="text-accent-blue">EXPERIENCES</span> WITH INTENT.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 glass-card p-8 sm:p-10 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent-blue/10 rounded-full filter blur-3xl pointer-events-none" />

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">
              Empowering Brands Through Thoughtful Visual Design & Code
            </h3>

            <p className="text-muted leading-relaxed mb-6 text-base sm:text-lg">
              I am a passionate Graphic Designer & UI/UX Specialist with over 5 years of experience in translating complex business ideas into stunning visual interfaces. My approach blends aesthetic precision with functional user experience principles.
            </p>

            {/* Quick Highlights */}
            <div className="space-y-3.5 mb-8">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-blue flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-300 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Location & Edu Pill */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-white/10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-accent-yellow" />
                <span>Malappuram, Kerala, India</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                <GraduationCap className="w-3.5 h-3.5 text-accent-purple" />
                <span>BCA Graduate, Calicut Univ.</span>
              </div>
            </div>
          </motion.div>

          {/* Right Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Skill Mastery & Competencies
            </h3>
            <p className="text-muted text-sm mb-6">
              Continuous refinement across design tools, frontend frameworks, and product strategy.
            </p>

            <div className="space-y-4">
              {skills.map((skill, i) => (
                <div key={skill.name} className="glass-card p-5 rounded-2xl border border-white/10 hover:border-accent-blue/30 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-white text-base">{skill.name}</span>
                    <span className="font-mono text-xs font-bold text-accent-blue">{skill.level}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: skill.level }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
