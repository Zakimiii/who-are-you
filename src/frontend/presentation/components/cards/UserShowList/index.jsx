import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import UserShowHeader from '@modules/UserShowHeader';
import HeadingNewButton from '@elements/HeadingNewButton';
import HeadingItem from '@modules/HeadingItem';
import { isScrollEndByClass } from '@extension/scroll';
import * as userActions from '@redux/User/UserReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as appActions from '@redux/App/AppReducer';
import * as templateActions from '@redux/Template/TemplateReducer';
import LoadingIndicator from '@elements/LoadingIndicator';
import HeadingNewSection from '@elements/HeadingNewSection';
import TabPager from '@modules/TabPager';
import SectionHeader from '@elements/SectionHeader';
import { homeRoute, userShowRoute } from '@infrastructure/RouteInitialize';
import TemplateItem from '@modules/TemplateItem';
import Gallery from '@modules/Gallery';

class UserShowList extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        repository: AppPropTypes.User,
        pages: PropTypes.array,
    };

    static defaultProps = {
        username: null,
        repository: null,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'UserShowList'
        );
    }

    componentWillMount() {
        if (process.env.BROWSER)
            window.addEventListener('scroll', this.onWindowScroll, false);
    }

    componentWillUnmount() {
        if (process.env.BROWSER)
            window.removeEventListener('scroll', this.onWindowScroll, false);
    }

    onWindowScroll() {
        const { getMore, username } = this.props;
        const isEnd = isScrollEndByClass('user-show-list__body__items');
        if (isEnd && getMore) getMore();
    }

    render() {
        const {
            repository,
            repositories,
            loading,
            contents_loading,
            templates_loading,
            section,
            pages,
            templates,
        } = this.props;

        let body = <div />;

        const renderItems = items =>
            items.map((item, key) => (
                <div className="user-show-list__body__item" key={key}>
                    <HeadingItem repository={item} />
                </div>
            ));

        const renderTemplateItems = items =>
            items.map((item, key) => (
                <div className="user-show-list__body__template" key={key}>
                    <TemplateItem repository={item} />
                </div>
            ));

        switch (section) {
            case 'templates':
                body = (
                    <div className="user-show-list__body">
                        <div className="user-show-list__body__category">
                            {tt('g.themes')}
                        </div>
                        <Gallery className="user-show-list__body__items">
                            {templates_loading ? (
                                <div
                                    style={{
                                        marginLeft: '48%',
                                        marginRight: '48%',
                                    }}
                                >
                                    <LoadingIndicator type={'circle'} />
                                </div>
                            ) : (
                                templates &&
                                templates.length > 0 &&
                                renderTemplateItems(templates)
                            )}
                        </Gallery>
                        {/*{loading && (
                            <center>
                                <LoadingIndicator style={{ marginBottom: '2rem' }} />
                            </center>
                        )}*/}
                    </div>
                );
                break;

            default:
            case 'headings':
                body = (
                    <div className="user-show-list__body">
                        <div className="user-show-list__body__category">
                            {tt('g.themes')}
                        </div>
                        <div className="user-show-list__body__items">
                            {contents_loading ? (
                                <div
                                    style={{
                                        marginLeft: '48%',
                                        marginRight: '48%',
                                    }}
                                >
                                    <LoadingIndicator type={'circle'} />
                                </div>
                            ) : (
                                repositories &&
                                repositories.length > 0 &&
                                renderItems(repositories)
                            )}
                        </div>
                        {/*{loading && (
                            <center>
                                <LoadingIndicator style={{ marginBottom: '2rem' }} />
                            </center>
                        )}*/}
                    </div>
                );
                break;
        }

        return (
            <div className="user-show-list">
                <div className="user-show-list__header">
                    <UserShowHeader repository={repository} />
                </div>
                <div className="user-show-list__heading-new">
                    <HeadingNewSection repository={repository} />
                </div>
                {repository && (
                    <SectionHeader>
                        <div className="user-show-list__pager">
                            <div className="user-show-list__pager-body">
                                <TabPager repositories={pages} />
                            </div>
                        </div>
                    </SectionHeader>
                )}
                {body}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        const repository = userActions.getShowUser(state);
        return {
            repository,
            repositories: userActions.getUserHeading(state),
            templates: templateActions.getHomeTemplate(state),
            loading: appActions.userShowPageLoading(state),
            contents_loading: appActions.userShowContentsLoading(state),
            templates_loading: appActions.userShowTemplatesLoading(state),
            pages: [
                {
                    title: tt('g.themes'),
                    url: userShowRoute.getPath({
                        params: {
                            username: repository && repository.username,
                            section: 'headings',
                        },
                    }),
                },
                {
                    title: tt('g.find_themes'),
                    url: userShowRoute.getPath({
                        params: {
                            username: repository && repository.username,
                            section: 'templates',
                        },
                    }),
                },
            ],
        };
    },

    dispatch => ({
        getMore: () => {
            dispatch(userActions.getMoreUserHeading());
        },
    })
)(UserShowList);
