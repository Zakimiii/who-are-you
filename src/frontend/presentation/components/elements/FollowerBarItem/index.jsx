import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import PictureItem from '@elements/PictureItem';
import { browserHistory } from 'react-router';
import { userShowRoute } from '@infrastructure/RouteInitialize';
import Responsible from '@modules/Responsible';
import * as userActions from '@redux/User/UserReducer';
import * as authActions from '@redux/Auth/AuthReducer';

class FollowerBarItem extends React.Component {
    static propTypes = {
        repository: AppPropTypes.User,
        _repository: AppPropTypes.User,
    };

    static defaultProps = {
        repository: null,
        _repository: null,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'FollowerBarItem'
        );
    }

    render() {
        const { _repository } = this.props;

        if (!_repository) return <div />;

        return (
            <Link
                className="follower-bar-item"
                to={
                    _repository &&
                    userShowRoute.getPath({
                        params: {
                            username: _repository.username,
                        },
                    })
                }
            >
                <div className="follower-bar-item__image">
                    <PictureItem
                        width={24}
                        redius={24 / 2}
                        url={_repository && _repository.picture_small}
                        alt={_repository && _repository.nickname}
                    />
                </div>
                <div className="follower-bar-item__title">
                    {_repository && _repository.nickname}
                </div>
            </Link>
        );
    }
}

export default connect(
    (state, props) => {
        const current_user = authActions.getCurrentUser(state);
        const isMyAccount = userActions.isMyAccount(state, props.repository);
        return {
            current_user,
            isMyAccount,
            _repository: userActions.bind(props.repository, state),
        };
    },

    dispatch => ({})
)(FollowerBarItem);
