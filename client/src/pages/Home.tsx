/* ChordNesia / Arsip Nada Editorial: homepage discovery berpusat pada pencarian, quick filters, Song Card, dan indeks lagu terbaru. */
import { Link } from "wouter";
import { ArrowDownRight, ChevronRight, Moon, Music2, Plus, Search, SlidersHorizontal, Sun } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type Song = {
  slug: string;
  title: string;
  artist: string;
  genre: string;
  difficulty: string;
  key: string;
  added: string;
  tags: string[];
};

const songs: Song[] = [
  { slug: "mata-indahmu", title: "Mata Indahmu", artist: "ChordNesia Session", genre: "Pop", difficulty: "Sangat Mudah", key: "C", added: "Hari ini", tags: ["pop", "beginner"] },
  { slug: "pulang-pelan", title: "Pulang Pelan", artist: "Ruang Senja", genre: "Indie", difficulty: "Mudah", key: "G", added: "Hari ini", tags: ["indie", "beginner"] },
  { slug: "lampu-jalan", title: "Lampu Jalan", artist: "Pagi Hari", genre: "Pop", difficulty: "Mudah", key: "D", added: "Kemarin", tags: ["pop", "nostalgia"] },
  { slug: "dalam-satu-lagu", title: "Dalam Satu Lagu", artist: "Kamar Tiga", genre: "Indie", difficulty: "Menengah", key: "Am", added: "Kemarin", tags: ["indie"] },
  { slug: "ruang-tenang", title: "Ruang Tenang", artist: "Titik Temu", genre: "Folk", difficulty: "Menengah", key: "E", added: "12 Agu", tags: [] },
  { slug: "surat-kecil", title: "Surat Kecil", artist: "Lorong Kota", genre: "Nostalgia", difficulty: "Sangat Mudah", key: "F", added: "11 Agu", tags: ["nostalgia", "beginner"] },
];

const quickFilters = [
  { label: "Pop Hits", tag: "pop" },
  { label: "Indie Lokal", tag: "indie" },
  { label: "Kord Pemula", tag: "beginner" },
  { label: "Lagu Nostalgia", tag: "nostalgia" },
];

function SongCard({ song, index }: { song: Song; index: number }) {
  return <Link href={`/lagu/${song.slug}`} className="discover-card">
    <div className="card-index"><span>{String(index + 1).padStart(2, "0")}</span><ArrowDownRight size={18} /></div>
    <div className="card-copy"><h3>{song.title}</h3><p>{song.artist}</p></div>
    <div className="card-badges"><span className="genre-badge">{song.genre}</span><span className={`difficulty-badge difficulty-${song.difficulty.toLowerCase().replace(" ", "-")}`}>{song.difficulty}</span></div>
    <div className="card-key"><span>ORIGINAL KEY</span><strong>{song.key}</strong></div>
  </Link>;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const results = useMemo(() => songs.filter((song) => {
    const searchable = `${song.title} ${song.artist} ${song.genre}`.toLowerCase();
    return searchable.includes(query.toLowerCase()) && (!activeTag || song.tags.includes(activeTag));
  }), [query, activeTag]);
  const trending = results.slice(0, 4);
  const newest = results.slice(0, 5);
  const toggleTheme = () => { const next = !isDark; setIsDark(next); document.documentElement.classList.toggle("chordnesia-dark", next); };
  const toastComingSoon = (label: string) => toast(`${label} sedang disiapkan`, { description: "Gunakan katalog dan pencarian untuk menemukan lagu sekarang." });

  return <div className="app-shell discovery-shell">
    <header className="site-header discovery-header">
      <Link className="brand" href="/" aria-label="ChordNesia beranda"><img src="/manus-storage/chordnesia-mark_5da2b96b.png" alt="" className="brand-mark" /><span className="brand-word"><i>Chord</i><b>Nesia</b></span></Link>
      <nav className="main-nav" aria-label="Navigasi utama"><Link className="nav-item active" href="/">Home</Link><button className="nav-item" onClick={() => toastComingSoon("Daftar Artis A–Z")}>Daftar Artis (A–Z)</button><a className="nav-item" href="#genre">Genre</a><button className="request-nav" onClick={() => toastComingSoon("Request Kord")}><Plus size={15} /> Request Kord</button></nav>
      <button className="icon-button theme-toggle" aria-label="Ganti tema" onClick={toggleTheme}>{isDark ? <Sun size={18} /> : <Moon size={18} />}</button>
    </header>

    <main>
      <section className="discover-hero">
        <aside className="hero-index"><span>INDEX / 01</span><i /><span>6 RECORDS</span><i /><span>EST. 2026</span></aside>
        <div className="hero-core"><div className="hero-stamp"><Music2 size={15} /><span>CHORDNESIA / CATALOGUE 01</span></div><p className="eyebrow accent">TEMUKAN LAGU UNTUK SESI BERIKUTNYA</p><h1>Kord yang tepat,<br /><em>untuk setiap</em> petikan.</h1><p className="discover-intro">Cari lagu berdasarkan judul, artis, atau genre. Baca kordnya, pindahkan key-nya, lalu mainkan dengan ritmemu sendiri.</p><form className="big-search" role="search" onSubmit={(event) => { event.preventDefault(); document.getElementById("genre")?.scrollIntoView({ behavior: "smooth" }); }}><Search size={24} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari judul lagu atau nama artis..." aria-label="Cari lagu atau artis" /><span>{results.length.toString().padStart(2, "0")} hasil</span><button type="submit" className="hero-search-button">Cari</button></form><div className="quick-filters" aria-label="Filter cepat"><span>FILTER CEPAT</span>{quickFilters.map((filter) => <button key={filter.tag} className={activeTag === filter.tag ? "quick-filter active" : "quick-filter"} onClick={() => setActiveTag(activeTag === filter.tag ? null : filter.tag)}>{filter.label}</button>)}</div><a className="hero-action" href="#genre">Lihat lagu yang sedang ramai <ArrowDownRight size={17} /></a></div>
        <div className="hero-accession"><span>ACC. NO.</span><strong>CN–0001</strong><small>READ / PLAY / REPEAT</small></div>
      </section>

      <section id="genre" className="trending-section">
        <div className="section-heading"><div><p className="eyebrow">TRENDING / PALING BANYAK DIMAINKAN</p><h2>Mulai dari yang<br />sering dicari.</h2></div><span className="section-serial">PLAYLIST<br /><strong>01</strong></span></div>
        {trending.length ? <div className="song-card-grid">{trending.map((song, index) => <SongCard song={song} index={index} key={song.slug} />)}</div> : <div className="discovery-empty">Tidak ada lagu yang cocok dengan pencarian atau filter ini. <button onClick={() => { setQuery(""); setActiveTag(null); }}>Reset katalog</button></div>}
      </section>

      <section className="newest-section">
        <div className="section-heading newest-heading"><div><p className="eyebrow">INDEKS MASUK TERBARU</p><h2>Baru ditambahkan.</h2></div><SlidersHorizontal size={18} /></div>
        <div className="newest-table" role="table" aria-label="Daftar lagu terbaru"><div className="newest-head" role="row"><span>NO.</span><span>JUDUL / ARTIS</span><span>GENRE</span><span>KEY</span><span>DITAMBAHKAN</span><span /></div>{newest.map((song, index) => <Link href={`/lagu/${song.slug}`} className="newest-row" key={song.slug} role="row"><span className="newest-number">{String(index + 1).padStart(2, "0")}</span><span className="newest-song"><strong>{song.title}</strong><small>{song.artist}</small></span><span className="newest-genre">{song.genre}</span><span className="newest-key">{song.key}</span><span className="newest-added">{song.added}</span><ChevronRight className="newest-arrow" size={18} /></Link>)}</div>
      </section>
    </main>
  </div>;
}
