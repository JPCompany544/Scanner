"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";

const VAULTS = [
  {
    id: "solis-yield",
    name: "Solis Yield Vault",
    status: "Active",
    yield: "4.8% daily",
  },
  {
    id: "phantom-stream",
    name: "Phantom Stream Vault",
    status: "Active",
    yield: "3.9%",
  },
  {
    id: "drift-node",
    name: "Drift Node Vault",
    status: "Cooling",
    yield: "1.2%",
  },
  {
    id: "crown-mask",
    name: "Crown Mask Vault",
    status: "Minimal Flow",
    yield: "0.0%",
  },
];

export default function HotVaultsListPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 py-8 bg-[#000000] text-[#ECECEC] scroll-smooth">
      <div className="relative w-full max-w-2xl border border-[#C3162C] bg-[#000000] p-6 md:p-8 animate-panel-reveal">
        {/* Back button (top-left) */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 left-4 border border-[#C3162C] bg-[#000000] text-[#ECECEC] px-3 py-2 rounded text-[0.7rem] font-semibold tracking-[0.22em] uppercase transition-colors duration-150 hover:border-[#E8173A] hover:shadow-[0_0_0_6px_rgba(195,22,44,0.12)] active:scale-95 animate-button-in"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="mr-1">‹</span> Back
        </button>

        <div className="text-center mb-6">
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.28em] text-[#ECECEC] uppercase"
            style={{ textShadow: "0 0 10px rgba(195, 22, 44, 0.15)" }}
          >
            HOT VAULTS LIST
          </h1>
        </div>

        <div className="space-y-4">
          {VAULTS.map((v, idx) => (
            <div
              key={v.id}
              className="border border-[#C3162C] bg-[#0A0A0A] rounded-2xl p-5 shadow-[0_0_0_0_rgba(255,0,0,0.08)] animate-fade-in transform transition-all duration-200 hover:shadow-[0_0_0_6px_rgba(195,22,44,0.12)] hover:scale-[1.01]"
              style={{ animationDelay: `${idx * 0.15}s`, animationFillMode: "both" as const }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[#C3162C] text-sm font-semibold tracking-[0.2em] uppercase">
                    {v.name}
                  </h2>
                  <p className="mt-2 text-[#949191] text-xs tracking-[0.08em]">
                    Status: {v.status}
                  </p>
                  <p className="text-[#949191] text-xs tracking-[0.08em]">
                    Yield: {v.yield}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <a
                  href={v.id === 'solis-yield' ? 'https://vault-fi-3y63.vercel.app/app/vaults/solis-yield-vault' : `#`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-[#C3162C] bg-[#000000] text-[#ECECEC] py-2 text-center text-[0.75rem] font-semibold tracking-[0.22em] uppercase transition-colors duration-150 hover:border-[#E8173A] hover:shadow-[0_0_0_6px_rgba(195,22,44,0.12)] active:scale-95"
                >
                  ENTER VAULT
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
