/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import tt from 'counterpart';
import { List } from 'immutable';
import classnames from 'classnames';
import CommunityShowList from '@cards/CommunityShowList';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import IndexComponent from '@pages/IndexComponent';

class CommunityShow extends React.Component {
    static propTypes = {
        routeParams: PropTypes.object,
    };

    static defaultProps = {};

    constructor() {
        super();
        this.state = {};
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityShow');
    }

    render() {
        var { id, section } = this.props.routeParams;

        if (!section) {
            section = 'headings';
        }

        return (
            <IndexComponent>
                <CommunityShowList id={id} section={section} />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '/community/:id(/:section)',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {};
        }
    )(CommunityShow),
};
