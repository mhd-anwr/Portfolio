"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Instagram, Dribbble } from "lucide-react";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { timeZone: "UTC", hour12: false }) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-black border-t border-white/10 relative z-10 text-muted text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <span className="font-display font-extrabold text-lg text-white tracking-tight">
            FAWELL<span className="text-accent-blue">.</span>
          </span>
          <span className="text-xs text-muted">© {new Date().getFullYear()} Muhammed Anwar. All Rights Reserved.</span>
        </div>

        {/* Center Live Clock */}
        <div className="flex items-center gap-2 font-mono text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>{time || "12:00:00 UTC"}</span>
        </div>

        {/* Right Social & Scroll Up */}
        <div className="flex items-center gap-4">
          <a href="https://github.com/mhd-anwr" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            <Instagram className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-accent-blue transition-colors ml-2"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
