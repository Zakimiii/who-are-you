import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Icon from '@elements/Icon';
import IconButton from '@elements/IconButton';
import resolveRoute from '@infrastructure/ResolveRoute';
import tt from 'counterpart';
import SearchInput from '@elements/SearchInput';
import GradationButton from '@elements/GradationButton';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as searchActions from '@redux/Search/SearchReducer';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import querystring from 'querystring';
import { browserHistory } from 'react-router';
import * as routes from '@infrastructure/RouteInitialize';
import { getWindowSize } from '@network/window';
import Responsible from '@modules/Responsible';
import GradationIconButton from '@elements/GradationIconButton';
import Img from 'react-image';
import autobind from 'class-autobind';
import {
    homeRoute,
    userShowRoute,
    headingCanvasTestRoute,
    answerCanvasTestRoute,
} from '@infrastructure/RouteInitialize';

class Header extends React.Component {
    static propTypes = {
        pathname: PropTypes.string,
    };

    state = {
        search_mode: false,
        lg: false,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Header');
    }

    handleResize() {
        var size = getWindowSize();
        if (size.width > 559) {
            this.setState({
                search_mode: false,
            });
        }

        if (size.width > 999) {
            this.setState({
                lg: false,
            });
        } else {
            this.setState({
                lg: true,
            });
        }
    }

    componentWillMount() {
        if (this.toggleHeader) this.toggleHeader(this.props);
        this.handleResize();
        if (process.env.BROWSER)
            window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        if (process.env.BROWSER)
            window.removeEventListener('resize', this.handleResize);
    }

    componentWillReceiveProps(nextProps) {
        if (this.toggleHeader) this.toggleHeader(nextProps);
    }

    handleRequestSearch = e => {
        if (!e || e == '') return;
        this.setState({
            search_mode: false,
        });
        // browserHistory.push(
        //     routes.searchRoute.getPath({
        //         params: {
        //             section: 'headings',
        //         },
        //         query: {
        //             q: e,
        //         },
        //     })
        // );
    };

    toggleSearchMode = e => {
        const { search_mode } = this.state;
        this.setState({
            search_mode: !search_mode,
        });
    };

    toggleHeader = props => {
        const { isHeaderVisible, route, showHeader, hideHeader } = props;
        switch (route) {
            case routes.headingCanvasTestRoute:
            case routes.answerCanvasTestRoute:
                hideHeader();
                break;
            default:
                showHeader();
                break;
        }
    };

    toggleSideBar = e => {
        const {
            show_side_bar,
            show_side_bar_modal,
            showSideBar,
            hideSideBar,
            hideSideBarModal,
            showSideBarModal,
        } = this.props;
        if (e) e.preventDefault();
        if (this.state.lg) {
            !!show_side_bar_modal ? hideSideBarModal() : showSideBarModal();
        } /* else {
            !!show_side_bar ? hideSideBar() : showSideBar();
        }*/
    };

    render() {
        const {
            current_user,
            pathname,
            isHeaderVisible,
            route,
            showHeader,
            hideHeader,
            isMyAccount,
        } = this.props;

        const { handleRequestSearch, toggleSideBar, toggleSearchMode } = this;

        const { search_mode } = this.state;

        const header_className = isHeaderVisible ? 'Header' : 'Header-hidden';

        const search_mode_body = (
            <div className="Header__search-mode">
                <div className="Header__search-mode__back">
                    <IconButton
                        onClick={toggleSearchMode}
                        src="chevron-back"
                        size="2x"
                    />
                </div>
                <div className="Header__search-mode__bar">
                    <SearchInput onRequestSearch={handleRequestSearch} />
                </div>
            </div>
        );

        const nomal_body = (
            <div>
                <div className="Header__list" onClick={toggleSideBar}>
                    <Icon
                        className="Header__list-image"
                        size={'3x'}
                        src={'list'}
                    />
                </div>
                <Link
                    to={
                        current_user
                            ? userShowRoute.getPath({
                                  params: { username: current_user.username },
                              })
                            : routes.homeRoute.getPath()
                    }
                    className="Header__logo__link"
                >
                    <Img
                        className="Header__logo"
                        src="/images/brands/who_are_you.png"
                        alt={tt('alts.default')}
                    />
                </Link>
            </div>
        );

        /*
        <div className="Header__search-bar">
                    <SearchInput onRequestSearch={handleRequestSearch} />
                </div>
        */

        return (
            <div className={header_className}>
                {search_mode ? search_mode_body : nomal_body}
            </div>
        );
    }
}

export { Header as _Header_ };

const mapStateToProps = (state, ownProps) => {
    const route = resolveRoute(ownProps.pathname);
    const isHeaderVisible = state.app.get('show_header');
    const current_user = authActions.getCurrentUser(state);
    const show_side_bar_modal = state.app.get('show_side_bar_modal');
    return {
        isHeaderVisible,
        show_side_bar_modal,
        route,
        current_user,
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => ({
    addSuccess: success => {
        dispatch(appActions.addSuccess({ success }));
    },
    showHeader: () => {
        dispatch(appActions.showHeader());
    },
    hideHeader: () => {
        dispatch(appActions.hideHeader());
    },
    searchHeading: keyword => {
        dispatch(searchActions.searchHeading({ keyword }));
    },
    hideSideBarModal: e => {
        if (e) e.preventDefault();
        dispatch(appActions.hideSideBarModal());
    },
    showSideBarModal: e => {
        if (e) e.preventDefault();
        dispatch(appActions.showSideBarModal());
    },
    showLogin: e => {
        if (e) e.preventDefault();
        dispatch(authActions.showLogin());
    },
    hideSideBarModal: e => {
        if (e) e.preventDefault();
        dispatch(appActions.hideSideBarModal());
    },
    showSideBarModal: e => {
        if (e) e.preventDefault();
        dispatch(appActions.showSideBarModal());
    },
});

const connectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default connectedHeader;
