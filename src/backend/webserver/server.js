import path from 'path';
import Koa from 'koa';
import mount from 'koa-mount';
import helmet from 'koa-helmet';
import koa_logger from 'koa-logger';
import requestTime from '@utils/requesttimings';
import StatsLoggerClient from '@utils/StatsLoggerClient';
import hardwareStats from '@utils/hardwarestats';
import cluster from 'cluster';
import os from 'os';
import prod_logger from '@utils/prod_logger';
import favicon from 'koa-favicon';
import staticCache from 'koa-static-cache';
import ApiMiddleware from '@webserver/api/middleware';
import AuthMiddleware from '@webserver/api/authMiddleware';
import isBot from 'koa-isbot';
import csrf from 'koa-csrf';
import minimist from 'minimist';
import env from '@env/env.json';
import secureRandom from 'secure-random';
import userIllegalContent from '@constants/userIllegalContent';
import koaLocale from 'koa-locale';
import { getSupportedLocales } from '@network/misc';
import cors from 'kcors';
import useRedirects from '@network/redirect';
import session from 'koa-session';
import serve from 'koa-static';
import send from 'koa-send';
import sitemap from '@network/sitemap';

if (cluster.isMaster) console.log('application server starting, please wait.');

// import uploadImage from 'server/upload-image' //medium-editor

const app = new Koa();
app.name = 'Selfinity';
const NODE_ENV = process.env.NODE_ENV || 'development';
// cache of a thousand days
const cacheOpts = { maxAge: 86400000, gzip: true, buffer: true };

// Serve static assets without fanfare
app.use(
    //favicon(path.join(__dirname, '../../assets/images/favicons/favicon.ico'))
    favicon(
        path.join(__dirname, '../../assets/images/selfinity-mini-logo1.png')
    )
);

app.use(
    mount(
        '/favicons',
        staticCache(
            path.join(__dirname, '../../assets/images/favicons'),
            cacheOpts
        )
    )
);
app.use(
    mount(
        '/images',
        staticCache(path.join(__dirname, '../../assets/images'), cacheOpts)
    )
);
app.use(
    mount(
        '/icons',
        staticCache(path.join(__dirname, '../../assets/icons'), cacheOpts)
    )
);
app.use(
    mount(
        '/notifications',
        staticCache(
            path.join(__dirname, '../../assets/notifications'),
            cacheOpts
        )
    )
);
app.use(
    mount('/manifest.json', function*(next) {
        yield send(
            this,
            path.join(__dirname, '../../assets/static/manifest.json')
        );
    })
);
app.use(
    mount('/OneSignalSDKWorker.js', function*(next) {
        yield send(
            this,
            path.join(__dirname, '../../assets/static/OneSignalSDKWorker.js')
        );
    })
);
app.use(
    mount('/OneSignalSDKUpdaterWorker.js', function*(next) {
        yield send(
            this,
            path.join(
                __dirname,
                '../../assets/static/OneSignalSDKUpdaterWorker.js'
            )
        );
    })
);
app.use(
    mount('/ads.txt', function*(next) {
        yield send(this, path.join(__dirname, '../../assets/static/ads.txt'));
    })
);
app.use(
    mount('/robots.txt', function*(next) {
        yield send(
            this,
            path.join(__dirname, '../../assets/static/robots.txt')
        );
    })
);

app.use(
    mount('/sitemap.xml', function*(next) {
        let xml = yield sitemap();
        xml = xml.toXML();
        this.type = 'text/xml';
        this.body = xml;
    })
);

app.use(cors());

// Proxy asset folder to webpack development server in development mode
if (NODE_ENV === 'development' || NODE_ENV === 'staging') {
    const webpack_dev_port = process.env.PORT
        ? parseInt(process.env.PORT) + 1
        : 8081;
    const proxyhost = 'http://0.0.0.0:' + webpack_dev_port;
    console.log('proxying to webpack dev server at ' + proxyhost);
    const proxy = require('koa-proxy')({
        host: proxyhost,
        map: filePath => 'assets/' + filePath,
    });
    app.use(mount('/assets', proxy));
} else {
    app.use(
        mount(
            '/assets',
            staticCache(path.join(__dirname, '../../../dist'), cacheOpts)
        )
    );
}

let resolvedAssets = false;
let supportedLocales = false;

if (process.env.NODE_ENV === 'production') {
    resolvedAssets = require(path.join(
        __dirname,
        '../../..',
        '/tmp/webpack-stats-prod.json'
    ));
    supportedLocales = getSupportedLocales();
}

app.use(isBot());

// set number of processes equal to number of cores
// (unless passed in as an env var)
const numProcesses = process.env.NUM_PROCESSES || os.cpus().length;

const statsLoggerClient = new StatsLoggerClient(process.env.STATSD_IP);

app.use(requestTime(statsLoggerClient));

//TODO: set oauth secret
app.keys = [env.session_key, env.TWITTER.ACCESS_TOKEN];

csrf(app);

koaLocale(app);

function convertEntriesToArrays(obj) {
    return Object.keys(obj).reduce((result, key) => {
        result[key] = obj[key].split(/\s+/);
        return result;
    }, {});
}

// some redirects and health status
app.use(function*(next) {
    if (this.method === 'GET' && this.url === '/.well-known/healthcheck.json') {
        this.status = 200;
        this.body = {
            status: 'ok',
            docker_tag: process.env.DOCKER_TAG ? process.env.DOCKER_TAG : false,
            source_commit: process.env.SOURCE_COMMIT
                ? process.env.SOURCE_COMMIT
                : false,
        };
        return;
    }

    // redirect to home page/feed if known account
    // if (this.method === 'GET' && this.url === '/' && this.session.a) {
    //     this.status = 302;
    //     this.redirect(`/@${this.session.a}/feed`);
    //     return;
    // }
    // normalize user name url from cased params

    //FIXME: this is a test route
    // if (
    //     this.method === 'GET' &&
    //     (routeRegex.UserProfile1.test(this.url) ||
    //         routeRegex.PostNoCategory.test(this.url) ||
    //         routeRegex.Post.test(this.url))
    // ) {
    //     const p = this.originalUrl.toLowerCase();
    //     let userCheck = '';
    //     if (routeRegex.Post.test(this.url)) {
    //         userCheck = p.split('/')[2].slice(1);
    //     } else {
    //         userCheck = p.split('/')[1].slice(1);
    //     }
    //     if (userIllegalContent.includes(userCheck)) {
    //         console.log('Illegal content user found blocked', userCheck);
    //         this.status = 451;
    //         return;
    //     }
    //     if (p !== this.originalUrl) {
    //         this.status = 301;
    //         this.redirect(p);
    //         return;
    //     }
    // }
    // // normalize top category filtering from cased params
    // if (this.method === 'GET' && routeRegex.CategoryFilters.test(this.url)) {
    //     const p = this.originalUrl.toLowerCase();
    //     if (p !== this.originalUrl) {
    //         this.status = 301;
    //         this.redirect(p);
    //         return;
    //     }
    // }
    // // do not enter unless session uid & verified phone
    // if (this.url === '/create_account' && !this.session.uid) {
    //     this.status = 302;
    //     this.redirect('/enter_email');
    //     return;
    // }
    // remember ch, cn, r url params in the session and remove them from url
    if (this.method === 'GET' && /\?[^\w]*(ch=|cn=|r=)/.test(this.url)) {
        let redir = this.url.replace(/((ch|cn|r)=[^&]+)/gi, r => {
            const p = r.split('=');
            if (p.length === 2) this.session[p[0]] = p[1];
            return '';
        });
        redir = redir.replace(/&&&?/, '');
        redir = redir.replace(/\?&?$/, '');
        console.log(`server redirect ${this.url} -> ${redir}`);
        this.status = 302;
        this.redirect(redir);
    } else {
        yield next;
    }
});

// load production middleware
if (NODE_ENV === 'production' || NODE_ENV === 'staging') {
    app.use(require('koa-conditional-get')());
    app.use(require('koa-etag')());
    app.use(require('koa-compressor')());
}

// Logging
if (NODE_ENV === 'production' || NODE_ENV === 'staging') {
    app.use(prod_logger());
} else {
    app.use(koa_logger());
}

app.use(
    helmet({
        hsts: false,
    })
);

app.use(
    mount(
        '/static',
        staticCache(path.join(__dirname, '../../assets/static'), cacheOpts)
    )
);

app.use(
    mount('/robots.txt', function*() {
        this.set('Cache-Control', 'public, max-age=86400000');
        this.type = 'text/plain';
        this.body = 'User-agent: *\nAllow: /';
    })
);

// set user's uid - used to identify users in logs and some other places
// FIXME SECURITY PRIVACY cycle this uid after a period of time
// app.use(function*(next) {
//     const last_visit = this.session.last_visit;
//     this.session.last_visit = (new Date().getTime() / 1000) | 0;
//     const from_link = this.request.headers.referer;
//     if (!this.session.uid) {
//         this.session.uid = secureRandom.randomBuffer(13).toString('hex');
//         this.session.new_visit = true;
//         if (from_link) this.session.r = from_link;
//     } else {
//         this.session.new_visit = this.session.last_visit - last_visit > 1800;
//         if (!this.session.r && from_link) {
//             this.session.r = from_link;
//         }
//     }
//     yield next;
// });

app.use(session({}, app));

ApiMiddleware(app);
AuthMiddleware(app);
useRedirects(app);

// helmet wants some things as bools and some as lists, makes env.difficult.
// our env.uses strings, this splits them to lists on whitespace.

//FIXME: this will be related the error of type error 'r' is not function
if (NODE_ENV === 'production' /* || NODE_ENV === 'staging'*/) {
    const helmetConfig = {
        directives: convertEntriesToArrays(env.helmet.directives),
        reportOnly: env.helmet.reportOnly,
        setAllHeaders: env.helmet.setAllHeaders,
    };
    helmetConfig.directives.reportUri = helmetConfig.directives.reportUri[0];
    if (helmetConfig.directives.reportUri === '-') {
        delete helmetConfig.directives.reportUri;
    }
    app.use(helmet.contentSecurityPolicy(helmetConfig));
}

if (NODE_ENV !== 'test') {
    const appRender = require('./app_render');
    app.use(function*() {
        // Load the pinned posts and store them on the ctx for later use. Since
        // we're inside a generator, we can't `await` here, so we pass a promise
        // so `src/server/app_render.jsx` can `await` on it.
        yield appRender(this, supportedLocales, resolvedAssets);
        // if (app_router.dbStatus.ok) recordWebEvent(this, 'page_load');
        const bot = this.state.isBot;
        if (bot) {
            console.log(
                `  --> ${this.method} ${this.originalUrl} ${
                    this.status
                } (BOT '${bot}')`
            );
        }
    });

    const argv = minimist(process.argv.slice(2));

    const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

    if (NODE_ENV === 'production') {
        if (cluster.isMaster) {
            for (var i = 0; i < numProcesses; i++) {
                cluster.fork();
            }
            // if a worker dies replace it so application keeps running
            cluster.on('exit', function(worker) {
                console.log(
                    'error: worker %d died, starting a new one',
                    worker.id
                );
                cluster.fork();
            });
        } else {
            app.listen(port);
            if (process.send) process.send('online');
            console.log(`Worker process started for port ${port}`);
        }
    } else {
        // spawn a single thread if not running in production mode
        app.listen(port);
        if (process.send) process.send('online');
        console.log(`Application started on port ${port}`);
    }
}

// set PERFORMANCE_TRACING to the number of seconds desired for
// logging hardware stats to the console
if (process.env.PERFORMANCE_TRACING)
    setInterval(hardwareStats, 1000 * process.env.PERFORMANCE_TRACING);

module.exports = app;
