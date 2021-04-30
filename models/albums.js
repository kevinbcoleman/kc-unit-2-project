const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
  image: String,
  name: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    enum: ['rock', 'pop', 'hip-hop', 'electronic', 'alternative']
  },
  description: {
    type: String,
    required: true
  },
  releaseDate: Number
})

const Album = mongoose.model('Album', albumSchema)

module.exports = Album