"use client";
import { useState } from "react";
interface Plan {
  id: "basic" | "operator" | "syndicate";
  title: string;
  price: string;
  bullets: string[];
}

const plans: Plan[] = [
  {
    id: "basic",
    title: "BASIC ACCESS — $15/mo",
    price: "$15/mo",
    bullets: [
      "Up to 25 scans/mo",
      "Hot/Cold/Frozen detection",
      "Standard scan speed",
    ],
  },
  {
    id: "operator",
    title: "OPERATOR ACCESS — $49/mo",
    price: "$49/mo",
    bullets: [
      "Unlimited scans",
      "Enhanced heat signatures",
      "2× faster scanning",
      "Vault lineage mapping",
    ],
  },
  {
    id: "syndicate",
    title: "SYNDICATE ACCESS — $250/lifetime",
    price: "$250/lifetime",
    bullets: [
      "Lifetime unlimited scans",
      "Deep vault intelligence",
      "Access to all new scanner nodes",
      "Syndicate badge inside app",
    ],
  },
];

interface Props {
  onSelect: (id: Plan["id"]) => void;
}

export default function Plans({ onSelect }: Props) {
  const [pressedId, setPressedId] = useState<Plan["id"] | null>(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {plans.map((p) => (
        <div
          key={p.id}
          onClick={() => {
            setPressedId(p.id);
            setTimeout(() => setPressedId(null), 180);
            onSelect(p.id);
          }}
          className={`cursor-pointer border border-[#C3162C] bg-[#000000] p-5 flex flex-col gap-3 transition-shadow duration-200 hover:shadow-[0_0_0_6px_rgba(195,22,44,0.12)] active:shadow-[0_0_0_8px_rgba(195,22,44,0.16)] ${
            pressedId === p.id ? "animate-button-flash" : ""
          }`}
        >
          <h3 className="text-[#ECECEC] text-[0.8rem] tracking-[0.18em] uppercase">
            {p.title}
          </h3>
          <ul className="text-[#949191] text-[0.78rem] leading-relaxed">
            {p.bullets.map((b) => (
              <li key={b} className="before:content-['—'] before:mr-2">
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
