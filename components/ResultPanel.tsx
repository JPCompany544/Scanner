"use client";

interface Props {
  onEnter?: () => void;
  onBack?: () => void;
  address?: string | null;
}

export default function ResultPanel({ onEnter, onBack }: Props) {
  return (
    <div className="relative w-full max-w-[420px] mx-auto border border-[#C3162C] p-6 text-center bg-[#000000] animate-panel-reveal animate-result-border-pulse">
      {/* Back button (top-left) */}
      {onBack && (
        <button
          onClick={() => onBack?.()}
          className="absolute top-4 left-4 border border-[#C3162C] bg-[#000000] text-[#ECECEC] px-3 py-2 rounded text-[0.7rem] font-semibold tracking-[0.22em] uppercase transition-colors duration-150 hover:border-[#E8173A] hover:shadow-[0_0_0_6px_rgba(195,22,44,0.12)] active:scale-95 animate-button-in"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="mr-1">‹</span> Back
        </button>
      )}
      <div className="relative mx-auto mb-5 w-24 h-24">
        {/* Soft glow */}
        <div className="absolute -inset-1 rounded-full bg-[#C3162C] opacity-[0.25] blur-md" />

        {/* Pulsating crimson ring */}
        <div className="relative w-full h-full rounded-full border-2 border-[#C3162C] animate-ring-hot animate-symbol-in animate-sigil-pulse" />

        {/* Expanding wave rings */}
        <div className="absolute inset-0 rounded-full border border-[#C3162C]/50 animate-wave-soft" />
        <div className="absolute inset-0 rounded-full border border-[#C3162C]/30 animate-wave-soft" style={{ animationDelay: "0.6s" }} />
      </div>

      <div className="mx-auto max-w-[360px] px-4 sm:px-6 break-words">
        <h2 className="text-[#E8173A] text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.22em] uppercase leading-relaxed mb-3 animate-title-pulse" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
          HOT VAULT CONNECTION
        </h2>
        <p className="text-[#949191] text-sm sm:text-base md:text-lg leading-relaxed tracking-[0.08em] animate-fade-in" style={{ animationDelay: "0.45s", animationFillMode: "both" }}>
          Earning streams detected. This wallet is tied to an active Vault.
        </p>
        <p className="text-[#ECECEC] text-sm sm:text-base md:text-lg leading-relaxed mb-7 tracking-[0.08em] animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "both" }}>
          Below is a list of vaults connected to the whale's address:
        </p>
      </div>
    </div>
  );
}
