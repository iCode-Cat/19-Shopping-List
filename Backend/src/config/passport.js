const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../api/models/UserSchema');

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false);
    if (password === user.password) return done(null, user);
    return done(null, false);
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (error) {
    done(error);
    console.log(error);
  }
});
