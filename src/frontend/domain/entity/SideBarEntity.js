import Entity from '@entity/Entity';
import { Enum, defineEnum } from '@extension/Enum';
import { homeRoute, userShowRoute } from '@infrastructure/RouteInitialize';
import { browserHistory } from 'react-router';
import tt from 'counterpart';

export const SideBarSection = defineEnum({
    MyPage: {
        rawValue: 0,
        value: 'MyPage',
        string: () => 'マイページ',
        image: 'noimage',
        link: '/',
        active: pathname =>
            !!userShowRoute ? userShowRoute.isValidPath(pathname) : false,
    },
    // Recommend: {
    //     rawValue: 0,
    //     value: 'Recommend',
    //     string: () => 'トレンド',
    //     image: 'recommend',
    //     link: '/recommend',
    //     active: pathname =>
    //         !!userShowRoute ? userShowRoute.isValidPath(pathname) : false,
    // },
    Post: {
        rawValue: 0,
        value: 'Post',
        string: () => '過去の投稿',
        image: 'tip',
        link: '/posts',
        active: pathname => false,
    },
    Notification: {
        rawValue: 1,
        value: 'Notification',
        string: () => 'お知らせ',
        image: 'notification',
        link: '/notifications',
        active: pathname => false,
    },
    Setting: {
        rawValue: 1,
        value: 'Setting',
        string: () => '設定',
        image: 'setting',
        link: '/settings',
        active: pathname => false,
    },
});
