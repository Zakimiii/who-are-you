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
// import {
//     SessionHandler,
//     IdentityHandler,
//     AuthHandler,
//     ContentHandler,
//     LabelHandler,
//     SearchHandler,
//     HomeLabelHandler,
//     TransactionHandler,
//     RecommendHandler,
//     RequestHandler,
//     UserHandler,
//     WalletHandler,
// } from '@handlers';

const gateway = new Gateway();

export default function AuthMiddleware(app) {
    app.use(TwitterHandler.passport.initialize());
    app.use(TwitterHandler.passport.session());
    app.use(FacebookHandler.passport.initialize());
    app.use(FacebookHandler.passport.session());
    app.use(InstagramHandler.passport.initialize());
    app.use(InstagramHandler.passport.session());
    const router = koa_router({ prefix: '/auth' });
    app.use(router.routes());
    const koaBody = koa_body();

    // router.get('/twitter', koaBody, function*(ctx, next) {
    //     yield TwitterHandler.authenticate();
    // });

    // router.get('/twitter/callback', koaBody, function*(ctx, next) {
    //     const routing = this;
    //     yield TwitterHandler.callback(function*(req, res, next) {
    //         yield authHandler
    //             .handleTwitterAuthenticateRequest(routing, req, res, next)
    //             .catch(async e => {
    //                 await handleApiError(routing, ctx, next, e);
    //                 routing.redirect(`/login?error_key=${e.tt_key}`);
    //             });
    //     });
    // });

    // router.get('/twitter/session', koaBody, function*(ctx, next) {
    //     yield TwitterHandler.signup();
    // });

    // router.get('/twitter/confirm', koaBody, function*(ctx, next) {
    //     yield TwitterHandler.confirm(this.query.modal);
    // });

    // router.get('/twitter/session/callback', koaBody, function*(ctx, next) {
    //     const routing = this;
    //     yield TwitterHandler.callback(function*(req, res, next) {
    //         if (!res.profile) {
    //             routing.redirect('/signup');
    //             return;
    //         }
    //         yield authHandler
    //             .handleTwitterInitializeAuth(routing, req, res, next)
    //             .catch(async e => {
    //                 await handleApiError(routing, ctx, next, e);
    //                 routing.redirect(`/signup?error_key=${e.tt_key}`);
    //             });
    //     });
    // });

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

    // router.get('/twitter/privatekey/confirm/callback', koaBody, function*(
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
    //             .handleTwitterPrivateKeyAuthenticateRequest(
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

    // router.get('/facebook', koaBody, function*(ctx, next) {
    //     yield FacebookHandler.authenticate();
    // });

    // router.get('/facebook/callback', function*(ctx, next) {
    //     const routing = this;
    //     yield FacebookHandler.callback(function*(req, res, next) {
    //         if (routing.query.state == 'session') {
    //             if (!res.profile) {
    //                 routing.redirect('/signup');
    //                 return;
    //             }
    //             yield authHandler
    //                 .handleFacebookInitializeAuth(routing, req, res, next)
    //                 .catch(async e => {
    //                     await handleApiError(routing, ctx, next, e);
    //                     routing.redirect(`/signup?error_key=${e.tt_key}`);
    //                 });
    //         } else {
    //             yield authHandler
    //                 .handleFacebookAuthenticateRequest(routing, req, res, next)
    //                 .catch(async e => {
    //                     await handleApiError(routing, ctx, next, e);
    //                     routing.redirect(`/login?error_key=${e.tt_key}`);
    //                 });
    //         }
    //     });
    // });

    // router.get('/facebook/session', koaBody, function*(ctx, next) {
    //     yield FacebookHandler.signup();
    // });

    // router.get('/facebook/confirm', koaBody, function*(ctx, next) {
    //     yield FacebookHandler.confirm(this.query.modal);
    // });

    // router.get('/instagram', koaBody, function*(ctx, next) {
    //     yield InstagramHandler.authenticate();
    // });

    // router.get('/instagram/callback', function*(ctx, next) {
    //     const routing = this;
    //     yield InstagramHandler.callback(function*(req, res, next) {
    //         if (routing.query.state == 'session') {
    //             if (!res.profile) {
    //                 routing.redirect('/signup');
    //                 return;
    //             }
    //             yield authHandler
    //                 .handleInstagramInitializeAuth(routing, req, res, next)
    //                 .catch(async e => {
    //                     await handleApiError(routing, ctx, next, e);
    //                     routing.redirect(`/signup?error_key=${e.tt_key}`);
    //                 });
    //         } else {
    //             yield authHandler
    //                 .handleInstagramAuthenticateRequest(routing, req, res, next)
    //                 .catch(async e => {
    //                     await handleApiError(routing, ctx, next, e);
    //                     routing.redirect(`/login?error_key=${e.tt_key}`);
    //                 });
    //         }
    //     });
    // });

    // router.get('/instagram/session', koaBody, function*(ctx, next) {
    //     yield InstagramHandler.signup();
    // });

    // router.get('/instagram/confirm', koaBody, function*(ctx, next) {
    //     yield InstagramHandler.confirm(this.query.modal);
    // });
}
