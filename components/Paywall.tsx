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
      <div className="w-full max-w-[420px] mx-auto flex-1 flex flex-col px-4 py-6 overflow-hidden">
        <div className="text-center mb-6">
          <h2 className="text-[#ECECEC] text-lg tracking-[0.28em] uppercase">
            Access Restricted
          </h2>
          <p className="mt-3 text-[#949191] text-[0.9rem] leading-relaxed">
            You don't have an active plan for Vault Heat Scanning.<br />
            Select a plan below or enter a code to unlock access.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto mb-4 -mx-4 px-4">
          <Plans onSelect={() => { /* UI-only pulse */ }} />
        </div>
      </div>

      {/* Bottom stacked access code */}
      <div className="sticky bottom-0 left-0 right-0 border-t border-[#3A3A3D] bg-[#000000] z-10">
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUnlock();
                }
              }}
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
