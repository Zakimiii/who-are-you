import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';

class SideBar extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'SideBar');
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    render() {
        return <div className="side-bar" />;
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(SideBar);
