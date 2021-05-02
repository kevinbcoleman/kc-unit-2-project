const express = require('express')
const albums = express.Router()
const Album = require('../models/albums.js')
const albumSeed = require('../models/seed.js')
const Comment = require('../models/comments')


//==========================================
//              ALBUMS ROUTES
//==========================================
/*============
NEW ALBUM PAGE
 ============*/
albums.get('/new', (req, res) => {
  res.render('albums/new.ejs',
    {
      currentUser: req.session.currentUser
    })
})
/*============
    COMMENT --Comment on album show page
 ============*/

albums.post('/:id/comments', (req, res) => {
  const comment = new Comment(req.body)
  comment.save()
  Album.findById(
    req.params.id,
    (err, foundAlbum) => {
      foundAlbum.comments.push(comment)
      foundAlbum.save()
      res.redirect(`/albums/${req.params.id}`)
    })
})

// albums.post('/:id/comments', (req, res) => {
//   const album = Album.findById(req.params.id)
//   const comment = new Comment(req.body.comment)
//   album.comments.unshift(comment)
//   comment.save()
//   album.save()
//   res.redirect(`/albums/${req.params.id}`)
// })


// albums.post('/:id/comments', async (req, res) => {
//   const album = await Album.findById(req.params.id)
//   const comment = new Comment(req.body.comment)
//   album.comments.unshift(comment)
//   comment.save()
//   album.save()
//   res.redirect(`/albums/${req.params.id}`)
// })

/*============
    CREATE --Add new album
 ============*/
albums.post('/', (req, res) => {
  Album.create(req.body, (_err, _createdAlbum) => {
    console.log(req.body)
    res.redirect('/')
  })
})
/*============
     EDIT
 ============*/
albums.get('/:id/edit', (req, res) => {
  Album.findById(req.params.id, (_err, foundAlbum) => {
    res.render('albums/edit.ejs',
      {
        album: foundAlbum,
        currentUser: req.session.currentUser
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
    (_err, _updatedAlbum) => {
      // console.log(req.params.id)
      // console.log(req.body)
      res.redirect('/')
    }
  )
})
/*============
    DELETE
 ============*/
albums.delete('/:id', (req, res) => {
  Album.findByIdAndRemove(req.params.id, (_err, _deletedAlbum) => {
    console.log('hi')
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
  Album.find({}, (_err, allAlbums) => {
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

