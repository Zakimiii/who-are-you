import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import * as communityActions from '@redux/Community/CommunityReducer';
import * as userActions from '@redux/User/UserReducer';
import * as communityHeadingActions from '@redux/CommunityHeading/CommunityHeadingReducer';
import * as appActions from '@redux/App/AppReducer';
import * as communityTemplateActions from '@redux/CommunityTemplate/CommunityTemplateReducer';
import CommunityShowHeader from '@modules/CommunityShowHeader';
import CommunityHeadingItem from '@modules/CommunityHeadingItem';
import LoadingIndicator from '@elements/LoadingIndicator';
import CommunityHeadingNewSection from '@elements/CommunityHeadingNewSection';
import SectionHeader from '@elements/SectionHeader';
import TabPager from '@modules/TabPager';
import CommunityTemplateItem from '@modules/CommunityTemplateItem';
import Gallery from '@modules/Gallery';
import { List } from 'immutable';
import { isScrollEndByClass } from '@extension/scroll';
import { homeRoute, userShowRoute, communityShowRoute } from '@infrastructure/RouteInitialize';

class CommunityShowList extends React.Component {

    static propTypes = {
        id: PropTypes.string,
        repository: AppPropTypes.Community,
        pages: PropTypes.object,
    };

    static defaultProps = {
        id: null,
        repository: null,
    };

    state = {
        headings_fetched: false,
        templates_fetched: false,
    }

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityShowList')
    }

    componentWillMount() {
        if (process.env.BROWSER)
            window.addEventListener('scroll', this.onWindowScroll, false);
    }

    componentWillUnmount() {
        if (process.env.BROWSER)
            window.removeEventListener('scroll', this.onWindowScroll, false);
    }

    componentWillReceiveProps(nextProps) {
        const {
            more_loading,
            repositories,
            templates,
            seciton,
        } = this.props;

        this.setState({
            headings_fetched:
                seciton == 'headings' &&
                more_loading &&
                !nextProps.more_loading &&
                repositories.length == nextProps.repositories.length,
            templates_fetched:
                seciton == 'templates' &&
                more_loading &&
                !nextProps.more_loading &&
                repositories.length == nextProps.repositories.length,
        })
    }

    onWindowScroll() {
        const { getMore, section, getMoreTemplate } = this.props;
        const { templates_fetched, headings_fetched } = this.state;
        const isEnd = isScrollEndByClass('user-show-list__body__items');
        if (isEnd && getMore) {
            if (section == 'templates' && !templates_fetched) getMoreTemplate()
            if (section == 'headings' && !headings_fetched) getMore();
        }
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
            more_loading,
        } = this.props;

        let body = <div />;

        const renderItems = items =>
            items.map((item, key) => (
                <div className="user-show-list__body__item" key={key}>
                    <CommunityHeadingItem repository={item} />
                </div>
            ));

        const renderTemplateItems = items =>
            items.map((item, key) => (
                <div className="user-show-list__body__template" key={key}>
                    <CommunityTemplateItem repository={item} show_community={repository} />
                </div>
            ));

        switch (section) {
            case 'templates':
                body = (
                    <div className="user-show-list__body">
                        <div className="user-show-list__body__category">
                            {tt('g.find_themes')}
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
                    <CommunityShowHeader repository={repository} />
                </div>
                {repository && (
                        <div className="user-show-list__heading-new">
                            <CommunityHeadingNewSection repository={repository} />
                        </div>
                    )}
                <div id="#pager" />
                {repository && (
                        <SectionHeader>
                            <div className="user-show-list__pager">
                                <div className="user-show-list__pager-body">
                                    <TabPager repositories={pages} />
                                </div>
                            </div>
                        </SectionHeader>
                    )}
                {repository && body}
                {more_loading && (
                    <center>
                        <LoadingIndicator
                            style={{ marginBottom: '2rem' }}
                            type={'circle'}
                        />
                    </center>
                )}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        const repository = communityActions.getShowCommunity(state);
        return {
            repository,
            repositories: communityActions.getCommunityHeading(state),
            templates: communityTemplateActions.getHomeTemplate(state),
            loading: appActions.communityShowPageLoading(state),
            contents_loading: appActions.communityShowContentsLoading(state),
            templates_loading: appActions.communityShowTemplatesLoading(state),
            pages: List([
                {
                    title: tt('g.themes'),
                    url:
                        communityShowRoute.getPath({
                            params: {
                                id: repository && repository.id,
                                section: 'headings',
                            },
                        }) + '#pager',
                },
                {
                    title: tt('g.find_themes'),
                    url:
                        communityShowRoute.getPath({
                            params: {
                                id: repository && repository.id,
                                section: 'templates',
                            },
                        }) + '#pager',
                },
            ]),
            more_loading: state.app.get('more_loading'),
        };
    },

    dispatch => ({
        getMore: () => {
            dispatch(communityActions.getMoreCommunityHeading());
        },
        getMoreTemplate: () => {
            dispatch(communityTemplateActions.getMoreHome());
        },
    })
)(CommunityShowList);
