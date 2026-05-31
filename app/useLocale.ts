"use client";

import { useEffect, useState } from "react";

export type Locale = "en" | "zh";

const STORAGE_KEY = "siriusception-locale";
const DEFAULT_LOCALE: Locale = "en";

function normalizeLocale(value: string | null): Locale | null {
  return value === "en" || value === "zh" ? value : null;
}

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = normalizeLocale(window.localStorage.getItem(STORAGE_KEY));
    if (saved) {
      setLocaleState(saved);
      document.documentElement.lang = saved === "zh" ? "zh-CN" : "en";
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale === "zh" ? "zh-CN" : "en";
  };

  return [locale, setLocale] as const;
}
