const express = require('express');
const router = express.Router();
const db = require('../config/db');

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