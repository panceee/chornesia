/* RiffForge / chrome aplikasi: navigasi dan toggle tema global yang tersedia pada setiap halaman. */
import { Compass, Guitar, Heart, Home, Moon, Search, Sun, UserRound } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

export function SiteHeader() {
  const [location] = useLocation(); const { theme, toggleTheme } = useTheme();
  return <header className="riff-header"><Link className="riff-brand" href="/"><span className="riff-mark">♬</span><strong>ChordNesia</strong></Link><nav className="riff-desktop-nav"><Link className={location === "/" ? "active" : ""} href="/">Beranda</Link><a href="/#explore">Jelajah</a><Link className={location === "/collections" ? "active" : ""} href="/collections"><Heart size={15} /> Favorit</Link></nav><Link className="header-search-link" href="/#search"><Search size={16} /><span>Cari lagu atau artis</span></Link><div className="header-utilities"><button className={theme === "dark" ? "global-theme-toggle active" : "global-theme-toggle"} onClick={toggleTheme} aria-label={theme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode malam"} title={theme === "dark" ? "Mode terang" : "Mode malam"}>{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}<span>{theme === "dark" ? "Terang" : "Malam"}</span></button><button className="profile-button" aria-label="Buka profil"><UserRound size={18} /></button></div></header>;
}

export function MobileBottomNav() {
  const [location] = useLocation(); const isPractice = location.startsWith("/latihan"); const isDetail = location.startsWith("/lagu");
  return <nav className="mobile-bottom-nav" aria-label="Navigasi utama mobile"><Link className={location === "/" ? "active" : ""} href="/"><Home size={18} /><span>Beranda</span></Link><a href="/#explore"><Compass size={18} /><span>Jelajah</span></a><Link className={isPractice || isDetail ? "active" : ""} href="/latihan/mata-indahmu"><Guitar size={18} /><span>Latihan</span></Link><Link className={location === "/collections" ? "active" : ""} href="/collections"><Heart size={18} /><span>Koleksi</span></Link></nav>;
}
