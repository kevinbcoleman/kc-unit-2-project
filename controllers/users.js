const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')
const Album = require('../models/albums.js')

//SIGN UP
users.get('/new', (req, res) => {
  res.render('users/new.ejs',
    {
      currentUser: req.session.currentUser
    })
})



users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    res.redirect('/')
  })
})


// users.get('../collection', (req, res) => {
//   Album.findById(req.params.id, (err, album) => {
//     res.render('users/collection.ejs', {
//       currentUser: req.session.currentUser
//     })
//   })
// })





module.exports = users