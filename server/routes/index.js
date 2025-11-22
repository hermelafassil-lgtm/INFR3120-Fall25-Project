
const express = require('express');
const router = express.Router();

// Function that requires Authentication for the following parameters
function requireAuth(req, res, next) {
  // If statment is the required authentication does not match
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    // returns to user back to the login pge
    return res.redirect('/users/login');  
  }
  next();
}
 
// Routher gets the Authentication for the idex 
router.get('/', requireAuth, (req, res) => {
  res.render('index', {title: 'Home',displayName: req.user.displayName});
});

// Routher gets the Authentication for the home page
router.get('/home', requireAuth, (req, res) => {
  res.render('index', {title: 'Home',displayName: req.user.displayName });
});

// Routher gets the Authentication for the abotu page
router.get('/about', requireAuth, (req, res) => {
  res.render('about', {title: 'About',displayName: req.user.displayName});
});

// Routher gets the Authentication for the Contact page
router.get('/contactus', requireAuth, (req, res) => {
  res.render('contactus', {title: 'Contact Us',displayName: req.user.displayName});
});

// Routher gets the Authentication for the Order page
router.get('/order', requireAuth, (req, res) => {
  res.render('order', {title: 'Order',displayName: req.user.displayName});
});

 // Routher gets the Authentication for the Books page
router.get('/books', requireAuth, (req, res) => {
  res.render('books', {title: 'Books',displayName: req.user.displayName});
});

// Exports router
module.exports = router;
