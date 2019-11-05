import RepositoryImpl from '@repository/RepositoryImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import safe2json from '@extension/safe2json';
import data_config from '@constants/data_config';

export default class AnswerRepository extends RepositoryImpl {
    constructor() {
        super();
    }

    async getAnswer({ id, offset, limit }) {
        const data = await super.apiCall('/api/v1/answer', {
            id: Number(id),
        });

        return data && data.answer;
    }

    async create(answer) {
        const data = await super.apiCall('/api/v1/answer/create', {
            answer: safe2json(answer),
        });

        return data;
    }

    async update(answer) {
        const data = await super.apiCall('/api/v1/answer/update', {
            answer: safe2json(answer),
        });

        return data;
    }

    async delete(answer) {
        const data = await super.apiCall('/api/v1/answer/delete', {
            answer: safe2json(answer),
        });

        return data.answer;
    }

    async trash(answer) {
        const data = await super.apiCall('/api/v1/answer/trash', {
            answer: safe2json(answer),
        });

        return data;
    }

    async untrash(answer) {
        const data = await super.apiCall('/api/v1/answer/trash', {
            answer: safe2json(answer),
        });

        return data;
    }
}
