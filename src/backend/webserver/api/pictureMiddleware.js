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
                const buffer = fs.readFileSync(filepath);
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
        }).catch(e => {});

        if (!heading || !heading.picture || heading.picture == '') {
            const buffer = fs.readFileSync(
                resolveAssetsPath(data_config.default_opg_image)
            );
            this.type = 'image/png';
            this.response.type = 'image/png';
            this.body = buffer;
            return;
        }

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
        }).catch(e => {});

        if (!answer || !answer.picture || answer.picture == '') {
            const buffer = fs.readFileSync(
                resolveAssetsPath(data_config.default_opg_image)
            );
            this.type = 'image/png';
            this.response.type = 'image/png';
            this.body = buffer;
            return;
        }

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

    router.get('/communities/heading/:id/', koaBody, function*(ctx, next) {
        let { id } = this.params;
        id = Number(id.replace('.png', ''));
        const heading = yield models.CommunityHeading.findOne({
            where: {
                id,
            },
        }).catch(e => {});

        if (!heading || !heading.picture || heading.picture == '') {
            const buffer = fs.readFileSync(
                resolveAssetsPath(data_config.default_opg_image)
            );
            this.type = 'image/png';
            this.response.type = 'image/png';
            this.body = buffer;
            return;
        }

        this.type = 'image/png';
        this.response.type = 'image/png';
        this.response.length = heading.picture.toString().length;
        const buffer = yield getBase64ImageBuffer(
            heading.picture.toString(),
            id,
            'community_heading'
        );
        this.body = buffer;
    });

    router.get('/communities/answer/:id/', koaBody, function*(ctx, next) {
        let { id } = this.params;
        id = Number(id.replace('.png', ''));
        const answer = yield models.CommunityAnswer.findOne({
            where: {
                id,
            },
        }).catch(e => {});

        if (!answer || !answer.picture || answer.picture == '') {
            const buffer = fs.readFileSync(
                resolveAssetsPath(data_config.default_opg_image)
            );
            this.type = 'image/png';
            this.response.type = 'image/png';
            this.body = buffer;
            return;
        }

        this.type = 'image/png';
        this.response.type = 'image/png';
        this.response.length = answer.picture.toString().length;
        const buffer = yield getBase64ImageBuffer(
            answer.picture.toString(),
            id,
            'community_answer'
        );
        this.body = buffer;
    });

    router.get('/community/:id/', koaBody, function*(ctx, next) {
        let { id } = this.params;
        id = Number(id.replace('.png', ''));
        const community = yield models.Community.findOne({
            where: {
                id,
            },
        }).catch(e => {});

        if (!community || !community.picture || community.picture == '') {
            const buffer = fs.readFileSync(
                resolveAssetsPath('/images/brands/back-mini-logo.png')
            );
            this.type = 'image/png';
            this.response.type = 'image/png';
            this.body = buffer;
            return;
        }

        this.type = 'image/png';
        this.response.type = 'image/png';
        this.response.length = community.picture.toString().length;
        const buffer = yield getBase64ImageBuffer(
            community.picture.toString(),
            id,
            'community_answer'
        );
        this.body = buffer;
    });

    router.get('/category/:id/', koaBody, function*(ctx, next) {
        let { id } = this.params;
        id = Number(id.replace('.png', ''));
        const category = yield models.Category.findOne({
            where: {
                id,
            },
        }).catch(e => {});

        if (!category || !category.picture || category.picture == '') {
            const buffer = fs.readFileSync(
                resolveAssetsPath('/images/brands/back-mini-logo.png')
            );
            this.type = 'image/png';
            this.response.type = 'image/png';
            this.body = buffer;
            return;
        }

        this.type = 'image/png';
        this.response.type = 'image/png';
        this.response.length = category.picture.toString().length;
        const buffer = yield getBase64ImageBuffer(
            category.picture.toString(),
            id,
            'category'
        );
        this.body = buffer;
    });
}
