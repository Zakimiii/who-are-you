import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import HeadingShowList from '@cards/HeadingShowList';
import IndexComponent from '@pages/IndexComponent';

class HeadingShow extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'HeadingShow');
    }

    render() {
        var { id } = this.props.routeParams;

        return (
            <IndexComponent>
                <HeadingShowList id={id} />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: 'heading/:id',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {};
        }
    )(HeadingShow),
};
