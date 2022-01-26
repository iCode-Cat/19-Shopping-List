const express = require('express');
const cors = require('cors');
const AuthRoute = require('./api/routes/AuthRoute');
const ItemsRoute = require('./api/routes/ItemsRoute');
const ShoppingRoute = require('./api/routes/ShoppingRoute');
require('dotenv').config();
const app = express();
const passport = require('passport');
const connectDB = require('./config/db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('./config/passport');
// PORT
const PORT = process.env.SERVER_PORT || process.env.PORT;

// Express settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));

// Session Store
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    proxy: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: 'shoppingSession',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'none',
      httpOnly: false,
      secure: true,
    },
  })
);

// Passport Authentication

app.use(passport.initialize());
app.use(passport.session());

// Connect Database
connectDB();

// Routes
app.use('/api/auth', AuthRoute);
app.use('/api/items', ItemsRoute);
app.use('/api/shopping', ShoppingRoute);

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));

const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: '0bflv8ro',
  dataset: 'production',
  apiVersion: '2021-12-08', // use current UTC date - see "specifying API version"!
  token:
    'skhwJrSNZ4vGqOKX544hAr1EjTrZqsbjqmuUMpRPp5DooWuPsMZNAxJmdJncW7yDQeKJkUWplcuJbxQWgbgdd1ik6miVFIV7sUCq88QGrSp6BL6RFU3rSOSkqFXbbRkul4tgPgKPf9D4O2NqCWuTwTmwcRCbWqjL4MzraJoJBnqew1YaWrPJ', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});
const query =
  '*[_type == "partner"] { ..., stats {...,tabMenus[]->}, steps[] {...,relatedQuestions[]->{...},fields[]-> {...,options[]{...,callRecommendation[]->,callShouldDo[]->,callWorryAbout[]->, CallOnAnswer->{...,options[]{..., CallOnAnswer->}}}}} }';
const params = 0;

const callSanity = async () => {
  const sanity = await client.fetch(query, params);
  console.log(sanity);
};
callSanity();
