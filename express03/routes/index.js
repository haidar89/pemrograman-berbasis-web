<<<<<<< HEAD
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
=======
const express = require('express');
const router = express.Router();
const db = require('../config/db');

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
>>>>>>> b60d4cd (Studi Kasus Galeri Hewan, Buah, dan Kendaraan untuk Anak TK)
});

module.exports = router;
