"use client";

import React, { useState } from "react";
import { Lock, Shield, RefreshCw, Trash2, CheckCircle2, AlertTriangle, Download } from "lucide-react";
import { useMidnight } from "../../hooks/useMidnight";
import { useGhostStore } from "../../lib/store/ghostStore";

export default function SettingsPage() {
  const { isDemoMode, activeNetwork, switchNetwork, setDemoMode, networkConfig } = useMidnight();
  const { resetToDemoCredentials, credentials } = useGhostStore();
  const [resetNotice, setResetNotice] = useState(false);
  const [exportedNotice, setExportedNotice] = useState(false);

  const handleReset = () => {
    resetToDemoCredentials();
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 2000);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(credentials, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "ghostid_encrypted_vault_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setExportedNotice(true);
    setTimeout(() => setExportedNotice(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-ghost-500/30 bg-ghost-500/10 px-3 py-1 text-xs font-semibold text-ghost-300">
          <Lock className="h-3.5 w-3.5" />
          <span>System & Vault Configuration</span>
        </div>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">GhostID Settings</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Manage target blockchain environments, local encrypted vault storage, and privacy controls.
        </p>
      </div>

      <div className="space-y-6">
        {/* Network & Mode Selection */}
        <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-surface-border pb-3">
            Blockchain Environment
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => switchNetwork("demo")}
              className={`rounded-xl border p-4 text-left transition-all ${
                isDemoMode
                  ? "border-ghost-500 bg-ghost-600/20 text-white shadow-glow-indigo"
                  : "border-surface-border bg-surface-lighter text-slate-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">Demo Sandbox</span>
                <span className="h-2 w-2 rounded-full bg-midnight-amber" />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Simulated local ZK circuits</p>
            </button>

            <button
              onClick={() => switchNetwork("preprod")}
              className={`rounded-xl border p-4 text-left transition-all ${
                !isDemoMode && activeNetwork === "preprod"
                  ? "border-ghost-500 bg-ghost-600/20 text-white shadow-glow-indigo"
                  : "border-surface-border bg-surface-lighter text-slate-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">Midnight Preprod</span>
                <span className="h-2 w-2 rounded-full bg-midnight-emerald" />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Live testnet smart contracts</p>
            </button>

            <button
              onClick={() => switchNetwork("preview")}
              className={`rounded-xl border p-4 text-left transition-all ${
                !isDemoMode && activeNetwork === "preview"
                  ? "border-ghost-500 bg-ghost-600/20 text-white shadow-glow-indigo"
                  : "border-surface-border bg-surface-lighter text-slate-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">Midnight Preview</span>
                <span className="h-2 w-2 rounded-full bg-midnight-cyan" />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Preview network deployment</p>
            </button>
          </div>

          <div className="mt-2 rounded-lg bg-surface-lighter p-3 font-mono text-xs text-slate-300 space-y-1">
            <div>Current Contract: {networkConfig.contractAddress}</div>
            <div>Proof Server: {networkConfig.proofServerUri}</div>
          </div>
        </div>

        {/* Local Vault Backup & Reset */}
        <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-surface-border pb-3">
            Private Vault Storage ({credentials.length} credentials)
          </h3>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-white">Export Encrypted Backup</div>
              <p className="text-[11px] text-slate-400">Download a JSON snapshot of your private credential vault.</p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface-lighter px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-surface-hover"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{exportedNotice ? "Exported!" : "Export Vault"}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-surface-border">
            <div>
              <div className="text-xs font-bold text-white">Reset Synthetic Demo Data</div>
              <p className="text-[11px] text-slate-400">Restores standard Age, Student, and KYC demo credentials.</p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface-lighter px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-surface-hover"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>{resetNotice ? "Reset Complete!" : "Reset Demo Data"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
