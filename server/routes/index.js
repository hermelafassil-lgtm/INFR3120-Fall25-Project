var express = require('express');
var router = express.Router();

/* GET home page (main landing page) */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Home',
    page: 'home',
    displayName: req.user ? req.user.displayName : ''
  });
});

/* GET /home (optional extra route) */
router.get('/home', function(req, res, next) {
  res.render('index', { 
    title: 'Home',
    page: 'home',
    displayName: req.user ? req.user.displayName : ''
  });
});

/* GET order page */
router.get('/order', function(req, res, next) {
  res.render('order', { 
    title: 'Order',
    displayName: req.user ? req.user.displayName : ''
  });
});

/* GET about page */
router.get('/about', function(req, res, next) {
  res.render('about', { 
    title: 'About', displayName: req.user ? req.user.displayName : ''
  });
});

/* GET contact us page */
router.get('/contactus', function(req, res, next) {
  res.render('contactus', { 
    title: 'Contact Us', displayName: req.user ? req.user.displayName : ''
  });
});

router.get('/login', function(req, res, next) {
  res.render('auth/login', { 
    title: 'Login', displayName: req.user ? req.user.displayName : ''
  });
});

router.post('/login', (req, res, next) => {
  res.send('Login form submitted');
});

router.get('/logout', (req, res, next) => {
  res.redirect('/');
});

router.get('/register', function(req, res, next) {
  res.render('auth/register', { 
    title: 'Register', displayName: req.user ? req.user.displayName : ''
  });
});

router.post('/register', (req, res, next) => {
  res.send('Registration form submitted');
});



module.exports = router;
