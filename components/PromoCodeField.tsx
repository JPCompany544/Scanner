"use client";

import { useEffect, useState } from "react";

interface Props {
  onRedeem: (code: string) => boolean;
}

export default function PromoCodeField({ onRedeem }: Props) {
  const [code, setCode] = useState("");
  const [pressed, setPressed] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  useEffect(() => {
    if (!pressed) return;
    const t = setTimeout(() => setPressed(false), 120);
    return () => clearTimeout(t);
  }, [pressed]);

  const redeem = () => {
    const ok = onRedeem(code);
    setStatus(ok ? "ok" : "err");
  };

  return (
    <div className="w-full">
      <label className="block text-[0.7rem] tracking-[0.16em] text-[#949191] uppercase mb-2">
        Promo Code
      </label>
      <div className="flex items-stretch gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter unlock code"
          className="flex-1 bg-black border border-[#C3162C] py-3 px-3 text-[#C8C8C8] placeholder-[#B87474] text-xs tracking-[0.18em] uppercase focus:outline-none focus:border-[#D61D3A] animate-input-border-pulse"
          style={{ caretColor: "#C3162C" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") redeem();
          }}
        />
        <button
          onClick={() => {
            setPressed(true);
            redeem();
          }}
          className={`border border-[#C3162C] bg-black text-[#FFFFFF] px-4 text-[0.7rem] font-semibold tracking-[0.22em] uppercase transition-colors duration-150 hover:border-[#D61D3A] ${
            pressed ? "animate-button-press animate-button-flash" : ""
          }`}
        >
          Redeem Access
        </button>
      </div>
      {status === "ok" && (
        <p className="mt-2 text-[0.7rem] tracking-[0.1em] text-[#E8173A]">
          Access granted.
        </p>
      )}
      {status === "err" && (
        <p className="mt-2 text-[0.7rem] tracking-[0.1em] text-[#949191]">
          Invalid code.
        </p>
      )}
    </div>
  );
}
