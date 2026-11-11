# Asesmen Sumatif Akhir Semester — SMP Negeri 1 Dlingo (TP 2026/2027)

Portal statis untuk GitHub Pages. Struktur sama dengan portal ASTS:

- `index.html` — beranda (logo, judul, pilih Kelas 7/8/9)
- `kelas-7.html`, `kelas-8.html`, `kelas-9.html` — pilih rombel & nama, lalu pilih mata pelajaran
- `soal/kelas-{7,8,9}/{slug}.html` — 33 halaman soal (saat ini placeholder "Segera hadir")
- `assets/` — CSS, JS, logo, dan `js/data-siswa.js` (570 siswa; FAISHAL FAKHRI RAMADHAN kelas VIII D sudah dihapus)

## Pasang di GitHub Pages
1. Unggah SELURUH isi folder ini (termasuk `assets/` dan `soal/`) ke root repository, branch `main`.
2. Settings → Pages → Source: `main` / `(root)`.

## Mengganti placeholder dengan soal asli
Timpa file `soal/kelas-N/{slug}.html` dengan nama yang sama. Slug: pai, pendidikan-pancasila,
bahasa-indonesia, matematika, ipa, ips, bahasa-inggris, pjok, informatika-kka, seni-budaya, bahasa-jawa.

Menu mengirim `?kelas=IX%20A&nama=NAMA%20SISWA` ke halaman soal. File soal yang membaca parameter
itu (seperti contoh Bahasa Inggris ASTS) akan terisi otomatis.
