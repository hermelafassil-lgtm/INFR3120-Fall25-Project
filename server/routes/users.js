// Imports express for routung
const express = require('express');
// Makes new router
const router = express.Router();
// Passport for authetication
const passport = require('passport');
// Imports User model
const User = require('../models/user').User;
 
//  uses the router to render the login page 
router.get('/login', (req, res) => {
  if (!req.session.user) {
    // retunrs login with the login message is there is no session active
    return res.render('auth/login', {title: 'Login',message: req.flash('loginMessage')});
  }
  // redirects to the home page
  res.redirect('/home');
});

 
// works with tlogin form submission 
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // Flash message is the user enter a invalid username or password
      req.flash('loginMessage', 'Invalid username or password');
      // Redirects to the user/login
      return res.redirect('/users/login');
    }

    req.login(user, (err) => {
      if (err) return next(err);
       req.session.user = {username: user.username,displayName: user.displayName};
      // Redirces to the home page
      res.redirect('/home'); 
    });
  })(req, res, next);
});


router.get('/register', (req, res) => {
  if (!req.session.user) {
    // Flash message if the user enters a invalid title or message
    return res.render('auth/register', {title: 'Register',message: req.flash('registerMessage')
    });
  }
  // Redirects to the home page
  res.redirect('/home');
});

// Register Post route that holds the users username, email, and then displays their name 
router.post('/register', (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
  });

  // User register
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      //Inserts the error inserting new user
      console.log("Error: Inserting new user", err);
      req.flash('registerMessage', err.message);
      // Returns redirected msg to the register
      return res.redirect('/users/register');  
    }

    passport.authenticate('local')(req, res, () => {
      req.session.user = {username: newUser.username,displayName: newUser.displayName };
      //Redirects to home page
      res.redirect('/home');  
    });
  });
});

// logout for the router 
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.log(err);
    // Redirects login
    res.redirect('/users/login');
  });
});


// Exports module router
module.exports = router;
