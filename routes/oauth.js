const express = require('express');
const router = express.Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models').User;
// passport.initialize()

passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.MOCKR_API}/oauth/github/callback`
  },
  async function(accessToken, refreshToken, profile, done) {
    done(null, profile, accessToken)
  }
));

passport.serializeUser((user, done) => {
  done(null, { accessToken: user.access_token })
})

router.get('/github',
  passport.authenticate('github', { scope: 'user' })
);

router.get('/github/callback',
  passport.authenticate('github',
    { failureRedirect: `${process.env.MOCKR_CLIENT}/login` }
  ),
  function(req, res) {
    res.redirect(`${process.env.MOCKR_CLIENT}/auth/success/${req.authInfo}`);
  });

module.exports = router;
