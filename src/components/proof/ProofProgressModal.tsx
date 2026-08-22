"use client";

import React from "react";
import { Check, Loader2, Shield, Lock, Cpu, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

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
    title: "Reading Private Credential",
    desc: "Fetching witness commitments in isolated client memory",
    icon: Lock,
  },
  {
    step: 2,
    title: "Building Zero-Knowledge Proof",
    desc: "Evaluating cryptographic constraints inside local ZK circuit",
    icon: Cpu,
  },
  {
    step: 3,
    title: "Midnight Network Attestation",
    desc: "Verifying proof commitment and revocation registry on Midnight",
    icon: Shield,
  },
  {
    step: 4,
    title: "Finalizing Selective Disclosure",
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-surface-border bg-surface p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ghost-600/20 text-ghost-300">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Zero-Knowledge Proof Pipeline</h3>
              <p className="text-xs text-slate-400">Midnight Privacy-Preserving Engine</p>
            </div>
          </div>
          <span className="rounded-full bg-ghost-500/20 px-2.5 py-1 text-[11px] font-mono font-semibold text-ghost-300">
            Step {Math.min(currentStep, 4)} of 4
          </span>
        </div>

        {error ? (
          <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-rose-400" />
            <h4 className="mt-2 text-sm font-semibold text-rose-300">Proof Generation Failed</h4>
            <p className="mt-1 text-xs text-slate-300">{error}</p>
            {onClose && (
              <button
                onClick={onClose}
                className="mt-4 rounded-lg bg-surface-lighter px-4 py-1.5 text-xs font-semibold text-white hover:bg-surface-hover"
              >
                Close
              </button>
            )}
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {STEPS.map((s) => {
              const isCompleted = currentStep > s.step;
              const isCurrent = currentStep === s.step;
              const isPending = currentStep < s.step;
              const Icon = s.icon;

              return (
                <div
                  key={s.step}
                  className={`flex items-start gap-3.5 rounded-xl border p-3.5 transition-all ${
                    isCurrent
                      ? "border-ghost-500 bg-ghost-600/10 shadow-glow-indigo"
                      : isCompleted
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "border-surface-border bg-surface-lighter/30 opacity-40"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                      isCompleted
                        ? "bg-midnight-emerald text-black"
                        : isCurrent
                        ? "bg-ghost-500 text-white"
                        : "bg-surface text-slate-500"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4 stroke-[3]" />
                    ) : isCurrent ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span className="text-xs font-bold">{s.step}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs font-semibold ${
                          isCurrent
                            ? "text-white"
                            : isCompleted
                            ? "text-emerald-300"
                            : "text-slate-400"
                        }`}
                      >
                        {s.title}
                      </h4>
                      {isCompleted && (
                        <span className="text-[10px] font-medium text-emerald-400">✓ Done</span>
                      )}
                      {isCurrent && (
                        <span className="text-[10px] font-mono text-ghost-300 animate-pulse">
                          Processing...
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-400">{s.desc}</p>
                  </div>
                </div>
              );
            })}

            {stepMessage && (
              <div className="rounded-lg bg-surface-lighter p-2.5 text-center font-mono text-[11px] text-ghost-200">
                <span className="text-slate-400 mr-2">&gt;</span> {stepMessage}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
