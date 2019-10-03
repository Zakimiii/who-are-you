import { RouteEntity, RouteEntities } from '@entity/RouteEntity';
import data_config from '@constants/data_config';
import config from '@constants/config';
import tt from 'counterpart';

export const homeRoute = new RouteEntity({
    path: '/',
    page: 'Home',
    component: require('@components/pages/Home'),
});

export const userShowRoute = new RouteEntity({
    path: '/user/:username',
    page: 'UserShow',
    component: require('@components/pages/UserShow'),
});

export const headingShowRoute = new RouteEntity({
    path: '/heading/:id',
    page: 'HeadingShow',
    component: require('@components/pages/HeadingShow'),
});

export const answerShowRoute = new RouteEntity({
    path: '/answer/:id',
    page: 'AnswerShow',
    component: require('@components/pages/AnswerShow'),
});

export const headingNewRoute = new RouteEntity({
    path: '/heading/new',
    page: 'HeadingNew',
    component: require('@components/pages/HeadingNewAlias'),
});

export const answerNewRoute = new RouteEntity({
    path: '/answer/new',
    page: 'AnswerNew',
    component: require('@components/pages/AnswerNewAlias'),
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
        privacyRoute,
        faqRoute,
        termRoute,
        contactRoute,
        homeRoute,
        headingNewRoute,
        answerNewRoute,
        loginRoute,
        headingCanvasTestRoute,
        answerCanvasTestRoute,
        headingShowRoute,
        answerShowRoute,
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
                heading: `${answer.Heading.body}`,
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

export const getPageTweetTag = (pathname, state) => {
    const page = routeEntities.resolveRoute(pathname).page;
    let card = 'summary_large_image';
    let title = getPageTitle(pathname, state);
    let description = getPageDescription(pathname, state);
    let image;
    if (page == answerShowRoute.page) {
        if (
            !!state.answer.get('show_answer') &&
            !!state.answer.get('show_answer').get('id')
        )
            image = `${
                config.CURRENT_APP_URL
            }/pictures/answer/${state.answer.get('show_answer').get('id')}.png`;
    } else if (page == headingShowRoute.page) {
        if (
            !!state.heading.get('show_heading') &&
            !!state.heading.get('show_heading').get('id')
        )
            image = `${
                config.CURRENT_APP_URL
            }/pictures/heading/${state.heading
                .get('show_heading')
                .get('id')}.png`;
    } else if (page == userShowRoute.page) {
        if (
            !!state.user.get('show_user') &&
            !!state.user.get('show_user').get('picture_small')
        )
            image = `${state.user.get('show_user').get('picture_small')}`;
    } else {
        image = `${config.CURRENT_APP_URL}/images/brands/who-are-you_logo.png`;
    }

    return {
        card,
        title,
        description,
        image,
    };
};
