### 📅 Modul 4 – Studi Kasus Galeri Hewan, Buah, dan Kendaraan untuk Anak TK

**Tujuan Pembelajaran:**
Mahasiswa dapat membangun aplikasi Express.js sederhana yang menampilkan galeri edukasi untuk anak TK berdasarkan kategori (hewan, buah, kendaraan) dengan fitur penyimpanan gambar dan audio dalam database MySQL.

---

## 1. Inisialisasi Proyek

```bash
express --view=ejs express04
cd express04
npm install
npm install mysql2
npm install -g nodemon
```

Tambahkan script nodemon ke `package.json`:

```json
"scripts": {
  "start": "node ./bin/www",
  "dev": "nodemon ./bin/www"
},
```

---

## 2. Struktur Folder Proyek

```
express04/
├── app.js
├── config/db.js
├── package.json
├── public/
│   ├── audio/
│   ├── css/
│   │   └── style.css
│   └── img/
├── routes/
│   └── index.js
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   └── galeri.ejs
```

---

## 3. Setup Database

### 3.1 Buat Database via phpMyAdmin

**Nama Database:** `galeri_tk`

```sql
CREATE DATABASE galeri_tk;
USE galeri_tk;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE kategori (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE objek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    image VARCHAR(255),
    audio VARCHAR(255),
    kategori_id INT,
    FOREIGN KEY (kategori_id) REFERENCES kategori(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO kategori (nama) VALUES ('hewan'), ('buah'), ('kendaraan');
```

---

## 4. Konfigurasi Database (`db.js`)

```js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'galeri_tk'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Database connected!');
});

module.exports = connection;
```

---

## 5. Navbar (`views/partials/header.ejs`)

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">Galeri TK</a>
  <ul class="navbar-nav">
    <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="/galeri/hewan">Hewan</a></li>
    <li class="nav-item"><a class="nav-link" href="/galeri/buah">Buah</a></li>
    <li class="nav-item"><a class="nav-link" href="/galeri/kendaraan">Kendaraan</a></li>
    <li class="nav-item"><a class="nav-link" href="/login">Login</a></li>
  </ul>
</nav>
```

---

## 6. Footer (`views/partials/footer.ejs`)

```html
<footer class="text-center mt-4">
  <p>&copy; 2025 Galeri Edukasi Anak TK</p>
</footer>
```

---

## 6. Routing (`routes/index.js`)

```js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  res.render('home', { title: 'Beranda' });
});

router.get('/galeri/:kategori', (req, res) => {
  const kategori = req.params.kategori;
  const sql = `SELECT objek.* FROM objek JOIN kategori
               ON objek.kategori_id = kategori.id
               WHERE kategori.nama = ?`;

  db.query(sql, [kategori], (err, results) => {
    if (err) throw err;
    res.render('galeri', { data: results, kategori });
  });
});

module.exports = router;
```

---

## 7. Tampilan Galeri (`views/galeri.ejs`)

```html
<%- include('partials/header') %>
<h2>Galeri <%= kategori %></h2>
<div class="row">
  <% data.forEach(objek => { %>
    <div class="col-md-4">
      <div class="card mb-4">
        <img src="/img/<%= objek.image %>" class="card-img-top" alt="<%= objek.nama %>">
        <div class="card-body">
          <h5 class="card-title"><%= objek.nama %></h5>
          <p class="card-text"><%= objek.deskripsi %></p>
          <audio controls>
            <source src="/audio/<%= objek.audio %>" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  <% }) %>
</div>
<%- include('partials/footer') %>
```

---

## 8. Tampilan Home (`views/home.ejs`)

```html
<%- include('partials/header') %>
<h1>Selamat Datang di Galeri Edukasi Anak TK</h1>
<p>Pilih kategori di menu atas untuk melihat galeri.</p>
<%- include('partials/footer') %>
```

---

## 9. Menjalankan Aplikasi

```bash
npm run dev
```

Buka browser di `http://localhost:3000`

---

## 10. Tugas Praktikum

1. Tambahkan fitur login sederhana untuk admin.
2. Tambahkan setidaknya ada 15 data untuk masing-masing kategori.
3. Upload file gambar dan audio ke folder `/public/img` dan `/public/audio`.
