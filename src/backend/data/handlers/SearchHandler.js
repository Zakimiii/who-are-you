import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import models from '@models';
import { HeadingDataStore, AnswerDataStore, UserDataStore } from '@datastore';

const answerDataStore = new answerDataStore();
const headingDataStore = new HeadingDataStore();
const userDataStore = new UserDataStore();

export default class SearchHandler extends HandlerImpl {
    constructor() {
        super();
    }

    async handleSearchHeadingRequest(router, ctx, next) {
        const { keyword, limit, offset, user, client_id } = router.request.body;

        const headings = await headingDataStore
            .search({
                keyword,
                limit,
                offset,
            })
            .catch(e => {
                throw e;
            });

        if (!offset || offset == 0) {
            const result = await models.SearchHistory.create({
                user_id: user && user.id,
                title: keyword,
                table_name: 'headings',
                client_id,
            }).catch(e => {
                throw new ApiError({
                    error: e,
                    tt_key: 'errors.invalid_response_from_server',
                });
            });
        }

        router.body = {
            headings,
            success: true,
        };
    }

    async handleSearchUserRequest(router, ctx, next) {
        const { keyword, limit, offset, user, client_id } = router.request.body;

        const users = await userDataStore
            .search({
                keyword,
                limit,
                offset,
            })
            .catch(e => {
                throw e;
            });

        if (!offset || offset == 0) {
            const result = await models.SearchHistory.create({
                user_id: user && user.id,
                title: keyword,
                table_name: 'users',
                client_id,
            }).catch(e => {
                throw new ApiError({
                    error: e,
                    tt_key: 'errors.invalid_response_from_server',
                });
            });
        }

        router.body = {
            users,
            success: true,
        };
    }

    async handleSearchAnswerRequest(router, ctx, next) {
        const { keyword, limit, offset, user, client_id } = router.request.body;

        const answers = await answerDataStore
            .search({
                keyword,
                limit,
                offset,
            })
            .catch(e => {
                throw e;
            });

        if (!offset || offset == 0) {
            const result = await models.SearchHistory.create({
                user_id: user && user.id,
                title: keyword,
                table_name: 'answers',
                client_id,
            }).catch(e => {
                throw new ApiError({
                    error: e,
                    tt_key: 'errors.invalid_response_from_server',
                });
            });
        }

        router.body = {
            answers,
            success: true,
        };
    }
}
