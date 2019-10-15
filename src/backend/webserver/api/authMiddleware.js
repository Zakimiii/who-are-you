import { handleApiError } from '@extension/Error';
import Gateway from '@network/gateway';
import koa_router from 'koa-router';
import koa_body from 'koa-body';
import crypto from 'crypto';
import models from '@models';
import { esc, escAttrs } from '@models';
import coBody from 'co-body';
import TwitterHandler from '@network/twitter';
import FacebookHandler from '@network/facebook';
import InstagramHandler from '@network/instagram';
import {
    SessionHandler,
    SearchHandler,
    AuthHandler,
    UserHandler,
    NotificationHandler,
    BatchHandler,
    HeadingHandler,
    AnswerHandler,
} from '@handlers';

const gateway = new Gateway();

const authHandler = new AuthHandler();
const sessionHandler = new SessionHandler();

export default function AuthMiddleware(app) {
    app.use(TwitterHandler.passport.initialize());
    app.use(TwitterHandler.passport.session());
    app.use(FacebookHandler.passport.initialize());
    app.use(FacebookHandler.passport.session());
    app.use(InstagramHandler.passport.initialize());
    app.use(InstagramHandler.passport.session());
    const router = koa_router({ prefix: '/auth' });
    app.use(router.routes());
    const koaBody = koa_body({
        formLimit: '5mb',
        jsonLimit: '5mb',
        textLimit: '5mb',
    });

    router.get('/twitter', koaBody, function*(ctx, next) {
        yield TwitterHandler.authenticate();
    });

    router.get('/twitter/callback', koaBody, function*(ctx, next) {
        const routing = this;
        yield TwitterHandler.callback(function*(req, res, next) {
            yield authHandler
                .handleTwitterAuthenticateRequest(routing, req, res, next)
                .catch(async e => {
                    await handleApiError(routing, ctx, next, e);
                    routing.redirect(`/login?error_key=${e.tt_key}`);
                });
        });
    });

    router.get('/twitter/session', koaBody, function*(ctx, next) {
        yield TwitterHandler.signup();
    });

    router.get('/twitter/confirm', koaBody, function*(ctx, next) {
        yield TwitterHandler.confirm(this.query.modal);
    });

    router.get('/twitter/session/callback', koaBody, function*(ctx, next) {
        const routing = this;
        yield TwitterHandler.callback(function*(req, res, next) {
            if (!res.profile) {
                routing.redirect('/signup');
                return;
            }
            yield authHandler
                .handleTwitterInitializeAuth(routing, req, res, next)
                .catch(async e => {
                    await handleApiError(routing, ctx, next, e);
                    routing.redirect(`/signup?error_key=${e.tt_key}`);
                });
        });
    });

    // router.get('/twitter/user/delete/confirm/callback', koaBody, function*(
    //     ctx,
    //     next
    // ) {
    //     const routing = this;
    //     yield TwitterHandler.callback(function*(req, res, next) {
    //         if (!res.profile) {
    //             routing.redirect('/login');
    //             return;
    //         }
    //         yield authHandler
    //             .handleTwitterUserDeleteAuthenticateRequest(
    //                 routing,
    //                 req,
    //                 res,
    //                 next
    //             )
    //             .catch(async e => {
    //                 await handleApiError(routing, ctx, next, e);
    //                 routing.redirect(`/login?error_key=${e.tt_key}`);
    //             });
    //     });
    // });
}
