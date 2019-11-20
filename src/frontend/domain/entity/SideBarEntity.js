import Entity from '@entity/Entity';
import { Enum, defineEnum } from '@extension/Enum';
import {
    homeRoute,
    userShowRoute,
    userEditRoute,
    notificationIndexRoute,
    postIndexRoute,
    templateIndexRoute,
    communityIndexRoute,
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
        image: 'tip',
        link: '/templates',
        active: pathname =>
            !!templateIndexRoute
                ? templateIndexRoute.isValidPath(pathname)
                : false,
        loginRequire: true,
    },
    Communities: {
        rawValue: 0,
        value: 'Communities',
        string: () => tt('g.community'),
        image: 'mini-logo-icon',
        link: '/communities',
        active: pathname =>
            !!communityIndexRoute
                ? communityIndexRoute.isValidPath(pathname)
                : false,
        loginRequire: false,
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
