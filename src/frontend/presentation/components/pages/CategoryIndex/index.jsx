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
import ActionButton from '@modules/ActionButton';
import { communityNewRoute } from '@infrastructure/RouteInitialize';
import autobind from 'class-autobind';

class CategoryIndex extends React.Component {
    static propTypes = {
        routeParams: PropTypes.object,
    };

    static defaultProps = {};

    constructor() {
        super();
        autobind(this);
        this.state = {};
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'CategoryIndex'
        );
    }

    onClick(e) {
        const { repository } = this.props;
        browserHistory.push(communityNewRoute.path);
    }

    render() {
        return (
            <IndexComponent
                action_button={
                    <ActionButton
                        size={'3x'}
                        src={'mini-logo-icon'}
                        onClick={this.onClick}
                    />
                }
            >
                <CategoryIndexList />
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
