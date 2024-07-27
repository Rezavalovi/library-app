# Library App

Library App adalah aplikasi perpustakaan sederhana yang memungkinkan admin perpustakaan untuk melacak buku yang dipinjam dan dikembalikan, serta memungkinkan pengguna untuk meminjam buku. Aplikasi ini menggunakan Node.js, Sequelize, dan PostgreSQL untuk backend, serta React.js, TailwindCSS, dan Vite React untuk frontend.


## Fitur

- **Admin Perpustakaan:**
   - Melihat daftar buku yang sedang dipinjam dan yang terlambat dikembalikan.
- **Pengguna:**
   - Setiap pengguna hanya dapat meminjam satu buku pada satu waktu.
   - Pengguna harus mengembalikan buku yang dipinjam sebelum dapat meminjam buku lain.

## Instalasi

### Prasyarat

Pastikan Anda telah menginstal Node.js dan npm di sistem Anda.

1. Clone repository ini:

   ```bash
   https://github.com/Rezavalovi/library-app.git
   ```

2. Instal semua dependensi yang diperlukan menggunakan npm:

   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. Jalankan aplikasi:

   - Untuk backend:
     ```bash
     cd server
     npx nodemon App.js
     ```

   - Untuk frontend:
     ```bash
     cd client
     npm run dev
     ```

## Penggunaan

1. Buka browser dan akses `http://localhost:3000` untuk melihat aplikasi.

## Teknologi yang Digunakan

- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express.js, PostgreSQL
- **HTTP Client:** Axios

## Penggunaan
- Buka browser dan akses http://localhost:3000 untuk membuka aplikasi frontend.
- Daftarkan akun atau login jika sudah memiliki akun.
- Sebagai admin, Anda dapat melihat daftar buku yang sedang dipinjam dan terlambat dikembalikan.
- Sebagai pengguna, Anda dapat meminjam buku dan mengembalikannya.

