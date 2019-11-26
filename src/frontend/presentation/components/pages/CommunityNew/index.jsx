import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import IndexComponent from '@pages/IndexComponent';
import CommuntyNewList from '@cards/CommuntyNewList';

class CommuntyNew extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommuntyNew');
    }

    render() {
        var { id } = this.props.routeParams;

        return (
            <IndexComponent>
                <CommuntyNewList id={id} />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '/community/:id/new',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {};
        }
    )(CommuntyNew),
};
