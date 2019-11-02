import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AdsCard from '@elements/AdsCard';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';

class CmpTest extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CmpTest');
    }

    render() {
        return (
            <div
                className="cmp-test"
                style={{ width: '420px', height: '420px' }}
            >
                <AdsCard force={true} />
            </div>
        );
    }
}

module.exports = {
    path: '/test/components',
    component: connect(
        (state, props) => {
            return {};
        },

        dispatch => ({})
    )(CmpTest),
};
