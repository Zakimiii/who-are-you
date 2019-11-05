import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import IndexComponent from '@pages/IndexComponent';
import HomeList from '@cards/HomeList';
import NotificationIndexList from '@cards/NotificationIndexList';

class NotificationIndex extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'NotificationIndex'
        );
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    render() {
        const { current_user } = this.props;

        return !!current_user ? (
            <IndexComponent>
                <NotificationIndexList />
            </IndexComponent>
        ) : (
            <IndexComponent style={{ background: '#ffffff' }} showSide={false}>
                <HomeList />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '/notifications',
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
    )(NotificationIndex),
};
