import Entity from '@entity/Entity';
import { Enum, defineEnum } from '@extension/Enum';
import tt from 'counterpart';
import { homeRoute, userShowRoute } from '@infrastructure/RouteInitialize';

export const SETTING_MENU = defineEnum({
    Welcome: {
        rawValue: 0,
        value: () => tt('g.what_whoareyou'),
        url: '/home',
    },
    // FAQ: {
    //     rawValue: 4,
    //     value: () => tt('g.faqs'),
    //     url: '/FAQ',
    // },
    Term: {
        rawValue: 5,
        value: () => tt('g.terms'),
        url: '/term',
    },
    Privacy: {
        rawValue: 6,
        value: () => tt('g.privacy_policy'),
        url: '/privacy',
    },
    Contact: {
        rawValue: 7,
        value: () => tt('g.contact'),
        url: '/contact',
    },
    Logout: {
        rawValue: 8,
        value: () => tt('g.logout'),
        url: '/',
        //MEMO: see onclick
    },
    Delete: {
        rawValue: 9,
        value: () => tt('g.quit'),
        url: null, //'/user/delete/confirm',
        //MEMO: see onclick
    },
});

export default SETTING_MENU;
