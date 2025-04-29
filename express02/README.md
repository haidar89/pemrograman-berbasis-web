# 📚 Workshop Pemrograman Web - Modul 2  
## Routing, Template EJS, dan Dynamic Content pada Express.js

---

## 📌 Tujuan
- Membuat **routing dinamis** menggunakan Express Router.
- Menampilkan data dari API menggunakan **template EJS**.
- Membuat **partial view** seperti navbar.
- Mengatur struktur folder Express dengan baik.
- Menjalankan project menggunakan **nodemon**.
- Menghubungkan dan push project ke **GitHub**.

---

## 🛠 Langkah 1 - Setup Project Express.js

1. **Masuk ke folder utama proyek**:
   ```bash
   cd pemrograman-web
   ```

2. **Generate project Express baru dengan nama `express02` dan EJS**:
   
   Jika sudah install global `express-generator`:
   ```bash
   express --view=ejs express02
   ```

   Jika belum, gunakan:
   ```bash
   npx express-generator --view=ejs express02
   ```

   Lanjutkan:
   ```bash
   cd express02
   npm install
   ```

3. **(Opsional)**: Jika belum, install **nodemon** secara global:
   ```bash
   npm install -g nodemon
   ```

4. **Jalankan server menggunakan nodemon**:
   ```bash
   nodemon
   ```
   Akses aplikasi di [http://localhost:3000](http://localhost:3000).

---

## 🛠 Langkah 2 - Membuat Routing untuk Produk

1. **Tambahkan file baru `routes/products.js`**:
   ```javascript
   const express = require('express');
   const router = express.Router();
   const axios = require('axios');

   // GET: Menampilkan semua produk
   router.get('/', async (req, res) => {
     try {
       const response = await axios.get('https://dummyjson.com/products');
       res.render('products', { 
         title: 'List Products', 
         products: response.data.products 
       });
     } catch (error) {
       console.error('Error fetching products:', error.message);
       res.status(500).send('Error fetching products');
     }
   });

   // GET: Menampilkan detail produk berdasarkan ID
   router.get('/:id', async (req, res) => {
     const { id } = req.params;
     try {
       const response = await axios.get(`https://dummyjson.com/products/${id}`);
       res.render('product-detail', { 
         title: 'Product Detail', 
         product: response.data 
       });
     } catch (error) {
       console.error(`Error fetching product ID ${id}:`, error.message);
       res.status(500).send('Error fetching product detail');
     }
   });

   module.exports = router;
   ```

2. **Integrasikan router ke `app.js`**:
   Tambahkan di `app.js`:
   ```javascript
   const productsRouter = require('./routes/products');
   app.use('/products', productsRouter);
   ```

---

## 🛠 Langkah 3 - Membuat Template EJS

1. **Buat folder partial untuk navbar**:
   ```bash
   mkdir views/partials
   ```

2. **Buat file `views/partials/navbar.ejs`**:
   ```html
   <div class="navbar">
     <a href="/">Home</a>
     <a href="/products">Products</a>
   </div>

   <style>
     .navbar {
       background-color: #333;
       overflow: hidden;
     }
     .navbar a {
       float: left;
       display: block;
       color: #f2f2f2;
       text-align: center;
       padding: 14px 16px;
       text-decoration: none;
     }
     .navbar a:hover {
       background-color: #ddd;
       color: black;
     }
   </style>
   ```

3. **Buat file `views/products.ejs`**:
   ```html
   <!-- Include Navbar -->
   <%- include('partials/navbar') %>

   <div class="container" style="padding: 20px;">
     <h1><%= title %></h1>
     <ul style="list-style: none; padding: 0;">
       <% products.forEach(function(product) { %>
         <li style="margin: 10px 0;">
           <strong><%= product.title %></strong> - $<%= product.price %>
           <a href="/products/<%= product.id %>" style="margin-left: 10px; padding: 6px 12px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 4px;">Detail</a>
         </li>
       <% }); %>
     </ul>
   </div>
   ```

4. **Buat file `views/product-detail.ejs`**:
   ```html
   <!-- Include Navbar -->
   <%- include('partials/navbar') %>

   <div class="container" style="padding: 20px;">
     <h1><%= product.title %></h1>
     <p><strong>Price:</strong> $<%= product.price %></p>
     <p><strong>Description:</strong> <%= product.description %></p>
     <% if (product.thumbnail) { %>
       <img src="<%= product.thumbnail %>" alt="<%= product.title %>" style="max-width: 300px;">
     <% } %>
     <br><br>
     <a href="/products" style="padding: 6px 12px; background-color: #28a745; color: white; text-decoration: none; border-radius: 4px;">Back to Products</a>
   </div>
   ```

---

## 🛠 Langkah 4 - Push ke GitHub

1. **Inisialisasi Git (jika belum)**:
   ```bash
   git init
   ```

2. **Tambahkan semua file dan commit**:
   ```bash
   git add .
   git commit -m "Modul 2: Routing dan Template EJS (express02)"
   ```

3. **Buat repo baru di GitHub**, lalu hubungkan:
   ```bash
   git remote add origin https://github.com/username/nama-repo.git
   git branch -M main
   git push -u origin main
   ```

   Jika repo sudah pernah di-link, gunakan:
   ```bash
   git remote set-url origin https://github.com/username/nama-repo.git
   ```

---

## 📋 Tugas

1. Tambahkan fitur **update (PUT)** untuk produk menggunakan API DummyJSON.
2. Gunakan **Postman** untuk mencoba endpoint `/products/:id` dengan method PUT.
3. Pastikan ada **link kembali ke daftar produk** dari halaman detail.
4. Kirimkan **link repository GitHub** Anda ke dosen/pengajar.

---

## ✅ Struktur Folder Final
```
express02/
├── routes/
│   ├── index.js
│   ├── users.js
│   └── products.js
├── views/
│   ├── partials/
│   │   └── navbar.ejs
│   ├── products.ejs
│   ├── product-detail.ejs
│   └── ...
├── public/
├── app.js
└── package.json
```

🖥️ Output:
![alt text](https://github.com/haidar89/pemrograman-berbasis-web/blob/main/img/2a.png?raw=true)
![alt text](https://github.com/haidar89/pemrograman-berbasis-web/blob/main/img/2b.png?raw=true)
![alt text](https://github.com/haidar89/pemrograman-berbasis-web/blob/main/img/2c.png?raw=true)
