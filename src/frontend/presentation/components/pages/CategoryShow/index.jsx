import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import IndexComponent from '@pages/IndexComponent';
import CategoryShowList from '@cards/CategoryShowList';
import { communityNewRoute } from '@infrastructure/RouteInitialize';
import ActionButton from '@modules/ActionButton';

class CategoryShow extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'CategoryShow'
        );
    }

    onClick(e) {
        const { repository } = this.props;
        browserHistory.push(communityNewRoute.path);
    }

    render() {
        var { id } = this.props.routeParams;

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
                <CategoryShowList id={id} />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '/category/:id',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {};
        }
    )(CategoryShow),
};
