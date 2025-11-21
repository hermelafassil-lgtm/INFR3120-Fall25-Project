const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user').User;

// GET Login Page
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

// POST Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.flash('loginMessage', 'Authentication Error');
      return res.redirect('/users/login');
    }
    req.login(user, (err) => {
      if (err) return next(err);
      req.session.user = { username: user.username, displayName: user.displayName }; 
      return res.redirect('/books');
    });
  })(req, res, next);
});

// GET Register Page
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

// POST Register
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
    }
    passport.authenticate('local')(req, res, () => {
      req.session.user = { username: newUser.username, displayName: newUser.displayName }; 
      res.redirect("/books");
    });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    res.redirect('/');
  });
});

module.exports = router;
