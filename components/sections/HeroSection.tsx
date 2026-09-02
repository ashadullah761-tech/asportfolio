'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter, Mail, Sparkles, FolderGit2, ArrowUpRight } from 'lucide-react';

const ROLES = [
  'Full Stack Architect',
  'UI/UX Creative Developer',
  'Next.js & Supabase Specialist',
  'High-Performance System Engineer',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(ROLES[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText.length < currentRole.length) {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      } else if (!isDeleting && displayedText.length === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && displayedText.length > 0) {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      } else if (isDeleting && displayedText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-midnight-950">
      {/* Background Animated Gradient Blobs - Purple & Gold */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay - Centered Golden Glowing Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-90 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
        {/* Availability Pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-card border border-purple-500/30 text-xs font-semibold text-purple-300 mb-8 shadow-inner shadow-purple-500/10"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-purple-200">Available for Freelance &amp; Senior Engineering Roles</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading tracking-tight text-white leading-[1.1] mb-6"
        >
          Hi, I&apos;m <span className="text-gradient">Ashadullah</span>
          <br />
          <span className="text-2xl sm:text-4xl md:text-5xl font-medium text-slate-200 block mt-3">
            I build{' '}
            <span className="text-purple-300 font-mono inline-block min-w-[280px] sm:min-w-[420px] text-left">
              {displayedText}
              <span className="animate-pulse text-purple-400">|</span>
            </span>
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed mb-10"
        >
          Crafting high-impact web applications with precision engineering, modern interactive architectures, and scalable full-stack performance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-700 text-white font-bold text-base hover:shadow-xl hover:shadow-purple-600/30 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <FolderGit2 className="w-5 h-5" />
            <span>Explore My Work</span>
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card text-white font-semibold text-base border border-purple-500/25 hover:border-purple-400 hover:text-purple-300 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>Contact Me</span>
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center space-x-5 text-slate-400"
        >
          {[
            { href: 'https://github.com', icon: Github, label: 'GitHub' },
            { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
            { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
            { href: 'mailto:ashadullah761@gmail.com', icon: Mail, label: 'Email' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="p-3 rounded-full glass-card hover:text-purple-400 hover:scale-110 hover:border-purple-400/50 transition-all border border-purple-500/20"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </motion.div>
      </div>

      {/* Down Arrow Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 text-slate-500 hover:text-purple-400 transition-colors animate-bounce"
        aria-label="Scroll down to About section"
      >
        <ArrowDown className="w-5 h-5" />
      </a>
    </section>
  );
}
