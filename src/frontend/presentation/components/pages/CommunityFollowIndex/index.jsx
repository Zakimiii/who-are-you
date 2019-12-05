/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import tt from 'counterpart';
import { List } from 'immutable';
import classnames from 'classnames';
import CommunityFollowIndexList from '@cards/CommunityFollowIndexList';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import IndexComponent from '@pages/IndexComponent';

class CommunityFollowIndex extends React.Component {
    static propTypes = {
        routeParams: PropTypes.object,
    };

    static defaultProps = {};

    constructor() {
        super();
        this.state = {};
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityFollowIndex');
    }

    render() {
        return (
            <IndexComponent>
                <CommunityFollowIndexList/>
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '/communities/follows',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {};
        }
    )(CommunityFollowIndex),
};
