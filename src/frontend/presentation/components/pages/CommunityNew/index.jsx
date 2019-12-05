import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import IndexComponent from '@pages/IndexComponent';
import CommunityNewList from '@cards/CommunityNewList';

class CommunityNew extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'CommunityNew'
        );
    }

    render() {
        var { id } = this.props.routeParams;

        return (
            <IndexComponent>
                <CommunityNewList id={id} />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '/communities/new',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {};
        }
    )(CommunityNew),
};
