"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Tag, Calendar } from "lucide-react";

export interface ProjectData {
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  year: string;
  link?: string;
}

interface ModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-4xl bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 text-white hover:bg-accent-blue transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Header Image */}
          <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-surface-card">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-accent-blue/20 text-accent-blue text-xs font-semibold uppercase tracking-wider mb-2">
                  {project.category}
                </span>
                <h3 className="font-display font-bold text-3xl sm:text-4xl text-white">
                  {project.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-muted text-sm font-mono">
                <Calendar className="w-4 h-4 text-accent-purple" />
                <span>{project.year}</span>
              </div>
            </div>

            <p className="text-muted text-base sm:text-lg leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-muted font-mono flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" /> Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-surface-card border border-white/10 text-xs font-medium text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {project.link && (
              <div className="pt-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-blue text-white font-semibold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-accent-blue/20"
                >
                  <span>Launch Live Project</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
