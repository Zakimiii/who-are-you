import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import * as userActions from '@redux/User/UserReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import models from '@network/client_models';
import dummy from '@network/dummy';
import PictureItem from '@elements/PictureItem';
import TwitterButton from '@elements/TwitterButton';
import HeadingNewButton from '@elements/HeadingNewButton';
import { loginRoute, userShowRoute } from '@infrastructure/RouteInitialize';

class UserSideItem extends React.Component {
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
            'UserSideItem'
        );
    }

    render() {
        let { repository } = this.props;

        if (!repository) {
            repository = dummy.User;
        }

        return !!repository.id ? (
            <Link
                className="user-side-item"
                to={userShowRoute.getPath({
                    params: { username: repository.username },
                })}
            >
                <div className="user-side-item__image">
                    <PictureItem
                        width={80}
                        radius={40}
                        url={repository.picture_small}
                    />
                </div>
                <div className="user-side-item__name">
                    {repository.nickname}
                </div>
            </Link>
        ) : (
            <Link className="user-side-item" to={loginRoute.path}>
                <div className="user-side-item__image">
                    <PictureItem
                        width={80}
                        radius={40}
                        url={repository.picture_small}
                    />
                </div>
                <div className="user-side-item__name">
                    {repository.nickname}
                </div>
            </Link>
        );

        /*<div className="user-side-item__button">
            <TwitterButton repository={repository} />
        </div>
        <div className="user-side-item__button">
            <HeadingNewButton repository={repository} />
        </div>*/
    }
}

export default connect(
    (state, props) => {
        return {
            repository: authActions.getCurrentUser(state),
        };
    },

    dispatch => ({})
)(UserSideItem);
