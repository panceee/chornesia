# ChordNesia — Pekerjaan Aktif

- [x] Menetapkan rute `/` sebagai katalog lagu dan `/lagu/:slug` sebagai detail lagu.
- [x] Membangun home page dengan pencarian, filter, kartu lagu, dan tautan ke detail.
- [x] Memindahkan pengalaman transpose, auto-scroll, dan diagram kord ke detail page.
- [x] Memverifikasi tampilan desktop/mobile serta build produksi.

## Revisi Homepage & Mobile Controls

- [x] Menerapkan hero pencarian utama dan quick filter badges pada homepage.
- [x] Menyusun grid Song Card dengan metadata genre, kesulitan, key, dan interaksi hover.
- [x] Menambahkan bagian “Baru Ditambahkan” serta navigasi utama yang lengkap.
- [x] Membuat floating bottom bar mobile untuk transpose, auto-scroll, dan perubahan tema pada detail lagu.
- [x] Menguji desktop/mobile dan build produksi untuk seluruh revisi.

## Penyempurnaan Hero

- [x] Menambahkan lapisan gradien yang selaras dengan identitas arsip ChordNesia.
- [x] Menyempurnakan search bar menjadi input dan tombol aksi eksplisit.
- [x] Menambahkan CTA latihan dan merapikan perilaku mobile-first.
- [x] Memverifikasi hero pada desktop/mobile serta build produksi.

## Integrasi Trending API

- [x] Menetapkan endpoint dan kontrak data lagu trending pada frontend statis.
- [x] Mengambil dan menampilkan lagu trending sebagai grid/carousel.
- [x] Menambahkan skeleton loader, error state, serta aksi coba lagi.
- [x] Memverifikasi status sukses, loading, gagal, dan build produksi.

## Filter & Identitas Katalog

- [x] Menambahkan 8 filter genre dan 3 filter tingkat kesulitan.
- [x] Membuat filter sebagai toggle interaktif dan menyiapkan parameter API opsional.
- [x] Menambahkan blok branding serta tautan About, Contact, dan informasi pendukung.
- [x] Memverifikasi responsivitas filter, tautan, dan build produksi.

## SearchBar & Hasil Pencarian

- [x] Membuat komponen SearchBar dengan debounce 300ms.
- [x] Menampilkan hasil real-time dalam grid dengan highlight kecocokan dan tautan detail lagu.
- [x] Menambahkan empty state, pagination, dan responsivitas hasil pencarian.
- [x] Memverifikasi perilaku pencarian serta build produksi.

## Penyempurnaan Detail Lagu

- [x] Menambahkan header detail dengan tombol kembali yang jelas.
- [x] Melengkapi metadata judul, artis, genre, kesulitan, dan tahun rilis.
- [x] Menata ulang area detail menjadi dua kolom lirik dan kontrol bermain.
- [x] Memverifikasi responsivitas dan build produksi halaman detail.

## Lirik API & Kord Interaktif

- [x] Menetapkan endpoint lirik dan fallback data untuk MVP statis.
- [x] Menampilkan lirik API dalam area monospace bernomor yang dapat di-scroll.
- [x] Memproses dan menyorot kord sebagai token klik-ke-diagram, termasuk state loading/error.
- [x] Memverifikasi lirik, diagram, responsivitas, dan build produksi.

## Penyelarasan RiffForge

- [x] Merekam referensi RiffForge sebagai spesifikasi visual dan alur pengalaman utama.
- [x] Mengganti fondasi warna, surface, tombol, search, dan Song Card ke sistem RiffForge.
- [x] Menyelaraskan detail lagu dengan progression, chord card, bookmark, dan tombol Mulai latihan.
- [x] Menambahkan bottom navigation mobile dan alur latihan yang terhubung.
- [x] Memverifikasi desktop/mobile serta build produksi sesuai referensi.

## Kord di Atas Lirik

- [x] Mengubah parser menjadi representasi baris kord dan baris lirik yang terpisah.
- [x] Menampilkan kord yang dapat diklik tepat di atas kata/lirik terkait.
- [x] Menambahkan preview kode format `[Chord]Lirik` pada detail lagu.
- [x] Memverifikasi tampilan desktop/mobile dan build produksi.

## Preset Transpose

- [x] Menampilkan nilai transpose aktif dalam satuan semitone.
- [x] Menambahkan tombol penyesuaian −/+ satu semitone.
- [x] Menambahkan preset cepat −5, −2, −1, +1, +2, dan +5.
- [x] Memverifikasi responsivitas serta build produksi kontrol transpose.

## Roadmap Latihan Lanjutan

- [x] Memindahkan auto-scroll ke viewport lirik dan menambahkan slider 0,5×–2×.
- [x] Mengganti diagram kord menjadi SVG berbasis data dengan indikator open/mute dan posisi jari.
- [x] Menyimpan favorit pada local storage dan menambahkan halaman Koleksi.
- [x] Menambahkan pemisahan route ringan, state loading/error yang konsisten, dan pengujian responsif.
- [x] Memverifikasi seluruh alur latihan pada desktop/mobile serta build produksi.

## Dark Mode Latihan Malam

- [x] Menetapkan token surface, teks, border, dan sage untuk mode malam.
- [x] Menambahkan toggle mode malam serta menyimpan preferensi pada perangkat.
- [x] Menyelaraskan detail lagu, mode latihan, lirik, diagram, dan kontrol dalam dark mode.
- [x] Memverifikasi dark mode desktop/mobile, build produksi, dan push ke GitHub.
