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

class UserShowList extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        repository: AppPropTypes.User,
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
        const { repository, repositories } = this.props;

        const renderItems = items =>
            items.map((item, key) => (
                <div className="user-show-list__body__item" key={key}>
                    <HeadingItem repository={item} />
                </div>
            ));

        return (
            <div className="user-show-list">
                <div className="user-show-list__header">
                    <UserShowHeader repository={repository} />
                </div>
                <div className="user-show-list__body">
                    <div className="user-show-list__body__heading-new">
                        <HeadingNewButton repository={repository} />
                    </div>
                    <div className="user-show-list__body__category">
                        {repository.nickname + 'さんの紹介カード'}
                    </div>
                    <div className="user-show-list__body__items">
                        {repositories &&
                            repositories.length > 0 &&
                            renderItems(repositories)}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: userActions.getShowUser(state),
            repositories: userActions.getUserHeading(state),
        };
    },

    dispatch => ({})
)(UserShowList);
