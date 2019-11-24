import RepositoryImpl from '@repository/RepositoryImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import safe2json from '@extension/safe2json';
import data_config from '@constants/data_config';

export default class CommunityRepository extends RepositoryImpl {
    constructor() {
        super();
    }

    async getCommunity({ id }) {
        const data = await super.apiCall('/api/v1/community', {
            id,
        });
        return data && data.community;
    }

    async getCommunities({ id, username, offset, limit }) {
        const data = await super.apiCall('/api/v1/communities/static', {
            user_id: Number(id),
            username,
            limit: limit || data_config.fetch_data_limit('M'),
            offset: Number(offset || 0),
        });

        return data && data.communities;
    }

    async getStaticCommunities({ offset, limit }) {
        const data = await super.apiCall('/api/v1/communities/static', {
            limit: limit || data_config.fetch_data_limit('M'),
            offset: Number(offset || 0),
        });

        return data && data.communities;
    }

    async getHeadings({ id, offset, limit }) {
        const data = await super.apiCall('/api/v1/community/headings', {
            community_id: id,
            offset: Number(offset || 0),
            limit: limit || data_config.fetch_data_limit('S'),
        });

        return data && data.headings;
    }

    async follow({ user, target }) {
        const data = await super.apiCall('/api/v1/user/community/follow', {
            user,
            target,
        });

        return !!data.success;
    }

    async unfollow({ user, target }) {
        const data = await super.apiCall('/api/v1/user/community/unfollow', {
            user,
            target,
        });

        return !!data.success;
    }
}
