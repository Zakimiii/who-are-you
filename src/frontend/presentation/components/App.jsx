import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppPropTypes from '@extension/AppPropTypes';
import Header from '@modules/Header';
import TabBar from '@modules/TabBar';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import classNames from 'classnames';
import tt from 'counterpart';
import { Component } from 'react';
import resolveRoute from '@infrastructure/ResolveRoute';
import Modals from '@modules/Modals';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import AlertContainer from '@cards/AlertContainer';
import FlashContainer from '@cards/FlashContainer';
import ScreenLoadingIndicator from '@modules/ScreenLoadingIndicator';
import LoadingIndicator from '@elements/LoadingIndicator';
import LoadingScreen from '@pages/LoadingScreen';
import env from '@env/env.json';
import { OneSignalWindow } from '@network/notification';
import DocumentTitle from 'react-document-title';
import autobind from 'class-autobind';
import {
    routeEntities,
    getPageTitle,
    getPageDescription,
    getPageTweetTag,
    homeRoute,
    homeAliasRoute,
} from '@infrastructure/RouteInitialize';
import config from '@constants/config';
import ScreenShot from '@modules/ScreenShot';
import Responsible from '@modules/Responsible';

class App extends Component {
    static redirect = url => {
        if (
            `${config.APP_PUBLIC_IP}/` == url ||
            `${config.APP_PUBLIC_IP}` == url ||
            `http://${config.APP_DOMAIN}/` == url ||
            `http://${config.APP_DOMAIN}` == url
        ) {
            window.location.replace(`https://${config.APP_DOMAIN}`);
        }
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'App');
    }

    componentWillMount() {
        this.props.syncCurrentUser();
        this.props.loginUser();

        this.setTwitterMeta(this.props.tweet_tags);
    }

    componentDidMount() {
        process.env.BROWSER && App.redirect(window.location.href);

        if (window && document && process.env.NODE_ENV == 'production') {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: env.GOOGLE.AD_CLIENT,
                    enable_page_level_ads: true,
                });
            } catch (e) {}

            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', env.GOOGLE.ANALYSTICS_CLIENT);
            // FIXME: inline script will be ban by chrome
            // var s = document.createElement('script');
            // var code = `(adsbygoogle = window.adsbygoogle || []).push({
            //       google_ad_client: "${env.GOOGLE.AD_CLIENT}",
            //       enable_page_level_ads: true
            //  });`;
            // try {
            //     s.appendChild(document.createTextNode(code));
            //     document.head.appendChild(s);
            // } catch (e) {
            //     s.text = code;
            //     document.head.appendChild(s);
            // }
            // var s1 = document.createElement('script');
            // var code = `
            //     var OneSignal = window.OneSignal || [];
            //     OneSignal.push(function() {
            //         OneSignal.init({
            //             appId: "${env.ONESIGNAL.APP_ID}",
            //         });
            //     });
            // `;
            // try {
            //     s1.appendChild(document.createTextNode(code));
            //     document.head.appendChild(s1);
            // } catch (e) {
            //     s1.text = code;
            //     document.head.appendChild(s1);
            // }
        }
    }

    componentWillReceiveProps(np) {
        window.previousLocation = this.props.location;

        if (
            np.pathname != this.props.pathname &&
            process.env.NODE_ENV == 'production'
        ) {
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('config', env.GOOGLE.ANALYSTICS_CLIENT, {
                page_path: np.pathname,
            });
        }

        if (this.props.description !== np.description)
            this.setDescription(np.description);

        if (this.props.tweet_tags !== np.tweet_tags)
            this.setTwitterMeta(np.tweet_tags);
    }

    // getMetaContents(mn){
    //     var m = document.getElementsByTagName('meta');
    //     for(var i in m){
    //         if(m[i].name == mn){
    //             return m[i].content;
    //         }
    //     }
    // }

    setDescription(description) {
        if (!process.env.BROWSER) return;

        document
            .getElementsByName('description')[0]
            .setAttribute('content', description);
    }

    setTwitterMeta(obj) {
        if (!process.env.BROWSER || !obj) return;

        if (!document.getElementsByName('twitter:card')[0]) {
            var meta = document.createElement('meta');
            meta.setAttribute('name', 'twitter:card');
            meta.setAttribute('content', obj.card);
            document.head.appendChild(meta);
        } else {
            document
                .getElementsByName('twitter:card')[0]
                .setAttribute('content', obj.card);
        }

        if (!document.getElementsByName('twitter:title')[0]) {
            var meta = document.createElement('meta');
            meta.setAttribute('name', 'twitter:title');
            meta.setAttribute('content', obj.title);
            document.head.appendChild(meta);
        } else {
            document
                .getElementsByName('twitter:title')[0]
                .setAttribute('content', obj.title);
        }

        if (!document.getElementsByName('twitter:description')[0]) {
            var meta = document.createElement('meta');
            meta.setAttribute('name', 'twitter:description');
            meta.setAttribute('content', obj.description);
            document.head.appendChild(meta);
        } else {
            document
                .getElementsByName('twitter:description')[0]
                .setAttribute('content', obj.description);
        }

        if (!document.getElementsByName('twitter:image')[0]) {
            var meta = document.createElement('meta');
            meta.setAttribute('name', 'twitter:image');
            meta.setAttribute('content', obj.image);
            document.head.appendChild(meta);
        } else {
            document
                .getElementsByName('twitter:image')[0]
                .setAttribute('content', obj.image);
        }

        if (!document.getElementsByName('og:title')[0]) {
            var meta = document.createElement('meta');
            meta.setAttribute('name', 'og:title');
            meta.setAttribute('content', obj.title);
            document.head.appendChild(meta);
        } else {
            document
                .getElementsByName('og:title')[0]
                .setAttribute('content', obj.title);
        }

        if (!document.getElementsByName('og:description')[0]) {
            var meta = document.createElement('meta');
            meta.setAttribute('name', 'og:description');
            meta.setAttribute('content', obj.description);
            document.head.appendChild(meta);
        } else {
            document
                .getElementsByName('og:description')[0]
                .setAttribute('content', obj.description);
        }

        if (!document.getElementsByName('og:image')[0]) {
            var meta = document.createElement('meta');
            meta.setAttribute('name', 'og:image');
            meta.setAttribute('content', obj.image);
            document.head.appendChild(meta);
        } else {
            document
                .getElementsByName('og:image')[0]
                .setAttribute('content', obj.image);
        }
    }

    render() {
        const {
            params,
            children,
            // new_visitor,
            nightmodeEnabled,
            isHeaderVisible,
            // viewMode,
            pathname,
            category,
            order,
            title,
            description,
            enableModal,
            screen_loading,
            current_user,
        } = this.props;

        if (!process.env.BROWSER)
            return <LoadingScreen loading={!process.env.BROWSER} />;

        const whistleView = false;
        const headerHidden = whistleView;
        const params_keys = Object.keys(params);
        const ip =
            pathname === '/' ||
            (params_keys.length === 2 &&
                params_keys[0] === 'order' &&
                params_keys[1] === 'category');
        const alert = this.props.error;
        let callout = null;

        const themeClass = nightmodeEnabled ? ' theme-dark' : ' theme-original';

        return (
            <DocumentTitle title={title}>
                <div
                    className={classNames('App', themeClass, {
                        'index-page': ip,
                        'whistle-view': whistleView,
                        'header-hidden':
                            !isHeaderVisible ||
                            pathname === '/login' ||
                            pathname === '/signup',
                        withAnnouncement: false,
                        blur: enableModal && !screen_loading,
                    })}
                    ref="App_root"
                >
                    <Header pathname={pathname} />
                    {children}
                    {!homeAliasRoute.isValidPath(pathname) &&
                        !(!current_user && homeRoute.isValidPath(pathname)) && (
                            <Responsible
                                breakingContent={<TabBar />}
                                breakLg={true}
                            />
                        )}
                    <Modals />
                    <AlertContainer />
                    <FlashContainer />
                    <ScreenLoadingIndicator />
                    <ScreenShot />
                </div>
            </DocumentTitle>
        );
    }
}

App.propTypes = {
    error: PropTypes.string,
    children: AppPropTypes.Children,
    pathname: PropTypes.string,
    category: PropTypes.string,
    order: PropTypes.string,
    loginUser: PropTypes.func.isRequired,
};

export default connect(
    (state, ownProps) => {
        const isHeaderVisible = state.app.get('show_header');
        const show_heading_screen_shot = state.heading.get('show_screen_shot');

        return {
            nightmodeEnabled: state.app.getIn([
                'user_preferences',
                'nightmode',
            ]),
            isHeaderVisible,
            pathname: ownProps.location.pathname,
            order: ownProps.params.order,
            category: ownProps.params.category,
            title: getPageTitle(ownProps.location.pathname, state),
            description: getPageDescription(ownProps.location.pathname, state),
            tweet_tags: getPageTweetTag(ownProps.location.pathname, state),
            enableModal: appActions.enableModal(state),
            show_heading_screen_shot,
            screen_shot_heading: headingActions.getScreenShotHeading(state),
            screen_loading: state.app.get('screen_loading'),
            current_user: authActions.getCurrentUser(state),
            // showAnnouncemenzt: state.user.get('showAnnouncement'),
        };
    },
    dispatch => ({
        loginUser: () => {},
        syncCurrentUser: () => {},
    })
)(App);
