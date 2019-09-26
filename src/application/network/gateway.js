import path from 'path';
import fs from 'fs';
import { esc } from '@models';
import models from '@models';
import { ApiError } from '@extension/Error';

export default class Gateway {
    static emailRegex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;

    constructor() {
        this.ip_last_hit = new Map();
    }

    async run(router, ctx, next) {
        let error;
        const result = await this.isValid(router, ctx, next).catch(e => {
            error = e;
        });
        router.request.body.api_key = null;
        router.request.body.api_password = null;
        if (!!error || !result) {
            return {
                router,
                ctx,
                next,
                error,
            };
        }

        return {
            router,
            ctx,
            next,
        };
    }

    async isValid(router, ctx, next) {
        const results = await Promise.all([
            this.checkApiKey(router, ctx, next),
            //TODO: change rate! it is less.
            // this.rateLimitReq(router, router.req),
        ]).catch(e => {
            throw e;
        });

        return results.filter(val => !!val).length == results.length;
    }

    async checkApiKey(router, ctx, next) {
        const { api_key, api_password } = router.request.body;

        if (!api_key)
            throw new ApiError({
                error: new Error(``),
                tt_key: 'errors.invalid_response_from_server',
            });

        if (!api_password)
            throw new ApiError({
                error: new Error(``),
                tt_key: 'errors.invalid_response_from_server',
            });

        const developer = await models.Developer.findOne({
            where: {
                api_key,
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        if (!developer)
            throw new ApiError({
                error: new Error(``),
                tt_key: 'errors.invalid_response_from_server',
            });

        const result = await developer
            .authenticate(developer, api_password)
            .catch(e => {
                throw new ApiError({
                    error: new Error(``),
                    tt_key: 'errors.invalid_response_from_server',
                });
            });

        if (!result)
            throw new ApiError({
                error: new Error(``),
                tt_key: 'errors.invalid_response_from_server',
            });

        return true;
    }

    async getRemoteIp(req) {
        const remote_address =
            req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const ip_match = remote_address
            ? remote_address.match(/(\d+\.\d+\.\d+\.\d+)/)
            : null;
        return ip_match ? ip_match[1] : esc(remote_address);
    }

    async rateLimitReq(ctx, req) {
        const ip =
            req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const now = Date.now();

        // purge hits older than minutes_max
        this.ip_last_hit.forEach((v, k) => {
            const seconds = (now - v) / 1000;
            if (seconds > 1) {
                this.ip_last_hit.delete(ip);
            }
        });

        let result = false;
        // if ip is still in the map, abort
        if (this.ip_last_hit.has(ip)) {
            // console.log(`api rate limited for ${ip}: ${req}`);
            // throw new Error(`Rate limit reached: one call per ${minutes_max} minutes allowed.`);
            console.error(`Rate limit reached: one call per 1 second allowed.`);
            ctx.status = 429;
            ctx.body = 'Too Many Requests';
            result = true;
        }

        // record api hit
        this.ip_last_hit.set(ip, now);
        return !result;
    }

    async checkCSRF(ctx, csrf) {
        try {
            ctx.assertCSRF(csrf);
        } catch (e) {
            ctx.status = 403;
            ctx.body = 'invalid csrf token';
            console.log(
                '-- invalid csrf token -->',
                ctx.request.method,
                ctx.request.url,
                ctx.session.uid
            );
            return false;
        }
        return true;
    }

    async getSupportedLocales() {
        const locales = [];
        const files = fs.readdirSync(
            `${process.env.NODE_PATH}/application/locales`
        );
        for (const filename of files) {
            const match_res = filename.match(/(\w+)\.json?$/);
            if (match_res) locales.push(match_res[1]);
        }
        return locales;
    }
}
