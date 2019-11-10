import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import models from '@models';
import {
    AnswerDataStore,
    HeadingDataStore,
    NotificationDataStore,
    UserDataStore,
    TemplateDataStore,
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
import TwitterHandler from '@network/twitter';

const answerDataStore = new AnswerDataStore();
const headingDataStore = new HeadingDataStore();
const notificationDataStore = new NotificationDataStore();
const userDataStore = new UserDataStore();
const templateDataStore = new TemplateDataStore();

export default class HeadingHandler extends HandlerImpl {
    constructor() {
        super();
    }

    async postTweet(heading) {
        if (process.env.NODE_ENV == 'development') return true;
        if (!heading) return false;

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

        notificationDataStore.onCreateHeading(result);
        userDataStore.updateCount({ id: result.UserId });
        templateDataStore.find_or_create_from_heading(result);

        const posted = await this.postTweet(result);

        router.body = {
            success: true,
            heading: safe2json(result),
            posted,
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

        // userDataStore.updateCount({ id: result.UserId });
        templateDataStore.find_or_create_from_heading(result);

        const posted = await this.postTweet(result);

        router.body = {
            success: true,
            heading: safe2json(result),
            posted,
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

        userDataStore.updateCount({ id: heading.UserId });

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
