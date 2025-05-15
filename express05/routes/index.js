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