import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';

class CommunityShowList extends React.Component {

    static propTypes = {
    };

    static defaultProps = {
    };

    state = {
    }

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityShowList')
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
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
)(CommunityShowList);
