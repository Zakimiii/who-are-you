import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import FollowerBarItem from '@elements/FollowerBarItem';
import * as userActions from '@redux/User/UserReducer';
import * as authActions from '@redux/Auth/AuthReducer';

class FollowerBar extends React.Component {
    static propTypes = {
        repositories: PropTypes.array,
    };

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'FollowerBar');
    }

    render() {
        const { repositories } = this.props;

        if (!repositories) return <div />;

        const renderItem = items =>
            items.map((item, key) => (
                <div className="follower-bar__item" key={key}>
                    <FollowerBarItem repository={item} />
                </div>
            ));
        return (
            <div className="follower-bar">
                <div className="follower-bar__category">
                    {tt('g.relate_user')}
                </div>
                <div className="follower-bar__items">
                    {renderItem(repositories)}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repositories: userActions.getFollower(state),
        };
    },

    dispatch => ({})
)(FollowerBar);
