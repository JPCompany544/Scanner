"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { Suspense } from "react";

function VaultDetailPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const addr = searchParams.get("addr");
  const id = (params as { id?: string }).id || "vault";

  const title = id
    .replace(/-/g, " ")
    .toUpperCase();

  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 py-8 bg-[#000000] text-[#ECECEC]">
      <div className="relative w-full max-w-2xl border border-[#C3162C] bg-[#000000] p-6 md:p-8 animate-panel-reveal">
        <button
          onClick={() =>
            router.push(
              addr ? `/?view=results&addr=${encodeURIComponent(addr)}` : "/?view=results"
            )
          }
          className="absolute top-4 left-4 border border-[#C3162C] bg-[#000000] text-[#ECECEC] px-3 py-2 rounded text-[0.7rem] font-semibold tracking-[0.22em] uppercase transition-colors duration-150 hover:border-[#E8173A] hover:shadow-[0_0_0_6px_rgba(195,22,44,0.12)] active:scale-95 animate-button-in"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="mr-1">‹</span> Back
        </button>

        <div className="text-center">
          <h1 className="text-[#E8173A] text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.28em] uppercase mb-3" style={{ textShadow: "0 0 10px rgba(195, 22, 44, 0.15)" }}>
            {title}
          </h1>
          <p className="text-[#949191] text-sm sm:text-base md:text-lg leading-relaxed tracking-[0.08em]">
            Operator-grade detail view. Review streams, thresholds, and access gates.
          </p>
        </div>

        <div className="mt-8 grid gap-4">
          <div className="border border-[#C3162C] bg-[#0A0A0A] rounded-2xl p-5">
            <p className="text-[#949191] text-xs sm:text-sm tracking-[0.08em]">
              Placeholder details for <span className="text-[#C3162C]">{title}</span>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function VaultDetailPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen w-full flex flex-col items-center px-4 py-8 bg-[#000000] text-[#ECECEC]">
        <div className="w-full max-w-2xl border border-[#C3162C] bg-[#000000] p-6 md:p-8">
          <p className="text-[#949191] text-center">Loading...</p>
        </div>
      </main>
    }>
      <VaultDetailPageContent />
    </Suspense>
  );
}
