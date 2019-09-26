import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppPropTypes from '@extension/AppPropTypes';
import Header from '@modules/Header';
import * as authActions from '@redux/Auth/AuthReducer';
import * as appActions from '@redux/App/AppReducer';
import classNames from 'classnames';
import tt from 'counterpart';
import { Component } from 'react';
// import PageViewsCounter from '@elements/PageViewsCounter';
import resolveRoute from '@infrastructure/ResolveRoute';
import Modals from '@modules/Modals';
import DialogManager from '@elements/common/DialogManager';
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
} from '@infrastructure/RouteInitialize';
import config from '@constants/config';

const pageRequiresEntropy = path => {
    const { page } = resolveRoute(path);

    const entropyPages = [
        'ChangePassword',
        'RecoverAccountStep1',
        'RecoverAccountStep2',
        'UserProfile',
        'CreateAccount',
    ];
    /* Returns true if that page requires the entropy collection listener */
    return entropyPages.indexOf(page) !== -1;
};

class App extends Component {
    static redirect = url => {
        if (
            'http://ec2-50-17-10-109.compute-1.amazonaws.com/' == url ||
            'http://ec2-50-17-10-109.compute-1.amazonaws.com' == url ||
            'http://selfinity.me/' == url ||
            'http://selfinity.me' == url
        ) {
            window.location.replace('https://selfinity.me');
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            showCallout: true,
            showBanner: true,
        };
        autobind(this);
        this.listenerActive = null;
    }

    componentWillMount() {
        this.props.syncCurrentUser();
        this.props.loginUser();
    }

    componentDidMount() {
        process.env.BROWSER && App.redirect(window.location.href);
        if (pageRequiresEntropy(this.props.pathname)) {
            this._addEntropyCollector();
        }

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
            pageRequiresEntropy(np.pathname) &&
            !pageRequiresEntropy(this.props.pathname)
        ) {
            this._addEntropyCollector();
        } else if (!pageRequiresEntropy(np.pathname)) {
            // Remove if next page does not require entropy
            this._removeEntropyCollector();
        }

        if (
            np.pathname != this.props.pathname &&
            process.env.NODE_ENV == 'production'
        ) {
            window.dataLayer.push('config', env.GOOGLE.ANALYSTICS_CLIENT, {
                page_path: np.location.pathname,
            });
        }
    }

    _addEntropyCollector() {
        if (!this.listenerActive && this.refs.App_root) {
            this.refs.App_root.addEventListener(
                'mousemove',
                this.onEntropyEvent,
                { capture: false, passive: true }
            );
            this.listenerActive = true;
        }
    }

    _removeEntropyCollector() {
        if (this.listenerActive && this.refs.App_root) {
            this.refs.App_root.removeEventListener(
                'mousemove',
                this.onEntropyEvent
            );
            this.listenerActive = null;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {
            pathname,
            new_visitor,
            nightmodeEnabled,
            showAnnouncement,
            isHeaderVisible,
            title,
            description,
        } = this.props;
        const n = nextProps;

        if (description !== n.description) this.setDescription(n.description);

        return (
            pathname !== n.pathname ||
            new_visitor !== n.new_visitor ||
            this.state.showBanner !== nextState.showBanner ||
            this.state.showCallout !== nextState.showCallout ||
            nightmodeEnabled !== n.nightmodeEnabled ||
            showAnnouncement !== n.showAnnouncement ||
            isHeaderVisible !== n.isHeaderVisible ||
            title !== n.title ||
            description !== n.description
        );
    }

    setShowBannerFalse = () => {
        this.setState({ showBanner: false });
    };

    setDescription(description) {
        if (!process.env.BROWSER) return;

        document
            .getElementsByName('description')[0]
            .setAttribute('content', description);
    }

    onEntropyEvent = e => {};

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
        } = this.props;

        if (!process.env.BROWSER)
            return <LoadingScreen loading={!process.env.BROWSER} />;

        const miniHeader =
            pathname === '/create_account' || pathname === '/pick_account';

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
                        'mini-header': miniHeader,
                        'whistle-view': whistleView,
                        'header-hidden':
                            !isHeaderVisible ||
                            pathname === '/login' ||
                            pathname === '/signup',
                        withAnnouncement: false,
                    })}
                    ref="App_root"
                >
                    <Header
                        pathname={pathname}
                        category={category}
                        order={order}
                    />
                    {children}
                    <Modals />
                    <DialogManager />
                    <AlertContainer />
                    <FlashContainer />
                    <ScreenLoadingIndicator />
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
        // const current_user = state.user.get('current');
        // const current_account_name = current_user
        //     ? current_user.get('username')
        //     : state.offchain.get('account');

        return {
            // viewMode: state.app.get('viewMode'),
            // error: state.app.get('error'),
            // new_visitor:
            //     !state.user.get('current') &&
            //     !state.offchain.get('user') &&
            //     !state.offchain.get('account') &&
            //     state.offchain.get('new_visit'),

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
            // showAnnouncemenzt: state.user.get('showAnnouncement'),
        };
    },
    dispatch => ({
        loginUser: () => dispatch(authActions.login({})),
        syncCurrentUser: () => dispatch(authActions.syncCurrentUser()),
    })
)(App);
