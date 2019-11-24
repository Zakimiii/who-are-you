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
    path: '/user/:username/:section?',
    page: 'UserShow',
    component: require('@components/pages/UserShow'),
    validate: {
        section: /(headings|templates)/,
    },
});

export const categoryShowRoute = new RouteEntity({
    path: '/category/:id',
    page: 'CategoryShow',
    component: require('@components/pages/CategoryShow'),
    validate: {
        id: /\d+/
    },
});

export const communityShowRoute = new RouteEntity({
    path: '/community/:id/:section?',
    page: 'CommunityShow',
    component: require('@components/pages/CommunityShow'),
    validate: {
        id: /\d+/,
        section: /(headings|templates)/,
    },
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

export const communityHeadingShowRoute = new RouteEntity({
    path: '/communities/heading/:id',
    page: 'CommunityHeadingShow',
    component: require('@components/pages/CommunityHeadingShow'),
    validate: { id: /\d+/ },
});

export const communityAnswerShowRoute = new RouteEntity({
    path: '/communities/answer/:id',
    page: 'CommunityAnswerShow',
    component: require('@components/pages/CommunityAnswerShow'),
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

export const communityHeadingNewRoute = new RouteEntity({
    path: '/community/:id/heading/new',
    page: 'CommunityHeadingNew',
    validate: { id: /\d+/ },
    component: require('@components/pages/CommunityHeadingNewAlias'),
});

export const communityAnswerNewRoute = new RouteEntity({
    path: '/community/heading/:id/answer/new',
    page: 'CommunityAnswerNew',
    validate: { id: /\d+/ },
    component: require('@components/pages/CommunityAnswerNewAlias'),
});


export const templateIndexRoute = new RouteEntity({
    path: '/templates',
    page: 'TemplateIndex',
    component: require('@components/pages/TemplateIndex'),
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

export const communityIndexRoute = new RouteEntity({
    path: '/communities',
    page: 'CommunityIndex',
    component: require('@components/pages/CommunityIndex'),
});

export const searchRoute = new RouteEntity({
    path: '/search/:section?',
    page: 'Search',
    validate: {
        section: /(headings|users|answers)/,
    },
    component: require('@components/pages/SearchIndex'),
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

export const confirmForDeleteRoute = new RouteEntity({
    path: '/user/delete/confirm',
    page: 'LoginModalForDeleteAlias',
    component: require('@components/pages/LoginModalForDeleteAlias'),
});

export const confirmForLineLinkRoute = new RouteEntity({
    path: '/line/:linkToken/confirm',
    page: 'LoginModalForLineLinkAlias',
    component: require('@components/pages/LoginModalForLineLinkAlias'),
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

export const cmpTestRoute = new RouteEntity({
    path: '/test/components',
    page: 'CmpTest',
    component: require('@components/pages/CmpTest'),
});

export const welcomeRoute = new RouteEntity({
    path: '/welcome',
    page: 'Welcome',
    component: require('@components/pages/Welcome'),
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
        categoryShowRoute,
        communityShowRoute,
        userEditRoute,
        privacyRoute,
        faqRoute,
        termRoute,
        contactRoute,
        homeRoute,
        homeAliasRoute,
        headingNewRoute,
        answerNewRoute,
        communityHeadingNewRoute,
        communityAnswerNewRoute,
        loginRoute,
        confirmForDeleteRoute,
        confirmForLineLinkRoute,
        headingCanvasTestRoute,
        answerCanvasTestRoute,
        headingShowRoute,
        communityHeadingShowRoute,
        answerShowRoute,
        communityAnswerShowRoute,
        notificationIndexRoute,
        postIndexRoute,
        communityIndexRoute,
        searchRoute,
        templateIndexRoute,
        cmpTestRoute,
        welcomeRoute,
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
    } else if (page == communityAnswerShowRoute.page) {
        let val = state.communityAnswer.get('show_answer');
        const answer = !!val ? val.toJS() : null;
        if (!!answer && !!answer.Heading && !!answer.Heading.Community)
            title = tt(`pages.${answerShowRoute.page}`, {
                data: `${answer.Heading.Community.body}の紹介`,
            });
    } else if (page == communityHeadingShowRoute.page) {
        let val = state.communityHeading.get('show_heading');
        const heading = !!val ? val.toJS() : null;
        if (!!heading && !!heading.Community)
            title = tt(`pages.${headingShowRoute.page}`, {
                data: `${heading.Community.body}の紹介`,
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
    } else if (page == communityAnswerShowRoute.page) {
        let val = state.communityAnswer.get('show_answer');
        const answer = !!val ? val.toJS() : null;
        if (!!answer && !!answer.Heading)
            description = tt(`descriptions.${answerShowRoute.page}`, {
                heading: `${models.Heading.getBody(answer.Heading)}`,
            });
    } else if (page == communityHeadingShowRoute.page) {
        let val = state.communityHeading.get('show_heading');
        const heading = !!val ? val.toJS() : null;
        if (!!heading && !!heading.Community)
            description = tt(`descriptions.${headingShowRoute.page}`, {
                user: `${heading.Community.body}`,
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
    } else if (page == communityAnswerShowRoute.page) {
        image = `${
            config.CURRENT_APP_URL
        }/pictures/communities/answer/${communityAnswerShowRoute.params_value('id', pathname)}.png`;
    } else if (page == communityHeadingShowRoute.page) {
        image = `${
            config.CURRENT_APP_URL
        }/pictures/communities/heading/${communityHeadingShowRoute.params_value(
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
        }/images/brands/ogp-logo.png`;
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
