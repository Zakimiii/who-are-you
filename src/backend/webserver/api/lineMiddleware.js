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

export default function LineMiddleware(app) {
    const router = koa_router({ prefix: '/line' });
    app.use(router.routes());
    const koaBody = koa_body({
        formLimit: '5mb',
        jsonLimit: '5mb',
        textLimit: '5mb',
    });

    router.post('/webhook', koaBody, function*(ctx, next) {
        console.log(this.request.body);

        const linkToken = yield LineHandler.getLinkToken();
        pushAccountLink(linkToken);

        this.body = {
            success: true,
        };
    });

    router.get('/link', koaBody, function*(ctx, next) {
        const { linkToken } = this.params;
        console.log(linkToken, this.request.body);

        LineHandler.redirectEndPointLinkUrl(linkToken);

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
