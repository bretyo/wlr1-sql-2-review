require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

//CONTROLLERS
const authCtrl = require('./controllers/authController')
const movieCtrl = require('./controllers/movieController')
const favCtrl = require('./controllers/favoriteController')

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env

const app = express()

// TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 60}
}))

// DATABASE CONNECTION
massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then((db) => {
  app.set('db', db)
  console.log("Database connected")
  app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))
}).catch((err) => console.log(err))

// ENDPOINTS
// AUTH ENDPOINTS
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)

// MOVIE ENDPOINTS
app.get('/api/movies', movieCtrl.getMovies)

// FAVORITE ENDPOINTS
app.get('/api/favorites', favCtrl.getFavorites)
app.post('/api/favorites/:movie_id', favCtrl.addFavorite)
app.delete('/api/favorites/:favorite_movie_id', favCtrl.deleteFavorite)