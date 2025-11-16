var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page: 'home'});
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page', page: 'Home'});
});

/* GET services page. */
router.get('/order', function(req, res, next) {
  res.render('index', { title: 'Order' });
});
/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});
/* GET contact us page. */
router.get('/contactus', function(req, res, next) {
  res.render('index', { title: 'Contact us' });
});

module.exports = router;

