"use client";

import { create } from "zustand";

export type HeatLevel = "HOT" | "COLD" | "FROZEN";

interface ScannerState {
  scanStarted: boolean;
  scanComplete: boolean;
  heatLevel: HeatLevel | null;
  startScan: () => void;
  completeScan: (level: HeatLevel) => void;
  reset: () => void;
}

export const useScannerState = create<ScannerState>((set) => ({
  scanStarted: false,
  scanComplete: false,
  heatLevel: null,
  startScan: () => set({ scanStarted: true }),
  completeScan: (level) =>
    set({
      scanComplete: true,
      heatLevel: level,
    }),
  reset: () =>
    set({
      scanStarted: false,
      scanComplete: false,
      heatLevel: null,
    }),
}));
