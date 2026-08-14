/* ChordNesia / Arsip Nada Editorial: katalog lagu asimetris, tipografi editorial, aksen brick-red sebagai indeks musik. */
import { Link } from "wouter";
import { ArrowDownRight, ChevronDown, Moon, Search, SlidersHorizontal, Sun } from "lucide-react";
import { useMemo, useState } from "react";

const songs = [
  { slug: "mata-indahmu", title: "Mata Indahmu", artist: "ChordNesia Session", key: "C", genre: "Pop akustik", difficulty: "Pemula", minutes: "03:42", featured: true },
  { slug: "pulang-pelan", title: "Pulang Pelan", artist: "Ruang Senja", key: "G", genre: "Folk", difficulty: "Menengah", minutes: "04:12", featured: false },
  { slug: "bertemu-lagi", title: "Bertemu Lagi", artist: "Pagi Hari", key: "D", genre: "Pop", difficulty: "Pemula", minutes: "03:18", featured: false },
  { slug: "dalam-satu-lagu", title: "Dalam Satu Lagu", artist: "Kamar Tiga", key: "Am", genre: "Indie", difficulty: "Menengah", minutes: "04:01", featured: false },
  { slug: "ruang-tenang", title: "Ruang Tenang", artist: "Titik Temu", key: "E", genre: "Folk", difficulty: "Lanjutan", minutes: "05:03", featured: false },
];

const filters = ["Semua", "Pemula", "Menengah", "Lanjutan"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [isDark, setIsDark] = useState(false);
  const visibleSongs = useMemo(() => songs.filter((song) => {
    const matchesQuery = `${song.title} ${song.artist} ${song.genre}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = activeFilter === "Semua" || song.difficulty === activeFilter;
    return matchesQuery && matchesFilter;
  }), [query, activeFilter]);

  const setTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("chordnesia-dark", next);
  };

  return (
    <div className="app-shell home-shell">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="ChordNesia beranda">
          <img src="/manus-storage/chordnesia-mark_5da2b96b.png" alt="" className="brand-mark" />
          <span className="brand-word"><i>Chord</i><b>Nesia</b></span>
        </Link>
        <nav className="header-actions" aria-label="Navigasi utama">
          <a className="library-link active-nav" href="#katalog">Katalog</a>
          <a className="library-link" href="#tentang">Tentang</a>
          <button className="icon-button" aria-label="Ganti tema" onClick={setTheme}>{isDark ? <Sun size={18} /> : <Moon size={18} />}</button>
        </nav>
      </header>

      <main>
        <section className="home-hero">
          <div className="hero-copy">
            <p className="eyebrow accent">CHORDNESIA / ARSIP KORD GITAR</p>
            <h1>Buka lagu.<br /><em>Petik</em> bagian<br />favoritmu.</h1>
            <p className="hero-intro">Koleksi kord gitar yang disusun untuk dibaca cepat, dimainkan nyaman, dan dipindahkan nadanya tanpa memutus alur.</p>
            <a href="#katalog" className="hero-link">Jelajahi katalog <ArrowDownRight size={20} /></a>
          </div>
          <div className="hero-art" role="img" aria-label="Gitar akustik dan arsip notasi musik"><div className="plate-index">PLATE / 01<br />CAT. CN–A01</div><div className="hero-serial">VOL. 01<br />PLAY / READ</div></div>
        </section>

        <section id="katalog" className="catalog-section">
          <div className="catalog-heading"><div><p className="eyebrow">KATALOG LAGU / FILE INDEX 01</p><h2>Temukan progresi<br />yang ingin kamu mainkan.</h2></div><p className="catalog-count"><strong>{visibleSongs.length.toString().padStart(2, "0")}</strong> lagu terpilih<br />untuk sesi ini</p></div>
          <div className="catalog-tools">
            <label className="catalog-search"><Search size={18} /><input placeholder="Cari judul, artis, atau genre" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
            <div className="filter-row" aria-label="Filter tingkat kesulitan"><SlidersHorizontal size={16} />{filters.map((filter) => <button key={filter} className={activeFilter === filter ? "filter-button active" : "filter-button"} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
          </div>
          <div className="song-list">
            {visibleSongs.map((song, index) => <Link href={`/lagu/${song.slug}`} className="song-row" key={song.slug}>
              <span className="song-number">{(index + 1).toString().padStart(2, "0")}</span>
              <div className="song-title"><strong>{song.title}</strong><span>{song.artist}</span></div>
              <span className="song-genre">{song.genre}</span>
              <span className="song-key">{song.key}</span>
              <span className="song-level"><i className={`level-mark ${song.difficulty.toLowerCase()}`} />{song.difficulty}</span>
              <span className="song-time">{song.minutes}</span>
              <ArrowDownRight className="song-arrow" size={19} />
            </Link>)}
            {!visibleSongs.length && <div className="empty-catalog">Tidak ada lagu yang cocok. Coba kata kunci atau tingkat kesulitan lain.</div>}
          </div>
        </section>

        <section id="tentang" className="home-note"><span>CHORDNESIA</span><p><strong>Format yang rapi.</strong> Kord selalu berada di atas lirik, siap untuk transpose dan sesi scroll tanpa distraksi.</p><ChevronDown size={18} /></section>
      </main>
    </div>
  );
}
