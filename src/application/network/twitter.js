const Twitter = require('twitter-node-client').Twitter;
const env = require('@env/env.json');
const config = require('@constants/config');
var passport = require('koa-passport'),
    TwitterStrategy = require('passport-twitter').Strategy;

const twitter = new Twitter({
    consumerKey: env.TWITTER.KEY,
    consumerSecret: env.TWITTER.SECRET,
    accessToken: env.TWITTER.ACCESS_TOKEN,
    accessTokenSecret: env.TWITTER.ACCESS_TOKEN_SECRET,
    callBackUrl: config.APP_URL,
});

passport.use(
    new TwitterStrategy(
        {
            consumerKey: env.TWITTER.KEY,
            consumerSecret: env.TWITTER.SECRET,
            callbackURL:
                process.env.NODE_ENV == 'production'
                    ? config.APP_URL + '/auth/twitter/callback'
                    : 'http://localhost:8080/auth/twitter/callback',
            includeEmail: true,
        },
        (token, tokenSecret, profile, done) => {
            done(null, { token, tokenSecret, profile, done });
        }
    )
);

export default class TwitterHandler {
    static passport = passport;

    static authenticate = () => passport.authenticate('twitter');

    static callback = callback => passport.authenticate('twitter', callback);

    static signup = () =>
        passport.authenticate('twitter', {
            callbackURL:
                process.env.NODE_ENV == 'production'
                    ? config.APP_URL + '/auth/twitter/session/callback'
                    : 'http://localhost:8080/auth/twitter/session/callback',
        });

    static confirm = modal =>
        passport.authenticate('twitter', {
            callbackURL:
                process.env.NODE_ENV == 'production'
                    ? config.APP_URL + `/auth/twitter/${modal}/callback`
                    : `http://localhost:8080/auth/twitter/${modal}/callback`,
        });
}
