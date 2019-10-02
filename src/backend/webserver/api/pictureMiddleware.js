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
import fs from 'fs';

const gateway = new Gateway();

const authHandler = new AuthHandler();
const sessionHandler = new SessionHandler();

export default function PictureMiddleware(app) {
    const router = koa_router({ prefix: '/pictures' });
    app.use(router.routes());
    const koaBody = koa_body();

    router.get('/heading/:id/', koaBody, function*(ctx, next) {
        const { id } = this.params;
        const heading = yield models.Heading.findOne({
            where: {
                id: Number(id.replace('.png', '')),
            },
        });

        // this.type = 'image/png';
        this.response.type = 'image/png';
        this.response.length = heading.picture.length;
        this.body = new Buffer(heading.picture, 'base64');
    });

    router.get('/answer/:id/', koaBody, function*(ctx, next) {
        const { id } = this.params;
        const answer = yield models.Answer.findOne({
            where: {
                id: Number(id.replace('.png', '')),
            },
        });

        // this.type = 'image/png';
        this.response.type = 'image/png';
        this.response.length = answer.picture.length;
        this.body = new Buffer(answer.picture, 'base64');
    });
}
