const express = require('express');
const AuthRoute = require('./api/routes/AuthRoute');
require('dotenv').config();
const app = express();
const passport = require('passport');
const connectDB = require('./config/db');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// PORT
const PORT = process.env.SERVER_PORT || process.env.PORT;

// Express settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Store
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: 'shoppingSession',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Passport Authentication
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Connect Database
connectDB();

// Authentication API
app.use(AuthRoute);

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
