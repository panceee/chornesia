/* RiffForge / data MVP: satu sumber katalog sederhana untuk Home, detail, dan mode latihan. */
export type SongRecord = {
  slug: string;
  title: string;
  artist: string;
  genre: string;
  difficulty: "Mudah" | "Menengah" | "Sulit";
  key: string;
  duration: string;
  year: string;
  cover: string;
};

export const SONGS: SongRecord[] = [
  { slug: "mata-indahmu", title: "Mata Indahmu", artist: "ChordNesia Session", genre: "Pop", difficulty: "Mudah", key: "C", duration: "03:42", year: "2024", cover: "cover-amber" },
  { slug: "pulang-pelan", title: "Pulang Pelan", artist: "Ruang Senja", genre: "Indie", difficulty: "Mudah", key: "G", duration: "04:12", year: "2025", cover: "cover-sage" },
  { slug: "lampu-jalan", title: "Lampu Jalan", artist: "Pagi Hari", genre: "Rock", difficulty: "Menengah", key: "D", duration: "03:18", year: "2023", cover: "cover-blue" },
  { slug: "dalam-satu-lagu", title: "Dalam Satu Lagu", artist: "Kamar Tiga", genre: "Folk", difficulty: "Menengah", key: "Am", duration: "04:01", year: "2024", cover: "cover-sand" },
  { slug: "ruang-tenang", title: "Ruang Tenang", artist: "Titik Temu", genre: "Jazz", difficulty: "Sulit", key: "E", duration: "05:03", year: "2022", cover: "cover-ink" },
  { slug: "surat-kecil", title: "Surat Kecil", artist: "Lorong Kota", genre: "Nostalgia", difficulty: "Mudah", key: "F", duration: "03:36", year: "2021", cover: "cover-rose" },
];

export const DEFAULT_LYRICS = [
  "[C]Kutatap dua [G]mata indahmu",
  "[Am]Di bawah langit [F]yang biru",
  "[C]Satu petikan, [G]satu cerita",
  "[Am]Kita nyanyikan [F]bersama",
  "",
  "[F]Tak perlu banyak [C]kata",
  "[G]Biarkan nada [Am]bicara",
  "[F]Pelan-pelan kita [C]menemukan",
  "[G]Rumah di dalam [C]lagu ini",
];

export const PROGRESSION = ["C", "G", "Am", "F"];
