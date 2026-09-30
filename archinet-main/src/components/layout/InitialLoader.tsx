'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InitialLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
    }

    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';

    // Timer for total loader sequence
    const totalDuration = mediaQuery.matches ? 1200 : 3100;
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, totalDuration);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, []);

  // Handle cleanup when exit animation finishes
  const handleAnimationComplete = () => {
    document.body.style.overflow = '';
  };

  if (!isMounted) {
    // SSR Fallback overlay to prevent white flash before hydration
    return (
      <div 
        className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center pointer-events-auto select-none"
        aria-label="Loading Archinet"
        role="status"
      />
    );
  }

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          key="initial-loader"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.015, 
            transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] } 
          }}
          className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center px-4 overflow-hidden select-none pointer-events-auto"
          aria-label="Loading Archinet"
          role="status"
          aria-live="polite"
        >
          <div className="loader-content flex flex-col items-center justify-center text-center">
            
            {/* 1. Architectural Mark (Gold Vector Line Symbol) */}
            <div className="architectural-mark mb-6 sm:mb-8 flex items-center justify-center">
              <svg 
                viewBox="0 0 160 60" 
                className="w-[100px] sm:w-[130px] md:w-[155px] h-auto overflow-visible"
                aria-hidden="true"
              >
                {/* Primary Architectural Span */}
                <motion.path
                  d="M 15 45 H 45 L 60 20 H 100 L 115 45 H 145"
                  fill="none"
                  stroke="#f0ab44"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0 : 1.1, 
                    delay: prefersReducedMotion ? 0 : 0.15, 
                    ease: [0.25, 1, 0.5, 1] 
                  }}
                />

                {/* Secondary Architectural Struts / Columns */}
                <motion.path
                  d="M 45 45 V 10 L 60 20 M 115 45 V 10 L 100 20"
                  fill="none"
                  stroke="#f0ab44"
                  strokeWidth="1.1"
                  strokeOpacity="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0 : 0.85, 
                    delay: prefersReducedMotion ? 0 : 0.45, 
                    ease: [0.25, 1, 0.5, 1] 
                  }}
                />
              </svg>
            </div>

            {/* 2. archinet™ Logo Text */}
            <div className="archinet-logo mb-3 sm:mb-4">
              <motion.h1
                initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0 : 0.6, 
                  delay: prefersReducedMotion ? 0 : 0.95, 
                  ease: [0.25, 1, 0.5, 1] 
                }}
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#f5f2eb] tracking-tight lowercase flex items-baseline justify-center"
              >
                archinet
                <span className="text-xs sm:text-sm md:text-base font-sans text-[#f0ab44] font-light ml-0.5 -top-2 relative">
                  ™
                </span>
              </motion.h1>
            </div>

            {/* 3. Tagline: WE BRIDGE THE GAP */}
            <div className="tagline">
              <motion.p
                initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0 : 0.5, 
                  delay: prefersReducedMotion ? 0 : 1.35, 
                  ease: [0.25, 1, 0.5, 1] 
                }}
                className="text-[9px] sm:text-[11px] md:text-[12px] font-mono tracking-[0.38em] text-[#f0ab44] font-medium uppercase text-center"
              >
                WE BRIDGE THE GAP
              </motion.p>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
