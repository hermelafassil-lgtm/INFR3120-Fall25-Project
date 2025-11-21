
const express = require('express');
const router = express.Router();


function requireAuth(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('/users/login');  
  }
  next();
}
 


router.get('/', requireAuth, (req, res) => {
  res.render('index', {
    title: 'Home',
    displayName: req.user.displayName
  });
});

router.get('/home', requireAuth, (req, res) => {
  res.render('index', {
    title: 'Home',
    displayName: req.user.displayName
  });
});

 
router.get('/about', requireAuth, (req, res) => {
  res.render('about', {
    title: 'About',
    displayName: req.user.displayName
  });
});

 
router.get('/contactus', requireAuth, (req, res) => {
  res.render('contactus', {
    title: 'Contact Us',
    displayName: req.user.displayName
  });
});

 
router.get('/order', requireAuth, (req, res) => {
  res.render('order', {
    title: 'Order',
    displayName: req.user.displayName
  });
});

 
router.get('/books', requireAuth, (req, res) => {
  res.render('books', {
    title: 'Books',
    displayName: req.user.displayName
  });
});

module.exports = router;
