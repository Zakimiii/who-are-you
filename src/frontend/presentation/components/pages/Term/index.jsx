import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import config from '@constants/config';
import TermItem from '@elements/TermItem';

class Term extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Term');
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    render() {
        return (
            <div className="term">
                <TermItem />
            </div>
        );
    }
}

module.exports = {
    path: '/term',
    component: connect(
        (state, props) => {
            return {};
        },
        dispatch => ({})
    )(Term),
};
