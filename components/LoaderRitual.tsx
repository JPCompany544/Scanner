"use client";
import { useEffect, useState } from "react";

const messages = [
  "Decrypting vault currents…",
  "Tracing internal flows…",
  "Reading heat signature…",
];

export default function LoaderRitual() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center w-full py-10 space-y-7">
      <div className="relative w-full h-[1px] bg-[#3A3A3D] overflow-hidden">
        <div className="absolute inset-0 bg-[#E8173A] animate-sweep" />
      </div>

      <div className="w-14 h-14 border border-[#C3162C] bg-[#000000]/40 rounded-full animate-sigil opacity-[0.12]" />

      <p className="text-[#949191] text-[0.7rem] tracking-[0.18em] uppercase animate-flicker">
        {messages[index]}
      </p>
    </div>
  );
}
