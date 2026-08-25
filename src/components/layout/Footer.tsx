import Link from "next/link";
import { Shield, Lock, ExternalLink, Github, Terminal } from "lucide-react";
import { GhostLogo } from "./GhostLogo";

export function Footer() {
  return (
    <footer className="border-t border-spectral-violet/15 bg-surface/40 backdrop-blur-md py-12 text-fog-dim text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <GhostLogo size="sm" />
            <p className="text-fog-dim text-[11px] leading-relaxed">
              &quot;Prove Who You Are. Reveal Nothing You Don&apos;t Need To.&quot;
            </p>
            <p className="text-[10px] text-fog-dim/70">
              Zero-knowledge identity & selective disclosure infrastructure built for the Midnight Network.
            </p>
          </div>

          {/* Core Navigation */}
          <div>
            <h4 className="font-display font-bold text-fog uppercase text-[11px] tracking-wider mb-3">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="hover:text-fog hover:underline transition-colors">User Dashboard</Link>
              </li>
              <li>
                <Link href="/credentials" className="hover:text-fog hover:underline transition-colors">Private Vault</Link>
              </li>
              <li>
                <Link href="/proof" className="hover:text-fog hover:underline transition-colors">Proof Center</Link>
              </li>
              <li>
                <Link href="/proof/composer" className="hover:text-fog hover:underline transition-colors">Proof Composer</Link>
              </li>
              <li>
                <Link href="/requests" className="hover:text-fog hover:underline transition-colors">Verification Requests</Link>
              </li>
            </ul>
          </div>

          {/* Privacy & Ecosystem */}
          <div>
            <h4 className="font-display font-bold text-fog uppercase text-[11px] tracking-wider mb-3">Intelligence & Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shield" className="hover:text-fog hover:underline transition-colors">GhostShield Analyzer</Link>
              </li>
              <li>
                <Link href="/ai" className="hover:text-fog hover:underline transition-colors">GhostAI Assistant</Link>
              </li>
              <li>
                <Link href="/issuer" className="hover:text-fog hover:underline transition-colors">Issuer Portal</Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-fog hover:underline transition-colors">Verifier Gateway</Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-fog hover:underline transition-colors">Security Center</Link>
              </li>
            </ul>
          </div>

          {/* Developer & Midnight */}
          <div>
            <h4 className="font-display font-bold text-fog uppercase text-[11px] tracking-wider mb-3">Developers & Midnight</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/developers" className="hover:text-fog hover:underline transition-colors">GhostID SDK & APIs</Link>
              </li>
              <li>
                <a
                  href="https://docs.midnight.network/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-fog transition-colors"
                >
                  <span>Midnight Network Docs</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://midnight.network/developer-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-fog transition-colors"
                >
                  <span>Midnight Developer Hub</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link href="/settings" className="hover:text-fog hover:underline transition-colors">Settings & Sandbox Mode</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-spectral-violet/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-fog-dim/70">
          <p>&copy; {new Date().getFullYear()} GhostID Protocol. All private witnesses remain confidential.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-spectral-violet">
              <Lock className="h-3 w-3" />
              <span>Compact Smart Contracts</span>
            </span>
            <span>&bull;</span>
            <span className="text-fog-dim">Midnight Builder Challenge</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
