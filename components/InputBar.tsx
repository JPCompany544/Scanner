"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function InputBar({ value, onChange, hasError = false, onFocus, onBlur }: Props) {
  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Paste any whale address…"
        className={`w-full bg-[#000000] border ${
          hasError ? 'border-red-500' : 'border-[#C3162C]'
        } py-3 px-4 text-[#ECECEC] placeholder-[#949191] text-xs tracking-[0.18em] uppercase focus:outline-none focus:border-[#C3162C] animate-input-border-pulse`}
        style={{ caretColor: "#C3162C" }}
        aria-invalid={hasError}
        aria-describedby={hasError ? 'address-error' : undefined}
      />
    </div>
  );
}
