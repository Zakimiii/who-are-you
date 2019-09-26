const env = require('@env/env.json');
const config = require('@constants/config');
var passport = require('koa-passport'),
    InstagramStrategy = require('passport-instagram').Strategy;

passport.use(
    new InstagramStrategy(
        {
            clientID: env.INSTAGRAM.ID,
            clientSecret: env.INSTAGRAM.SECRET,
            callbackURL:
                process.env.NODE_ENV == 'production'
                    ? config.APP_URL + '/auth/instagram/callback'
                    : 'http://localhost:8080/auth/instagram/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            done(null, { accessToken, refreshToken, profile, done });
        }
    )
);

export default class InstagramHandler {
    static passport = passport;

    static authenticate = () => passport.authenticate('instagram');

    static callback = callback => passport.authenticate('instagram', callback);

    static signup = () =>
        passport.authenticate('instagram', {
            state: 'session',
        });

    static confirm = modal =>
        passport.authenticate('instagram', {
            state: modal,
        });
}
