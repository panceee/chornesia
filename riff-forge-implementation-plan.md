# Rencana Implementasi Lanjutan ChordNesia

## Tujuan

Menyelesaikan fitur latihan gitar ChordNesia secara bertahap dengan fokus pada pengalaman **baca kord, transpose, dan latihan** yang stabil di desktop maupun mobile. Rencana ini menerjemahkan fase lanjutan yang diberikan pengguna ke dalam pekerjaan yang sesuai dengan basis proyek saat ini: React static frontend dengan rancangan visual RiffForge, halaman Home, Song Detail, dan Mode Latihan yang telah tersedia.

## Kondisi Saat Ini

| Area | Kondisi saat ini | Arah pengembangan |
| --- | --- | --- |
| Transpose | Kontrol `−/+` dan pembaruan kord dasar telah ada. | Menstandarkan normalisasi sharp/flat, menambahkan preset semitone, dan menyimpan preferensi lokal. |
| Auto-scroll | Kontrol start/stop dan kecepatan dasar tersedia. | Menggunakan viewport lirik sebagai target, slider 0,5×–2×, indikator kecepatan, dan aksesibilitas gerakan. |
| Diagram kord | Diagram visual sederhana dan pemilihan kord sudah tersedia. | Mengganti ke diagram SVG berbasis data dengan posisi jari, open/mute, variasi, dan popover yang konsisten. |
| Favorit | Tombol bookmark hanya menyimpan state lokal pada tampilan. | Menyediakan koleksi lokal untuk MVP lalu menyiapkan integrasi persistensi pengguna. |
| Lirik | Lirik dua lapis dengan kord di atas lirik dan adapter API sudah tersedia. | Memastikan kontrak API memuat posisi kord atau format `[Chord]Lirik` yang tervalidasi. |

## Fase 1 — Fondasi Data dan Transpose

Langkah pertama adalah memusatkan logika transpose pada satu utilitas yang menerima nama kord serta jumlah semitone. Utilitas akan memisahkan root note dan modifier, menormalisasi flat (`Db`, `Eb`, `Gb`, `Ab`, `Bb`) ke representasi internal, menggeser indeks pada kromatik 12 nada, lalu mempertahankan modifier seperti `m`, `7`, `maj7`, `sus4`, atau slash chord. Dengan begitu, progression, token kord di atas lirik, chord card, key saat ini, dan diagram selalu menggunakan sumber state yang sama.

| Pekerjaan | Keputusan implementasi | Kriteria selesai |
| --- | --- | --- |
| Utilitas transpose | `transposeChord(chord, semitones)` dengan normalisasi accidental dan penjagaan modifier. | Kord umum, minor, seventh, suspended, dan slash chord teruji. |
| Kontrol semitone | Tombol `−/+` mengubah satu semitone; nilai aktif ditampilkan sebagai `0`, `+1`, `−2`, dan seterusnya. | Seluruh progression, lirik, dan key memperbarui secara real-time. |
| Preset | Tombol cepat `−5`, `−2`, `−1`, `+1`, `+2`, `+5`, dengan state aktif yang jelas. | Preset dapat digunakan berulang dan tidak menduplikasi perubahan. |
| Preferensi | Simpan transpose per lagu di penyimpanan lokal untuk MVP. | Saat halaman lagu dibuka ulang pada perangkat sama, transpose terakhir dipulihkan. |

## Fase 2 — Auto-scroll yang Terkendali

Auto-scroll akan dikendalikan pada container lirik, bukan seluruh halaman, agar metadata dan kontrol tetap terlihat. Tombol utama akan mengubah status mulai/jeda. Kecepatan disajikan melalui slider `0,5×` sampai `2×` dan label numerik yang mudah dibaca. Loop akan selalu dibersihkan saat kontrol dihentikan, halaman berganti, atau komponen dilepas. Pengaturan `prefers-reduced-motion` akan mematikan pemutaran otomatis sampai pengguna memilihnya secara eksplisit.

| Pekerjaan | Keputusan implementasi | Kriteria selesai |
| --- | --- | --- |
| Toggle | Satu tombol Play/Pause untuk scroll. | Tidak ada interval ganda saat pengguna menekan cepat. |
| Slider speed | Rentang 0,5×–2× dengan nilai awal 1×. | Kecepatan dan persentase tampil sinkron pada desktop/mobile. |
| Target scroll | Hanya area lirik scrollable yang bergerak. | Header, chord card, dan kontrol tidak ikut terdorong keluar layar. |
| State | Kecepatan dan status terakhir dapat dipertahankan lokal secara opsional. | UX latihan kembali ke pengaturan sebelumnya. |

## Fase 3 — Diagram Kord Berbasis SVG

Diagram kord akan dipisahkan menjadi komponen SVG yang membaca data fingering. Data setiap kord mencakup enam senar, status `open` atau `mute`, posisi fret, nomor jari, capo/fret awal, dan variasi yang tersedia. Kord pada lirik, progression, dan chord card akan mengubah chord aktif yang sama. Pada desktop diagram dapat muncul di panel aktif atau popover; pada mobile interaksi menggunakan tap dan detail tampil pada drawer/popover yang tidak menutupi tombol utama.

| Pekerjaan | Keputusan implementasi | Kriteria selesai |
| --- | --- | --- |
| Skema chord | Kamus data chord terpisah dari markup antarmuka. | Menambah bentuk baru tidak membutuhkan perubahan UI. |
| SVG diagram | Enam senar, lima fret, titik jari, label open/mute, dan nomor jari. | Diagram jelas pada layar kecil dan dapat dibaca pembelajar. |
| Interaksi | Klik/tap token kord memperbarui diagram aktif; hover desktop hanya sebagai peningkatan tambahan. | Tidak bergantung pada hover untuk pengguna touch. |
| Variasi | Menampilkan variasi umum bila data tersedia, misalnya G, G7, Gmaj7. | Pengguna dapat memahami chord alternatif tanpa meninggalkan lagu. |

## Fase 4 — Koleksi dan Favorit

Untuk MVP statis, favorit disimpan per perangkat menggunakan penyimpanan lokal agar fungsi bookmark benar-benar bekerja tanpa autentikasi. Halaman `/collections` akan menampilkan lagu tersimpan, menyediakan hapus, serta filter genre dan kesulitan. Pada versi produksi, penyimpanan akan dipindahkan ke backend pengguna—misalnya WordPress REST API dengan autentikasi atau backend terpisah—agar sinkron lintas perangkat.

| Tahap | MVP | Produksi |
| --- | --- | --- |
| Simpan favorit | Penyimpanan lokal dengan status bookmark langsung. | Endpoint autentikasi dan database koleksi pengguna. |
| Halaman koleksi | Route `/collections` dengan daftar, hapus, filter, dan empty state. | Data lintas perangkat serta playlist bernama. |
| Error state | Pesan singkat dan tombol coba lagi bila data lokal gagal dibaca. | Penanganan jaringan, autentikasi kedaluwarsa, dan konflik sinkronisasi. |

## Fase 5 — Responsivitas, Performa, dan Polish

Layout diuji pada lebar 375px, 768px, dan 1024px. Mobile memakai satu kolom, bottom navigation, target sentuh minimum 48px untuk aksi utama, dan control sekunder yang dapat diringkas ke bottom sheet. Desktop mempertahankan dua kolom pada detail lagu dan orientasi progresi yang lebih lebar. Animasi dibatasi pada transform dan opacity dengan durasi 200–300 ms.

| Fokus | Implementasi | Pemeriksaan |
| --- | --- | --- |
| Responsif | Ukuran tipografi, card, spacing, dan lirik monospace disesuaikan per breakpoint. | Tidak ada overflow, teks terpotong, atau target tap yang terlalu kecil. |
| Performa | Lazy-load cover/ilustrasi, dynamic import untuk route latihan/koleksi bila bundle membesar. | Build bundle ditinjau dan halaman tetap terasa cepat. |
| Loading/error | Skeleton untuk katalog/lirik, error singkat tanpa istilah teknis, CTA coba lagi. | Semua jalur sukses, loading, kosong, dan gagal dapat dilihat. |
| Aksesibilitas | Fokus keyboard, label tombol, kontras sage, dan reduced motion. | Kontrol inti dapat digunakan dengan keyboard dan pembaca layar dasar. |

## Fase 6 — Pengujian dan Rilis

Setelah fitur selesai, pengujian fungsional akan mencakup pencarian, filter, bookmark, transpose berbagai kord, slider auto-scroll, diagram, dan navigasi antarhalaman. Pengujian visual dilakukan pada desktop dan mobile. Build produksi serta pengecekan tipe dijalankan sebelum commit dan deployment.

| Area pengujian | Skenario utama |
| --- | --- |
| Transpose | Kord major/minor/flat/modifier, progression, lirik, dan key berubah konsisten. |
| Auto-scroll | Start/stop, slider batas minimum/maksimum, cleanup saat navigasi, reduced motion. |
| Diagram | Klik/tap kord, variasi, chord tanpa shape, dan keterbacaan SVG. |
| Favorit | Tambah/hapus, empty state, filter koleksi, pemulihan local storage. |
| Rilis | Environment variable API, CORS endpoint lirik/katalog, logging error, dan domain/SSL. |

## Urutan Implementasi yang Direkomendasikan

1. Menyelesaikan **transpose** dan test matrix kord terlebih dahulu karena hasilnya dipakai progression, lirik, serta chord card.
2. Memperbaiki **auto-scroll** pada viewport lirik agar mode latihan stabil.
3. Mengganti diagram saat ini dengan **SVG berbasis data** dan menghubungkannya ke state chord aktif.
4. Membangun **koleksi/favorit lokal** serta halaman `/collections` sebelum integrasi autentikasi.
5. Menutup pekerjaan dengan responsivitas, performa, state loading/error, dan pengujian menyeluruh.
6. Setelah data backend diputuskan, menghubungkan endpoint WordPress/REST atau layanan backend lain, mengonfigurasi environment variable dan CORS, lalu melakukan deployment produksi.

## Asumsi dan Risiko Terbuka

Rencana ini mengasumsikan proyek tetap menggunakan frontend React statis pada tahap MVP dan fungsi lintas perangkat belum membutuhkan login. Bila koleksi harus sinkron antar perangkat sejak awal, diperlukan keputusan backend/authentication sebelum Fase 4 dimulai. Diagram SVG yang akurat juga membutuhkan sumber data fingering yang tervalidasi; untuk MVP, cakupan dimulai dari kord paling umum lalu diperluas bertahap. Endpoint lirik perlu memiliki hak penggunaan konten yang sesuai dan kontrak respons yang jelas agar format `[Chord]Lirik` atau posisi kord dapat dijaga secara konsisten.
