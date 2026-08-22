"use client";

import React, { useState } from "react";
import { Bot, Sparkles, Send, Shield, Lock, EyeOff, CheckCircle2, User, RefreshCw } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ghostai";
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    href: string;
  };
}

export default function GhostAIPage() {
  const [inputQuery, setInputQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_1",
      sender: "ghostai",
      text: "Hello! I am GhostAI, your personal zero-knowledge privacy assistant. Ask me why a service is asking for your identity, how to minimize data exposure, or how Midnight ZK circuits work.",
      timestamp: "Just now",
    },
    {
      id: "msg_2",
      sender: "user",
      text: "Why does a crypto exchange need my exact date of birth and passport scan?",
      timestamp: "Just now",
    },
    {
      id: "msg_3",
      sender: "ghostai",
      text: "Most financial exchanges require proof of adult age (Age >= 18) and anti-money laundering (AML) compliance to satisfy regulations. However, collecting raw scans exposes you to data breach risks. With GhostID on Midnight, you can generate an Age >= 18 + KYC Tier 1 ZK proof that proves compliance without revealing your birthday or passport number.",
      timestamp: "Just now",
      suggestedAction: {
        label: "Create KYC + Age Compound Proof",
        href: "/proof/composer",
      },
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    const userMsg: ChatMessage = {
      id: "msg_" + Date.now(),
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsProcessing(true);

    setTimeout(() => {
      let botResponse = "GhostID recommends using selective disclosure to fulfill this request. By evaluating the predicate in a local Compact circuit, you can satisfy the verifier with a mathematical proof rather than handing over raw personal documents.";
      let suggestedAction = undefined;

      const lower = userText.toLowerCase();
      if (lower.includes("dob") || lower.includes("birth") || lower.includes("age") || lower.includes("18")) {
        botResponse = "The service only requires verification that you are at or above the minimum legal age. Revealing your exact birth date exposes you to identity correlation. Generate a zero-knowledge Age >= 18 proof to protect your privacy.";
        suggestedAction = { label: "Generate Age Proof", href: "/proof" };
      } else if (lower.includes("student") || lower.includes("university") || lower.includes("college")) {
        botResponse = "Websites offering student discounts only need to confirm active enrollment. Your student registration ID and transcripts are confidential. GhostID proves 'Student Status = Active' directly from university-signed commitments.";
        suggestedAction = { label: "Verify Student Status", href: "/proof" };
      } else if (lower.includes("kyc") || lower.includes("bank") || lower.includes("passport")) {
        botResponse = "Regulatory KYC requires verification of identity and AML screening. In GhostID, the bank signs a zero-knowledge credential commitment. Verifiers receive a proof of compliance while your passport number and photo remain 100% hidden.";
        suggestedAction = { label: "Launch GhostShield Analyzer", href: "/shield" };
      }

      const botMsg: ChatMessage = {
        id: "msg_bot_" + Date.now(),
        sender: "ghostai",
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedAction,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsProcessing(false);
    }, 900);
  };

  const samplePrompts = [
    "Why does this app need my exact date of birth?",
    "Can a verifier see my student ID number?",
    "How does Midnight verify my proof without seeing my data?",
    "What is the difference between traditional KYC and GhostID?",
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-midnight-cyan/30 bg-midnight-cyan/10 px-3 py-1 text-xs font-semibold text-midnight-cyan">
            <Bot className="h-3.5 w-3.5" />
            <span>GhostAI Privacy Intelligence</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">GhostAI Assistant</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Understand data requests in plain English and discover optimal zero-knowledge proof strategies.
          </p>
        </div>

        {/* Local Redaction Notice */}
        <div className="rounded-xl border border-surface-border bg-surface p-3 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-midnight-emerald text-[11px]">
            <Lock className="h-3.5 w-3.5" />
            <span>Pre-Flight Privacy Filter Active</span>
          </div>
          <p className="text-[10px] text-slate-400">
            Sensitive records are never transmitted to external AI endpoints.
          </p>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="rounded-2xl border border-surface-border bg-surface shadow-glass p-6 min-h-[420px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                    isUser ? "bg-ghost-600 text-white" : "bg-midnight-cyan/20 text-midnight-cyan"
                  }`}
                >
                  {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                <div
                  className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed ${
                    isUser
                      ? "bg-ghost-600/30 text-slate-100 border border-ghost-500/40"
                      : "bg-surface-lighter/80 text-slate-200 border border-surface-border"
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.suggestedAction && (
                    <div className="mt-3 pt-2.5 border-t border-surface-border/60">
                      <a
                        href={msg.suggestedAction.href}
                        className="inline-flex items-center gap-1.5 font-bold text-midnight-cyan hover:underline text-[11px]"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>{msg.suggestedAction.label} &rarr;</span>
                      </a>
                    </div>
                  )}

                  <div className="mt-1 text-right text-[9px] text-slate-500 font-mono">{msg.timestamp}</div>
                </div>
              </div>
            );
          })}

          {isProcessing && (
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-midnight-cyan" />
              <span>GhostAI is evaluating privacy policy...</span>
            </div>
          )}
        </div>

        {/* Input Form & Quick Prompts */}
        <div className="mt-6 pt-4 border-t border-surface-border space-y-3">
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => setInputQuery(p)}
                className="rounded-lg border border-surface-border bg-surface-lighter px-2.5 py-1 text-[11px] text-slate-400 hover:text-white hover:border-ghost-500/30 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask GhostAI about any privacy request or verification scenario..."
              className="flex-1 rounded-xl border border-surface-border bg-surface-lighter px-4 py-3 text-xs text-white focus:border-ghost-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isProcessing || !inputQuery.trim()}
              className="flex items-center justify-center rounded-xl bg-gradient-to-r from-ghost-600 to-midnight-accent px-5 text-white shadow-glow-indigo hover:opacity-90 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
