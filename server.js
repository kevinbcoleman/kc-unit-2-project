//==========================================
//              DEPENDENCIES
//==========================================
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const session = require('express-session')


//==========================================
//              CONFIGURATION
//==========================================

const PORT = process.env.PORT || 3003;
const mongoURI = process.env.MONGODB_URI

/*============
    DATABASE
 ============*/
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));


//==========================================
//              MIDDLEWARE
//==========================================
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))// extended: false - does not allow nested objects in query strings
app.use(express.json())
app.use(methodOverride('_method'))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

//==========================================
//              CONTROLLERS
//==========================================
const albumsController = require('./controllers/albums.js')
app.use('/albums', albumsController)
const userController = require('./controllers/users.js')
app.use('/users', userController)
const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)


//==========================================
//              INDEX ROUTE
//==========================================
app.get('/', (req, res) => {
  res.redirect('/albums')
})

//LISTENER
app.listen(PORT, () => console.log('Listening on port:', PORT));