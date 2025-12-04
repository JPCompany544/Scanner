"use client";

import Header from "@/components/Header";
import InputBar from "@/components/InputBar";
import ScanButton from "@/components/ScanButton";
import RitualAnimation from "@/components/RitualAnimation";
import ResultPanel from "@/components/ResultPanel";
import Paywall from "@/components/Paywall";
import { useTelegram } from "@/hooks/useTelegram";
import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Tracking component for page views
function TrackPageView() {
  useEffect(() => {
    const notify = async () => {
      try {
        await fetch("/api/tracker", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page: window.location.href }),
        });
      } catch (err) {
        console.error("Failed to notify tracker:", err);
      }
    };
    notify();
  }, []);

  return null;
}

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

type ViewType = 'scanner' | 'paywall' | 'results';

type ScanResult = 'hot' | 'cold' | null;

function VaultScannerPageContent() {
  useTelegram();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Track page view on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const trackPageView = async () => {
      console.log('📡 Sending tracking request to /api/tracker...');
      try {
        const response = await fetch('/api/tracker', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ 
            page: window.location.href,
            pathname: window.location.pathname,
            referrer: document.referrer || 'direct',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            language: navigator.language,
            screen: {
              width: window.screen.width,
              height: window.screen.height,
              colorDepth: window.screen.colorDepth,
              pixelRatio: window.devicePixelRatio || 1
            },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            platform: navigator.platform,
            doNotTrack: navigator.doNotTrack === '1' || false,
            cookiesEnabled: navigator.cookieEnabled,
            hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
            deviceMemory: (navigator as any).deviceMemory || 'unknown',
            connection: (navigator as any).connection ? {
              effectiveType: (navigator as any).connection.effectiveType,
              downlink: (navigator as any).connection.downlink,
              rtt: (navigator as any).connection.rtt,
              saveData: (navigator as any).connection.saveData
            } : 'unsupported'
          }),
        });
        
        const responseText = await response.text();
        let responseData;
        try {
          responseData = responseText ? JSON.parse(responseText) : {};
        } catch (e) {
          console.error('❌ Failed to parse JSON response:', responseText);
          responseData = { raw: responseText };
        }
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        console.log('✅ Page view tracked successfully:', responseData);
        return responseData;
      } catch (error) {
        console.error('❌ Error tracking page view:', {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        });
        throw error;
      }
    };

    // Add a small delay to ensure the page is fully loaded
    const timer = setTimeout(() => {
      trackPageView().catch(console.error);
    }, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  // State management
  const [view, setView] = useState<ViewType>('scanner');
  const [animating, setAnimating] = useState(false);
  const [addressInput, setAddressInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [requestedAddress, setRequestedAddress] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // On mount, check URL to restore results when navigating back from /vaults
    const v = searchParams?.get("view");
    const addr = searchParams?.get("addr") || null;
    if (v === "results") {
      setView("results");
      setRequestedAddress(addr);
      setScanResult("hot");
      setAnimating(false);
    } else {
      setView("scanner");
      setRequestedAddress(null);
      setAddressInput("");
      setCodeInput("");
      setScanResult(null);
      setAnimating(false);
    }
  }, [searchParams]);

  const startScanAfterUnlock = () => {
    setView("results");
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      setScanResult("hot");
    }, 2800);
  };

  const onScanClick = () => {
    setRequestedAddress(addressInput);
    setView("paywall");
  };

  const onUnlock = (code: string) => {
    const ok = code.trim() === "1234";
    if (ok) startScanAfterUnlock();
    return ok;
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center px-4 bg-[#000000] text-[#ECECEC] font-sans animate-page-in selection:bg-[#C3162C] selection:text-[#ECECEC] scroll-smooth">
      {view === "results" && animating && (
        <div className="pointer-events-none absolute inset-0 bg-black animate-dim-pulse" />
      )}
      {/* Scanner view (home) */}
      {view === "scanner" && (
        <div className="w-full min-h-[100dvh] flex items-center justify-center">
          <div className="relative z-10 w-full max-w-[420px] border border-[#C3162C] bg-gradient-to-b from-[#000000] via-[#000000] to-[#000000] px-6 py-10 animate-panel-reveal">
            <Header />
            <div className="space-y-5">
              <InputBar onChange={(v) => setAddressInput(v)} />
              <ScanButton onClick={onScanClick} />
            </div>
          </div>
        </div>
      )}

      {/* Paywall modal */}
      {view === "paywall" && (
        <div className="fixed inset-0 z-50">
          <Paywall
            onUnlock={(code) => {
              setCodeInput(code);
              return onUnlock(code);
            }}
          />
        </div>
      )}

      {/* Results view */}
      {view === "results" && (
        <div className="relative z-10 w-full flex flex-col items-center gap-6">
          {animating && (
            <div className="w-full max-w-[420px]">
              <RitualAnimation />
            </div>
          )}
          {!animating && (
            <>
              <ResultPanel
                address={requestedAddress}
                onEnter={() => {
                  const el = listRef.current;
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                onBack={() => {
                  router.replace("/");
                  setAddressInput("");
                  setRequestedAddress(null);
                  setScanResult(null);
                  setView("scanner");
                }}
              />
              <div
                ref={listRef}
                id="vaults-list"
                className="w-full max-w-2xl border border-[#C3162C] bg-[#000000] p-6 md:p-8 animate-panel-reveal"
              >
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
                          <h2 className="text-[#C3162C] text-sm font-semibold tracking-[0.2em] uppercase">{v.name}</h2>
                          <p className="mt-2 text-[#949191] text-xs tracking-[0.08em]">Status: {v.status}</p>
                          <p className="text-[#949191] text-xs tracking-[0.08em]">Yield: {v.yield}</p>
                        </div>
                      </div>
                      <div className="mt-5">
                        <button
                          onClick={() => {
                            if (typeof window !== "undefined") {
                              window.open(
                                "https://vault-fi-3y63.vercel.app/app/vaults/solis-yield-vault",
                                "_blank"
                              );
                            }
                          }}
                          className="w-full border border-[#C3162C] bg-[#000000] text-[#ECECEC] py-2 text-[0.75rem] font-semibold tracking-[0.22em] uppercase transition-colors duration-150 hover:border-[#E8173A] hover:shadow-[0_0_0_6px_rgba(195,22,44,0.12)] active:scale-95"
                        >
                          ENTER VAULT
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}

export default function VaultScannerPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen w-full flex flex-col items-center px-4 bg-[#000000] text-[#ECECEC] font-sans">
        <div className="w-full max-w-[420px] border border-[#C3162C] bg-gradient-to-b from-[#000000] via-[#000000] to-[#000000] px-6 py-10 animate-panel-reveal">
          <div className="text-center">
            <p className="text-[#949191] text-sm">Loading...</p>
          </div>
        </div>
      </main>
    }>
      <VaultScannerPageContent />
    </Suspense>
  );
}
