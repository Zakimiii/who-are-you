/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import tt from 'counterpart';
import { List } from 'immutable';
import classnames from 'classnames';
import CommunityIndexList from '@cards/CommunityIndexList';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import IndexComponent from '@pages/IndexComponent';
import models from '@network/client_models';
import ActionButton from '@modules/ActionButton';
import * as communityActions from '@redux/Community/CommunityReducer';
import * as communityHeadingActions from '@redux/CommunityHeading/CommunityHeadingReducer';
import * as appActions from '@redux/App/AppReducer';
import { communityNewRoute } from '@infrastructure/RouteInitialize';
import autobind from 'class-autobind';

class CommunityIndex extends React.Component {
    static propTypes = {
        routeParams: PropTypes.object,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.state = {};
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'CommunityIndex'
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
                        src={'plus'}
                        onClick={this.onClick}
                    />
                }
            >
                <CommunityIndexList />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '/communities',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {};
        }
    )(CommunityIndex),
};
