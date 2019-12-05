/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import tt from 'counterpart';
import { List } from 'immutable';
import classnames from 'classnames';
import FeedIndexList from '@cards/FeedIndexList';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import IndexComponent from '@pages/IndexComponent';

class FeedIndex extends React.Component {
    static propTypes = {
        routeParams: PropTypes.object,
    };

    static defaultProps = {};

    constructor() {
        super();
        this.state = {};
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'FeedIndex');
    }

    render() {
        return (
            <IndexComponent>
                <FeedIndexList/>
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '/feeds',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {};
        }
    )(FeedIndex),
};
