
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
// Index routers
var indexRouter = require('../routes/index');
// Users routers
var usersRouter = require('../routes/users');
// Book routers
let booksRouter = require('../routes/book');

const User = require('../models/user').User;

var app = express();

// Conects uri to mongoos
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });
let mongoDB = mongoose.connection;
// Prints in terminal if occurs when trying to open MongoDB
mongoDB.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Prints in terminal if MongoDB connects succsesfully
mongoDB.once('open', () => console.log('Connected to MongoDB'));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// App path joins throuh public
app.use(express.static(path.join(__dirname, '../../public')));
// App path joins through node modules
app.use(express.static(path.join(__dirname, '../../node_modules')));
 
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




app.use((req, res, next) => {
  
  res.locals.user = req.session.user || req.user || null;
  next();
});

// App uses index router
app.use('/', indexRouter);
// App uses users router
app.use('/users', usersRouter);
// App uses books router
app.use('/books', booksRouter);


app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // response for the message
  res.locals.message = err.message;
  // response for the error
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

// Exports the app
module.exports = app;
