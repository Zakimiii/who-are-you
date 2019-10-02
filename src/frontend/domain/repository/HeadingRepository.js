import RepositoryImpl from '@repository/RepositoryImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import safe2json from '@extension/safe2json';
import data_config from '@constants/data_config';

export default class HeadingRepository extends RepositoryImpl {
    constructor() {
        super();
    }

    async getHeading({ id, offset, limit }) {
        const data = await super.apiCall('/api/v1/heading', {
            id: Number(id),
        });

        return data && data.heading;
    }

    async create(heading) {
        const data = await super.apiCall('/api/v1/heading/create', {
            heading: safe2json(heading),
        });

        return data;
    }

    async update(heading) {
        const data = await super.apiCall('/api/v1/heading/update', {
            heading: safe2json(heading),
        });

        return data;
    }

    async delete(heading) {
        const data = await super.apiCall('/api/v1/heading/delete', {
            heading: safe2json(heading),
        });

        return data;
    }

    async trash(heading) {
        const data = await super.apiCall('/api/v1/heading/trash', {
            heading: safe2json(heading),
        });

        return data;
    }

    async untrash(heading) {
        const data = await super.apiCall('/api/v1/heading/trash', {
            heading: safe2json(heading),
        });

        return data;
    }

    async getAnswers({ heading, offset, limit }) {
        const data = await super.apiCall('/api/v1/heading/answers', {
            heading_id: heading && heading.id,
            limit: limit || data_config.fetch_data_limit('M'),
            offset: Number(offset || 0),
        });

        return data && data.answers;
    }
}
