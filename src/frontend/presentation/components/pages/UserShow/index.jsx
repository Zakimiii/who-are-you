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

class UserShow extends React.Component {
    static propTypes = {
        routeParams: PropTypes.object,
    };

    static defaultProps = {};

    constructor() {
        super();
        this.state = {};
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'UserShow');
    }

    render() {
        var { username } = this.props.routeParams;

        return (
            <IndexComponentImpl>
                <div className="user-show">
                    <UserShowList username={username} />
                </div>
            </IndexComponentImpl>
        );
    }
}

module.exports = {
    path: 'user/:username',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {};
        }
    )(UserShow),
};
