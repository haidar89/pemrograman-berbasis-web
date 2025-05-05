# 🧩 Modul 3 – Koneksi Database Menggunakan Express.js

## 🎯 Tujuan Pembelajaran

1. Mahasiswa memahami cara membuat koneksi antara Express.js dan MySQL.
2. Mahasiswa mampu menampilkan data dari database menggunakan template EJS.
3. Mahasiswa memahami struktur folder dan praktik pemisahan modul dalam proyek Express.

---

## 📁 1. Inisialisasi Proyek

### a. Buat folder proyek baru

```bash
express --view=ejs express03
cd express03
```

> Jika `express` belum terinstall secara global:

```bash
npm install -g express-generator
```

### b. Install dependensi

```bash
npm install
npm install mysql2
npm install -g nodemon
```

### c. Jalankan server

```bash
nodemon ./bin/www
```

---

## 🛢️ 2. Setup Database MySQL (phpMyAdmin)

### a. Buat database baru

Masuk ke `phpMyAdmin` dan buat database dengan nama:

```sql
CREATE DATABASE express_db;
```

### b. Buat tabel `products` dan `categories`

```sql
USE express_db;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category_id INT,
  price DECIMAL(10,2),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### c. Tambahkan data awal

```sql
INSERT INTO categories (name) VALUES ('Elektronik'), ('Pakaian'), ('Makanan');

INSERT INTO products (name, category_id, price) VALUES
('Laptop', 1, 7500000),
('Kaos Polos', 2, 50000),
('Snack Kentang', 3, 15000);
```

---

## 🔌 3. Konfigurasi Koneksi Database (`db.js`)

> Buat file baru `db.js` di root folder:

```js
// db.js
const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // sesuaikan jika ada password
  database: 'express_db'
});

conn.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL Connected...');
});

module.exports = conn;
```

---

## 🔁 4. Konfigurasi Routing (`routes/index.js`)

Ubah isi `routes/index.js`:

```js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const sql = `
    SELECT products.id, products.name, products.price, categories.name AS category
    FROM products
    LEFT JOIN categories ON products.category_id = categories.id
  `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('home', { products: results });
  });
});

module.exports = router;
```

---

## 🧱 5. Struktur Folder Tambahan

Pastikan struktur seperti ini:

```plaintext
express03/
├── db.js
├── routes/
│   └── index.js
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   └── home.ejs
├── public/
│   └── css/
│       └── style.css
```

---

## 🎨 6. Template View

### a. `views/partials/header.ejs`

```html
<!DOCTYPE html>
<html>
<head>
  <title>Produk</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <header>
    <h1>Daftar Produk</h1>
  </header>
```

### b. `views/partials/footer.ejs`

```html
  <footer>
    <p>© 2025 Web Programming Workshop</p>
  </footer>
</body>
</html>
```

### c. `views/home.ejs`

```ejs
<%- include('partials/header') %>

<table border="1" cellpadding="10">
  <thead>
    <tr>
      <th>Nama Produk</th>
      <th>Kategori</th>
      <th>Harga</th>
    </tr>
  </thead>
  <tbody>
    <% products.forEach(product => { %>
      <tr>
        <td><%= product.name %></td>
        <td><%= product.category %></td>
        <td>Rp <%= product.price %></td>
      </tr>
    <% }); %>
  </tbody>
</table>

<%- include('partials/footer') %>
```

---

## 🎨 7. Styling (`public/css/style.css`)

```css
body {
  font-family: Arial, sans-serif;
  margin: 20px;
  background-color: #f7f7f7;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

table {
  width: 100%;
  background-color: white;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #333;
  color: white;
}
```

---

## 🚀 8. Jalankan Server

```bash
nodemon ./bin/www
```

Buka di browser: [http://localhost:3000](http://localhost:3000)

---

## ✅ Penutup

Pada modul ini, kamu telah:

* Membuat koneksi database MySQL dari Express.js.
* Menampilkan data produk dan kategori.
* Menggunakan EJS sebagai template engine.
* Memahami struktur modular proyek Express.