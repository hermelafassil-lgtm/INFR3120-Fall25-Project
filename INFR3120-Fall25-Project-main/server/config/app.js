var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');
let DB = require('./db');

var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

// Routers
var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
let booksRouter = require('../routes/book');
let ordersRouter = require('../routes/orders');   // <<< FIXED — moved up here

const User = require('../models/user').User;

var app = express();

// Connect MongoDB
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });
let mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoDB.once('open', () => console.log('Connected to MongoDB'));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static folders
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// Sessions
app.use(session({
  secret: "YourSecretKey",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } 
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Makes user available in EJS
app.use((req, res, next) => {
  res.locals.user = req.session.user || req.user || null;
  next();
});

// ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/orders', ordersRouter);     // <<< FIXED — now correctly placed

// Catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
