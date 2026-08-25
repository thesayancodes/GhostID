"use client";

import Link from "next/link";
import { Shield, Sparkles, ArrowRight, Lock, EyeOff, CheckCircle2, Cpu, FileCheck, Layers, Bot, Zap, Globe, ChevronRight, Binary, ShieldAlert, KeyRound } from "lucide-react";
import { HeroComparison } from "../components/landing/HeroComparison";
import { CircuitCall } from "../components/wallet/CircuitCall";
import { AmbientFogCanvas } from "../components/landing/AmbientFogCanvas";
import { PipelineFlow } from "../components/landing/PipelineFlow";
import { PrivacyScoreCounter } from "../components/landing/PrivacyScoreCounter";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [headlineResolved, setHeadlineResolved] = useState(false);

  useEffect(() => {
    // Orchestrated sequence: Headline resolves from blur to sharp right after logo assembly
    const timer = setTimeout(() => {
      setHeadlineResolved(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const featurePills = [
    {
      title: "Private Witness",
      desc: "Zero identity data on public ledger",
      icon: Lock,
    },
    {
      title: "Selective Disclosure",
      desc: "Reveal only true/false predicates",
      icon: EyeOff,
    },
    {
      title: "Compact Circuits",
      desc: "Midnight-native smart contracts",
      icon: Cpu,
    },
    {
      title: "Instant Revocation",
      desc: "Cryptographic registry validity",
      icon: KeyRound,
    },
  ];

  const faqs = [
    {
      q: "How does GhostID prove my age or credentials without exposing my data?",
      a: "GhostID uses Zero-Knowledge (ZK) proofs compiled with Midnight's Compact language. Your private records (like date of birth or ID numbers) stay on your device inside an isolated client witness. The ZK circuit computes a mathematical proof that your age satisfies the condition (e.g. >= 18) and publishes only that boolean result to the Midnight blockchain.",
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
    <div className="relative flex flex-col items-center justify-center overflow-hidden bg-void text-fog">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (SPECTRAL MATERIALIZATION) */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Fog & Drifting Particles Canvas */}
        <AmbientFogCanvas />

        {/* Soft Radial Ambient Backdrops */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[750px] rounded-full bg-spectral-violet/10 blur-[130px] pointer-events-none z-0" />
        <div className="absolute top-1/3 left-1/4 h-[350px] w-[350px] rounded-full bg-phantom-cyan/5 blur-[110px] pointer-events-none z-0" />

        <div className="relative z-10 text-center space-y-7 max-w-4xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-spectral-violet/30 bg-surface/90 px-4 py-1.5 text-xs font-semibold text-fog backdrop-blur-md shadow-glow-spectral">
            <span className="h-2 w-2 rounded-full bg-phantom-cyan animate-ping" />
            <span className="font-mono uppercase tracking-wider text-[11px] text-fog">
              Midnight Network &bull; Compact Smart Contracts &bull; Zero-Knowledge
            </span>
          </div>

          {/* Main Headline with Orchestrated Blur-to-Sharp Resolve */}
          <h1
            className={`font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] transition-all duration-700 ${
              headlineResolved
                ? "filter-none opacity-100 translate-y-0"
                : "filter blur-[6px] opacity-0 translate-y-3"
            }`}
          >
            Prove Who You Are. <br />
            <span className="gradient-text-spectral">
              Reveal Nothing You Don&apos;t Need To.
            </span>
          </h1>

          {/* Subheading */}
          <p
            className={`text-base sm:text-lg text-fog-dim max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-150 ${
              headlineResolved
                ? "filter-none opacity-100 translate-y-0"
                : "filter blur-[4px] opacity-0 translate-y-2"
            }`}
          >
            GhostID turns raw personal identity into private, mathematical zero-knowledge proofs.
            Verify age, student status, and KYC compliance while keeping personal data in your encrypted local witness.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-3 transition-all duration-700 delay-300 ${
              headlineResolved ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {/* Primary CTA in Spectral Violet */}
            <Link
              href="/dashboard"
              className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-[#7C6FF2] px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(124,111,242,0.55)] transition-all duration-200 hover:bg-[#6B5CE7] hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: "#7C6FF2", color: "#FFFFFF" }}
            >
              <span>Get Your GhostID</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Secondary Ghost / Outline CTA */}
            <Link
              href="/proof/composer"
              className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl border border-spectral-violet/40 bg-surface/70 px-7 py-3.5 text-sm font-semibold text-fog hover:bg-surface-raised hover:border-spectral-violet/70 hover:text-white transition-all duration-200"
            >
              <Sparkles className="h-4 w-4 text-phantom-cyan" />
              <span>Launch Proof Composer</span>
            </Link>
          </div>

          {/* 4 Feature Pills with Glass Cards & Spectral Violet Hover Glow */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-3xl mx-auto text-left">
            {featurePills.map((pill, idx) => {
              const Icon = pill.icon;
              return (
                <div
                  key={pill.title}
                  className="group rounded-xl border border-spectral-violet/20 bg-surface/70 p-3.5 backdrop-blur-md transition-all duration-200 card-spectral-hover"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="flex items-center gap-1.5 text-spectral-violet group-hover:text-phantom-cyan transition-colors mb-1">
                    <Icon className="h-3.5 w-3.5" />
                    <span className="font-display text-xs font-bold text-fog group-hover:text-white">
                      {pill.title}
                    </span>
                  </div>
                  <div className="text-[11px] text-fog-dim group-hover:text-fog transition-colors leading-tight">
                    {pill.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. LIVE INTERACTIVE HERO DEMO (SPECTRAL COMPARISON) */}
        {/* ========================================================================= */}
        <div className="mt-16">
          <HeroComparison />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LIVE CIRCUIT EXECUTION COMPONENT */}
      {/* ========================================================================= */}
      <section className="w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 border-t border-spectral-violet/15">
        <CircuitCall />
      </section>

      {/* ========================================================================= */}
      {/* 4. CORE PROBLEM VS SOLUTION */}
      {/* ========================================================================= */}
      <section className="w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-spectral-violet/15">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-mono tracking-widest text-spectral-violet font-semibold">
            The Digital Identity Paradox
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-fog tracking-tight">
            Traditional Verification Is Fundamentally Broken
          </h2>
          <p className="mt-3 text-sm text-fog-dim leading-relaxed">
            To prove you are 18, you shouldn&apos;t have to surrender your full legal name, exact date of birth, physical home address, and government identification number.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-danger-glitch/25 bg-surface/90 p-6 card-spectral-hover">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger-glitch/15 text-danger-glitch mb-4 border border-danger-glitch/30">
              <EyeOff className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-fog">Massive Over-Collection</h3>
            <p className="mt-2 text-xs text-fog-dim leading-relaxed">
              Every website, app, and venue demands raw physical identity credentials for binary checks, creating catastrophic honeypots of vulnerable user records.
            </p>
          </div>

          <div className="rounded-2xl border border-ember/25 bg-surface/90 p-6 card-spectral-hover">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember/15 text-ember mb-4 border border-ember/30">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-fog">Perpetual Breach Risk</h3>
            <p className="mt-2 text-xs text-fog-dim leading-relaxed">
              Centralized verifiers regularly suffer catastrophic database breaches, fueling systemic credential stuffing, synthetic fraud, and personal surveillance.
            </p>
          </div>

          <div className="rounded-2xl border border-spectral-violet/40 bg-surface-raised/90 p-6 shadow-glow-spectral card-spectral-hover">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-spectral-violet/20 text-phantom-cyan mb-4 border border-spectral-violet/30">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-white">The GhostID Solution</h3>
            <p className="mt-2 text-xs text-fog-dim leading-relaxed">
              Mathematical zero-knowledge proofs on Midnight prove facts directly from local encrypted witness credentials without sharing a single byte of raw data.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HOW GHOSTID WORKS ARCHITECTURE & PIPELINE */}
      {/* ========================================================================= */}
      <section className="w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-spectral-violet/15 bg-surface/30">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-mono tracking-widest text-phantom-cyan font-semibold">
            Under The Hood
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-fog tracking-tight">
            How Zero-Knowledge Identity Works
          </h2>
          <p className="mt-3 text-sm text-fog-dim leading-relaxed">
            A 4-step cryptographic pipeline that keeps your private witness in your hands at all times.
          </p>
        </div>

        {/* 4-Step Animated Pipeline */}
        <PipelineFlow />
      </section>

      {/* ========================================================================= */}
      {/* 6. GHOSTSHIELD & GHOSTAI SPOTLIGHT */}
      {/* ========================================================================= */}
      <section className="w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-spectral-violet/15">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* GhostShield Card */}
          <div className="rounded-3xl border border-spectral-violet/35 bg-gradient-to-br from-surface to-surface-raised p-8 shadow-glass card-spectral-hover">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-spectral-violet/20 text-spectral-violet border border-spectral-violet/30">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-fog">GhostShield</h3>
                <p className="text-xs text-fog-dim">Automated Data Over-Collection Analyzer</p>
              </div>
            </div>

            <p className="mt-4 text-xs text-fog-dim leading-relaxed">
              GhostShield scans verification requests from any third-party app, calculates a heuristic Privacy Score (0-100), detects unnecessary field requests, and suggests minimal zero-knowledge alternatives.
            </p>

            <div className="mt-6 rounded-xl border border-spectral-violet/20 bg-void/70 p-4 font-mono text-xs space-y-2.5">
              <div className="flex justify-between text-fog-dim">
                <span>Application:</span>
                <span className="text-fog font-medium">Example Exchange</span>
              </div>
              
              {/* Animated Privacy Score Counter */}
              <PrivacyScoreCounter targetScore={82} label="Privacy Score:" />

              <div className="flex justify-between text-danger-glitch pt-1 border-t border-spectral-violet/10">
                <span>Unnecessary Fields:</span>
                <span className="font-semibold">DOB, Full Address, ID Number</span>
              </div>
            </div>

            <Link
              href="/shield"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-spectral-violet hover:text-phantom-cyan transition-colors"
            >
              <span>Test GhostShield Analyzer</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* GhostAI Card */}
          <div className="rounded-3xl border border-phantom-cyan/35 bg-gradient-to-br from-surface to-surface-raised p-8 shadow-glass card-spectral-hover">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-phantom-cyan/20 text-phantom-cyan border border-phantom-cyan/30">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-fog">GhostAI</h3>
                <p className="text-xs text-fog-dim">Plain-English Privacy Assistant</p>
              </div>
            </div>

            <p className="mt-4 text-xs text-fog-dim leading-relaxed">
              Have questions about why a service is asking for your identity? GhostAI explains complex legal and compliance requests, sanitizes private data before queries, and advises on optimal proof configurations.
            </p>

            <div className="mt-6 rounded-xl border border-phantom-cyan/20 bg-void/70 p-4 text-xs space-y-2">
              <div className="text-fog-dim font-mono text-[11px]">&gt; User: &quot;Why does this site need my DOB?&quot;</div>
              <div className="text-fog bg-surface p-3 rounded-lg border border-phantom-cyan/20 leading-relaxed">
                &quot;The website only requires proof of age eligibility (&ge; 18). GhostID recommends generating a zero-knowledge Age proof instead of sharing your date of birth.&quot;
              </div>
            </div>

            <Link
              href="/ai"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-phantom-cyan hover:text-white transition-colors"
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
      <section className="w-full max-w-4xl px-4 py-20 sm:px-6 lg:px-8 border-t border-spectral-violet/15">
        <div className="text-center">
          <h2 className="font-display text-3xl font-extrabold text-fog tracking-tight">Frequently Asked Questions</h2>
          <p className="mt-2 text-sm text-fog-dim">Everything you need to know about GhostID and Midnight ZK proofs.</p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-spectral-violet/20 bg-surface/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-fog hover:bg-surface-raised transition-colors"
                >
                  <span className="font-display">{faq.q}</span>
                  <ChevronRight
                    className={`h-4 w-4 text-fog-dim transition-transform duration-200 ${isOpen ? "rotate-90 text-spectral-violet" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs text-fog-dim leading-relaxed border-t border-spectral-violet/10">
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
        <div className="relative rounded-3xl border border-spectral-violet/40 bg-gradient-to-r from-surface via-surface-raised to-surface p-8 sm:p-12 text-center overflow-hidden shadow-glow-spectral">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Own Your Digital Identity?
            </h2>
            <p className="text-sm text-fog-dim leading-relaxed">
              Join the privacy revolution on the Midnight blockchain. Create proofs, verify facts, and reveal nothing you don&apos;t need to.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-xl bg-[#7C6FF2] px-7 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(124,111,242,0.5)] hover:bg-[#6B5CE7] transition-all"
                style={{ backgroundColor: "#7C6FF2", color: "#FFFFFF" }}
              >
                <span>Launch GhostID Vault</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/developers"
                className="rounded-xl border border-spectral-violet/30 bg-surface px-6 py-3 text-sm font-semibold text-fog-dim hover:text-fog hover:bg-surface-raised transition-all"
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
