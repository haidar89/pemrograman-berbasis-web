### 📅 Modul 5 – Studi Kasus Galeri Hewan, Buah, dan Kendaraan untuk Anak TK dengan fitur Login dan Upload


Berikut adalah panduan lengkap untuk membuat **Modul 5** menggunakan Express.js dan EJS dengan nama folder `express05`. Modul ini mencakup:

* Struktur proyek Express.js dengan EJS dan Bootstrap
* Fitur galeri edukasi untuk anak TK dengan kategori Hewan, Buah, dan Kendaraan
* Fitur login sederhana untuk admin
* Upload gambar dan audio
* Penggunaan partials EJS untuk layout yang konsisten

---

## 📁 Struktur Proyek

```
express05/
├── app.js
├── package.json
├── public/
│   ├── css/
│   │   └── style.css
│   ├── img/
│   └── audio/
├── routes/
│   └── index.js
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   ├── galeri.ejs
│   └── login.ejs
└── uploads/
    ├── img/
    └── audio/
```



---

## 🛠️ Langkah-Langkah Pembuatan

### 1. Inisialisasi Proyek

```bash
npx express-generator --view=ejs express05
cd express05
npm install
npm install express-session multer mysql2
npm install -g nodemon
```



### 2. Konfigurasi `app.js`

```javascript
const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

module.exports = app;
```



### 3. Konfigurasi Database MySQL

**Struktur Tabel:**

```sql
CREATE TABLE kategori (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(50) NOT NULL
);

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE objek (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  image VARCHAR(255),
  audio VARCHAR(255),
  kategori_id INT,
  FOREIGN KEY (kategori_id) REFERENCES kategori(id)
);
```



### 4. Konfigurasi `routes/index.js`

```javascript
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express_db'
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'image') {
      cb(null, 'public/img/');
    } else if (file.fieldname === 'audio') {
      cb(null, 'public/audio/');
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/galeri/:kategori', (req, res) => {
  const kategori = req.params.kategori;
  const query = `
    SELECT objek.*, kategori.nama AS kategori_nama
    FROM objek
    JOIN kategori ON objek.kategori_id = kategori.id
    WHERE kategori.nama = ?
  `;
  db.query(query, [kategori], (err, results) => {
    if (err) throw err;
    res.render('galeri', { data: results, kategori });
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      req.session.user = results[0];
      res.redirect('/admin');
    } else {
      res.send('Login gagal');
    }
  });
});

router.get('/admin', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  const query = 'SELECT * FROM objek';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('admin', { data: results });
  });
});

router.get('/admin/tambah', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  const query = 'SELECT * FROM kategori';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('tambah', { kategori: results });
  });
});

router.post('/admin/tambah', upload.fields([{ name: 'image' }, { name: 'audio' }]), (req, res) => {
  const { nama, kategori_id } = req.body;
  const image = req.files['image'][0].filename;
  const audio = req.files['audio'][0].filename;
  const query = 'INSERT INTO objek (nama, image, audio, kategori_id) VALUES (?, ?, ?, ?)';
  db.query(query, [nama, image, audio, kategori_id], (err) => {
    if (err) throw err;
    res.redirect('/admin');
  });
});

module.exports = router;
```



### 5. Template EJS

**`views/partials/header.ejs`:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Galeri Edukasi Anak TK</title>
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">Galeri Edukasi</a>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="/galeri/Hewan">Hewan</a></li>
        <li class="nav-item"><a class="nav-link" href="/galeri/Buah">Buah</a></li>
        <li class="nav-item"><a class="nav-link" href="/galeri/Kendaraan">Kendaraan</a></li>
        <li class="nav-item"><a class="nav-link" href="/login">Login</a></li>
      </ul>
    </div>
  </nav>
  <div class="container mt-4">
```



**`views/partials/footer.ejs`:**

```html
  </div>
  <footer class="text-center mt-4">
    <p>&copy; 2025 Galeri Edukasi Anak TK</p>
  </footer>
</body>
</html>
```



**`views/home.ejs`:**

```html
<%- include('partials/header') %>
<h1>Selamat Datang di Galeri Edukasi Anak TK</h1>
<p>Pilih kategori di menu atas untuk melihat galeri.</p>
<%- include('partials/footer') %>
```



**`views/galeri.ejs`:**

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



**`views/login.ejs`:**

```html
<%- include('partials/header') %>
<h2>Login Admin</h2>
<form action="/login" method="POST">
  <div class="form-group">
    <label>Username:</label>
    <input type="text" name="username" class="form-control" required>
  </div>
  <div class="form-group">
    <label>Password:</label>
    <input type="password" name="password" class="form-control" required>
  </div>
  <button type="submit" class="btn btn-primary">Login</button>
</form>
<%- include('partials/footer') %>
```



---

## ✅ Tugas Praktikum

1. **Fitur Login Sederhana untuk Admin:**

   * Sudah diimplementasikan pada route `/login` dengan session management.

2. **Menambahkan Setidaknya 15 Data untuk Masing-Masing Kategori:**

   * Gunakan fitur tambah di halaman admin untuk menambahkan data.

3. **Upload File Gambar dan Audio ke Folder `/public/img` dan `/public/audio`:**

   * Sudah