import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';

class TwitterBar extends React.Component {
    static propTypes = {
        repository: AppPropTypes.User,
    };

    static defaultProps = {
        repository: null,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'TwitterBar');
    }

    render() {
        const { repository } = this.props;

        if (!repository) return <div />;

        return <div className="twitter-bar" />;
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(TwitterBar);
