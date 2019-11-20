import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import CommunityHeadingShowList from '@cards/CommunityHeadingShowList';
import IndexComponent from '@pages/IndexComponent';

class CommunityHeadingShow extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityHeadingShow');
    }

    render() {
        var { id } = this.props.routeParams;

        return (
            <IndexComponent>
                <CommunityHeadingShowList id={id} />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '/community/heading/:id',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {};
        }
    )(CommunityHeadingShow),
};
