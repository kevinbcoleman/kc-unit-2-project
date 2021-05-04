const mongoose = require('mongoose')
const Comment = require('./comments')
const Schema = mongoose.Schema

const albumSchema = new Schema({
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
    enum: ['rock', 'pop', 'hip-hop', 'r&b', 'alternative']
  },
  description: {
    type: String,
    required: true
  },
  comments: [Object]
})

const Album = mongoose.model('Album', albumSchema)

module.exports = Album