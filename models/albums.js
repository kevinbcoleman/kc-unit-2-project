const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
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
  artist: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const Album = mongoose.model('Album', albumSchema)

module.exports = Album