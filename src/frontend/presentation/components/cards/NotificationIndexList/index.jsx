import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import NotificationItem from '@elements/NotificationItem';
import { isScrollEndByClass } from '@extension/scroll';
import * as userActions from '@redux/User/UserReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as appActions from '@redux/App/AppReducer';
import LoadingIndicator from '@elements/LoadingIndicator';
import HeadingNewSection from '@elements/HeadingNewSection';

class NotificationIndexList extends React.Component {
    static propTypes = {
        repository: AppPropTypes.User,
    };

    static defaultProps = {
        repository: null,
    };

    state = {
        fetched: false,
    }

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'NotificationIndexList'
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
        const {
            more_loading,
            repositories,
        } = this.props;

        this.setState({
            fetched:
                more_loading &&
                !nextProps.more_loading &&
                repositories.length == nextProps.repositories.length,
        })
    }

    onWindowScroll() {
        const { getMore } = this.props;
        const { fetched } = this.state;
        const isEnd = isScrollEndByClass('notification-index-list__items');
        if (isEnd && getMore && !fetched) getMore();
    }

    render() {
        const { repository, repositories, loading, more_loading } = this.props;

        const renderItems = items =>
            items.map((item, key) => (
                <div className="notification-index-list__item" key={key}>
                    <NotificationItem repository={item} />
                </div>
            ));

        return (
            <div className="notification-index-list">
                <div className="notification-index-list__category">
                    {tt('g.notification')}
                </div>
                <div className="notification-index-list__items">
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
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: authActions.getCurrentUser(state),
            repositories: userActions.getUserNotification(state),
            loading: appActions.notificationIndexPageLoading(state),
            more_loading: state.app.get('more_loading'),
        };
    },

    dispatch => ({
        getMore: () => {
            dispatch(userActions.getMoreUserNotification());
        },
    })
)(NotificationIndexList);
