/* ChordNesia / Arsip Nada Editorial: search field besar dengan debounce tenang, status hasil ringkas, dan aksi cari eksplisit. */
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

type SearchBarProps = {
  resultCount: number;
  onDebouncedChange: (value: string) => void;
  onSubmit: () => void;
  delay?: number;
};

export default function SearchBar({ resultCount, onDebouncedChange, onSubmit, delay = 300 }: SearchBarProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => onDebouncedChange(value.trim()), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay, onDebouncedChange]);

  return <form className="searchbar-component" role="search" onSubmit={(event) => { event.preventDefault(); onDebouncedChange(value.trim()); onSubmit(); }}>
    <Search size={22} aria-hidden="true" />
    <input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Cari judul lagu atau nama artis..." aria-label="Cari lagu atau artis" />
    {value && <button type="button" className="searchbar-clear" onClick={() => setValue("")} aria-label="Hapus pencarian"><X size={15} /></button>}
    <span>{resultCount.toString().padStart(2, "0")} hasil</span>
    <button type="submit" className="searchbar-submit">Cari</button>
  </form>;
}
