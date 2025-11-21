const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user').User;
 
router.get('/login', (req, res) => {
  if (!req.session.user) {
    return res.render('auth/login', {
      title: 'Login',
      message: req.flash('loginMessage')
    });
  }
  res.redirect('/home');
});

 
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.flash('loginMessage', 'Invalid username or password');
      return res.redirect('/users/login');
    }

    req.login(user, (err) => {
      if (err) return next(err);

       req.session.user = {
        username: user.username,
        displayName: user.displayName
      };

      res.redirect('/home'); 
    });
  })(req, res, next);
});


router.get('/register', (req, res) => {
  if (!req.session.user) {
    return res.render('auth/register', {
      title: 'Register',
      message: req.flash('registerMessage')
    });
  }
  res.redirect('/home');
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
      req.flash('registerMessage', err.message);
      return res.redirect('/users/register');  
    }

    passport.authenticate('local')(req, res, () => {
      
      req.session.user = {
        username: newUser.username,
        displayName: newUser.displayName
      };
      res.redirect('/home');  
    });
  });
});

 
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.log(err);
    res.redirect('/users/login');
  });
});

module.exports = router;
