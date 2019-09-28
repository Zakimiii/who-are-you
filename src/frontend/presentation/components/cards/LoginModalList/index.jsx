import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Img from 'react-image';
import TwitterButton from '@elements/TwitterButton';

class LoginModalList extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'LoginModalList'
        );
    }

    render() {
        const logo = (
            <div className="login-modal-list__logo">
                <Img
                    className="login-modal-list__logo-image"
                    src={'/images/brands/logo.png'}
                />
            </div>
        );

        const desc = (
            <div className="login-modal-list__desc">
                Twitter連携で簡単に始められる 一問一答形式の他己紹介アプリ
            </div>
        );

        const buttons = (
            <div className="login-modal-list__button">
                <TwitterButton />
            </div>
        );

        return (
            <div className="login-modal-list">
                {logo}
                {desc}
                {buttons}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(LoginModalList);
