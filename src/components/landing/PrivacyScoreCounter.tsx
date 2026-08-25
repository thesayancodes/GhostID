"use client";

import React, { useEffect, useState, useRef } from "react";

interface PrivacyScoreCounterProps {
  targetScore?: number;
  label?: string;
  riskText?: string;
}

export function PrivacyScoreCounter({
  targetScore = 82,
  label = "Privacy Score:",
  riskText = "82/100 (Medium Risk)",
}: PrivacyScoreCounterProps) {
  const [currentScore, setCurrentScore] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setCurrentScore(targetScore);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1200; // ms
          const startTime = performance.now();

          const step = (now: number) => {
            const progress = Math.min(1, (now - startTime) / duration);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrentScore(Math.floor(eased * targetScore));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCurrentScore(targetScore);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [targetScore]);

  return (
    <div ref={containerRef} className="flex justify-between items-center text-fog-dim">
      <span>{label}</span>
      <span className="font-mono text-phantom-cyan font-bold text-sm flex items-center gap-1.5">
        <span className="text-base font-extrabold text-phantom-cyan">{currentScore}</span>
        <span className="text-xs text-fog-dim font-normal">/ 100</span>
        <span className="ml-1 text-[11px] font-semibold text-ember">
          {currentScore >= 80 ? "(Optimized)" : "(Medium Risk)"}
        </span>
      </span>
    </div>
  );
}
