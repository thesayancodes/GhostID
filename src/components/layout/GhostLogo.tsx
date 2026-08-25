"use client";

import React, { useEffect, useState, useRef } from "react";

interface GhostLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

interface Particle {
  id: number;
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  size: number;
  color: string;
  delay: number;
}

export function GhostLogo({ size = "md", showText = true, className = "" }: GhostLogoProps) {
  const [assembled, setAssembled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Target anchor points defining the ghost-shield contour (in 48x48 coordinate space)
  const targetAnchors = [
    // Top arc
    { x: 14, y: 10, color: "#7C6FF2" },
    { x: 24, y: 8, color: "#5EEAD4" },
    { x: 34, y: 10, color: "#7C6FF2" },
    // Right shoulder & curve
    { x: 40, y: 16, color: "#7C6FF2" },
    { x: 41, y: 26, color: "#7C6FF2" },
    { x: 36, y: 35, color: "#5EEAD4" },
    // Shield point base
    { x: 28, y: 41, color: "#7C6FF2" },
    { x: 24, y: 44, color: "#5EEAD4" },
    { x: 20, y: 41, color: "#7C6FF2" },
    // Left curve & shoulder
    { x: 12, y: 35, color: "#5EEAD4" },
    { x: 7, y: 26, color: "#7C6FF2" },
    { x: 8, y: 16, color: "#7C6FF2" },
    // Inner eyes / ghost core
    { x: 19, y: 21, color: "#5EEAD4" },
    { x: 29, y: 21, color: "#5EEAD4" },
    { x: 24, y: 27, color: "#7C6FF2" },
    // Inner contour support
    { x: 24, y: 16, color: "#E8E6F5" },
    { x: 17, y: 29, color: "#7C6FF2" },
    { x: 31, y: 29, color: "#7C6FF2" },
  ];

  const particlesRef = useRef<Particle[]>([]);

  // Dimensions based on size prop
  const dim = size === "sm" ? 32 : size === "lg" ? 56 : 42;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) {
      setAssembled(true);
      return;
    }

    // Initialize particles with randomized scattered starting positions
    particlesRef.current = targetAnchors.map((anchor, idx) => {
      const angle = (idx / targetAnchors.length) * Math.PI * 2 + (Math.random() - 0.5);
      const distance = 35 + Math.random() * 25;
      return {
        id: idx,
        targetX: anchor.x,
        targetY: anchor.y,
        startX: 24 + Math.cos(angle) * distance,
        startY: 24 + Math.sin(angle) * distance,
        currentX: 24 + Math.cos(angle) * distance,
        currentY: 24 + Math.sin(angle) * distance,
        size: 1.5 + Math.random() * 1.2,
        color: anchor.color,
        delay: idx * 25,
      };
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const duration = 850; // ms to assemble
    let startTimestamp: number | null = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const render = (now: number) => {
      if (!startTimestamp) startTimestamp = now;
      const elapsed = now - startTimestamp;

      ctx.clearRect(0, 0, 48, 48);

      let allDone = true;

      particlesRef.current.forEach((p) => {
        const pElapsed = Math.max(0, elapsed - p.delay);
        const progress = Math.min(1, pElapsed / (duration - p.delay * 0.5));
        const eased = easeOutCubic(progress);

        p.currentX = p.startX + (p.targetX - p.startX) * eased;
        p.currentY = p.startY + (p.targetY - p.startY) * eased;

        if (progress < 1) {
          allDone = false;
        }

        // Draw particle glow
        ctx.beginPath();
        ctx.arc(p.currentX, p.currentY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (!allDone) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        setAssembled(true);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Hover destabilize micro-animation
  useEffect(() => {
    if (!assembled || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let hoverStart: number | null = null;
    const hoverDuration = 450;

    const animateHover = (now: number) => {
      if (!hoverStart) hoverStart = now;
      const elapsed = now - hoverStart;
      const progress = Math.min(1, elapsed / hoverDuration);
      // Sine wave: drift out then snap back
      const displacement = Math.sin(progress * Math.PI) * (isHovered ? 4.5 : 0);

      ctx.clearRect(0, 0, 48, 48);

      particlesRef.current.forEach((p, idx) => {
        const angle = (idx / particlesRef.current.length) * Math.PI * 2;
        const currentX = p.targetX + Math.cos(angle) * displacement;
        const currentY = p.targetY + Math.sin(angle) * displacement;

        ctx.beginPath();
        ctx.arc(currentX, currentY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? (idx % 2 === 0 ? "#5EEAD4" : "#7C6FF2") : p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isHovered ? 6 : 2;
        ctx.fill();
      });

      if (progress < 1 && isHovered) {
        animFrameRef.current = requestAnimationFrame(animateHover);
      }
    };

    if (isHovered) {
      animFrameRef.current = requestAnimationFrame(animateHover);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHovered, assembled, prefersReducedMotion]);

  return (
    <div
      className={`group inline-flex items-center gap-3 cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ghost-Shield Glyph Mark Container */}
      <div
        className="relative flex items-center justify-center rounded-xl bg-surface border border-spectral-violet/25 p-1 transition-all duration-300 group-hover:border-spectral-violet/60 group-hover:shadow-[0_0_20px_rgba(124,111,242,0.35)]"
        style={{ width: dim, height: dim }}
      >
        {/* Canvas for particle assembly and hover destabilize */}
        <canvas
          ref={canvasRef}
          width={48}
          height={48}
          className={`absolute inset-0 h-full w-full pointer-events-none transition-opacity duration-500 ${
            assembled && !isHovered ? "opacity-30" : "opacity-100"
          }`}
        />

        {/* Solid SVG Ghost-Shield Glyph (resolves in when assembled) */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`h-full w-full transition-all duration-500 transform ${
            assembled ? "opacity-100 scale-100" : "opacity-0 scale-90"
          } ${isHovered ? "stroke-phantom-cyan" : "stroke-spectral-violet"}`}
          style={{ filter: isHovered ? "drop-shadow(0 0 6px rgba(94, 234, 212, 0.6))" : "drop-shadow(0 0 4px rgba(124, 111, 242, 0.4))" }}
        >
          {/* Outer Ghost-Shield Contour */}
          <path
            d="M24 6 C12 6 8 13 8 24 C8 34 18 42 24 44 C30 42 40 34 40 24 C40 13 36 6 24 6 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fill-void/80"
          />
          {/* Inner Spectral Ghost Eyes / Witness Nodes */}
          <circle cx="18" cy="20" r="2.2" className="fill-phantom-cyan" />
          <circle cx="30" cy="20" r="2.2" className="fill-phantom-cyan" />
          {/* Spectral Proof Smile / Circuit Arc */}
          <path
            d="M19 28 C21 31 27 31 29 28"
            stroke="#7C6FF2"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* ZK Diamond Node at Shield Base */}
          <path
            d="M24 35 L26 38 L24 41 L22 38 Z"
            className="fill-phantom-cyan/80"
          />
        </svg>
      </div>

      {/* Brand Logotype */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-display text-lg font-extrabold tracking-wider text-fog transition-colors group-hover:text-white">
            GHOST<span className="text-spectral-violet group-hover:text-phantom-cyan transition-colors">ID</span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-fog-dim/80 font-medium">
            Spectral ZK Proofs
          </span>
        </div>
      )}
    </div>
  );
}
