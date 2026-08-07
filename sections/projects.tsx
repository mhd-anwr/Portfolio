"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ArrowUpRight, Sparkles } from "lucide-react";
import ProjectModal, { ProjectData } from "@/components/modal";

const categories = ["All Works", "UI/UX Design", "Web Design", "General Artwork", "Poster & Covers"];

const projects: ProjectData[] = [
  {
    title: "Tea Cafe Branding & UI",
    category: "UI/UX Design",
    image: "/assets/images/tea_cafe.png",
    description: "A luxury artisanal tea brand identity and modern e-commerce mobile app experience created for tea connoisseurs.",
    tags: ["Figma", "UI/UX", "Branding", "Design System"],
    year: "2025",
    link: "https://www.arrowsdesign.me/",
  },
  {
    title: "CreatiFlow Agency Web",
    category: "Web Design",
    image: "/assets/images/web_design.png",
    description: "High-converting digital product showcase and interactive portfolio web platform built with Next.js & GSAP.",
    tags: ["Next.js", "Tailwind CSS", "GSAP", "Three.js"],
    year: "2025",
    link: "https://www.arrowsdesign.me/",
  },
  {
    title: "Mobile Finance Wallet",
    category: "UI/UX Design",
    image: "/assets/images/uiux_app.png",
    description: "Intuitive fintech mobile wallet app interface focused on seamless cross-border transfers and visual budgeting analytics.",
    tags: ["Fintech", "Mobile App", "Figma", "User Testing"],
    year: "2024",
    link: "https://www.arrowsdesign.me/",
  },
  {
    title: "Minimalist Brand System",
    category: "General Artwork",
    image: "/assets/images/brand_hero.png",
    description: "Comprehensive corporate brand guidelines, logo suite, typography hierarchy, and collateral package.",
    tags: ["Logo Design", "Brand Book", "Illustrator"],
    year: "2024",
    link: "https://www.arrowsdesign.me/",
  },
  {
    title: "Cyber Yellow Poster Series",
    category: "Poster & Covers",
    image: "/assets/images/tea_cafe.png",
    description: "High-energy poster collection blending typography, obsidian surfaces, and vibrant cyber yellow accents.",
    tags: ["Photoshop", "Poster", "Typography"],
    year: "2024",
    link: "https://www.arrowsdesign.me/",
  },
  {
    title: "SaaS Dashboard Redesign",
    category: "UI/UX Design",
    image: "/assets/images/web_design.png",
    description: "Enterprise analytics SaaS dashboard redesign streamlining data visualizations for over 50,000 active users.",
    tags: ["SaaS", "Dashboard", "Figma", "Design System"],
    year: "2024",
    link: "https://www.arrowsdesign.me/",
  },
];

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("All Works");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filteredProjects = activeTab === "All Works"
    ? projects
    : projects.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-xs font-semibold text-accent-purple uppercase tracking-wider mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>02 // Selected Portfolio Showcase</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight uppercase">
              CREATIVE <span className="text-accent-purple">SOLUTIONS</span> & WORKS.
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 bg-surface-card p-1.5 rounded-2xl border border-white/10">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeTab === tab
                    ? "bg-accent-blue text-white shadow-lg"
                    : "text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedProject(project)}
                data-cursor="View"
                className="group glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-accent-blue/50 cursor-pointer glass-card-hover"
              >
                {/* Project Image */}
                <div className="relative h-64 w-full overflow-hidden bg-surface-card">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-accent-blue transition-colors">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Info Block */}
                <div className="p-6 space-y-3">
                  <span className="text-xs font-semibold text-accent-blue uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-accent-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.slice(0, 3).map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
