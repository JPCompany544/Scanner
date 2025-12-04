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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((p) => (
        <div
          key={p.id}
          className="flex flex-col border border-[#C3162C] bg-[#000000] overflow-hidden transition-all duration-200 hover:shadow-[0_0_0_2px_rgba(195,22,44,0.5)]"
        >
          <div 
            className="p-5 flex-1 flex flex-col gap-4 cursor-pointer"
            onClick={() => {
              setPressedId(p.id);
              setTimeout(() => setPressedId(null), 180);
              onSelect(p.id);
            }}
          >
            <h3 className="text-[#ECECEC] text-[0.9rem] font-medium tracking-[0.18em] uppercase">
              {p.title}
            </h3>
            <ul className="text-[#949191] text-[0.78rem] leading-relaxed space-y-2 mb-4">
              {p.bullets.map((b) => (
                <li key={b} className="before:content-['—'] before:mr-2">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t border-[#3A3A3D] p-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(p.id);
              }}
              className={`w-full py-2.5 px-4 text-[0.8rem] font-bold tracking-[0.15em] uppercase transition-all duration-200
                bg-[#C3162C] text-[#ECECEC] hover:bg-[#e02e4d] active:scale-95
                flex items-center justify-center gap-2 ${pressedId === p.id ? 'scale-95' : ''}`}
            >
              GET PLAN
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
