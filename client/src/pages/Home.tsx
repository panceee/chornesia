/* ChordNesia / Arsip Nada Editorial: homepage discovery dengan filter katalog lokal, chart live, record cards, dan footer brand. */
import { Link } from "wouter";
import { AlertCircle, ArrowDownRight, ChevronRight, Moon, Music2, Plus, RefreshCw, SlidersHorizontal, Sun, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import SearchBar from "@/components/SearchBar";

type Song = { slug: string; title: string; artist: string; genre: string; difficulty: string; key: string; added: string };
type ChartEntry = { "im:name"?: { label?: string }; "im:artist"?: { label?: string }; "im:image"?: Array<{ label?: string }>; category?: { attributes?: { label?: string } }; link?: Array<{ attributes?: { href?: string; rel?: string } }> };
type ChartPayload = { feed?: { entry?: ChartEntry[] } };
type TrendingSong = { id: string; title: string; artist: string; genre: string; imageUrl: string; url: string };

const TRENDING_API_URL = import.meta.env.VITE_TRENDING_SONGS_API_URL || "https://itunes.apple.com/us/rss/topsongs/limit=10/json";
const genres = ["Pop", "Rock", "Indie", "Folk", "Dangdut", "Jazz", "Religi", "Nostalgia"];
const difficulties = ["Sangat Mudah", "Mudah", "Menengah"];
const songs: Song[] = [
  { slug: "mata-indahmu", title: "Mata Indahmu", artist: "ChordNesia Session", genre: "Pop", difficulty: "Sangat Mudah", key: "C", added: "Hari ini" },
  { slug: "pulang-pelan", title: "Pulang Pelan", artist: "Ruang Senja", genre: "Indie", difficulty: "Mudah", key: "G", added: "Hari ini" },
  { slug: "lampu-jalan", title: "Lampu Jalan", artist: "Pagi Hari", genre: "Rock", difficulty: "Mudah", key: "D", added: "Kemarin" },
  { slug: "dalam-satu-lagu", title: "Dalam Satu Lagu", artist: "Kamar Tiga", genre: "Folk", difficulty: "Menengah", key: "Am", added: "Kemarin" },
  { slug: "ruang-tenang", title: "Ruang Tenang", artist: "Titik Temu", genre: "Jazz", difficulty: "Menengah", key: "E", added: "12 Agu" },
  { slug: "surat-kecil", title: "Surat Kecil", artist: "Lorong Kota", genre: "Nostalgia", difficulty: "Sangat Mudah", key: "F", added: "11 Agu" },
  { slug: "ketika-berdoa", title: "Ketika Berdoa", artist: "Nada Pagi", genre: "Religi", difficulty: "Mudah", key: "C", added: "10 Agu" },
  { slug: "goyang-pelan", title: "Goyang Pelan", artist: "Lintas Irama", genre: "Dangdut", difficulty: "Sangat Mudah", key: "A", added: "09 Agu" },
];

function TrendingSkeleton() {
  return <Carousel opts={{ align: "start", containScroll: "trimSnaps" }} className="api-carousel" aria-label="Memuat lagu trending"><CarouselContent className="api-carousel-content" aria-busy="true">{Array.from({ length: 4 }).map((_, index) => <CarouselItem className="api-carousel-item" key={index}><div className="trending-skeleton"><Skeleton className="skeleton-cover" /><Skeleton className="skeleton-line long" /><Skeleton className="skeleton-line short" /><Skeleton className="skeleton-line key" /></div></CarouselItem>)}</CarouselContent><CarouselPrevious className="api-carousel-nav api-carousel-prev" /><CarouselNext className="api-carousel-nav api-carousel-next" /></Carousel>;
}

function ApiTrendingCard({ song, index }: { song: TrendingSong; index: number }) {
  return <a className="api-trending-card" href={song.url} target="_blank" rel="noreferrer"><div className="api-card-top"><span>CHART / {String(index + 1).padStart(2, "0")}</span><ArrowDownRight size={17} /></div><div className="api-cover">{song.imageUrl ? <img src={song.imageUrl} alt="" /> : <Music2 size={25} />}</div><div className="api-card-copy"><h3>{song.title}</h3><p>{song.artist}</p></div><div className="api-card-meta"><span>{song.genre}</span><span>IMPORTED</span></div><div className="api-practice-status"><i /><span>REFERENSI TRENDING</span><b>—</b></div></a>;
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return <>{text.split(new RegExp(`(${escaped})`, "ig")).map((part, index) => part.toLowerCase() === query.toLowerCase() ? <mark key={`${part}-${index}`}>{part}</mark> : <span key={`${part}-${index}`}>{part}</span>)}</>;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDark, setIsDark] = useState(false);
  const [trendingSongs, setTrendingSongs] = useState<TrendingSong[]>([]);
  const [trendingStatus, setTrendingStatus] = useState<"loading" | "success" | "error">("loading");
  const [trendingError, setTrendingError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  const results = useMemo(() => songs.filter((song) => {
    const matchesQuery = `${song.title} ${song.artist} ${song.genre}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenres.length || selectedGenres.includes(song.genre);
    const matchesDifficulty = !selectedDifficulties.length || selectedDifficulties.includes(song.difficulty);
    return matchesQuery && matchesGenre && matchesDifficulty;
  }), [searchQuery, selectedGenres, selectedDifficulties]);
  const newest = results.slice(0, 5);
  const activeFilterCount = selectedGenres.length + selectedDifficulties.length;
  const resultsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(results.length / resultsPerPage));
  const visibleSearchResults = results.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);
  const toggleTheme = () => { const next = !isDark; setIsDark(next); document.documentElement.classList.toggle("chordnesia-dark", next); };
  const handleDebouncedSearch = useCallback((value: string) => setSearchQuery(value), []);
  const toggleValue = (value: string, setValues: React.Dispatch<React.SetStateAction<string[]>>) => setValues((values) => values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  const clearFilters = () => { setSelectedGenres([]); setSelectedDifficulties([]); };
  const toastComingSoon = (label: string) => toast(`${label} sedang disiapkan`, { description: "Gunakan katalog dan pencarian untuk menemukan lagu sekarang." });

  useEffect(() => {
    const controller = new AbortController();
    const loadTrending = async () => {
      setTrendingStatus("loading");
      setTrendingError("");
      try {
        const response = await fetch(TRENDING_API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = await response.json() as ChartPayload;
        const mapped = payload.feed?.entry?.map((entry, index) => {
          const title = entry["im:name"]?.label || "Tanpa judul";
          const artist = entry["im:artist"]?.label || "Artis tidak tercantum";
          const alternate = entry.link?.find((item) => item.attributes?.rel === "alternate")?.attributes?.href;
          return { id: `${title}-${artist}-${index}`, title, artist, genre: entry.category?.attributes?.label || "Music", imageUrl: entry["im:image"]?.at(-1)?.label || "", url: alternate || entry.link?.[0]?.attributes?.href || "https://music.apple.com/" };
        }) || [];
        if (!mapped.length) throw new Error("Data chart kosong");
        setTrendingSongs(mapped);
        setTrendingStatus("success");
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setTrendingStatus("error");
        setTrendingError("Chart terbaru belum dapat dimuat. Periksa koneksi, lalu coba lagi.");
      }
    };
    loadTrending();
    return () => controller.abort();
  }, [retryKey]);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedGenres, selectedDifficulties]);

  return <div className="app-shell discovery-shell">
    <header className="site-header discovery-header"><Link className="brand" href="/" aria-label="ChordNesia beranda"><img src="/manus-storage/chordnesia-mark_5da2b96b.png" alt="" className="brand-mark" /><span className="brand-word"><i>Chord</i><b>Nesia</b></span></Link><nav className="main-nav" aria-label="Navigasi utama"><Link className="nav-item active" href="/">Home</Link><button className="nav-item" onClick={() => toastComingSoon("Daftar Artis A–Z")}>Daftar Artis (A–Z)</button><a className="nav-item" href="#filter-katalog">Genre</a><button className="request-nav" onClick={() => toastComingSoon("Request Kord")}><Plus size={15} /> Request Kord</button></nav><button className="icon-button theme-toggle" aria-label="Ganti tema" onClick={toggleTheme}>{isDark ? <Sun size={18} /> : <Moon size={18} />}</button></header>
    <main>
      <section className="discover-hero"><aside className="hero-index"><span>INDEX / 01</span><i /><span>{songs.length} RECORDS</span><i /><span>EST. 2026</span></aside><div className="hero-core"><div className="hero-stamp"><Music2 size={15} /><span>CHORDNESIA / CATALOGUE 01</span></div><p className="eyebrow accent">TEMUKAN LAGU UNTUK SESI BERIKUTNYA</p><h1>Kord yang tepat,<br /><em>untuk setiap</em> petikan.</h1><p className="discover-intro">Cari lagu berdasarkan judul, artis, atau genre. Baca kordnya, pindahkan key-nya, lalu mainkan dengan ritmemu sendiri.</p><SearchBar resultCount={results.length} onDebouncedChange={handleDebouncedSearch} onSubmit={() => document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth" })} /><a className="hero-action" href="#filter-katalog">Atur filter untuk sesi ini <ArrowDownRight size={17} /></a></div><div className="hero-accession"><span>ACC. NO.</span><strong>CN–0001</strong><small>READ / PLAY / REPEAT</small></div></section>

      {searchQuery && <section id="search-results" className="search-results-section" aria-live="polite"><div className="section-heading search-results-heading"><div><p className="eyebrow">HASIL PENCARIAN / 300MS DEBOUNCE</p><h2>Temuan untuk<br /><em>“{searchQuery}”</em></h2></div><span className="section-serial">HALAMAN<br /><strong>{String(currentPage).padStart(2, "0")}</strong></span></div>{visibleSearchResults.length ? <><div className="search-results-grid">{visibleSearchResults.map((song, index) => <Link className="search-result-card" href={`/lagu/${song.slug}`} key={song.slug}><div className="search-result-index">RESULT / {String((currentPage - 1) * resultsPerPage + index + 1).padStart(2, "0")} <ArrowDownRight size={16} /></div><div className="search-result-copy"><h3><HighlightMatch text={song.title} query={searchQuery} /></h3><p><HighlightMatch text={song.artist} query={searchQuery} /></p></div><div className="search-result-meta"><span>{song.genre}</span><span>{song.difficulty}</span><strong>{song.key}</strong></div></Link>)}</div>{totalPages > 1 && <nav className="search-pagination" aria-label="Pagination hasil pencarian"><button disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}>Sebelumnya</button>{Array.from({ length: totalPages }).map((_, index) => <button key={index} className={currentPage === index + 1 ? "active" : ""} onClick={() => setCurrentPage(index + 1)}>{String(index + 1).padStart(2, "0")}</button>)}<button disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}>Berikutnya</button></nav>}</> : <div className="search-empty"><SearchBar resultCount={0} onDebouncedChange={handleDebouncedSearch} onSubmit={() => undefined} /><div><strong>Tidak ada lagu yang cocok.</strong><p>Coba judul yang lebih pendek, nama artis, atau hapus salah satu filter katalog.</p></div></div>}</section>}

      <section id="filter-katalog" className="catalog-filter-section"><div className="filter-intro"><div><p className="eyebrow">FILTER KATALOG LOKAL</p><h2>Susun sesi<br />sesuai gayamu.</h2></div><div className="filter-summary"><span>HASIL TERPILIH</span><strong>{String(results.length).padStart(2, "0")}</strong><small>{activeFilterCount ? `${activeFilterCount} filter aktif` : "semua record"}</small></div></div><div className="filter-groups"><div className="filter-group"><div className="filter-group-label"><span>GENRE</span><small>8 pilihan</small></div><div className="filter-buttons">{genres.map((genre) => <button key={genre} className={selectedGenres.includes(genre) ? "catalog-filter active" : "catalog-filter"} onClick={() => toggleValue(genre, setSelectedGenres)} aria-pressed={selectedGenres.includes(genre)}>{genre}</button>)}</div></div><div className="filter-group"><div className="filter-group-label"><span>KESULITAN</span><small>3 pilihan</small></div><div className="filter-buttons">{difficulties.map((difficulty) => <button key={difficulty} className={selectedDifficulties.includes(difficulty) ? "catalog-filter difficulty-active" : "catalog-filter"} onClick={() => toggleValue(difficulty, setSelectedDifficulties)} aria-pressed={selectedDifficulties.includes(difficulty)}>{difficulty}</button>)}</div></div></div><div className="filter-footer"><p>Filter bekerja langsung pada katalog MVP. Saat endpoint katalog ditambahkan, pilihan ini siap diteruskan sebagai parameter pencarian.</p><button className="reset-filters" onClick={clearFilters} disabled={!activeFilterCount}><X size={14} /> Reset filter</button></div></section>

      <section id="genre" className="trending-section"><div className="section-heading"><div><p className="eyebrow">CHART IMPOR / REFERENSI LAGU GLOBAL</p><h2>Ambil inspirasi,<br />lalu cari kordnya.</h2></div><span className="section-serial">CHART<br /><strong>01</strong></span></div>{trendingStatus === "loading" && <TrendingSkeleton />}{trendingStatus === "error" && <div className="trending-error" role="alert"><AlertCircle size={21} /><div><strong>Data chart belum tersedia.</strong><span>{trendingError}</span></div><button onClick={() => setRetryKey((value) => value + 1)}><RefreshCw size={15} /> Coba lagi</button></div>}{trendingStatus === "success" && <Carousel opts={{ align: "start", containScroll: "trimSnaps" }} className="api-carousel" aria-label="Lagu trending dari chart musik"><CarouselContent className="api-carousel-content">{trendingSongs.map((song, index) => <CarouselItem className="api-carousel-item" key={song.id}><ApiTrendingCard song={song} index={index} /></CarouselItem>)}</CarouselContent><CarouselPrevious className="api-carousel-nav api-carousel-prev" /><CarouselNext className="api-carousel-nav api-carousel-next" /></Carousel>}<p className="api-source-note">Data impor dipakai sebagai referensi tren. Katalog utama ChordNesia tetap mengutamakan lagu dan sesi kord untuk gitaris Indonesia.</p></section>

      <section className="newest-section"><div className="section-heading newest-heading"><div><p className="eyebrow">INDEKS MASUK TERBARU</p><h2>Baru ditambahkan.</h2></div><SlidersHorizontal size={18} /></div><div className="newest-table" role="table" aria-label="Daftar lagu terbaru"><div className="newest-head" role="row"><span>NO.</span><span>JUDUL / ARTIS</span><span>GENRE</span><span>KEY</span><span>DITAMBAHKAN</span><span /></div>{newest.map((song, index) => <Link href={`/lagu/${song.slug}`} className="newest-row" key={song.slug} role="row"><span className="newest-number">{String(index + 1).padStart(2, "0")}</span><span className="newest-song"><strong>{song.title}</strong><small>{song.artist}</small></span><span className="newest-genre">{song.genre}</span><span className="newest-key">{song.key}</span><span className="newest-added">{song.added}</span><ChevronRight className="newest-arrow" size={18} /></Link>)}{!newest.length && <div className="catalog-empty">Tidak ada record yang sesuai. Kurangi satu filter atau reset pilihanmu.</div>}</div></section>
    </main>
    <footer className="brand-footer"><div className="footer-identity"><Link className="brand" href="/"><img src="/manus-storage/chordnesia-mark_5da2b96b.png" alt="" className="brand-mark" /><span className="brand-word"><i>Chord</i><b>Nesia</b></span></Link><p>Arsip kord gitar untuk sesi latihan yang lebih tenang, presisi, dan mudah dimainkan.</p></div><div id="tentang" className="footer-column"><span>TENTANG</span><a href="#filter-katalog">Katalog kord</a><a href="#genre">Chart referensi</a><a href="#panduan">Panduan format</a></div><div id="kontak" className="footer-column"><span>TERHUBUNG</span><button onClick={() => toastComingSoon("Request Kord")}>Request Kord</button><button onClick={() => toastComingSoon("Contact")}>Contact</button><a href="#top">Kembali ke atas</a></div><div id="panduan" className="footer-stamp"><span>CHORDNESIA</span><strong>READ<br />PLAY<br />REPEAT</strong></div></footer>
  </div>;
}
