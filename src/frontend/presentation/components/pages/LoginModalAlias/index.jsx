/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import tt from 'counterpart';
import { List } from 'immutable';
import constants from '@redux/constants';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
// import HeadingList from '@cards/HeadingList';
import IndexComponent from '@pages/IndexComponent';
import LoadingIndicator from '@elements/LoadingIndicator';

class LoginModalAlias extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'LoginModalAlias'
        );
    }

    render() {
        return <IndexComponent />;
    }
}

module.exports = {
    path: '/login',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {};
        }
    )(LoginModalAlias),
};
