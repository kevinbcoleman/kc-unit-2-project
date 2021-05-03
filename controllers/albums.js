const express = require('express')
const albums = express.Router()
const Album = require('../models/albums.js')
const albumSeed = require('../models/seed.js')
const Comment = require('../models/comments.js')


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
  Album.findById(
    req.params.id,
    (err, foundAlbum) => {
      const albumComment = new Comment(req.body)
      albumComment.author = req.session.currentUser
      albumComment.save()
      foundAlbum.comments.push(albumComment)
      console.log(req.session.currentUser)
      console.log(req.body)
      console.log(albumComment)
      foundAlbum.save()
      res.redirect(`/albums/${req.params.id}`)
    })
})


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
  Album.create(req.body, (err, createdAlbum) => {
    res.redirect('/')
  })
})
/*============
     EDIT
 ============*/
albums.get('/:id/edit', (req, res) => {
  Album.findById(req.params.id, (err, foundAlbum) => {
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
    foundAlbum.populate({
      path: 'comments',
      populate: {
        path: 'author'
      }
    })
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

