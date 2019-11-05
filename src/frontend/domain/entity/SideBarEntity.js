import Entity from '@entity/Entity';
import { Enum, defineEnum } from '@extension/Enum';
import {
    homeRoute,
    userShowRoute,
    userEditRoute,
    notificationIndexRoute,
    postIndexRoute,
    templateIndexRoute,
} from '@infrastructure/RouteInitialize';
import { browserHistory } from 'react-router';
import tt from 'counterpart';

export const SideBarSection = defineEnum({
    MyPage: {
        rawValue: 0,
        value: 'MyPage',
        string: () => tt('g.mypage'),
        image: 'noimage',
        link: '/',
        active: pathname =>
            !!homeRoute ? homeRoute.isValidPath(pathname) : false,
        loginRequire: false,
    },
    Templates: {
        rawValue: 0,
        value: 'Templates',
        string: () => tt('g.trend_themes'),
        image: 'mini-logo-icon',
        link: '/templates',
        active: pathname =>
            !!templateIndexRoute
                ? templateIndexRoute.isValidPath(pathname)
                : false,
        loginRequire: true,
    },
    Post: {
        rawValue: 0,
        value: 'Post',
        string: () => tt('g.posts'),
        image: 'tip',
        link: '/posts',
        active: pathname =>
            !!postIndexRoute ? postIndexRoute.isValidPath(pathname) : false,
        loginRequire: true,
    },
    Notification: {
        rawValue: 1,
        value: 'Notification',
        string: () => tt('g.notification'),
        image: 'notification',
        link: '/notifications',
        active: pathname =>
            !!notificationIndexRoute
                ? notificationIndexRoute.isValidPath(pathname)
                : false,
        loginRequire: true,
    },
    Setting: {
        rawValue: 1,
        value: 'Setting',
        string: () => tt('g.setting'),
        image: 'setting',
        link: '/settings',
        active: pathname =>
            !!userEditRoute ? userEditRoute.isValidPath(pathname) : false,
        loginRequire: true,
    },
});
