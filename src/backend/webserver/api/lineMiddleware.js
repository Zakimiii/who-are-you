import { handleApiError } from '@extension/Error';
import Gateway from '@network/gateway';
import koa_router from 'koa-router';
import koa_body from 'koa-body';
import crypto from 'crypto';
import models from '@models';
import { esc, escAttrs } from '@models';
import env from '@env/env.json';
import coBody from 'co-body';
import fetch from 'isomorphic-fetch';
import LineHandler from '@network/line';
import jwt from 'jsonwebtoken';

export default function LineMiddleware(app) {
    const router = koa_router({ prefix: '/line' });
    app.use(router.routes());
    const koaBody = koa_body({
        formLimit: '5mb',
        jsonLimit: '5mb',
        textLimit: '5mb',
    });

    router.post('/webhook', koaBody, function*(ctx, next) {
        const events = this.request.body.events;
        // console.log(this.request.body);
        // console.log(
        //     events &&
        //         events.map(val => {
        //             return { source: val.source, message: val.message };
        //         })
        // );

        const results = yield Promise.all(
            events.map(async event => {
                await LineHandler.handleAccountLink(event);
                if (event.source && event.source.type == 'user') {
                    const identity = await models.Identity.findOne({
                        where: {
                            line_id: event.source.userId,
                        },
                    });

                    if (identity) return;

                    const linkToken = await LineHandler.getLinkToken();
                    LineHandler.pushAccountLink(linkToken, event.source.userId);
                }
            })
        );

        this.body = {
            success: true,
        };
    });

    router.get('/link', koaBody, function*(ctx, next) {
        const { linkToken } = this.query;

        this.redirect(`/login/line/${linkToken}/confirm/`);

        this.body = {
            success: true,
        };
    });

    // router.get('/answer/:id/', koaBody, function*(ctx, next) {
    //     let { id } = this.params;
    //     id = Number(id.replace('.png', ''));
    //     const answer = yield models.Answer.findOne({
    //         where: {
    //             id,
    //         },
    //     });

    //     if (!answer || !answer.picture || answer.picture == '') {
    //         const buffer = fs.readFileSync(
    //             resolveAssetsPath(data_config.default_opg_image)
    //         );
    //         this.type = 'image/png';
    //         this.response.type = 'image/png';
    //         this.body = buffer;
    //         return;
    //     }

    //     this.type = 'image/png';
    //     this.response.type = 'image/png';
    //     this.response.length = answer.picture.toString().length;
    //     const buffer = yield getBase64ImageBuffer(
    //         answer.picture.toString(),
    //         id,
    //         'answer'
    //     );
    //     this.body = buffer;
    // });
}
