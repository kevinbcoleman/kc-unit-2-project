const express = require('express')
const albums = express.Router()
const Album = require('../models/albums.js')
const albumSeed = require('../models/seed.js')



//==========================================
//              ALBUMS ROUTES
//==========================================
/*============
NEW ALBUM PAGE
 ============*/
albums.get('/new', (req, res) => {
  res.render('albums/new.ejs')
})
/*============
    CREATE
 ============*/
albums.post('/', (req, res) => {
  Album.create(req.body, (err, createdAlbum) => {
    console.log(req.body)
    res.redirect('/albums')
  })
})
/*============
     EDIT
 ============*/
albums.get('/:id/edit', (req, res) => {
  Album.findById(req.params.id, (err, foundAlbum) => {
    res.render('albums/edit.ejs', {
      album: foundAlbum
    })
  })
})
/*============
     UPDATE
 ============*/
albums.put('/:id', (req, res) => {
  Album.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedAlbum) => {
      res.redirect('/')
    }
  )
})
/*============
    DELETE
 ============*/
albums.delete('/:id', (req, res) => {
  Album.findByIdAndRemove(req.params.id, (err, deletedAlbum) => {
    res.redirect('/')
  })
})

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

