"use client";

import Link from "next/link";
import { Shield, Sparkles, ArrowRight, Lock, EyeOff, CheckCircle2, Cpu, FileCheck, Layers, Bot, Zap, Globe, ChevronRight } from "lucide-react";
import { HeroComparison } from "../components/landing/HeroComparison";
import { CircuitCall } from "../components/wallet/CircuitCall";
import { useState } from "react";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does GhostID prove my age or credentials without exposing my data?",
      a: "GhostID uses Zero-Knowledge (ZK) proofs compiled with Midnight's Compact language. Your private records (like date of birth or ID numbers) stay on your device inside an isolated client witness. The ZK circuit computes mathematical proof that your age satisfies the condition (e.g. >= 18) and publishes only that boolean result to the Midnight blockchain.",
    },
    {
      q: "Does Midnight store my private personal records?",
      a: "Never. Midnight is designed specifically around privacy-by-default. Only non-reversible cryptographic commitments, verification counters, and revocation hashes exist on the public ledger. Sensitive private fields never touch the network.",
    },
    {
      q: "What credentials does GhostID support in this MVP?",
      a: "The MVP demonstrates 3 high-impact credential types: Age Attestations (Age >= 18, Age >= 21), University Student Status (Active enrollment verification), and Financial KYC Compliance (Tier 1/2 verified status).",
    },
    {
      q: "Can credentials be revoked or expired?",
      a: "Yes. Every credential has an expiration timestamp and a cryptographic commitment hash. Issuers can record revocation hashes on the Midnight ledger. The verification circuit automatically enforces validity and rejects revoked credentials.",
    },
    {
      q: "What is GhostShield and GhostAI?",
      a: "GhostShield analyzes verification requests from websites to detect over-collection of sensitive data and calculates a Privacy Score (0-100). GhostAI is an embedded privacy assistant that explains complex data requests in simple English and recommends minimal zero-knowledge alternatives.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        {/* Background glow beams */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-ghost-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 h-[350px] w-[350px] rounded-full bg-midnight-cyan/10 blur-[100px] pointer-events-none" />

        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-ghost-500/30 bg-ghost-500/10 px-4 py-1.5 text-xs font-semibold text-ghost-200 backdrop-blur-md shadow-glow-indigo">
            <span className="h-2 w-2 rounded-full bg-midnight-cyan animate-ping" />
            <span className="font-mono uppercase tracking-wider">Midnight Blockchain &bull; Zero-Knowledge Identity</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Prove Who You Are. <br />
            <span className="gradient-text-indigo">Reveal Nothing You Don&apos;t Need To.</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            GhostID turns your personal identity into private, verifiable zero-knowledge proofs.
            Verify age, student status, and KYC compliance without exposing unnecessary personal information.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-ghost-600 via-midnight-accent to-midnight-cyan px-8 py-3.5 text-sm font-bold text-white shadow-glow-indigo transition-all hover:scale-105 active:scale-95"
            >
              <span>Get Your GhostID</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/proof/composer"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-lighter/80 px-7 py-3.5 text-sm font-semibold text-slate-200 hover:bg-surface-hover hover:border-ghost-500/40 transition-all"
            >
              <Sparkles className="h-4 w-4 text-midnight-cyan" />
              <span>Launch Proof Composer</span>
            </Link>
          </div>

          {/* Quick Pillars */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="rounded-xl border border-surface-border bg-surface/60 p-3">
              <div className="text-xs font-semibold text-white">Private Witness</div>
              <div className="text-[11px] text-slate-400">Zero data on public ledger</div>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface/60 p-3">
              <div className="text-xs font-semibold text-white">Selective Disclosure</div>
              <div className="text-[11px] text-slate-400">Reveal minimal predicates</div>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface/60 p-3">
              <div className="text-xs font-semibold text-white">Compact Circuits</div>
              <div className="text-[11px] text-slate-400">Midnight-native contracts</div>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface/60 p-3">
              <div className="text-xs font-semibold text-white">Instant Revocation</div>
              <div className="text-[11px] text-slate-400">On-chain validity registry</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. LIVE INTERACTIVE HERO DEMO (WOW COMPARISON) */}
        {/* ========================================================================= */}
        <div className="mt-16">
          <HeroComparison />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LIVE CIRCUIT EXECUTION COMPONENT */}
      {/* ========================================================================= */}
      <section className="w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <CircuitCall />
      </section>

      {/* ========================================================================= */}
      {/* 4. CORE PROBLEM VS SOLUTION */}
      {/* ========================================================================= */}
      <section className="w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-surface-border">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-mono tracking-widest text-ghost-400 font-semibold">
            The Digital Identity Paradox
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
            Traditional Verification Is Fundamentally Broken
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            To prove you are 18, you shouldn&apos;t have to hand over your full name, exact date of birth, home address, and government identification number.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-surface-border bg-surface p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 mb-4">
              <EyeOff className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Massive Over-Collection</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Every website, venue, and app demands full physical documents for simple binary checks, creating vast honeypots of sensitive consumer data.
            </p>
          </div>

          <div className="rounded-2xl border border-surface-border bg-surface p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-midnight-amber/10 text-midnight-amber mb-4">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Constant Breach Risk</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Centralized verifiers regularly leak unencrypted identity databases, leading to rampant identity theft, credential stuffing, and fraud.
            </p>
          </div>

          <div className="rounded-2xl border border-ghost-500/30 bg-surface p-6 shadow-glow-indigo">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ghost-600/20 text-midnight-cyan mb-4">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">The GhostID Solution</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Mathematical zero-knowledge proofs on Midnight prove facts directly from encrypted local credentials without sharing raw data.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HOW GHOSTID WORKS ARCHITECTURE */}
      {/* ========================================================================= */}
      <section className="w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-surface-border bg-surface/30">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-mono tracking-widest text-midnight-cyan font-semibold">
            Under The Hood
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
            How Zero-Knowledge Identity Works
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            A 4-step cryptographic pipeline that keeps your private data in your hands at all times.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative rounded-2xl border border-surface-border bg-surface p-5">
            <div className="font-mono text-2xl font-black text-ghost-400/40">01</div>
            <h4 className="mt-2 text-sm font-bold text-white">Credential Vault</h4>
            <p className="mt-1 text-xs text-slate-400">
              Issuers sign cryptographic commitments. Raw data is stored only in your encrypted local browser storage.
            </p>
          </div>

          <div className="relative rounded-2xl border border-surface-border bg-surface p-5">
            <div className="font-mono text-2xl font-black text-ghost-400/40">02</div>
            <h4 className="mt-2 text-sm font-bold text-white">Verifier Challenge</h4>
            <p className="mt-1 text-xs text-slate-400">
              A verifier asks a specific question (e.g. Age &ge; 18) with a cryptographic nonce to prevent replay attacks.
            </p>
          </div>

          <div className="relative rounded-2xl border border-surface-border bg-surface p-5">
            <div className="font-mono text-2xl font-black text-ghost-400/40">03</div>
            <h4 className="mt-2 text-sm font-bold text-white">Compact ZK Circuit</h4>
            <p className="mt-1 text-xs text-slate-400">
              Your device runs the Compact circuit locally, evaluating the claim against your private witness.
            </p>
          </div>

          <div className="relative rounded-2xl border border-surface-border bg-surface p-5">
            <div className="font-mono text-2xl font-black text-ghost-400/40">04</div>
            <h4 className="mt-2 text-sm font-bold text-white">Midnight Verification</h4>
            <p className="mt-1 text-xs text-slate-400">
              Midnight verifies the ZK proof on-chain and returns a verified attestation with zero raw data revealed.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. GHOSTSHIELD & GHOSTAI SPOTLIGHT */}
      {/* ========================================================================= */}
      <section className="w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-surface-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* GhostShield Card */}
          <div className="rounded-3xl border border-ghost-500/30 bg-gradient-to-br from-surface to-ghost-950/20 p-8 shadow-glass">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ghost-600/30 text-ghost-300">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">GhostShield</h3>
                <p className="text-xs text-slate-400">Automated Data Over-Collection Analyzer</p>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-300 leading-relaxed">
              GhostShield scans verification requests from any third-party app, calculates a heuristic Privacy Score (0-100), detects unnecessary field requests, and suggests minimal zero-knowledge alternatives.
            </p>

            <div className="mt-6 rounded-xl border border-surface-border bg-surface-lighter/60 p-4 font-mono text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Application:</span>
                <span className="text-white">Example Exchange</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Privacy Score:</span>
                <span className="text-midnight-cyan font-bold">82/100 (Medium Risk)</span>
              </div>
              <div className="flex justify-between text-rose-300">
                <span>Unnecessary Fields:</span>
                <span>DOB, Full Address, ID Number</span>
              </div>
            </div>

            <Link
              href="/shield"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-ghost-400 hover:text-ghost-300"
            >
              <span>Test GhostShield Analyzer</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* GhostAI Card */}
          <div className="rounded-3xl border border-midnight-cyan/30 bg-gradient-to-br from-surface to-cyan-950/20 p-8 shadow-glass">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-midnight-cyan/20 text-midnight-cyan">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">GhostAI</h3>
                <p className="text-xs text-slate-400">Plain-English Privacy Assistant</p>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-300 leading-relaxed">
              Have questions about why a service is asking for your identity? GhostAI explains complex legal and compliance requests, sanitizes private data before queries, and advises on optimal proof configurations.
            </p>

            <div className="mt-6 rounded-xl border border-surface-border bg-surface-lighter/60 p-4 text-xs space-y-2">
              <div className="text-slate-400 font-mono text-[11px]">&gt; User: &quot;Why does this site need my DOB?&quot;</div>
              <div className="text-slate-200 bg-surface/80 p-2.5 rounded-lg border border-surface-border">
                &quot;The website only requires proof of age eligibility (&ge; 18). GhostID recommends generating a zero-knowledge Age proof instead of sharing your date of birth.&quot;
              </div>
            </div>

            <Link
              href="/ai"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-midnight-cyan hover:text-cyan-300"
            >
              <span>Chat with GhostAI Assistant</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section className="w-full max-w-4xl px-4 py-20 sm:px-6 lg:px-8 border-t border-surface-border">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="mt-2 text-sm text-slate-400">Everything you need to know about GhostID and Midnight ZK proofs.</p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-surface-border bg-surface overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-white hover:bg-surface-lighter"
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? "rotate-90 text-ghost-400" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-surface-border/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-ghost-500/40 bg-gradient-to-r from-ghost-950 via-surface to-surface-lighter p-8 sm:p-12 text-center overflow-hidden shadow-glow-indigo">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Own Your Digital Identity?
            </h2>
            <p className="text-sm text-slate-300">
              Join the privacy revolution on the Midnight blockchain. Create proofs, verify facts, and reveal nothing you don&apos;t need to.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-ghost-600 via-midnight-accent to-midnight-cyan px-7 py-3 text-sm font-bold text-white shadow-glow-indigo hover:opacity-90 transition-all"
              >
                <span>Launch GhostID Vault</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/developers"
                className="rounded-xl border border-surface-border bg-surface px-6 py-3 text-sm font-semibold text-slate-300 hover:text-white transition-all"
              >
                Developer SDK
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
