/* ChordNesia / Arsip Nada Editorial: homepage discovery dengan hero pencarian, chart live, record cards, dan indeks lagu terbaru. */
import { Link } from "wouter";
import { AlertCircle, ArrowDownRight, ChevronRight, Moon, Music2, Plus, RefreshCw, Search, SlidersHorizontal, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

type Song = { slug: string; title: string; artist: string; genre: string; difficulty: string; key: string; added: string; tags: string[] };
type ChartEntry = { "im:name"?: { label?: string }; "im:artist"?: { label?: string }; "im:image"?: Array<{ label?: string }>; category?: { attributes?: { label?: string } }; link?: Array<{ attributes?: { href?: string; rel?: string } }> };
type ChartPayload = { feed?: { entry?: ChartEntry[] } };
type TrendingSong = { id: string; title: string; artist: string; genre: string; imageUrl: string; url: string };

const TRENDING_API_URL = import.meta.env.VITE_TRENDING_SONGS_API_URL || "https://itunes.apple.com/us/rss/topsongs/limit=10/json";
const songs: Song[] = [
  { slug: "mata-indahmu", title: "Mata Indahmu", artist: "ChordNesia Session", genre: "Pop", difficulty: "Sangat Mudah", key: "C", added: "Hari ini", tags: ["pop", "beginner"] },
  { slug: "pulang-pelan", title: "Pulang Pelan", artist: "Ruang Senja", genre: "Indie", difficulty: "Mudah", key: "G", added: "Hari ini", tags: ["indie", "beginner"] },
  { slug: "lampu-jalan", title: "Lampu Jalan", artist: "Pagi Hari", genre: "Pop", difficulty: "Mudah", key: "D", added: "Kemarin", tags: ["pop", "nostalgia"] },
  { slug: "dalam-satu-lagu", title: "Dalam Satu Lagu", artist: "Kamar Tiga", genre: "Indie", difficulty: "Menengah", key: "Am", added: "Kemarin", tags: ["indie"] },
  { slug: "ruang-tenang", title: "Ruang Tenang", artist: "Titik Temu", genre: "Folk", difficulty: "Menengah", key: "E", added: "12 Agu", tags: [] },
  { slug: "surat-kecil", title: "Surat Kecil", artist: "Lorong Kota", genre: "Nostalgia", difficulty: "Sangat Mudah", key: "F", added: "11 Agu", tags: ["nostalgia", "beginner"] },
];
const quickFilters = [{ label: "Pop Hits", tag: "pop" }, { label: "Indie Lokal", tag: "indie" }, { label: "Kord Pemula", tag: "beginner" }, { label: "Lagu Nostalgia", tag: "nostalgia" }];

function TrendingSkeleton() {
  return <Carousel opts={{ align: "start", containScroll: "trimSnaps" }} className="api-carousel" aria-label="Memuat lagu trending"><CarouselContent className="api-carousel-content" aria-busy="true">{Array.from({ length: 4 }).map((_, index) => <CarouselItem className="api-carousel-item" key={index}><div className="trending-skeleton"><Skeleton className="skeleton-cover" /><Skeleton className="skeleton-line long" /><Skeleton className="skeleton-line short" /><Skeleton className="skeleton-line key" /></div></CarouselItem>)}</CarouselContent><CarouselPrevious className="api-carousel-nav api-carousel-prev" /><CarouselNext className="api-carousel-nav api-carousel-next" /></Carousel>;
}

function ApiTrendingCard({ song, index }: { song: TrendingSong; index: number }) {
  return <a className="api-trending-card" href={song.url} target="_blank" rel="noreferrer"><div className="api-card-top"><span>CHART / {String(index + 1).padStart(2, "0")}</span><ArrowDownRight size={17} /></div><div className="api-cover">{song.imageUrl ? <img src={song.imageUrl} alt="" /> : <Music2 size={25} />}</div><div className="api-card-copy"><h3>{song.title}</h3><p>{song.artist}</p></div><div className="api-card-meta"><span>{song.genre}</span><span>IMPORTED</span></div><div className="api-practice-status"><i /><span>REFERENSI TRENDING</span><b>—</b></div></a>;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [trendingSongs, setTrendingSongs] = useState<TrendingSong[]>([]);
  const [trendingStatus, setTrendingStatus] = useState<"loading" | "success" | "error">("loading");
  const [trendingError, setTrendingError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  const results = useMemo(() => songs.filter((song) => `${song.title} ${song.artist} ${song.genre}`.toLowerCase().includes(query.toLowerCase()) && (!activeTag || song.tags.includes(activeTag))), [query, activeTag]);
  const newest = results.slice(0, 5);
  const toggleTheme = () => { const next = !isDark; setIsDark(next); document.documentElement.classList.toggle("chordnesia-dark", next); };
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

  return <div className="app-shell discovery-shell">
    <header className="site-header discovery-header"><Link className="brand" href="/" aria-label="ChordNesia beranda"><img src="/manus-storage/chordnesia-mark_5da2b96b.png" alt="" className="brand-mark" /><span className="brand-word"><i>Chord</i><b>Nesia</b></span></Link><nav className="main-nav" aria-label="Navigasi utama"><Link className="nav-item active" href="/">Home</Link><button className="nav-item" onClick={() => toastComingSoon("Daftar Artis A–Z")}>Daftar Artis (A–Z)</button><a className="nav-item" href="#genre">Genre</a><button className="request-nav" onClick={() => toastComingSoon("Request Kord")}><Plus size={15} /> Request Kord</button></nav><button className="icon-button theme-toggle" aria-label="Ganti tema" onClick={toggleTheme}>{isDark ? <Sun size={18} /> : <Moon size={18} />}</button></header>
    <main>
      <section className="discover-hero"><aside className="hero-index"><span>INDEX / 01</span><i /><span>6 RECORDS</span><i /><span>EST. 2026</span></aside><div className="hero-core"><div className="hero-stamp"><Music2 size={15} /><span>CHORDNESIA / CATALOGUE 01</span></div><p className="eyebrow accent">TEMUKAN LAGU UNTUK SESI BERIKUTNYA</p><h1>Kord yang tepat,<br /><em>untuk setiap</em> petikan.</h1><p className="discover-intro">Cari lagu berdasarkan judul, artis, atau genre. Baca kordnya, pindahkan key-nya, lalu mainkan dengan ritmemu sendiri.</p><form className="big-search" role="search" onSubmit={(event) => { event.preventDefault(); document.getElementById("genre")?.scrollIntoView({ behavior: "smooth" }); }}><Search size={24} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari judul lagu atau nama artis..." aria-label="Cari lagu atau artis" /><span>{results.length.toString().padStart(2, "0")} hasil</span><button type="submit" className="hero-search-button">Cari</button></form><div className="quick-filters" aria-label="Filter cepat"><span>FILTER CEPAT</span>{quickFilters.map((filter) => <button key={filter.tag} className={activeTag === filter.tag ? "quick-filter active" : "quick-filter"} onClick={() => setActiveTag(activeTag === filter.tag ? null : filter.tag)}>{filter.label}</button>)}</div><a className="hero-action" href="#genre">Lihat lagu yang sedang ramai <ArrowDownRight size={17} /></a></div><div className="hero-accession"><span>ACC. NO.</span><strong>CN–0001</strong><small>READ / PLAY / REPEAT</small></div></section>

      <section id="genre" className="trending-section"><div className="section-heading"><div><p className="eyebrow">CHART IMPOR / REFERENSI LAGU GLOBAL</p><h2>Ambil inspirasi,<br />lalu cari kordnya.</h2></div><span className="section-serial">CHART<br /><strong>01</strong></span></div>{trendingStatus === "loading" && <TrendingSkeleton />}{trendingStatus === "error" && <div className="trending-error" role="alert"><AlertCircle size={21} /><div><strong>Data chart belum tersedia.</strong><span>{trendingError}</span></div><button onClick={() => setRetryKey((value) => value + 1)}><RefreshCw size={15} /> Coba lagi</button></div>}{trendingStatus === "success" && <Carousel opts={{ align: "start", containScroll: "trimSnaps" }} className="api-carousel" aria-label="Lagu trending dari chart musik"><CarouselContent className="api-carousel-content">{trendingSongs.map((song, index) => <CarouselItem className="api-carousel-item" key={song.id}><ApiTrendingCard song={song} index={index} /></CarouselItem>)}</CarouselContent><CarouselPrevious className="api-carousel-nav api-carousel-prev" /><CarouselNext className="api-carousel-nav api-carousel-next" /></Carousel>}<p className="api-source-note">Data impor dipakai sebagai referensi tren. Katalog utama ChordNesia tetap mengutamakan lagu dan sesi kord untuk gitaris Indonesia.</p></section>

      <section className="newest-section"><div className="section-heading newest-heading"><div><p className="eyebrow">INDEKS MASUK TERBARU</p><h2>Baru ditambahkan.</h2></div><SlidersHorizontal size={18} /></div><div className="newest-table" role="table" aria-label="Daftar lagu terbaru"><div className="newest-head" role="row"><span>NO.</span><span>JUDUL / ARTIS</span><span>GENRE</span><span>KEY</span><span>DITAMBAHKAN</span><span /></div>{newest.map((song, index) => <Link href={`/lagu/${song.slug}`} className="newest-row" key={song.slug} role="row"><span className="newest-number">{String(index + 1).padStart(2, "0")}</span><span className="newest-song"><strong>{song.title}</strong><small>{song.artist}</small></span><span className="newest-genre">{song.genre}</span><span className="newest-key">{song.key}</span><span className="newest-added">{song.added}</span><ChevronRight className="newest-arrow" size={18} /></Link>)}</div></section>
    </main>
  </div>;
}
