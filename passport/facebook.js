const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const keys = require('../config/keys');

// fetch User ID and generate cookie ID
passport.serializeUser((user,done) => {
    done(null,user.id);
});
passport.deserializeUser((id,done) => {
    User.findById(id,(err,user) => {
        done(err,user);
    });
});

passport.use(new facebookStrategy({
    clientID:keys.FBAppID,
    clientSecret: keys.FBAppSECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['email', 'name', 'displayName', 'photos']
},(accessToken,refreshToken,profile,done) => {
    console.log(profile);
    // save user data
    User.findOne({
        facebook:profile.id
    },(err,user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null,user);
        }
        else{
            const newUser = {
                facebook: profile.id,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                image: `https://graph.facebook.com/${profile.id}/picture?type=large`,
                email: profile.email[0].value
            }
            new User(newUser).save((err,user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null,user);
                }
            })
        }
    });
}));
