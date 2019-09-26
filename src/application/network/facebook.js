const env = require('@env/env.json');
const config = require('@constants/config');
const Facebook = require('facebook-node-sdk');
const facebook = new Facebook({
    appId: env.FACEBOOK.ID,
    secret: env.FACEBOOK.SECRET,
});
var passport = require('koa-passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

passport.use(
    new FacebookStrategy(
        {
            clientID: env.FACEBOOK.ID,
            clientSecret: env.FACEBOOK.SECRET,
            callbackURL:
                process.env.NODE_ENV == 'production'
                    ? config.APP_URL + '/auth/facebook/callback'
                    : 'http://localhost:8080/auth/facebook/callback',
            // profileFields: ['id', 'emails', 'name'],
        },
        (accessToken, refreshToken, profile, done) => {
            done(null, { accessToken, refreshToken, profile, done });
        }
    )
);

export default class FacebookHandler {
    static passport = passport;

    static authenticate = () => passport.authenticate('facebook');

    static callback = callback => passport.authenticate('facebook', callback);

    static signup = () =>
        passport.authenticate('facebook', {
            state: 'session',
            // scope : ['email'],
        });

    static confirm = modal =>
        passport.authenticate('facebook', {
            state: modal,
        });
}
