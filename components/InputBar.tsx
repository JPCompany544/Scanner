"use client";

import { useState } from "react";

interface Props {
  onChange: (value: string) => void;
}

export default function InputBar({ onChange }: Props) {
  const [value, setValue] = useState("");
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder="Paste any whale address…"
      className="w-full bg-[#000000] border border-[#C3162C] py-3 px-4 text-[#ECECEC] placeholder-[#949191] text-xs tracking-[0.18em] uppercase focus:outline-none focus:border-[#C3162C] animate-input-border-pulse"
      style={{ caretColor: "#C3162C" }}
    />
  );
}
