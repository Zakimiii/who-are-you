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
import send from 'koa-send';
import base64Img from 'base64-img';
import path from 'path';
import data_config from '@constants/data_config';
import staticCache from 'koa-static-cache';

const gateway = new Gateway();

const authHandler = new AuthHandler();
const sessionHandler = new SessionHandler();

const resolveAssetsPath = (...rest) =>
    path.join(__dirname, '..', '..', '..', 'assets', ...rest);

const getBase64ImageBuffer = async (base64, id, foldername) => {
    return new Promise((resolve, reject) => {
        base64Img.img(
            base64,
            resolveAssetsPath('pictures', foldername),
            `${id % data_config.picture_save_limit}`,
            async (err, filepath) => {
                if (err) reject(err);
                var buffer = fs.readFileSync(filepath);
                resolve(buffer);
            }
        );
    });
};

export default function PictureMiddleware(app) {
    const router = koa_router({ prefix: '/pictures' });
    app.use(router.routes());
    const koaBody = koa_body({
        formLimit: '5mb',
        jsonLimit: '5mb',
        textLimit: '5mb',
    });

    router.get('/heading/:id/', koaBody, function*(ctx, next) {
        let { id } = this.params;
        id = Number(id.replace('.png', ''));
        const heading = yield models.Heading.findOne({
            where: {
                id,
            },
        });
        this.type = 'image/png';
        this.response.type = 'image/png';
        this.response.length = heading.picture.toString().length;
        const buffer = yield getBase64ImageBuffer(
            heading.picture.toString(),
            id,
            'heading'
        );
        this.body = buffer;
    });

    router.get('/answer/:id/', koaBody, function*(ctx, next) {
        let { id } = this.params;
        id = Number(id.replace('.png', ''));
        const answer = yield models.Answer.findOne({
            where: {
                id,
            },
        });

        this.type = 'image/png';
        this.response.type = 'image/png';
        this.response.length = answer.picture.toString().length;
        const buffer = yield getBase64ImageBuffer(
            answer.picture.toString(),
            id,
            'answer'
        );
        this.body = buffer;
    });
}
