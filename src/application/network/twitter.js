const Twitter = require('twitter-node-client').Twitter;
const OAuth = require('oauth');
const env = require('@env/env.json');
const config = require('@constants/config');
var passport = require('@network/koa-passport'),
    TwitterStrategy = require('passport-twitter').Strategy;
const data_config = require('@constants/data_config');

const twitter = new Twitter({
    consumerKey: env.TWITTER.KEY,
    consumerSecret: env.TWITTER.SECRET,
    accessToken: env.TWITTER.ACCESS_TOKEN,
    accessTokenSecret: env.TWITTER.ACCESS_TOKEN_SECRET,
    callBackUrl: config.APP_URL,
});

const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    env.TWITTER.KEY,
    env.TWITTER.SECRET,
    '1.0A',
    null,
    'HMAC-SHA1'
);

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

    static getShareUrl = ({ id, pathname }) =>
        `https://twitter.com/intent/tweet?url=${config.CURRENT_APP_URL +
            pathname}&via=${
            id
        }&hashtags=whoareyou,自己紹介・友達紹介&text=${data_config.post_text()}`;

    static fix_image_name = str => str.replace('_normal.', '_400x400.');

    static fix_banner_name = str => str + '/1500x500';

    static configure = ({ accessToken, accessTokenSecret }) =>
        new Twitter({
            consumerKey: env.TWITTER.KEY,
            consumerSecret: env.TWITTER.SECRET,
            accessToken,
            accessTokenSecret,
            callBackUrl: config.APP_URL,
        });

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

    //@params: user_id or screen_name
    static getUser = async params => {
        return new Promise((resolve, reject) => {
            twitter.getUser(
                params,
                e => reject(e),
                result => resolve(JSON.parse(result))
            );
        });
    };

    //@params: user_id or screen_name
    static getFollows = async (params, accessToken, accessTokenSecret) => {
        return new Promise((resolve, reject) => {
            TwitterHandler.configure({
                accessToken,
                accessTokenSecret,
            }).getFollowersList(
                params,
                e => reject(e),
                result => resolve(JSON.parse(result))
            );
        });
    };

    static postTweet = async (
        status,
        pathname,
        accessToken,
        accessTokenSecret
    ) => {
        return new Promise((resolve, reject) => {
            oauth.post(
                'https://api.twitter.com/1.1/statuses/update.json',
                accessToken,
                accessTokenSecret,
                {
                    status: data_config.post_template(status, pathname),
                },
                '',
                (err, data, res) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(data, res);
                }
            );
        });
    };

    //@params: media or media_data(base64 encoded)
    static postMedia = async params => {
        return new Promise((resolve, reject) => {
            twitter.postMedia(
                params,
                e => reject(e),
                result => resolve(JSON.parse(result))
            );
        });
    };
}
