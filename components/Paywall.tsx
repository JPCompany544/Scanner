"use client";

import { useEffect, useState } from "react";
import Plans from "./Plans";

interface Props {
  onUnlock: (code: string) => boolean;
}

export default function Paywall({ onUnlock }: Props) {
  const [code, setCode] = useState("");
  const [pressed, setPressed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pressed) return;
    const t = setTimeout(() => setPressed(false), 180);
    return () => clearTimeout(t);
  }, [pressed]);

  const handleUnlock = () => {
    const ok = onUnlock(code);
    setError(ok ? null : "Invalid code. Try again.");
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-[#000000] overflow-hidden">
      <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col lg:flex-row px-4 py-6 lg:py-12 overflow-y-auto">
        {/* Left side - Content */}
        <div className="lg:w-1/2 lg:pr-8 flex flex-col">
          <div className="lg:sticky lg:top-6">
            <div className="text-center lg:text-left mb-8 lg:mb-12">
              <h2 className="text-[#ECECEC] text-xl lg:text-2xl tracking-[0.28em] uppercase">
                Access Restricted
              </h2>
              <p className="mt-3 lg:mt-4 text-[#949191] text-[0.9rem] lg:text-base leading-relaxed max-w-2xl">
                You don't have an active plan for Vault Heat Scanning.<br className="hidden lg:block" />
                Select a plan below or enter a code to unlock access.
              </p>
            </div>

            {/* Access Code - Desktop (shows on right side) */}
            <div className="hidden lg:block mt-8 p-6 border border-[#3A3A3D] rounded-lg bg-[#0A0A0A]">
              <h3 className="text-[#ECECEC] text-lg mb-4 tracking-[0.2em] uppercase">
                Have an access code?
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[0.8rem] tracking-[0.14em] text-[#ECECEC]/80 uppercase mb-2">
                    Enter Access Code
                  </label>
                  <input
                    type="tel"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter your access code…"
                    className="w-full bg-[#000000] border border-[#C3162C] py-3 px-4 text-[#ECECEC] placeholder-[#949191] text-sm tracking-[0.12em] uppercase focus:outline-none focus:border-[#C3162C]"
                    style={{ caretColor: "#C3162C" }}
                    onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                  />
                </div>
                <button
                  onClick={() => {
                    setPressed(true);
                    handleUnlock();
                  }}
                  className={`w-full border border-[#C3162C] bg-[#C3162C] text-[#ECECEC] py-3 text-[0.9rem] font-bold tracking-[0.22em] uppercase transition-all duration-200 hover:bg-[#e02e4d] active:scale-95 ${
                    pressed ? "scale-95" : ""
                  }`}
                >
                  UNLOCK ACCESS
                </button>
                {error && (
                  <p className="text-[#C3162C] text-[0.8rem] mt-2">{error}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Plans */}
        <div className="lg:w-1/2 lg:pl-8 lg:border-l border-[#3A3A3D]">
          <div className="lg:max-w-[500px] lg:mx-auto">
            <Plans onSelect={(planId) => {
              // Handle plan selection (can be expanded for actual plan selection)
              console.log('Selected plan:', planId);
            }} />
          </div>
        </div>
      </div>

      {/* Bottom access code - Mobile only */}
      <div className="lg:hidden sticky bottom-0 left-0 right-0 border-t border-[#3A3A3D] bg-[#000000] z-10">
        <div className="w-full max-w-[420px] mx-auto px-4 py-5">
          <label className="block text-[0.78rem] tracking-[0.14em] text-[#ECECEC]/80 uppercase mb-2">
            Enter Access Code
          </label>
          <div className="flex flex-col gap-3">
            <input
              type="tel"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter access code…"
              className="w-full bg-[#000000] border border-[#C3162C] py-3 px-3 text-[#ECECEC] placeholder-[#949191] text-sm tracking-[0.12em] uppercase focus:outline-none focus:border-[#C3162C]"
              style={{ caretColor: "#C3162C" }}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
            />
            <button
              onClick={() => {
                setPressed(true);
                handleUnlock();
              }}
              className={`w-full border border-[#C3162C] bg-[#C3162C] text-[#ECECEC] py-3 text-[0.9rem] font-bold tracking-[0.22em] uppercase transition-transform duration-200 active:scale-95 ${
                pressed ? "scale-95" : ""
              }`}
            >
              UNLOCK
            </button>
            {error && (
              <p className="text-[#C3162C] text-[0.8rem]">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
