import RepositoryImpl from '@repository/RepositoryImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import safe2json from '@extension/safe2json';
import data_config from '@constants/data_config';

export default class CommunityTemplateRepository extends RepositoryImpl {
    constructor() {
        super();
    }

    async getTemplate({ id }) {
        const data = await super.apiCall('/api/v1/community/template', {
            id,
        });
        return data && data.template;
    }

    async getTrend({ id, username, offset, limit, category_id, }) {
        const data = await super.apiCall('/api/v1/community/templates/trends', {
            user_id: id,
            username,
            offset: Number(offset || 0),
            limit: limit || data_config.fetch_data_limit('M'),
            category_id,
        });
        return data && data.templates;
    }

    async getStaticTrend({ offset, limit, category_id, }) {
        const data = await super.apiCall('/api/v1/community/templates/static/trends', {
            offset: Number(offset || 0),
            limit: limit || data_config.fetch_data_limit('M'),
            category_id,
        });
        return data && data.templates;
    }

    async answer({ user, template, answer }) {
        const data = await super.apiCall('/api/v1/community/template/answer', {
            user,
            template,
            answer,
        });
        return data && data.answer;
    }

    async addHeading({ template, heading }) {
        const data = await super.apiCall('/api/v1/community/template/heading/create', {
            heading,
            template,
        });
        return data;
    }
}
