import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import models from '@models';
import {
    AnswerDataStore,
    HeadingDataStore,
    NotificationDataStore,
} from '@datastore';
import Promise from 'bluebird';
import data_config from '@constants/data_config';
import safe2json from '@extension/safe2json';
import {
    apiUpdateHeadingValidates,
    apiCreateHeadingValidates,
    apiDestroyHeadingValidates,
    apiTrashHeadingValidates,
    apiUnTrashHeadingValidates,
} from '@validations/heading';
import { ApiError } from '@extension/Error';

const answerDataStore = new AnswerDataStore();
const headingDataStore = new HeadingDataStore();
const notificationDataStore = new NotificationDataStore();

export default class HeadingHandler extends HandlerImpl {
    constructor() {
        super();
    }

    async handleGetRequest(router, ctx, next) {
        const { id } = router.request.body;

        // await apiFindUserValidates.isValid({
        //     username,
        //     id,
        //     user: { id, username },
        // });

        let heading = await models.Heading.findOne({
            where: {
                id,
            },
            raw: true,
        });

        heading = await headingDataStore.getShowIncludes(heading);

        router.body = {
            success: true,
            heading: safe2json(heading[0]),
        };
    }

    async handleCreateRequest(router, ctx, next) {
        const { heading, limit, offset } = router.request.body;

        // await apiCreateHeadingValidates.isValid({
        //     heading,
        // });

        const result = await headingDataStore.create(heading).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        // notificationDataStore.onCreateHeading(result);

        router.body = {
            success: true,
            heading: safe2json(result),
        };
    }

    async handleUpdateRequest(router, ctx, next) {
        const { heading, limit, offset } = router.request.body;

        // await apiUpdateHeadingValidates.isValid({
        //     heading,
        // });

        const result = await headingDataStore.update(heading).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        router.body = {
            success: true,
            heading: safe2json(result),
        };
    }

    async handleDestroyRequest(router, ctx, next) {
        const { heading, limit, offset } = router.request.body;

        // await apiDestroyHeadingValidates.isValid({
        //     heading,
        // });

        const result = await headingDataStore.delete(heading).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        router.body = {
            success: true,
            heading: safe2json(result),
        };
    }

    async handleTrashRequest(router, ctx, next) {
        const { heading, limit, offset } = router.request.body;

        // await apiTrashHeadingValidates.isValid({
        //     heading,
        // });

        const result = await headingDataStore.trash(heading).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        router.body = {
            success: true,
            heading: safe2json(result),
        };
    }

    async handleUnTrashRequest(router, ctx, next) {
        const { heading, limit, offset } = router.request.body;

        // await apiUnTrashHeadingValidates.isValid({
        //     heading,
        // });

        const result = await headingDataStore.untrash(heading).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        router.body = {
            success: true,
            heading: safe2json(result),
        };
    }

    async handleGetHeadingAnswersRequest(router, ctx, next) {
        const { heading_id, limit, offset } = router.request.body;

        if (!heading_id)
            throw new ApiError({
                error: new Error('heading_id is required'),
                tt_key: 'errors.is_required',
                tt_params: { data: 'heading_id' },
            });

        const answers = await answerDataStore.getHeadingAnswers({
            heading_id,
            offset,
            limit,
        });

        router.body = {
            success: true,
            answers,
        };
    }
}
