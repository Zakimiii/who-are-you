import RepositoryImpl from '@repository/RepositoryImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';

export default class CommunityAnswerRepository extends RepositoryImpl {
    constructor() {
        super();
    }

    async getAnswer({ id, offset, limit }) {
        const data = await super.apiCall('/api/community/v1/answer', {
            id: Number(id),
        });

        return data && data.answer;
    }

    async create(answer) {
        const data = await super.apiCall('/api/v1/community/answer/create', {
            answer: safe2json(answer),
        });

        return data;
    }

    async update(answer) {
        const data = await super.apiCall('/api/v1/community/answer/update', {
            answer: safe2json(answer),
        });

        return data;
    }

    async delete(answer) {
        const data = await super.apiCall('/api/v1/community/answer/delete', {
            answer: safe2json(answer),
        });

        return data.answer;
    }

    async trash(answer) {
        const data = await super.apiCall('/api/v1/community/answer/trash', {
            answer: safe2json(answer),
        });

        return data;
    }

    async untrash(answer) {
        const data = await super.apiCall('/api/v1/community/answer/trash', {
            answer: safe2json(answer),
        });

        return data;
    }
}
