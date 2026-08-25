"use client";

import React, { useEffect, useRef } from "react";

interface ParticleResolveProps {
  status: "idle" | "dissolving" | "resolving" | "resolved";
  size?: number;
  className?: string;
}

export function ParticleResolve({ status, size = 64, className = "" }: ParticleResolveProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const particleCount = 28;
    const center = size / 2;
    const radius = size * 0.35;

    // Generate circle/shield target points
    const particles = Array.from({ length: particleCount }).map((_, i) => {
      const angle = (i / particleCount) * Math.PI * 2;
      return {
        x: center + Math.cos(angle) * (status === "dissolving" ? radius * (1.5 + Math.random()) : radius),
        y: center + Math.sin(angle) * (status === "dissolving" ? radius * (1.5 + Math.random()) : radius),
        targetX: center + Math.cos(angle) * radius,
        targetY: center + Math.sin(angle) * radius,
        scatterX: center + Math.cos(angle) * (radius * 2.2 * (0.8 + Math.random() * 0.4)),
        scatterY: center + Math.sin(angle) * (radius * 2.2 * (0.8 + Math.random() * 0.4)),
        size: 1.5 + Math.random() * 1.5,
        color: i % 3 === 0 ? "#5EEAD4" : i % 2 === 0 ? "#7C6FF2" : "#E8E6F5",
        speed: 0.05 + Math.random() * 0.05,
      };
    });

    let startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, size, size);

      particles.forEach((p) => {
        let destX = p.targetX;
        let destY = p.targetY;

        if (status === "dissolving") {
          destX = p.scatterX + Math.sin(elapsed * 2 + p.x) * 4;
          destY = p.scatterY + Math.cos(elapsed * 2 + p.y) * 4;
        } else if (status === "resolving") {
          destX = p.targetX;
          destY = p.targetY;
        }

        p.x += (destX - p.x) * 0.1;
        p.y += (destY - p.y) * 0.1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = status === "resolved" ? 6 : 2;
        ctx.fill();
      });

      // If resolved, draw connecting ring
      if (status === "resolved") {
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(124, 111, 242, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [status, size]);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} width={size} height={size} className="pointer-events-none" />
    </div>
  );
}
