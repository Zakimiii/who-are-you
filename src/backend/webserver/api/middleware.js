import koa_router from 'koa-router';
import koa_body from 'koa-body';
import crypto from 'crypto';
import models from '@models';
import { esc, escAttrs } from '@models';
import coBody from 'co-body';
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
import { handleApiError } from '@extension/Error';
import Gateway from '@network/gateway';
import log from '@extension/log';

const gateway = new Gateway();

const sessionHandler = new SessionHandler();
const searchHandler = new SearchHandler();
const authHandler = new AuthHandler();
const userHandler = new UserHandler();
const notificationHandler = new NotificationHandler();
const batchHandler = new BatchHandler();
const headingHandler = new HeadingHandler();
const answerHandler = new AnswerHandler();

export default function ApiMiddleware(app) {
    const router = koa_router({ prefix: '/api/v1' });
    app.use(router.routes());
    const koaBody = koa_body();

    // router.get('/confirm_email', koaBody, function*(ctx, next) {
    //     yield sessionHandler
    //         .handleConfirmEmail(this, ctx, next)
    //         .catch(async e => {
    //             await handleApiError(this, ctx, next, e);
    //             this.redirect('/notfound');
    //         });
    // });

    // router.get('/notification/email/stop', koaBody, function*(ctx, next) {
    //     yield sessionHandler
    //         .handleStopMailNotificationRequest(this, ctx, next)
    //         .catch(async e => {
    //             await handleApiError(this, ctx, next, e);
    //             this.redirect('/notfound');
    //         });
    // });

    // router.get('/delete_password_email', koaBody, function*(ctx, next) {
    //     yield sessionHandler
    //         .handleDeletePasswordConfirmEmail(this, ctx, next)
    //         .catch(async e => {
    //             await handleApiError(this, ctx, next, e);
    //             this.redirect('/notfound');
    //         });
    // });

    // router.post(
    //     '/session/confirmation/send/password/delete',
    //     koaBody,
    //     function*(ctx, next) {
    //         const results = yield gateway.run(this, ctx, next);
    //         if (!!results.error) {
    //             yield handleApiError(
    //                 results.router,
    //                 results.ctx,
    //                 results.next,
    //                 results.error
    //             );
    //             return;
    //         }
    //         yield sessionHandler
    //             .handleSendDeletePasswordEmail(
    //                 results.router,
    //                 results.ctx,
    //                 results.next
    //             )
    //             .catch(
    //                 async e =>
    //                     await handleApiError(
    //                         results.router,
    //                         results.ctx,
    //                         results.next,
    //                         e
    //                     )
    //             );
    //     }
    // );

    router.post('/csp_violation', function*() {
        let params;
        try {
            params = yield coBody(this);
        } catch (error) {
            console.log('-- /csp_violation error -->', error);
        }
        if (params && params['csp-report']) {
            const csp_report = params['csp-report'];
            const value = `${csp_report['document-uri']} : ${
                csp_report['blocked-uri']
            }`;
            console.log(
                '-- /csp_violation -->',
                value,
                '--',
                this.req.headers['user-agent']
            );
        } else {
            console.log(
                '-- /csp_violation [no csp-report] -->',
                params,
                '--',
                this.req.headers['user-agent']
            );
        }
        this.body = '';
    });
}
