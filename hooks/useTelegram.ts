"use client";

import { useEffect, useMemo } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        colorScheme?: "light" | "dark";
        themeParams?: Record<string, unknown>;
        setHeaderColor?: (color: string) => void;
        setBackgroundColor?: (color: string) => void;
        disableVerticalSwipes?: () => void;
        expand?: () => void;
      };
    };
  }
}

export function useTelegram() {
  const tg = useMemo(() => window?.Telegram?.WebApp, []);

  useEffect(() => {
    try {
      tg?.ready?.();
      tg?.expand?.();
      // Keep Telegram chrome consistent with final black theme if supported
      tg?.setBackgroundColor?.("#000000");
      tg?.setHeaderColor?.("#000000");
      tg?.disableVerticalSwipes?.();
    } catch {}
  }, [tg]);

  return { tg };
}
