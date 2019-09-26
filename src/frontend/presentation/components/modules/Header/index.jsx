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
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import querystring from 'querystring';
import { browserHistory } from 'react-router';
import * as routes from '@infrastructure/RouteInitialize';
import { getWindowSize } from '@network/window';
import Responsible from '@modules/Responsible';
import GradationIconButton from '@elements/GradationIconButton';
import Img from 'react-image';

class Header extends React.Component {
    static propTypes = {
        pathname: PropTypes.string,
    };

    state = {
        search_mode: false,
        md: false,
    };

    constructor(props) {
        super(props);
        this.toggleHeader = this.toggleHeader.bind(this);
        this.toggleSideBar = this.toggleSideBar.bind(this);
        this.handleClickPost = this.handleClickPost.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleRequestSearch = this.handleRequestSearch.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Header');
        this.handleClickComment = this.handleClickComment.bind(this);
        this.handleClickRequest = this.handleClickRequest.bind(this);
    }

    handleResize() {
        var size = getWindowSize();
        if (size.width > 559) {
            this.setState({
                search_mode: false,
            });
        }

        if (size.width > 1199) {
            this.setState({
                md: false,
            });
            this.props.hideSideBarModal();
        } else {
            this.setState({
                md: true,
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

    handleClickPost = e => {
        const {
            showNew,
            showPhoneConfirm,
            current_user,
            showLogin,
        } = this.props;

        if (!current_user) {
            showLogin();
            return;
        } else if (!current_user.verified) {
            showPhoneConfirm();
            return;
        }

        this.props.showNew();
    };

    handleClickComment = e => {
        const {
            show_content,
            showNewComment,
            current_user,
            showPhoneConfirm,
            showLogin,
            addSuccess,
        } = this.props;

        if (!current_user) {
            showLogin();
            return;
        } else if (!current_user.verified) {
            showPhoneConfirm();
            return;
        }

        if (show_content && current_user) {
            addSuccess(tt('flash.new_message_for_super'));
            showNewComment(show_content, current_user);
        }
    };

    handleClickRequest = e => {
        const {
            current_user,
            show_content,
            showNewRequest,
            show_user,
            showPhoneConfirm,
            showLogin,
        } = this.props;

        if (!current_user) {
            showLogin();
            return;
        } else if (!current_user.verified) {
            showPhoneConfirm();
            return;
        }

        if (current_user && show_content)
            showNewRequest(current_user, show_content.User);
        if (current_user && show_user) showNewRequest(current_user, show_user);
    };

    handleRequestSearch = e => {
        if (!e || e == '') return;
        this.setState({
            search_mode: false,
        });
        browserHistory.push(
            routes.searchRoute.getPath({
                params: {
                    section: 'contents',
                },
                query: {
                    q: e,
                },
            })
        );
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
        if (this.state.md) {
            !!show_side_bar_modal ? hideSideBarModal() : showSideBarModal();
        } else {
            !!show_side_bar ? hideSideBar() : showSideBar();
        }
    };

    toggleSearchMode = e => {
        const { search_mode } = this.state;
        this.setState({
            search_mode: !search_mode,
        });
    };

    toggleHeader = props => {
        const {
            isHeaderVisible,
            route,
            showHeader,
            hideHeader,
            showNew,
        } = props;

        switch (route) {
            case routes.loginRoute:
            case routes.signupRoute:
                hideHeader();
                break;
            default:
                showHeader();
                break;
        }
    };

    render() {
        const {
            current_user,
            pathname,
            isHeaderVisible,
            route,
            showHeader,
            hideHeader,
            showNew,
            show_content,
            showNewComment,
            show_user,
            isMyAccount,
        } = this.props;

        const {
            handleRequestSearch,
            toggleSideBar,
            toggleSearchMode,
            handleClickComment,
            handleClickRequest,
            handleClickPost,
        } = this;

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

        const buttons = !!current_user ? (
            <div className="Header__buttons">
                <Responsible
                    className="Header__button"
                    breakMd={true}
                    breakingContent={
                        <div
                            className="Header__button-icon"
                            onClick={toggleSearchMode}
                        >
                            <IconButton src="search" size="2x" />
                        </div>
                    }
                />
                {!isMyAccount &&
                /*(routes.contentShowRoute.isValidPath(pathname) ||*/
                routes.userShowRoute.isValidPath(pathname) /*)*/ && (
                        <Responsible
                            className="Header__button"
                            breakLg={true}
                            defaultContent={
                                <div className="Header__button-raw">
                                    <GradationButton
                                        value={tt('g.request')}
                                        color="blue"
                                        src={'auction'}
                                        onClick={handleClickRequest}
                                    />
                                </div>
                            }
                            breakingContent={
                                <div className="Header__button-icon">
                                    <GradationIconButton
                                        src="auction"
                                        color="blue"
                                        size="2x"
                                        onClick={handleClickRequest}
                                    />
                                </div>
                            }
                        />
                    )}
                {routes.contentShowRoute.isValidPath(pathname) && (
                    <Responsible
                        className="Header__button"
                        breakLg={true}
                        defaultContent={
                            <div className="Header__button-raw">
                                <GradationButton
                                    value={tt('g.do_comment')}
                                    color="red"
                                    src={'comment'}
                                    onClick={handleClickComment}
                                />
                            </div>
                        }
                        breakingContent={
                            <div className="Header__button-icon">
                                <GradationIconButton
                                    src="comment"
                                    color="red"
                                    size="2x"
                                    onClick={handleClickComment}
                                />
                            </div>
                        }
                    />
                )}
                <Responsible
                    className="Header__button"
                    breakLg={true}
                    defaultContent={
                        <div className="Header__button-raw">
                            <GradationButton
                                value={tt('g.start')}
                                src={'post'}
                                onClick={handleClickPost}
                            />
                        </div>
                    }
                    breakingContent={
                        <div className="Header__button-icon">
                            <GradationIconButton
                                src="post"
                                size="2x"
                                onClick={showNew}
                            />
                        </div>
                    }
                />
            </div>
        ) : (
            <div className="Header__buttons">
                <Responsible
                    className="Header__button"
                    breakMd={true}
                    breakingContent={
                        <div
                            className="Header__button-icon"
                            onClick={toggleSearchMode}
                        >
                            <IconButton src="search" size="2x" />
                        </div>
                    }
                />
                <Responsible
                    className="Header__button"
                    breakLg={true}
                    breakingContent={
                        <div
                            className="Header__button-icon"
                            onClick={() =>
                                browserHistory.push(routes.loginRoute.getPath())
                            }
                        >
                            <GradationIconButton src="noimage" size="2x" />
                        </div>
                    }
                    defaultContent={
                        <div className="Header__button-raw">
                            <GradationButton
                                value={tt('g.login')}
                                url={routes.loginRoute.getPath()}
                            />
                        </div>
                    }
                />
                <Responsible
                    className="Header__button"
                    breakLg={true}
                    defaultContent={
                        <div className="Header__button-raw">
                            <GradationButton
                                url={routes.signupRoute.getPath()}
                                value={tt('g.signup')}
                            />
                        </div>
                    }
                />
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
                    to={routes.homeIndexRoute.getPath()}
                    className="Header__logo__link"
                >
                    <Img
                        className="Header__logo"
                        src="/images/brands/logo.png"
                        alt={tt('alts.default')}
                    />
                </Link>
                <div className="Header__search-bar">
                    <SearchInput onRequestSearch={handleRequestSearch} />
                </div>
                {buttons}
            </div>
        );

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
    const show_side_bar = state.app.get('show_side_bar');
    const show_side_bar_modal = state.app.get('show_side_bar_modal');
    let show_content = contentActions.getShowContent(state);
    show_content = show_content && show_content.content;
    const show_user = userActions.getShowUser(state);
    const isMyAccount = userActions.isMyAccount(state, show_user);
    return {
        isHeaderVisible,
        show_side_bar,
        show_side_bar_modal,
        route,
        current_user,
        show_user,
        show_content,
        isMyAccount,
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
    showSideBar: () => {
        dispatch(appActions.showSideBar());
    },
    hideSideBar: () => {
        dispatch(appActions.hideSideBar());
    },
    showNew: () => {
        dispatch(contentActions.showNew());
    },
    hideNew: () => {
        dispatch(contentActions.hideNew());
    },
    showNewComment: (content, user) => {
        dispatch(contentActions.showNewComment({ content, user }));
    },
    showNewRequest: (user, target_user) => {
        dispatch(contentActions.showNewRequest({ user, target_user }));
    },
    searchContent: keyword => {
        dispatch(searchActions.searchContent({ keyword }));
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
    showPhoneConfirm: e => {
        if (e) e.preventDefault();
        dispatch(authActions.showPhoneConfirm());
    },
    logout: e => {
        // if (e) e.preventDefault();
        // dispatch(authActions.logout());
    },
    toggleNightmode: e => {
        // if (e) e.preventDefault();
        // dispatch(appActions.toggleNightmode());
    },
    showSidePanel: () => {
        //dispatch(userActions.showSidePanel());
    },
    hideSidePanel: () => {
        //dispatch(userActions.hideSidePanel());
    },
    hideAnnouncement: () => {
        //dispatch(userActions.hideAnnouncement());
    },
});

const connectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default connectedHeader;
