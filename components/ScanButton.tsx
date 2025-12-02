"use client";

import { useEffect, useState } from "react";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export default function ScanButton({ onClick, disabled }: Props) {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!pressed) return;
    const t = setTimeout(() => setPressed(false), 120);
    return () => clearTimeout(t);
  }, [pressed]);

  return (
    <button
      onClick={() => {
        if (disabled) return;
        setPressed(true);
        onClick();
      }}
      disabled={disabled}
      className={`w-full mt-5 border border-[#C3162C] bg-[#000000] text-[#ECECEC] py-3 text-xs font-semibold tracking-[0.25em] uppercase transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#E8173A] hover:shadow-[0_0_0_6px_rgba(195,22,44,0.12)] ${
          pressed ? "animate-button-press animate-button-flash" : ""
        }`}
    >
      SCAN HEAT
    </button>
  );
}
