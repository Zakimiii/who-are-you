import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import * as userActions from '@redux/User/UserReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import GradationButton from '@elements/GradationButton';

class UserEditList extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'UserEditList'
        );
    }

    onClickLogout(e) {
        const { logout } = this.props;

        if (!logout) logout();
    }

    render() {
        const { current_user } = this.props;

        if (!current_user) return <div />;
        return (
            <div className="user-edit-list">
                <div className="user-edit-list__button">
                    <GradationButton
                        value={tt('g.logout')}
                        onClick={this.onClickLogout}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            current_user: authActions.getCurrentUser(state),
        };
    },

    dispatch => ({
        logout: () => dispatch(authActions.logout()),
    })
)(UserEditList);
