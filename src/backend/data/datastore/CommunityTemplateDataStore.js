import DataStoreImpl from '@datastore/DataStoreImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';
import Promise from 'bluebird';
import data_config from '@constants/data_config';
import { ApiError } from '@extension/Error';
import {
    generateLikeQuery,
    generateOrQuery,
    generateOrQueries,
} from '@extension/query';

export default class CommunityTemplateDataStore extends DataStoreImpl {
    constructor() {
        super();
    }

    async updateCount(value) {
        if (!value) return;
        const template = await models.CommunityTemplate.findOne({
            where: {
                id: Number(value.id),
            },
        });
        if (!template) return;

        const headings = await models.CommunityHeading.findAll({
            where: {
                template_id: Number(template.id),
                body: template.body,
            },
            attributes: ['id'],
        });

        const result = await template.update({
            count: headings.length,
        });

        return result;
    }

    async find_or_create_from_heading(heading) {
        if (!heading) return;
        if (
            !heading.id ||
            !heading.body ||
            heading.body == '' ||
            !heading.CommunityId ||
            Number.prototype.castBool(heading.isBot)
        )
            return;

        heading = await models.CommunityHeading.findOne({
            where: {
                id: Number(heading.id),
            },
        });

        const community = await models.Community.findOne({
            where: {
                id: Number(heading.CommunityId),
            },
        });

        // const [template, created] = await models.CommunityTemplate.findOrCreate({
        //     where: {
        //         valid: true,
        //         permission: true,
        //         body: heading.body,
        //     },
        // });

        let template = await models.CommunityTemplate.findOne({
            where: {
                category_id: Number(community.CategoryId)
                body: heading.body,
            },
        });

        if (!template) {
            template = await models.CommunityTemplate.create({
                category_id: Number(community.CategoryId)
                valid: true,
                permission: true,
                body: heading.body,
            });
        }

        const updated = await heading.update({
            template_id: template.id,
        });

        this.updateCount(template);

        return template;
    }

    async fix_template_relation(headings) {
        const templates = await Promise.all(
            headings.map(heading => this.find_or_create_from_heading(heading))
        );
        return templates;
    }

    async getStaticTrendTemplate({ category_id, limit, offset }) {
        const templates = await models.CommunityTemplate.findAll({
            where: {
                category_id: Number(category_id),
            },
            order: [['count', 'DESC']],
            limit: Number(limit) || data_config.fetch_data_limit('M'),
            offset: Number(offset || 0),
            raw: true,
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        return templates;
    }

    async add_heading({ heading, template }) {
        if (!heading || !template) return;

        if (heading.picture) {
            heading.picture = await this.bcomposite_from_base64({
                base64: heading.picture,
                bsrc: this.resolveAssetsPath('images/brands/ogp-back.png'),
                params: {
                    xsize: data_config.shot_picture_xsize,
                    ysize: data_config.shot_picture_ysize,
                },
            });
        }

        const created_heading = await models.CommunityHeading.create(heading);

        this.updateCount(template);

        return created_heading;
    }

    async answer({ user, answer, template }) {
        if (!user || !answer || !template) return;
        const heading = await models.CommunityHeading.create({
            body: template.body,
            user_id: Number(user.id),
            voter_id: Number(user.id),
            template_id: Number(template.id),
        });

        answer.Heading = heading;
        answer.HeadingId = heading.id;

        const created_answer = await models.CommunityAnswer.create(answer);
        return created_answer;
    }
}
