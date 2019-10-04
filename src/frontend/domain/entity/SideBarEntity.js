import Entity from '@entity/Entity';
import { Enum, defineEnum } from '@extension/Enum';
import ope from '@extension/operator';
import {
    userShowRoute,
    labelShowRoute,
    feedsRoute,
    homeIndexRoute,
    usersRecommendRoute,
    trendRoute,
} from '@infrastructure/RouteInitialize';
import { browserHistory } from 'react-router';
import tt from 'counterpart';

export const menuSection = defineEnum({
    Home: {
        rawValue: 0,
        value: 'Home',
        string: () => tt('g.home'),
        image: 'home',
        link: '/', //homeIndexRoute.path,
        active: pathname =>
            !!homeIndexRoute ? homeIndexRoute.isValidPath(pathname) : false,
    },
    Trend: {
        rawValue: 1,
        value: 'Trend',
        string: () => tt('g.trend'),
        image: 'trend',
        link: '/trends',
        active: pathname =>
            !!trendRoute ? trendRoute.isValidPath(pathname) : false,
    },
    // Events: {
    //     rawValue: 2,
    //     value: 'Events',
    //     image: 'event',
    //     link: '/events',
    // },
    Feed: {
        rawValue: 2,
        value: 'Feed',
        string: () => tt('g.feed'),
        image: 'feed',
        link: '/feeds', //feedsRoute.path,
        active: pathname =>
            !!feedsRoute ? feedsRoute.isValidPath(pathname) : false,
    },
    Mypage: {
        rawValue: 3,
        value: 'MyPage',
        string: () => tt('g.mypage'),
        image: 'noimage',
        link: id => userShowRoute.getPath({ params: { id } }),
        active: (id, pathname) =>
            !!userShowRoute
                ? userShowRoute.isValidPathWithParams(pathname, { id })
                : false,
    },
    Border3: {
        rawValue: 3,
        value: 'Border',
    },
});
