# ChordNesia — Brainstorm & Design Direction

## Tiga Pendekatan Awal

### Theme Name: Studio Kayu Modern
Very Brief Intro: Nuansa studio musik yang hangat dengan kertas notasi, walnut, dan aksen senar tembaga. Terasa akrab bagi gitaris tetapi tetap rapi dan digital.
Probability: 0.07

### Theme Name: Arsip Nada Editorial
Very Brief Intro: Arah editorial minimal dengan tipografi monospace, bidang putih tulang, garis katalog, dan aksen merah bata. Fokus pada keterbacaan lirik serta rasa seperti perpustakaan musik yang dikurasi.
Probability: 0.04

### Theme Name: Signal Stage
Very Brief Intro: Antarmuka panggung malam dengan latar gelap, cyan elektrik, dan indikator progres seperti perangkat audio. Energik dan cocok untuk sesi bermain langsung.
Probability: 0.02

## Pendekatan Terpilih: Arsip Nada Editorial

### Design Movement
Swiss International Typographic Style yang dipadukan dengan estetika arsip musik independen dan terminal monospace.

### Core Principles
1. Keterbacaan kord-lirik adalah pusat pengalaman; setiap kontrol mendukung sesi bermain, bukan mengganggu.
2. Struktur editorial asimetris: metadata lagu di rail kiri, lirik menjadi bidang utama, kontrol bermain sebagai panel kontekstual.
3. Warna digunakan sebagai penanda fungsi: merah bata untuk aksi utama, kuning oker untuk status aktif, dan tinta gelap untuk fokus membaca.
4. Detail mikro seperti garis indeks, nomor baris, dan label metadata memberi rasa katalog yang dapat dipercaya.

### Color Philosophy
Latar bone `#F4F0E8` memberi rasa halaman arsip, tinta charcoal `#1D2421` menjaga kontras tinggi, merah bata `#B84C3A` memberi energi performatif untuk CTA dan kord aktif, sedangkan oker `#D7A83F` menjadi penanda tempo/status. Mode gelap membalikkan kertas menjadi graphite tanpa mengubah hierarki warna.

### Layout Paradigm
Kolom editorial dengan rail metadata yang tetap terlihat di desktop dan berubah menjadi strip kontrol kompak di mobile. Area lagu tidak dipusatkan secara generik; judul memulai dari kiri dengan rule line yang memanjang, sementara panel aksi mengambang di sisi kanan.

### Signature Elements
- Garis indeks vertikal dan nomor baris kecil di area lirik.
- Kord sebagai token merah bata berbentuk underline pendek, bukan pill berlebihan.
- Panel auto-scroll seperti kontrol tape deck tipis dengan angka BPM/kecepatan.

### Interaction Philosophy
Interaksi harus terasa seperti membuka halaman arsip: cepat, jelas, dan memberi umpan balik yang tenang. Kord dapat diketuk untuk membuka diagram, transpose memperbarui seluruh lagu seketika, dan auto-scroll memiliki status aktif yang terlihat tanpa modal.

### Animation
Gunakan transisi 160–220ms dengan easing snap-out. Kord yang baru ditranspose diberi flash latar singkat, panel diagram muncul dari titik kord dengan opacity dan translate kecil, dan kontrol auto-scroll bergerak halus. Hormati `prefers-reduced-motion` dengan menonaktifkan animasi dekoratif.

### Typography System
Display: `DM Serif Display` untuk judul lagu dan aksen editorial. UI/body: `IBM Plex Sans` untuk metadata dan kontrol. Lirik: `Roboto Mono` 15–18px dengan line-height 1.9 agar posisi kord presisi. Hierarki memakai kontras ukuran, bukan terlalu banyak weight.

### Brand Essence
Platform kord gitar Indonesia yang membantu gitaris menemukan, memahami, dan memainkan lagu dengan cepat melalui pengalaman membaca kord yang presisi.
Personality: terkurasi, hangat, tangkas.

### Brand Voice
Headline dan CTA singkat, instruktif, dan terasa seperti rekan latihan; hindari jargon produk generik.
- “Buka lagu. Petik bagian favoritmu.”
- “Naikkan nada, tetap jaga alurnya.”

### Wordmark & Logo
Mark berupa pick gitar geometris yang dibelah oleh dua garis senar vertikal dan satu titik fret; tanpa teks, mudah dikenali sebagai favicon dan ikon header.

### Signature Brand Color
Merah bata `#B84C3A`, warna penanda kord dan aksi ChordNesia yang terasa analog, musikal, dan mudah dikenali.

## Sampel Data Awal

Sampel menggunakan format `[C]Kutatap dua [G]mata indahmu` sesuai SOP. Karena teks lagu lengkap belum tersedia di konteks proyek ini, implementasi awal memakai cuplikan pendek yang jelas ditandai sebagai sampel dan siap diganti dengan data CPT/ACF WordPress.

## Style Decisions

- Wordmark menggunakan mark pick geometris bersama pasangan `DM Serif Display` untuk “Chord” dan `Roboto Mono` brick-red untuk “Nesia”; identitas tidak memakai bold UI default.
- Foto gitar diperlakukan sebagai pelat arsip: dibingkai, diberi kode plate dan katalog, serta penanda vertikal alih-alih gaya foto lifestyle.
- Brick red `#B84C3A` dipertahankan hanya untuk aksi primer, token kord, state musik aktif, dan identitas brand; oker `#D7A83F` hanya untuk status, tempo, serta tingkat kesulitan.
- Homepage mengadopsi rail indeks kiri, nomor accession kanan, dan rule lines panjang agar fungsi pencarian tetap terasa seperti penjelajahan arsip, bukan landing page terpusat.
- Song Card diperlakukan sebagai record katalog dengan pemisah garis, nomor masuk, cap metadata, dan hover berbentuk perpindahan record, bukan kartu produk ber-radius.
- Copy publik menyapa gitaris sebagai rekan latihan; detail teknis implementasi tidak tampil dalam teks antarmuka.
- Record homepage selalu menampilkan sinyal praktik kord atau status sesi; chart pihak ketiga diberi label sebagai data impor/referensi, sementara katalog lokal tetap menjadi cerita utama ChordNesia.
- Oker `#D7A83F` digunakan sebagai indikator status aktif atau referensi sesi, tidak sebagai aksen dekoratif umum.

## Referensi Visual RiffForge — Spesifikasi Ground Truth

Referensi RiffForge yang disediakan pengguna menjadi acuan visual dan pengalaman utama untuk revisi ini. ChordNesia akan memakai kanvas warm off-white, surface putih, teks charcoal, border soft gray, serta **muted sage green** sebagai aksen aksi utama, chord aktif, dan status positif. Gaya baru mengutamakan kejelasan belajar gitar: kartu lagu dengan cover kecil dan bookmark, progression chord besar, chord card dengan diagram, kontrol latihan terpusat, serta CTA **Mulai latihan**.

Desktop menggunakan header bersih, halaman detail dua kolom, dan hierarchy informasi yang ringan. Mobile memakai satu kolom, tombol yang dapat dijangkau satu tangan, dan bottom navigation fixed berisi Beranda, Jelajah, Latihan, serta Profil. Bentuk komponen menggunakan radius 12–16px, shadow halus, dan state hover/active yang terlihat melalui border atau sage green; visual bersifat terang, praktis, dan bebas ornamen yang tidak mendukung latihan.
