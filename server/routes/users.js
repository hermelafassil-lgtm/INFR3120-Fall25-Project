const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user').User;

// Register page
router.get('/register', (req, res) => {
  if (!req.user) {
    res.render('auth/register', {
      title: 'Register',
      message: req.flash('registerMessage')
    });
  } else {
    res.redirect('/');
  }
});

router.post('/register', (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
  });
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting new user", err);
      if (err.name === "UserExistsError") {
        req.flash('registerMessage', 'Registration Error: User already exists');
      }
      return res.render('auth/register', {
        title: 'Register',
        message: req.flash('registerMessage')
      });
    } else {
      passport.authenticate('local')(req, res, () => {
        res.redirect("/books");
      });
    }
  });
});

// Login page
router.get('/login', (req, res) => {
  if (!req.user) {
    res.render('auth/login', { 
      title: 'Login',
      message: req.flash('loginMessage')
    });
  } else {
    res.redirect('/');
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.flash('loginMessage', 'Authentication Error');
      return res.redirect('/users/login');
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.redirect('/books');
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
