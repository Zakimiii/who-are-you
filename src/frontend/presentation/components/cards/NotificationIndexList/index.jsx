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
import HeadingNewSection from '@elements/HeadingNewSection';

class NotificationIndexList extends React.Component {
    static propTypes = {
        repository: AppPropTypes.User,
    };

    static defaultProps = {
        repository: null,
    };

    state = {};

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

    onWindowScroll() {
        const { getMore } = this.props;
        const isEnd = isScrollEndByClass('notification-index-list__items');
        if (isEnd && getMore) getMore();
    }

    render() {
        const { repository, repositories } = this.props;

        const renderItems = items =>
            items.map((item, key) => (
                <div className="notification-index-list__item" key={key}>
                    <NotificationItem repository={item} />
                </div>
            ));

        return (
            <div className="notification-index-list">
                <div className="notification-index-list__category">
                    {repository.nickname + 'さんへのお知らせ'}
                </div>
                <div className="notification-index-list__items">
                    {repositories &&
                        repositories.length > 0 &&
                        renderItems(repositories)}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: authActions.getCurrentUser(state),
            repositories: userActions.getUserNotification(state),
        };
    },

    dispatch => ({
        getMore: () => {
            dispatch(userActions.getMoreUserNotification());
        },
    })
)(NotificationIndexList);
