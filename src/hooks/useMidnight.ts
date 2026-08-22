// ============================================================================
// GHOSTID Midnight Hook
// React hook for interacting with Midnight Network & Lace Wallet DApp Connector
// ============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { midnightService, NETWORK_CONFIGS } from "../lib/midnight/midnightService";
import { useGhostStore } from "../lib/store/ghostStore";
import { NetworkConfig } from "../lib/types";

export function useMidnight() {
  const { isDemoMode, activeNetwork, setDemoMode, setActiveNetwork, isConnected, walletAddress, connectWallet: storeConnect, disconnectWallet: storeDisconnect } = useGhostStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLaceInstalled, setIsLaceInstalled] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check if Lace is detected in the browser window
  useEffect(() => {
    const checkLace = () => {
      const hasLace = midnightService.isLaceAvailable();
      setIsLaceInstalled(hasLace);
    };

    checkLace();
    window.addEventListener("load", checkLace);
    return () => window.removeEventListener("load", checkLace);
  }, []);

  // Sync mode with Midnight service
  useEffect(() => {
    midnightService.setMode(isDemoMode, activeNetwork);
  }, [isDemoMode, activeNetwork]);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setErrorMessage(null);
    try {
      const walletState = await midnightService.connectWallet(isDemoMode);
      if (walletState.isConnected && walletState.walletAddress) {
        storeConnect(walletState.walletAddress);
      } else {
        setErrorMessage(walletState.error || "Could not connect to wallet");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to initialize wallet connection");
    } finally {
      setIsConnecting(false);
    }
  }, [isDemoMode, storeConnect]);

  const disconnect = useCallback(async () => {
    await midnightService.disconnectWallet();
    storeDisconnect();
  }, [storeDisconnect]);

  const switchNetwork = useCallback((networkKey: "preprod" | "preview" | "local" | "demo") => {
    setActiveNetwork(networkKey);
    setDemoMode(networkKey === "demo");
    midnightService.setMode(networkKey === "demo", networkKey);
  }, [setActiveNetwork, setDemoMode]);

  const currentNetworkConfig: NetworkConfig = NETWORK_CONFIGS[activeNetwork] || NETWORK_CONFIGS.demo;

  return {
    isConnected,
    isConnecting,
    walletAddress,
    isLaceInstalled,
    errorMessage,
    isDemoMode,
    activeNetwork,
    networkConfig: currentNetworkConfig,
    connect,
    disconnect,
    switchNetwork,
    setDemoMode,
  };
}
