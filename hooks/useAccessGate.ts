"use client";

import { useCallback, useState } from "react";

export function useAccessGate() {
  const [unlocked, setUnlocked] = useState(false);

  const unlock = useCallback(() => setUnlocked(true), []);
  const lock = useCallback(() => setUnlocked(false), []);

  const validateCode = useCallback(
    (code: string) => {
      const ok = code.trim() === "1234";
      if (ok) unlock();
      return ok;
    },
    [unlock]
  );

  return { unlocked, unlock, lock, validateCode };
}
