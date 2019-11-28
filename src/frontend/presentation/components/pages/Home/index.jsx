/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import tt from 'counterpart';
import { List } from 'immutable';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import HomeList from '@cards/HomeList';
import UserShowList from '@cards/UserShowList';
import LoadingIndicator from '@elements/LoadingIndicator';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as userActions from '@redux/User/UserReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import IndexComponent from '@pages/IndexComponent';
import models from '@network/client_models';
import autobind from 'class-autobind';
import ActionButton from '@modules/ActionButton';

class Home extends React.Component {
    static pushURLState(title) {
        if (window) window.history.pushState({}, title, '/');
    }

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Home');
    }

    componentWillMount() {
        const { isHeaderVisible, location, addSuccess } = this.props;

        if (location.query.success_key) {
            addSuccess(tt(location.query.success_key));
            Home.pushURLState('who are you?');
        }
    }

    onClick(e) {
        const { showNew, repository } = this.props;
        showNew(repository);
    }

    render() {
        const { current_user } = this.props;

        return !!current_user ? (
            <IndexComponent
                action_button={
                    <ActionButton
                        size={'3x'}
                        src={'plus'}
                        onClick={this.onClick}
                    />
                }
            >
                <UserShowList username={current_user.username} />
            </IndexComponent>
        ) : (
            <IndexComponent style={{ background: '#ffffff' }} showSide={false}>
                <HomeList />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '',
    component: connect(
        (state, ownProps) => {
            return {
                current_user: authActions.getCurrentUser(state),
                repository: userActions.getShowUser(state),
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
                showNew: user => {
                    dispatch(
                        headingActions.setNew({
                            heading: models.Heading.build({
                                User: user,
                                UserId: user.id,
                            }),
                        })
                    );
                    dispatch(headingActions.showNew());
                },
            };
        }
    )(Home),
};
