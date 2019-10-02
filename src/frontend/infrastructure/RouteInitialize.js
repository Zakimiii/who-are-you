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
    let title = tt('pages.HomeIndex');
    return title + ' | ' + config.APP_NAME;
};

export const getPageDescription = (pathname, state) => {
    const page = routeEntities.resolveRoute(pathname).page;
    let description = tt('descriptions.HomeIndex');
    return description;
};
