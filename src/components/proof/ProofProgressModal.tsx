"use client";

import React from "react";
import { Check, Loader2, Shield, Lock, Cpu, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { ParticleResolve } from "./ParticleResolve";

interface ProofProgressModalProps {
  isOpen: boolean;
  currentStep: number; // 1 to 4
  stepMessage: string;
  error?: string | null;
  onClose?: () => void;
}

const STEPS = [
  {
    step: 1,
    title: "Reading Private Witness",
    desc: "Fetching commitments in isolated local memory; raw data dissolved",
    icon: Lock,
  },
  {
    step: 2,
    title: "Evaluating Compact ZK Circuit",
    desc: "Computing mathematical constraint polynomial without exposing witness",
    icon: Cpu,
  },
  {
    step: 3,
    title: "Midnight Network Attestation",
    desc: "Verifying proof commitment and revocation registry on Midnight ledger",
    icon: Shield,
  },
  {
    step: 4,
    title: "Resolving Selective Disclosure",
    desc: "Emitting verified receipt while isolating all private identity data",
    icon: Sparkles,
  },
];

export function ProofProgressModal({
  isOpen,
  currentStep,
  stepMessage,
  error,
  onClose,
}: ProofProgressModalProps) {
  if (!isOpen && !error) return null;

  const particleStatus = error
    ? "idle"
    : currentStep === 1
    ? "dissolving"
    : currentStep >= 4
    ? "resolved"
    : "resolving";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/85 p-4 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-spectral-violet/30 bg-surface p-6 shadow-glass">
        {/* Header with particle resolve icon */}
        <div className="flex items-center justify-between border-b border-spectral-violet/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-spectral-violet/15 border border-spectral-violet/30 overflow-hidden">
              <ParticleResolve status={particleStatus} size={40} />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-fog">Zero-Knowledge Proof Pipeline</h3>
              <p className="text-xs text-fog-dim">Midnight Privacy-Preserving Engine</p>
            </div>
          </div>
          <span className="rounded-full bg-spectral-violet/20 px-2.5 py-1 text-[11px] font-mono font-semibold text-spectral-violet border border-spectral-violet/30">
            Step {Math.min(currentStep, 4)} of 4
          </span>
        </div>

        {error ? (
          <div className="mt-6 rounded-xl border border-danger-glitch/30 bg-danger-glitch/10 p-4 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-danger-glitch" />
            <h4 className="mt-2 text-sm font-semibold text-danger-glitch">Proof Generation Failed</h4>
            <p className="mt-1 text-xs text-fog-dim">{error}</p>
            {onClose && (
              <button
                onClick={onClose}
                className="mt-4 rounded-lg bg-surface-raised px-4 py-1.5 text-xs font-semibold text-fog hover:bg-surface"
              >
                Close
              </button>
            )}
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {STEPS.map((s) => {
              const isCompleted = currentStep > s.step;
              const isCurrent = currentStep === s.step;
              const Icon = s.icon;

              return (
                <div
                  key={s.step}
                  className={`flex items-start gap-3.5 rounded-xl border p-3.5 transition-all duration-200 ${
                    isCurrent
                      ? "border-spectral-violet bg-spectral-violet/10 shadow-glow-spectral"
                      : isCompleted
                      ? "border-phantom-cyan/30 bg-phantom-cyan/5"
                      : "border-spectral-violet/10 bg-surface-raised/30 opacity-40"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                      isCompleted
                        ? "bg-phantom-cyan text-void font-bold shadow-[0_0_8px_rgba(94,234,212,0.4)]"
                        : isCurrent
                        ? "bg-spectral-violet text-white shadow-glow-spectral"
                        : "bg-surface-raised text-fog-dim"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4 stroke-[3]" />
                    ) : isCurrent ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span className="text-xs font-mono font-bold">{s.step}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs font-bold font-display ${
                          isCurrent
                            ? "text-white"
                            : isCompleted
                            ? "text-phantom-cyan"
                            : "text-fog-dim"
                        }`}
                      >
                        {s.title}
                      </h4>
                      {isCompleted && (
                        <span className="text-[10px] font-mono font-medium text-phantom-cyan">✓ Verified</span>
                      )}
                      {isCurrent && (
                        <span className="text-[10px] font-mono text-spectral-violet animate-pulse font-semibold">
                          Computing...
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-fog-dim leading-tight">{s.desc}</p>
                  </div>
                </div>
              );
            })}

            {stepMessage && (
              <div className="rounded-lg bg-void/80 border border-spectral-violet/20 p-2.5 text-center font-mono text-[11px] text-fog">
                <span className="text-spectral-violet mr-2">&gt;</span> {stepMessage}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
