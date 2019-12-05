/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import tt from 'counterpart';
import { List } from 'immutable';
import classnames from 'classnames';
import CategoryIndexList from '@cards/CategoryIndexList';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import IndexComponent from '@pages/IndexComponent';

class CategoryIndex extends React.Component {
    static propTypes = {
        routeParams: PropTypes.object,
    };

    static defaultProps = {};

    constructor() {
        super();
        this.state = {};
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CategoryIndex');
    }

    render() {
        return (
            <IndexComponent>
                <CategoryIndexList/>
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '/categories',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {};
        }
    )(CategoryIndex),
};
