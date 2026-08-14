/* RiffForge / koleksi MVP: penyimpanan favorit lokal yang siap diganti endpoint pengguna pada tahap produksi. */
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "chordnesia:favorites";

function readFavorites() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch { return []; }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { setFavorites(readFavorites()); setReady(true); }, []);
  useEffect(() => { if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)); }, [favorites, ready]);
  const toggleFavorite = useCallback((slug: string) => setFavorites((items) => items.includes(slug) ? items.filter((item) => item !== slug) : [...items, slug]), []);
  const removeFavorite = useCallback((slug: string) => setFavorites((items) => items.filter((item) => item !== slug)), []);
  return { favorites, ready, toggleFavorite, removeFavorite };
}
