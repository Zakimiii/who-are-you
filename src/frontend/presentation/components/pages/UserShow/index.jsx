/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import tt from 'counterpart';
import { List } from 'immutable';
import classnames from 'classnames';
import UserShowList from '@cards/UserShowList';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import IndexComponent from '@pages/IndexComponent';
import ActionButton from '@modules/ActionButton';
import * as userActions from '@redux/User/UserReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as appActions from '@redux/App/AppReducer';
import models from '@network/client_models';
import autobind from 'class-autobind';

class UserShow extends React.Component {
    static propTypes = {
        routeParams: PropTypes.object,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {};
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'UserShow');
        autobind(this);
    }

    onClick(e) {
        const { showNew, repository } = this.props;
        showNew(repository);
    }

    render() {
        var { username, section } = this.props.routeParams;

        if (!section) {
            section = 'headings';
        }

        return (
            <IndexComponent
                action_button={
                    <ActionButton
                        size={'3x'}
                        src={'plus'}
                        onClick={this.onClick}
                    />
                }
            >
                <UserShowList username={username} section={section} />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: 'user/:username(/:section)',
    component: connect(
        (state, ownProps) => {
            return {
                repository: userActions.getShowUser(state),
            };
        },
        dispatch => {
            return {
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
    )(UserShow),
};
