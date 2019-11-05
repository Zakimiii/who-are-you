import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import HomeList from '@cards/HomeList';
import UserEditList from '@cards/UserEditList';
import LoadingIndicator from '@elements/LoadingIndicator';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import IndexComponent from '@pages/IndexComponent';

class UserEdit extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'UserEdit');
    }

    render() {
        const { current_user } = this.props;

        return !!current_user ? (
            <IndexComponent>
                <UserEditList />
            </IndexComponent>
        ) : (
            <IndexComponent style={{ background: '#ffffff' }} showSide={false}>
                <HomeList />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '/settings',
    component: connect(
        (state, ownProps) => {
            return {
                current_user: authActions.getCurrentUser(state),
            };
        },
        dispatch => {
            return {
                addSuccess: success =>
                    dispatch(
                        appActions.addSuccess({
                            success,
                        })
                    ),
            };
        }
    )(UserEdit),
};
