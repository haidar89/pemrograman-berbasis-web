# 📚 Workshop Pemrograman Web - Modul 1  
## Persiapan: Instalasi Node.js, Setup Express.js, dan Nodemon

---

## 📌 Tujuan
- Melakukan instalasi **Node.js** dan **NPM** di Windows.
- Membuat project pertama menggunakan **Express.js**.
- Menjalankan server lokal.
- Menggunakan **Nodemon** untuk auto-reload aplikasi.
- Menghubungkan project ke **GitHub**.

---

## 🛠 Langkah 1 - Instalasi Node.js dan NPM

1. Unduh installer Node.js dari situs resmi:  
   👉 [https://nodejs.org/en/download](https://nodejs.org/en/download)

2. Install Node.js dengan cara double-click file installer dan ikuti petunjuk instalasi (Next > Next > Finish).

3. Setelah instalasi selesai, cek versi Node.js dan NPM melalui **Command Prompt** (CMD) atau **Terminal**:

   ```bash
   node -v
   npm -v
   ```

4. Pastikan muncul versi Node.js dan NPM yang terinstal.

---

## 🛠 Langkah 2 - Membuat Project Express.js

1. **Buat Folder Project Baru**:  
   Contoh, buat folder `pemrograman-web`.  
   Buka **Command Prompt**, lalu ketik:

   ```bash
   mkdir pemrograman-web/
   cd pemrograman-web
   ```
2. **Install Express Generator Secara Global**:

   ```bash
   npm install -g express-generator
   ```

3. **Generate Project Express Baru**:  
   Nama project tetap `express01`, menggunakan template engine `ejs`:

   ```bash
   express --view=ejs express01
   ```

4. **Masuk ke dalam Folder Project**:

   ```bash
   cd express01
   ```

5. **Install Dependensi Project**:

   ```bash
   npm install
   ```

---

## 🛠 Langkah 3 - Menjalankan Project Express.js

1. Jalankan server dengan perintah:

   ```bash
   npm start
   ```

2. Buka browser dan akses alamat:  
   👉 [http://localhost:3000](http://localhost:3000)

   Jika muncul halaman welcome dari Express.js, berarti setup berhasil.

---

## 🛠 Langkah 4 - Install dan Konfigurasi Nodemon

1. **Install Nodemon secara Global**:

   ```bash
   npm install -g nodemon
   ```

2. **Menjalankan Project dengan Nodemon**:

   ```bash
   nodemon
   ```

   Nodemon akan memonitor perubahan file dan otomatis merestart server ketika Anda menyimpan file.

---

## 🛠 Langkah 5 - Setup Git dan Push ke GitHub

1. **Inisialisasi Git** di dalam folder project:

   ```bash
   git init
   ```

2. **Tambahkan semua file** ke staging area:

   ```bash
   git add .
   ```

3. **Commit perubahan pertama**:

   ```bash
   git commit -m "Initial commit: Setup Express.js Project express01"
   ```

4. **Buat Repository di GitHub** melalui web browser.

5. **Hubungkan ke Remote Repository**:

   ```bash
   git remote add origin https://github.com/username/nama-repo/tree/main/express01.git
   ```

6. **Push Project ke GitHub**:

   ```bash
   git branch -M main
   git push -u origin main
   ```

---

## ❗️ Troubleshooting

- **npm install error**:  
  Pastikan Anda menjalankan terminal sebagai **Administrator** jika ada masalah permission.

- **Command not recognized**:  
  Pastikan Node.js sudah ditambahkan otomatis ke PATH saat instalasi.

- **Port 3000 sudah digunakan**:  
  Tutup aplikasi lain yang menggunakan port 3000 atau ubah port di file `bin/www`.

---

## 📋 Tugas

1. Buatlah project Express baru bernama **`latihan-express`** menggunakan `ejs`.
2. Install dan jalankan menggunakan `nodemon`.
3. Push project tersebut ke repository GitHub pribadi.
4. Kirimkan link repository ke dosen/pengajar.