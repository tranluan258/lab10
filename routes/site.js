const express = require('express')
const passport = require("passport")
const router = express.Router()

router.get('/', (req, res) => {
  if (req.session.user || req.session.passport) {
    const user = req.session.user || req.session.passport.user
    res.render('index', {user})
  } else {
    res.redirect('/account/login')
  }
})

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile']}))
 
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/account/login', failureFlash: "Chon email sinh vien"}),
  function(req, res) {
    res.redirect('/');
});


module.exports = router
