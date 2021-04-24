const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  const err = req.flash("error") || ""
  if (req.session.user) {
    res.redirect('/')
  } else {
    res.render('login',{err})
  }
})

router.post('/login', (req, res) => {
  const {username, password} = req.body
  req.session.user = username
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('login')
  })
})

module.exports = router
