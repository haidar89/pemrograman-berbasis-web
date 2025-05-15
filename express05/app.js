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