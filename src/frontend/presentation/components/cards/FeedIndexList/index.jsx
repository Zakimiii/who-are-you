import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import ConditionalHeadingItem from '@modules/ConditionalHeadingItem';
import { isScrollEndByClass } from '@extension/scroll';
import * as userActions from '@redux/User/UserReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as appActions from '@redux/App/AppReducer';
import LoadingIndicator from '@elements/LoadingIndicator';
import CommunityViewer from '@modules/CommunityViewer';
import data_config from '@constants/data_config';

class FeedIndexList extends React.Component {
    static propTypes = {
        repository: AppPropTypes.User,
        repositories: PropTypes.array,
    };

    static defaultProps = {
        repository: null,
        repositories: [],
    };

    state = {
        fetched: false,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'FeedIndexList'
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

    componentWillReceiveProps(nextProps) {
        const { more_loading, repositories } = this.props;

        if (repositories.length == 0) return;

        this.setState({
            fetched:
                !!more_loading &&
                !nextProps.more_loading &&
                nextProps.repositories.length > data_config.feed_index_limit,
            // repositories.length == nextProps.repositories.length,
        });
    }

    onWindowScroll() {
        const { getMore, repositories } = this.props;
        const { fetched } = this.state;
        const isEnd = isScrollEndByClass('user-show-list__body__items');
        if (repositories.length == 0) return;
        if (isEnd && getMore && !fetched) getMore();
    }

    render() {
        const {
            repository,
            repositories,
            loading,
            more_loading,
            communities,
        } = this.props;

        const renderItems = items =>
            items.map((item, key) => (
                <div className="user-show-list__body__item" key={key}>
                    <ConditionalHeadingItem repository={item} />
                </div>
            ));

        return (
            <div className="user-show-list">
                <div className="user-show-list__body">
                    {communities &&
                        communities.length > 0 && (
                            <div>
                                <div className="user-show-list__body__category">
                                    {tt('g.follow_communities')}
                                </div>
                                <div className="user-show-list__viewer">
                                    <CommunityViewer
                                        repositories={communities}
                                    />
                                </div>
                            </div>
                        )}
                    <div className="user-show-list__body__category">
                        {tt('g.feeds')}
                    </div>
                    <div className="user-show-list__body__items">
                        {loading ? (
                            <center>
                                <LoadingIndicator type={'circle'} />
                            </center>
                        ) : (
                            repositories &&
                            repositories.length > 0 &&
                            renderItems(repositories)
                        )}
                    </div>
                    {more_loading && (
                        <center>
                            <LoadingIndicator
                                style={{ marginBottom: '2rem' }}
                                type={'circle'}
                            />
                        </center>
                    )}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            communities: userActions.getCommunityFollower(state),
            repository: authActions.getCurrentUser(state),
            repositories: userActions.getUserFeed(state),
            loading: appActions.feedIndexPageLoading(state),
            more_loading: state.app.get('more_loading'),
        };
    },

    dispatch => ({
        getMore: () => {
            dispatch(userActions.getMoreUserFeed());
        },
    })
)(FeedIndexList);
