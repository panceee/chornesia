/* RiffForge / chrome aplikasi: navigasi desktop dan mobile dengan akses langsung ke Koleksi. */
import { Compass, Guitar, Heart, Home, Search, UserRound } from "lucide-react";
import { Link, useLocation } from "wouter";

export function SiteHeader() {
  const [location] = useLocation();
  return <header className="riff-header"><Link className="riff-brand" href="/"><span className="riff-mark">♬</span><strong>ChordNesia</strong></Link><nav className="riff-desktop-nav"><Link className={location === "/" ? "active" : ""} href="/">Beranda</Link><a href="/#explore">Jelajah</a><Link className={location === "/collections" ? "active" : ""} href="/collections"><Heart size={15} /> Favorit</Link></nav><Link className="header-search-link" href="/#search"><Search size={16} /><span>Cari lagu atau artis</span></Link><button className="profile-button" aria-label="Buka profil"><UserRound size={18} /></button></header>;
}

export function MobileBottomNav() {
  const [location] = useLocation(); const isPractice = location.startsWith("/latihan"); const isDetail = location.startsWith("/lagu");
  return <nav className="mobile-bottom-nav" aria-label="Navigasi utama mobile"><Link className={location === "/" ? "active" : ""} href="/"><Home size={18} /><span>Beranda</span></Link><a href="/#explore"><Compass size={18} /><span>Jelajah</span></a><Link className={isPractice || isDetail ? "active" : ""} href="/latihan/mata-indahmu"><Guitar size={18} /><span>Latihan</span></Link><Link className={location === "/collections" ? "active" : ""} href="/collections"><Heart size={18} /><span>Koleksi</span></Link></nav>;
}
