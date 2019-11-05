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
        var { username, section } = this.props.routeParams;

        if (!section) {
            section = 'headings';
        }

        return (
            <IndexComponent>
                <UserShowList username={username} section={section} />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: 'user/:username(/:section)',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {};
        }
    )(UserShow),
};
