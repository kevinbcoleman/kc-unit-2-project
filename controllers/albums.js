const express = require('express')
const albums = express.Router()
const Album = require('../models/albums.js')
const albumSeed = require('../models/seed.js')



//==========================================
//              ALBUMS ROUTES
//==========================================

/*============
    SHOW
 ============*/

albums.get('/:id', (req, res) => {
  Album.findById(req.params.id, (err, foundAlbum) => {
    res.render('albums/show.ejs',
      {
        album: foundAlbum,
        currentUser: req.session.currentUser
      })
  })
})







/*============
    INDEX
 ============*/
albums.get('/', (req, res) => {
  Album.find({}, (err, allAlbums) => {
    res.render('albums/index.ejs',
      {
        albums: allAlbums,
        currentUser: req.session.currentUser
      })
  })
})











//==========================================
//               SEED DATA
//==========================================
// Album.insertMany(albumSeed)

module.exports = albums

