import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import SimpleButton from '@elements/SimpleButton';
import models from '@network/client_models';
import * as authActions from '@redux/Auth/AuthReducer';
import * as userActions from '@redux/User/UserReducer';
import * as communityActions from '@redux/Community/CommunityReducer';

class CommunityFollowButton extends React.Component {

    static propTypes = {
        current_user: AppPropTypes.User,
        repository: AppPropTypes.Community,
        isFollow: PropTypes.bool,
    };

    static defaultProps = {
        current_user: null,
        repository: models.Community.build(),
        isFollow: false,
    };

    state = {
        isFollow: false,
    }

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityFollowButton')
    }

    componentWillMount() {
        this.setState({
            isFollow: this.props.isFollow,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isFollow: nextProps.isFollow,
        });
    }

    onClick(e) {
        const {
            follow,
            unfollow,
            current_user,
            repository,
            showLogin,
        } = this.props;

        const { isFollow } = this.state;

        if (!current_user) {
            showLogin();
            return;
        }

        if (isFollow) {
            unfollow(current_user, repository);
        } else {
            follow(current_user, repository);
        }

        this.setState({
            isFollow: !isFollow,
        });
    }

    render() {
        const { current_user, repository } = this.props;
        const { isFollow } = this.state;
        const { onClick } = this;

        return (
            <SimpleButton
                active={isFollow}
                value={isFollow ? tt('g.unsubscribe') : tt('g.subscribe')}
                onClick={onClick}
            />
        )
    }
}

export default connect(
    (state, props) => {
        const current_user = authActions.getCurrentUser(state);
        const isFollow = !!props.repository
            ? communityActions.isFollow(state, props.repository)
            : false;
        return {
            current_user,
            isFollow,
        };
    },

    dispatch => ({
        follow: (user, target) => {
            dispatch(communityActions.follow({ user, target }));
        },
        unfollow: (user, target) => {
            dispatch(communityActions.unfollow({ user, target }));
        },
        showLogin: () => {
            dispatch(authActions.showLogin());
        },
    })
)(CommunityFollowButton);
