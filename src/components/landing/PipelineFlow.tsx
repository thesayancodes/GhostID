"use client";

import React, { useEffect, useRef, useState } from "react";
import { Lock, HelpCircle, Cpu, ShieldCheck, ArrowRight, Check } from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Credential Vault",
    desc: "Issuers sign cryptographic commitments. Raw data is stored exclusively in your encrypted local browser storage.",
    icon: Lock,
    tag: "Client-Side Witness",
  },
  {
    number: "02",
    title: "Verifier Challenge",
    desc: "A verifier asks a targeted predicate query (e.g. Age >= 18) with a cryptographic nonce to prevent replay attacks.",
    icon: HelpCircle,
    tag: "Minimal Query",
  },
  {
    number: "03",
    title: "Compact ZK Circuit",
    desc: "Your device executes the Midnight Compact circuit locally, evaluating the constraint against your private witness.",
    icon: Cpu,
    tag: "Local Prover",
  },
  {
    number: "04",
    title: "Midnight Verification",
    desc: "Midnight ledger verifies the zero-knowledge attestation on-chain, proving the claim with zero raw data exposed.",
    icon: ShieldCheck,
    tag: "On-Chain Settlement",
  },
];

export function PipelineFlow() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative mt-12 w-full">
      {/* Desktop Animated Connecting Line (Behind Cards) */}
      <div className="hidden md:block absolute top-[4.5rem] left-[12%] right-[12%] h-[2px] pointer-events-none z-0">
        <svg
          className="w-full h-4 overflow-visible"
          viewBox="0 0 1000 4"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Background rail */}
          <line
            x1="0"
            y1="2"
            x2="1000"
            y2="2"
            stroke="rgba(124, 111, 242, 0.15)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Animated drawing beam */}
          <line
            x1="0"
            y1="2"
            x2="1000"
            y2="2"
            stroke="url(#spectralGradientBeam)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              strokeDasharray: 1000,
              strokeDashoffset: isInView ? 0 : 1000,
              transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <defs>
            <linearGradient id="spectralGradientBeam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C6FF2" />
              <stop offset="50%" stopColor="#5EEAD4" />
              <stop offset="100%" stopColor="#7C6FF2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Grid of 4 Pipeline Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className={`group relative flex flex-col justify-between rounded-2xl border border-spectral-violet/20 bg-surface/80 p-6 backdrop-blur-xl transition-all duration-300 card-spectral-hover ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: `${idx * 110}ms`,
              }}
            >
              {/* Header with step number and icon badge */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-black text-spectral-violet/40 group-hover:text-spectral-violet transition-colors">
                    {step.number}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-spectral-violet/15 text-spectral-violet group-hover:bg-phantom-cyan/20 group-hover:text-phantom-cyan transition-all border border-spectral-violet/20">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-4">
                  <span className="inline-block rounded bg-spectral-violet/10 px-2 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider text-spectral-violet border border-spectral-violet/20 mb-1.5">
                    {step.tag}
                  </span>
                  <h4 className="font-display text-base font-bold text-fog group-hover:text-white transition-colors">
                    {step.title}
                  </h4>
                </div>

                <p className="mt-2 text-xs text-fog-dim leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Bottom flow arrow indication */}
              <div className="mt-4 pt-3 border-t border-spectral-violet/10 flex items-center justify-between text-[11px] text-fog-dim/70 font-mono">
                <span>Phase {step.number}</span>
                {idx < 3 ? (
                  <span className="text-spectral-violet/60 group-hover:text-phantom-cyan transition-colors flex items-center gap-1">
                    <span>Forward</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                ) : (
                  <span className="text-phantom-cyan font-semibold flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    <span>Settled</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
