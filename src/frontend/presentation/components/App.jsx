import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppPropTypes from '@extension/AppPropTypes';
import Header from '@modules/Header';
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
} from '@infrastructure/RouteInitialize';
import config from '@constants/config';
import ScreenShot from '@modules/ScreenShot';

class App extends Component {
    static redirect = url => {
        if (
            `${config.APP_PUBLIC_IP}/` == url ||
            `${config.APP_PUBLIC_IP}` == url ||
            `http://${config.APP_DOMAIN}/` == url ||
            `http://${config.APP_DOMAIN}` == url
        ) {
            window.location.replace('https://selfinity.me');
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
        // Add listener if the next page requires entropy and the current page didn't
        window.previousLocation = this.props.location;

        if (
            np.pathname != this.props.pathname &&
            process.env.NODE_ENV == 'production'
        ) {
            window.dataLayer.push('config', env.GOOGLE.ANALYSTICS_CLIENT, {
                page_path: np.location.pathname,
            });
        }

        if (this.props.description !== np.description)
            this.setDescription(np.description);

        if (this.props.tweet_tags !== np.tweet_tags)
            this.setTwitterMeta(np.tweet_tags);
    }

    setDescription(description) {
        if (!process.env.BROWSER) return;

        document
            .getElementsByName('description')[0]
            .setAttribute('content', description);
    }

    setTwitterMeta(obj) {
        if (!process.env.BROWSER || !obj) return;

        document
            .getElementsByName('twitter:card')[0]
            .setAttribute('content', obj.card);

        document
            .getElementsByName('twitter:title')[0]
            .setAttribute('content', obj.title);

        document
            .getElementsByName('twitter:description')[0]
            .setAttribute('content', obj.description);

        document
            .getElementsByName('twitter:image')[0]
            .setAttribute('content', obj.image);
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
        // const current_user = state.user.get('current');
        // const current_account_name = current_user
        //     ? current_user.get('username')
        //     : state.offchain.get('account');

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
            // showAnnouncemenzt: state.user.get('showAnnouncement'),
        };
    },
    dispatch => ({
        loginUser: () => {},
        syncCurrentUser: () => {},
    })
)(App);
