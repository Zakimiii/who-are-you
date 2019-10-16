import { RouteEntity, RouteEntities } from '@entity/RouteEntity';
import data_config from '@constants/data_config';
import config from '@constants/config';
import tt from 'counterpart';
import models from '@network/client_models';

export const homeRoute = new RouteEntity({
    path: '/',
    page: 'Home',
    component: require('@components/pages/Home'),
});

export const homeAliasRoute = new RouteEntity({
    path: '/home',
    page: 'HomeAlias',
    component: require('@components/pages/HomeAlias'),
});

export const userShowRoute = new RouteEntity({
    path: '/user/:username',
    page: 'UserShow',
    component: require('@components/pages/UserShow'),
});

export const userEditRoute = new RouteEntity({
    path: '/settings',
    page: 'UserEdit',
    component: require('@components/pages/UserEdit'),
});

export const headingShowRoute = new RouteEntity({
    path: '/heading/:id',
    page: 'HeadingShow',
    component: require('@components/pages/HeadingShow'),
    validate: { id: /\d+/ },
});

export const answerShowRoute = new RouteEntity({
    path: '/answer/:id',
    page: 'AnswerShow',
    component: require('@components/pages/AnswerShow'),
    validate: { id: /\d+/ },
});

export const headingNewRoute = new RouteEntity({
    path: '/user/:username/heading/new',
    page: 'HeadingNew',
    component: require('@components/pages/HeadingNewAlias'),
});

export const answerNewRoute = new RouteEntity({
    path: '/heading/:id/answer/new',
    page: 'AnswerNew',
    validate: { id: /\d+/ },
    component: require('@components/pages/AnswerNewAlias'),
});

export const notificationIndexRoute = new RouteEntity({
    path: '/notifications',
    page: 'NotificationIndex',
    component: require('@components/pages/NotificationIndex'),
});

export const postIndexRoute = new RouteEntity({
    path: '/posts',
    page: 'PostIndex',
    component: require('@components/pages/PostIndex'),
});

export const headingCanvasTestRoute = new RouteEntity({
    path: '/heading/canvas/test',
    page: 'HeadingCanvasTest',
    component: require('@components/pages/HeadingCanvasTest'),
});

export const answerCanvasTestRoute = new RouteEntity({
    path: '/answer/canvas/test',
    page: 'AnswerCanvasTest',
    component: require('@components/pages/AnswerCanvasTest'),
});

export const loginRoute = new RouteEntity({
    path: '/login',
    page: 'Login',
    component: require('@components/pages/LoginModalAlias'),
});

export const privacyRoute = new RouteEntity({
    path: '/privacy',
    page: 'Privacy',
    component: require('@components/pages/Privacy'),
});

export const faqRoute = new RouteEntity({
    path: '/FAQ',
    page: 'FAQ',
    component: require('@components/pages/FAQ'),
});

export const termRoute = new RouteEntity({
    path: '/term',
    page: 'Term',
    component: require('@components/pages/Term'),
});

export const contactRoute = new RouteEntity({
    path: '/contact',
    page: 'Contact',
    component: require('@components/pages/Contact'),
});

export const notfoundRoute = new RouteEntity({
    path: '/notfound',
    page: 'NotFound',
    component: require('@components/pages/NotFound'),
});

// export const xssRoute = new RouteEntity({
//     path: '/xss/test',
//     page: 'XSSTest',
//     component: require('@components/pages/XSSTest'),
// });

export const routeEntities = new RouteEntities({
    items: [
        notfoundRoute,
        userShowRoute,
        userEditRoute,
        privacyRoute,
        faqRoute,
        termRoute,
        contactRoute,
        homeRoute,
        homeAliasRoute,
        headingNewRoute,
        answerNewRoute,
        loginRoute,
        headingCanvasTestRoute,
        answerCanvasTestRoute,
        headingShowRoute,
        answerShowRoute,
        notificationIndexRoute,
        postIndexRoute,
        // homeIndexRoute,
    ],
    notfoundRoute,
});

export const getPageTitle = (pathname, state) => {
    const page = routeEntities.resolveRoute(pathname).page;
    let title = tt('pages.Home');
    if (page == answerShowRoute.page) {
        let val = state.answer.get('show_answer');
        const answer = !!val ? val.toJS() : null;
        if (!!answer && !!answer.Heading && !!answer.Heading.User)
            title = tt(`pages.${answerShowRoute.page}`, {
                data: `${answer.Heading.User.nickname}の紹介`,
            });
    } else if (page == headingShowRoute.page) {
        let val = state.heading.get('show_heading');
        const heading = !!val ? val.toJS() : null;
        if (!!heading && !!heading.User)
            title = tt(`pages.${headingShowRoute.page}`, {
                data: `${heading.User.nickname}の紹介`,
            });
    } else if (page == userShowRoute.page) {
        if (
            !!state.user.get('show_user') &&
            !!state.user.get('show_user').get('nickname') &&
            !!state.user.get('show_user').get('detail')
        )
            title = tt(`pages.${userShowRoute.page}`, {
                nickname: state.user.get('show_user').get('nickname'),
                detail: state.user.get('show_user').get('detail'),
            });
    } else {
        title = tt(`pages.${page}`, { fallback: tt('pages.Home') });
    }
    return title + ' | ' + config.APP_NAME;
};

export const getPageDescription = (pathname, state) => {
    const page = routeEntities.resolveRoute(pathname).page;
    let description = tt('descriptions.Home');
    if (page == answerShowRoute.page) {
        let val = state.answer.get('show_answer');
        const answer = !!val ? val.toJS() : null;
        if (!!answer && !!answer.Heading)
            description = tt(`descriptions.${answerShowRoute.page}`, {
                heading: `${models.Heading.getBody(answer.Heading)}`,
            });
    } else if (page == headingShowRoute.page) {
        let val = state.heading.get('show_heading');
        const heading = !!val ? val.toJS() : null;
        if (!!heading && !!heading.User)
            description = tt(`descriptions.${headingShowRoute.page}`, {
                user: `${heading.User.nickname}`,
            });
    } else if (page == userShowRoute.page) {
        if (
            !!state.user.get('show_user') &&
            !!state.user.get('show_user').get('nickname') &&
            !!state.user.get('show_user').get('detail')
        )
            description = tt(`descriptions.${userShowRoute.page}`, {
                user: state.user.get('show_user').get('nickname'),
            });
    } else {
        description = tt(`descriptions.${page}`, {
            fallback: tt('descriptions.Home'),
        });
    }
    return description;
};

export const getPageImage = pathname => {
    const page = routeEntities.resolveRoute(pathname).page;
    let image;
    if (page == answerShowRoute.page) {
        image = `${
            config.CURRENT_APP_URL
        }/pictures/answer/${answerShowRoute.params_value('id', pathname)}.png`;
    } else if (page == headingShowRoute.page) {
        image = `${
            config.CURRENT_APP_URL
        }/pictures/heading/${headingShowRoute.params_value(
            'id',
            pathname
        )}.png`;
    } else {
        /*else if (page == userShowRoute.page) {
        if (
            !!state.user.get('show_user') &&
            !!state.user.get('show_user').get('picture_small')
        )
            image = `${state.user.get('show_user').get('picture_small')}`;
    } */ image = `${
            config.CURRENT_APP_URL
        }/images/brands/who-are-you_logo.png`;
    }

    return image;
};

export const getPageTweetTag = (pathname, state) => {
    const page = routeEntities.resolveRoute(pathname).page;
    let card = 'summary_large_image';
    let title = getPageTitle(pathname, state);
    let description = getPageDescription(pathname, state);
    let image = getPageImage(pathname);

    return {
        card,
        title,
        description,
        image,
    };
};
