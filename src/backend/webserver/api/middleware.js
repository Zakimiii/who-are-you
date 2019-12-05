import koa_router from 'koa-router';
import koa_body from 'koa-body';
import crypto from 'crypto';
import models from '@models';
import { esc, escAttrs } from '@models';
import coBody from 'co-body';
import {
    SessionHandler,
    SearchHandler,
    AuthHandler,
    UserHandler,
    NotificationHandler,
    BatchHandler,
    HeadingHandler,
    AnswerHandler,
    TemplateHandler,
    CategoryHandler,
    CommunityHandler,
    CommunityHeadingHandler,
    CommunityAnswerHandler,
    CommunityTemplateHandler,
} from '@handlers';
import { handleApiError } from '@extension/Error';
import Gateway from '@network/gateway';
import log from '@extension/log';

const gateway = new Gateway();

const sessionHandler = new SessionHandler();
const searchHandler = new SearchHandler();
const authHandler = new AuthHandler();
const userHandler = new UserHandler();
const notificationHandler = new NotificationHandler();
const batchHandler = new BatchHandler();
const headingHandler = new HeadingHandler();
const answerHandler = new AnswerHandler();
const templateHandler = new TemplateHandler();
const categoryHandler = new CategoryHandler();
const communityHandler = new CommunityHandler();
const communityHeadingHandler = new CommunityHeadingHandler();
const communityAnswerHandler = new CommunityAnswerHandler();
const communityTemplateHandler = new CommunityTemplateHandler();

export default function ApiMiddleware(app) {
    const router = koa_router({ prefix: '/api/v1' });
    app.use(router.routes());
    const koaBody = koa_body({
        formLimit: '5mb',
        jsonLimit: '5mb',
        textLimit: '5mb',
    });

    // router.get('/confirm_email', koaBody, function*(ctx, next) {
    //     yield sessionHandler
    //         .handleConfirmEmail(this, ctx, next)
    //         .catch(async e => {
    //             await handleApiError(this, ctx, next, e);
    //             this.redirect('/notfound');
    //         });
    // });

    router.get('/notification/email/stop', koaBody, function*(ctx, next) {
        yield sessionHandler
            .handleStopMailNotificationRequest(this, ctx, next)
            .catch(async e => {
                await handleApiError(this, ctx, next, e);
                this.redirect('/notfound');
            });
    });

    router.post('/identity', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield sessionHandler
            .handleCheckAccessTokenRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/notification/check', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield notificationHandler
            .handleCheckRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/access_token/create', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield sessionHandler
            .handleGenerateAccessTokenRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/heading', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield headingHandler
            .handleGetRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/heading/create', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield headingHandler
            .handleCreateRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/heading/update', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield headingHandler
            .handleCreateRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/heading/delete', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield headingHandler
            .handleDestroyRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/heading/trash', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield headingHandler
            .handleTrashRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/heading/untrash', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield headingHandler
            .handleUnTrashRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/heading', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityHeadingHandler
            .handleGetRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/headings/static', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityHeadingHandler
            .handleStaticRecommendHeadingRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/heading/create', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityHeadingHandler
            .handleCreateRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/heading/update', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityHeadingHandler
            .handleCreateRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/heading/delete', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityHeadingHandler
            .handleDestroyRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/heading/trash', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityHeadingHandler
            .handleTrashRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/heading/untrash', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityHeadingHandler
            .handleUnTrashRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/answer', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield answerHandler
            .handleGetRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/answer/create', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield answerHandler
            .handleCreateRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/answer/update', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield answerHandler
            .handleCreateRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/answer/delete', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield answerHandler
            .handleDestroyRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/answer/trash', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield answerHandler
            .handleTrashRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/answer/untrash', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield answerHandler
            .handleUnTrashRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/answer', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityAnswerHandler
            .handleGetRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/answer/create', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityAnswerHandler
            .handleCreateRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/answer/update', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityAnswerHandler
            .handleCreateRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/answer/delete', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityAnswerHandler
            .handleDestroyRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/answer/trash', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityAnswerHandler
            .handleTrashRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/answer/untrash', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityAnswerHandler
            .handleUnTrashRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/users/init/twitter', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield authHandler
            .handleInitializeTwitterDataRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/users/init/counts', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleInitializeCountsRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/heading/search', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield searchHandler
            .handleSearchHeadingRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/search', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield searchHandler
            .handleSearchUserRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/answer/search', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield searchHandler
            .handleSearchAnswerRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleGetUserRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/delete', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleDeleteUserRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/recommends', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleGetUserRecommendRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/community/follow', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleFollowCommunityRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/community/unfollow', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleUnFollowCommunityRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/communities/follows', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleGetUserFollowCommunityRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/feeds', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleGetUserFeedsRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/static/recommends', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleGetStaticUserRecommendRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/heading/bot/create', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleCreateBotRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/twitter/username', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleGetUserTwitterNameRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/followers', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleGetUserFollowerRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/posts', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleGetUserPostsRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/notifications', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleGetUserNotificationsRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/headings', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleGetUserHeadingsRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/answers', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleGetUserAnswersRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/heading/answers', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield headingHandler
            .handleGetHeadingAnswersRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/heading/answers', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityHeadingHandler
            .handleGetHeadingAnswersRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/sync', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleSyncUserRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/user/notification_id/sync', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield userHandler
            .handleSyncNotificationIdRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/templates/static/trends', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield templateHandler
            .handleGetStaticTrendTemplateRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/templates/trends', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield templateHandler
            .handleGetTrendTemplateRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/template/answer', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield templateHandler
            .handleAnswerRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/templates/init', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield templateHandler
            .handleInitializeTemplateRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/template', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield templateHandler
            .handleGetTemplateRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/template/heading/create', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield templateHandler
            .handleAddHeadingRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/templates/static/trends', koaBody, function*(
        ctx,
        next
    ) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityTemplateHandler
            .handleGetStaticTrendTemplateRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/templates/trends', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityTemplateHandler
            .handleGetTrendTemplateRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/template/answer', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityTemplateHandler
            .handleAnswerRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/templates/init', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityTemplateHandler
            .handleInitializeTemplateRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/template', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityTemplateHandler
            .handleGetTemplateRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/template/heading/create', koaBody, function*(
        ctx,
        next
    ) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityTemplateHandler
            .handleAddHeadingRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/category', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield categoryHandler
            .handleGetCategoryRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/categories', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield categoryHandler
            .handleGetCategoriesRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/category/communities', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield categoryHandler
            .handleGetCategoryCommunitiesRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityHandler
            .handleGetCommunityRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/communities/static', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityHandler
            .handleStaticRecommendCommunityRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/headings', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityHandler
            .handleGetCommunityHeadingsRequest(
                results.router,
                results.ctx,
                results.next
            )
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/review', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityHandler
            .handleReviewRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/community/heading/bot/create', koaBody, function*(ctx, next) {
        const results = yield gateway.run(this, ctx, next);
        if (!!results.error) {
            yield handleApiError(
                results.router,
                results.ctx,
                results.next,
                results.error
            );
            return;
        }
        yield communityHandler
            .handleCreateBotRequest(results.router, results.ctx, results.next)
            .catch(
                async e =>
                    await handleApiError(
                        results.router,
                        results.ctx,
                        results.next,
                        e
                    )
            );
    });

    router.post('/csp_violation', function*() {
        let params;
        try {
            params = yield coBody(this);
        } catch (error) {
            console.log('-- /csp_violation error -->', error);
        }
        if (params && params['csp-report']) {
            const csp_report = params['csp-report'];
            const value = `${csp_report['document-uri']} : ${
                csp_report['blocked-uri']
            }`;
            console.log(
                '-- /csp_violation -->',
                value,
                '--',
                this.req.headers['user-agent']
            );
        } else {
            console.log(
                '-- /csp_violation [no csp-report] -->',
                params,
                '--',
                this.req.headers['user-agent']
            );
        }
        this.body = '';
    });
}
