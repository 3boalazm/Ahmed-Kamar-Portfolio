"use client";

/**
 * PREFS — language (EN/AR) + theme (dark/light) in one provider.
 * Mirrors the OS's lang-provider + theme-provider, merged because the
 * mini site needs nothing else (no persona layer). The pre-hydration
 * script in app/layout.tsx applies the stored values to <html> first,
 * so a returning visitor never sees a flash of the wrong theme/dir.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Lang, L } from "@/lib/content";

type Theme = "dark" | "light";

interface Prefs {
  lang: Lang;
  theme: Theme;
  ar: boolean;
  toggleLang: () => void;
  toggleTheme: () => void;
  setLang: (l: Lang) => void;
  setTheme: (t: Theme) => void;
  /** Pick the active-language string from a bilingual pair. */
  t: (v: L) => string;
}

const Ctx = createContext<Prefs | null>(null);

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode — preference simply won't persist */
  }
}

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setThemeState] = useState<Theme>("dark");

  /* Adopt what the pre-hydration script already put on <html>. */
  useEffect(() => {
    const storedLang = safeGet("lang");
    const storedTheme = safeGet("theme");
    if (storedLang === "ar" || storedLang === "en") setLangState(storedLang);
    if (storedTheme === "light" || storedTheme === "dark") setThemeState(storedTheme);
    else if (window.matchMedia?.("(prefers-color-scheme: light)").matches) setThemeState("light");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
  }, [theme]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    safeSet("lang", l);
  }, []);
  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    safeSet("theme", t);
  }, []);

  const value = useMemo<Prefs>(
    () => ({
      lang,
      theme,
      ar: lang === "ar",
      setLang,
      setTheme,
      toggleLang: () => setLang(lang === "ar" ? "en" : "ar"),
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
      t: (v) => v[lang],
    }),
    [lang, theme, setLang, setTheme],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePrefs(): Prefs {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePrefs must be used inside <PrefsProvider>");
  return ctx;
}
