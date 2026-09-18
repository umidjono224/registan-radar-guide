import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translate, type Lang } from "./i18n";

export type Connectivity = "online" | "offline" | "syncing" | "downloading" | "updating";
export type PackState = "ready" | "not_downloaded" | "downloading" | "update" | "failed" | "no_storage";

export interface HistoryItem { placeId: string; at: number }

interface Store {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string>) => string;
  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
  connectivity: Connectivity;
  setConnectivity: (c: Connectivity) => void;
  favourites: string[];
  toggleFavourite: (id: string) => void;
  history: HistoryItem[];
  pushHistory: (id: string) => void;
  clearHistory: () => void;
  subscription: { active: boolean; expiresAt: number | null; planId: string | null };
  setSubscription: (s: Store["subscription"]) => void;
  pack: PackState;
  setPack: (p: PackState) => void;
  hydrated: boolean;
}

const Ctx = createContext<Store | null>(null);
const KEY = "registon-guide-v1";

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uz");
  const [theme, setThemeState] = useState<"dark" | "light">("dark");
  const [connectivity, setConnectivity] = useState<Connectivity>("offline");
  const [favourites, setFavourites] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [subscription, setSubscription] = useState<Store["subscription"]>({ active: false, expiresAt: null, planId: null });
  const [pack, setPack] = useState<PackState>("ready");
  const [hydrated, setHydrated] = useState(false);

  // Local-first persistence (stands in for the on-device database).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.lang) setLangState(s.lang);
        if (s.theme) setThemeState(s.theme);
        if (s.favourites) setFavourites(s.favourites);
        if (s.history) setHistory(s.history);
        if (s.subscription) setSubscription(s.subscription);
        if (s.pack) setPack(s.pack);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ lang, theme, favourites, history, subscription, pack }));
  }, [lang, theme, favourites, history, subscription, pack, hydrated]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.lang = lang === "en" ? "en-GB" : lang === "ru" ? "ru-RU" : "uz-UZ";
  }, [theme, lang]);

  const t = useCallback((k: string, vars?: Record<string, string>) => translate(lang, k, vars), [lang]);

  const value = useMemo<Store>(() => ({
    lang, setLang: setLangState, t,
    theme, setTheme: setThemeState,
    connectivity, setConnectivity,
    favourites,
    toggleFavourite: (id) => setFavourites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
    history,
    pushHistory: (id) => setHistory((h) => [{ placeId: id, at: Date.now() }, ...h.filter((x) => x.placeId !== id)].slice(0, 30)),
    clearHistory: () => setHistory([]),
    subscription, setSubscription,
    pack, setPack,
    hydrated,
  }), [lang, t, theme, connectivity, favourites, history, subscription, pack, hydrated]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp outside AppProvider");
  return v;
}
