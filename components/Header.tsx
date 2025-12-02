"use client";

export default function Header() {
  return (
    <header className="w-full text-center mb-10 select-none">
      <h1
        className="text-2xl md:text-3xl font-semibold tracking-[0.35em] text-[#ECECEC] uppercase animate-fade-in"
        style={{
          textShadow: "0 0 12px rgba(195, 22, 44, 0.18)",
          letterSpacing: "0.35em",
        }}
      >
        VAULT HEAT SCANNER
      </h1>
      <p className="mt-2 text-[0.7rem] md:text-xs tracking-[0.25em] text-[#949191] uppercase">
        Whisper Node 01
      </p>
    </header>
  );
}
