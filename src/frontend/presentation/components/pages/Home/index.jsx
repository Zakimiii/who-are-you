/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import tt from 'counterpart';
import { List } from 'immutable';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import HomeList from '@cards/HomeList';
import LoadingIndicator from '@elements/LoadingIndicator';
import * as appActions from '@redux/App/AppReducer';
import IndexComponent from '@pages/IndexComponent';

class Home extends React.Component {
    static pushURLState(title) {
        if (window) window.history.pushState({}, title, '/');
    }

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Home');
    }

    componentWillMount() {
        const { isHeaderVisible, location, addSuccess } = this.props;

        if (location.query.success_key) {
            addSuccess(tt(location.query.success_key));
            Home.pushURLState('Who are you?');
        }
    }

    render() {
        return (
            <IndexComponent>
                <HomeList />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '',
    component: connect(
        (state, ownProps) => {
            return {};
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
    )(Home),
};
