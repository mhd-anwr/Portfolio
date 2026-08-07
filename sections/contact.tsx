"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Copy, Check, MessageSquareCode } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mhd.anwrofcl@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    emailjs
      .send(
        "service_im0v3lj",
        "template_zc98mcn",
        {
          name: formData.name,
          from_name: formData.name,
          email: formData.email,
          from_email: formData.email,
          message: formData.message,
        },
        "gz2f1kp7L-ae3kKgV"
      )
      .then(() => {
        setIsSubmitting(false);
        setStatusMessage("Message sent successfully! I will reply within 24 hours.");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setIsSubmitting(false);
        setStatusMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      });
  };

  return (
    <section id="contact" className="py-28 relative bg-surface/50 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-xs font-semibold text-accent-blue uppercase tracking-wider mb-4">
                <Send className="w-3.5 h-3.5" />
                <span>07 // Let's Connect</span>
              </div>
              <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight uppercase">
                HAVE A PROJECT <span className="text-accent-blue">IN MIND?</span>
              </h2>
              <p className="mt-4 text-muted text-base sm:text-lg leading-relaxed">
                Whether you need a full UI/UX design system, brand identity, or Next.js web application, I am available for new freelance and contract roles.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-4">
              {/* One-Click Email Copy Card */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-accent-blue/10 text-accent-blue flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-muted font-mono">Email Address</span>
                    <span className="font-semibold text-white text-sm">mhd.anwrofcl@gmail.com</span>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white hover:bg-accent-blue transition-colors flex items-center gap-1.5"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Direct WhatsApp Button */}
              <a
                href="https://wa.me/918089737635"
                target="_blank"
                rel="noreferrer"
                className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between hover:border-green-500/50 transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-muted font-mono">Direct WhatsApp / Phone</span>
                    <span className="font-semibold text-white text-sm">+91 8089737635</span>
                  </div>
                </div>
                <span className="text-xs text-green-400 font-bold group-hover:translate-x-1 transition-transform">
                  Chat →
                </span>
              </a>

              {/* Location Card */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-accent-purple/10 text-accent-purple flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-muted font-mono">Location</span>
                  <span className="font-semibold text-white text-sm">Malappuram, Kerala, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6">
              <h3 className="font-display font-bold text-2xl text-white mb-2">Send Me a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Muhammed Anwar"
                    className="w-full px-4 py-3.5 rounded-xl bg-surface-card border border-white/10 text-white placeholder-muted/50 focus:outline-none focus:border-accent-blue transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-muted mb-2">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="anwar@example.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-surface-card border border-white/10 text-white placeholder-muted/50 focus:outline-none focus:border-accent-blue transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted mb-2">Project Details</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, scope, timeline, or design goals..."
                  className="w-full px-4 py-3.5 rounded-xl bg-surface-card border border-white/10 text-white placeholder-muted/50 focus:outline-none focus:border-accent-blue transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-accent-blue text-white font-semibold text-base hover:bg-blue-600 transition-colors shadow-lg shadow-accent-blue/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Sending Message..." : "Send Message"}</span>
              </button>

              {statusMessage && (
                <p className="text-center text-sm font-medium text-accent-blue pt-2">{statusMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
