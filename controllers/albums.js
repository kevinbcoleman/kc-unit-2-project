const express = require('express')
const router = express.Router()
const Album = require('../models/albums.js')
const albumSeed = require('../models/seed.js')




// Album.insertMany(albumSeed)





// router.get('/seed', (req, res) => {
//   // drop database - prevents from seeding the same data over and over. But remember, it will drop all new changes to your database!
//   Album.deleteMany({}, () => { });
//   // this is the code to actually seed the database
//   Album.create(albumSeed, (error, data) => {
//     // you can also change the second part to res.status(200).redirect('/products') or wherever you want to go.
//     error ? res.status(400).json(error) : res.status(200).json(data);
//   });
// })

module.exports = router

console.log()