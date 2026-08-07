"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        setIsHovered(true);
        const cursorAttr = interactive.getAttribute("data-cursor");
        setHoverText(cursorAttr || "");
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Small Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-accent-blue rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      />

      {/* Large Outer Ring / Glow Indicator */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-xs text-xs font-semibold text-white tracking-wider"
        animate={{
          x: mousePosition.x - (isHovered ? 40 : 20),
          y: mousePosition.y - (isHovered ? 40 : 20),
          width: isHovered ? 80 : 40,
          height: isHovered ? 80 : 40,
          borderColor: isHovered ? "rgba(79, 139, 255, 0.8)" : "rgba(255, 255, 255, 0.2)",
          backgroundColor: isHovered ? "rgba(79, 139, 255, 0.15)" : "rgba(255, 255, 255, 0.03)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {hoverText && <span className="uppercase text-[10px] tracking-widest">{hoverText}</span>}
      </motion.div>

      {/* Mouse Radial Glow Aura */}
      <div
        className="fixed pointer-events-none z-[1] w-[600px] h-[600px] rounded-full filter blur-[120px] opacity-20 transition-transform duration-75 ease-out"
        style={{
          left: 0,
          top: 0,
          background: "radial-gradient(circle, rgba(79,139,255,0.4) 0%, rgba(182,141,255,0.2) 40%, transparent 70%)",
          transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`,
        }}
      />
    </>
  );
}
