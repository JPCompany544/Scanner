"use client";

import { create } from "zustand";

interface ScannerState {
  scanStarted: boolean;
  scanComplete: boolean;
  scanResults: { hot: number; cooling: number; yieldBoost: number; traceAvailable: boolean };
  startScan: () => void;
  completeScan: () => void;
}

const useScannerState = create<ScannerState>((set) => ({
  scanStarted: false,
  scanComplete: false,
  scanResults: { hot: 0, cooling: 0, yieldBoost: 0, traceAvailable: false },
  startScan: () => set({ scanStarted: true }),
  completeScan: () => set({
    scanComplete: true,
    scanResults: { hot: 1, cooling: 2, yieldBoost: 12, traceAvailable: true }
  }),
}));

export default function Home() {
  const { scanStarted, scanComplete, scanResults, startScan, completeScan } = useScannerState();

  const handleStartScan = () => {
    startScan();
    setTimeout(() => completeScan(), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {!scanStarted && !scanComplete && (
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-white">Vault Status Scan</h1>
            <p className="text-xl text-cyan-400">Access Window Ready</p>
            <button
              onClick={handleStartScan}
              className="px-8 py-4 bg-cyan-500 text-black font-semibold rounded-full hover:scale-105 transition-transform"
            >
              Enter Vault Mode
            </button>
          </div>
        )}
        
        {scanStarted && !scanComplete && (
          <div className="text-cyan-400 text-2xl">Scanning...</div>
        )}
        
        {scanComplete && (
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-cyan-400 text-xl mb-4">Scan Complete</h3>
            <div className="text-white space-y-2">
              <p>Hot Vaults: <span className="text-orange-400">{scanResults.hot}</span></p>
              <p>Cooling Vaults: <span className="text-blue-400">{scanResults.cooling}</span></p>
              <p>Yield Opportunity: <span className="text-green-400">+{scanResults.yieldBoost}%</span></p>
              <p>Trace Available: <span className="text-green-400">{scanResults.traceAvailable ? 'Yes' : 'No'}</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}