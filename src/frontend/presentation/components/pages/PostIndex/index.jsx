import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import HomeList from '@cards/HomeList';
import IndexComponent from '@pages/IndexComponent';
import PostIndexList from '@cards/PostIndexList';

class PostIndex extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'PostIndex');
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    render() {
        const { current_user } = this.props;

        return !!current_user ? (
            <IndexComponent>
                <PostIndexList />
            </IndexComponent>
        ) : (
            <IndexComponent style={{ background: '#ffffff' }} showSide={false}>
                <HomeList />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '/posts',
    component: connect(
        (state, ownProps) => {
            return {
                current_user: authActions.getCurrentUser(state),
            };
        },
        dispatch => {
            return {
                addSuccess: success =>
                    dispatch(
                        appActions.addSuccess({
                            success,
                        })
                    ),
            };
        }
    )(PostIndex),
};
