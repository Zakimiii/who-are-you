import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import IndexComponent from '@pages/IndexComponent';
import CategoryShowList from '@cards/CategoryShowList';

class CategoryShow extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CategoryShow');
    }

    render() {
        var { id } = this.props.routeParams;

        return (
            <IndexComponent>
                <CategoryShowList id={id} />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '/answer/:id',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {};
        }
    )(CategoryShow),
};
