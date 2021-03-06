import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';
import { TemplateDataStore } from '@datastore';
import safe2json from '@extension/safe2json';
import querystring from 'querystring';
import uuidv4 from 'uuid/v4';
import countryCode from '@constants/countryCode';
import { ApiError } from '@extension/Error';
import Cookies from 'js-cookie';
import mail from '@network/mail';
import jwt from 'jsonwebtoken';
import env from '@env/env.json';
import validator from 'validator';
import badDomains from '@constants/bad-domains';
import data_config from '@constants/data_config';
import Promise from 'bluebird';
import TwitterHandler from '@network/twitter';

const templateDataStore = new TemplateDataStore();

export default class TemplateHandler extends HandlerImpl {
    constructor() {
        super();
    }

    async postTweet(heading) {
        if (process.env.NODE_ENV == 'development') return true;

        if (!heading || !heading.VoterId) return false;

        const user = await models.User.findOne({
            where: {
                id: Number(heading.UserId),
            },
        });

        if (!user) return false;

        const identity = await models.Identity.findOne({
            where: {
                user_id: Number(heading.VoterId),
            },
        });

        await TwitterHandler.postTweet(
            user.twitter_username,
            `/heading/${heading.id}`,
            identity.twitter_token,
            identity.twitter_secret
        ).catch(e => {
            return false;
        });

        return true;
    }

    async handleGetTemplateRequest(router, ctx, next) {
        const { id } = router.request.body;

        // await apiFindUserValidates.isValid({
        //     username,
        //     id,
        //     user: { id, username },
        // });

        if (!id) return;

        const template = await models.Template.findOne({
            where: {
                id: Number(id),
            },
        });

        router.body = {
            success: true,
            template: safe2json(template),
        };
    }

    async handleAddHeadingRequest(router, ctx, next) {
        const { template, heading } = router.request.body;

        const result = await templateDataStore.add_heading({
            template,
            heading,
        });

        const posted = await this.postTweet(result);

        router.body = {
            success: true,
            heading: safe2json(result),
            posted,
        };
    }

    async handleAnswerRequest(router, ctx, next) {
        const { template, user, answer } = router.request.body;

        const result = await templateDataStore.answer({
            template,
            user,
            answer,
        });

        router.body = {
            answer: safe2json(result),
            success: true,
        };
    }

    async handleGetStaticTrendTemplateRequest(router, ctx, next) {
        const { limit, offset } = router.request.body;

        const templates = await templateDataStore.getStaticTrendTemplate({
            limit,
            offset,
        });

        router.body = {
            templates,
            success: true,
        };
    }

    async handleGetTrendTemplateRequest(router, ctx, next) {
        const { limit, offset, user } = router.request.body;

        const templates = await templateDataStore.getStaticTrendTemplate({
            limit,
            offset,
        });

        router.body = {
            templates,
            success: true,
        };
    }

    async handleInitializeTemplateRequest(router, ctx, next) {
        // if (process.env.NODE_ENV != 'development') {
        //     router.body = JSON.stringify({ status: 'ok' });
        //     router.redirect('/');
        // }

        const { from_id, to_id } = router.query;

        const id_range =
            from_id && to_id
                ? {
                      id: {
                          $between: [
                              parseInt(from_id, 10),
                              parseInt(to_id, 10),
                          ],
                      },
                  }
                : null;

        const results = await models.Heading.findAll({
            where: id_range,
        });

        if (!results)
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });

        /*
        10 of concurrency is very confortable to do tasks smoothly.
        */
        const datum = await templateDataStore
            .fix_template_relation(results)
            .catch(e => {
                throw new ApiError({
                    error: e,
                    tt_key: 'errors.invalid_response_from_server',
                });
            });

        router.body = {
            templates: datum.map(data => safe2json(data)),
            success: true,
        };
    }
}
