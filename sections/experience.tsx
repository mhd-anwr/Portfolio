"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2 } from "lucide-react";

const experiences = [
  {
    role: "Lead UI/UX & Product Designer",
    company: "Freelance / Remote Agency",
    period: "2023 — Present",
    description: "Architecting design systems, user flows, and high-converting web applications for global startups and enterprise clients.",
    skills: ["Figma", "Next.js", "Design Systems", "UI/UX Strategy"],
  },
  {
    role: "Senior Graphic Designer",
    company: "Creative Media Studio",
    period: "2021 — 2023",
    description: "Directed brand identity campaigns, marketing collateral, social media assets, and product packaging for 40+ brands.",
    skills: ["Brand Identity", "Photoshop", "Illustrator", "Art Direction"],
  },
  {
    role: "Junior UI Designer & Visual Artist",
    company: "Digital Edge Agency",
    period: "2019 — 2021",
    description: "Designed responsive landing pages, wireframes, vector illustrations, and digital poster designs.",
    skills: ["Web Design", "Wireframing", "Vector Art", "HTML/CSS"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-28 relative bg-surface/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-start gap-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-xs font-semibold text-accent-blue uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>03 // Professional Milestone Roadmap</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight uppercase">
            WORK <span className="text-accent-blue">EXPERIENCE</span> & SNAPSHOT.
          </h2>
        </div>

        {/* Timeline List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-white/10 hover:border-accent-blue/40 transition-all glass-card-hover"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                <div>
                  <h3 className="font-display font-bold text-2xl text-white mb-1">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-accent-blue text-sm font-medium">
                    <Building2 className="w-4 h-4" />
                    <span>{exp.company}</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                  <Calendar className="w-3.5 h-3.5 text-accent-purple" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="text-muted text-base leading-relaxed mb-6">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-xl bg-surface-card border border-white/10 text-xs font-medium text-gray-300">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
