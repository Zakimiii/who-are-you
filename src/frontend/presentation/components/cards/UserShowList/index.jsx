import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';

class UserShowList extends React.Component {

    static propTypes = {
        username: PropTypes.string,
    };

    static defaultProps = {
        username: null,
    };

    state = {
    }

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'UserShowList')
    }

    render() {
        return (
            <div className="user-show-list" >
            </div>
        )
    }
}

export default connect(
    (state, props) => {
        return {
        };
    },

    dispatch => ({
    })
)(UserShowList);
