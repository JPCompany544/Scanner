"use client";
import { useState } from "react";

interface Props {
  onChange: (value: string) => void;
}

export default function InputField({ onChange }: Props) {
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
      className="w-full bg-black border border-[#C3162C] py-3 px-4 text-[#C8C8C8] placeholder-[#B87474] text-xs tracking-[0.18em] uppercase focus:outline-none focus:border-[#D61D3A] animate-input-border-pulse"
      style={{ caretColor: "#C3162C" }}
    />
  );
}
