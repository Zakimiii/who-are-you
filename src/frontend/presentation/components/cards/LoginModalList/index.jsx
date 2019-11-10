import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Img from 'react-image';
import TwitterButton from '@elements/TwitterButton';
import CheckLaws from '@elements/CheckLaws';
import { confirmForDeleteRoute } from '@infrastructure/RouteInitialize';

class LoginModalList extends React.Component {
    static propTypes = {
        confirmForDelete: PropTypes.bool,
    };

    static defaultProps = {
        confirmForDelete: false,
    };

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
        const { confirmForDelete } = this.props;

        const modalPath = () => {
            if (!process.env.BROWSER) return;
            const pathname = browserHistory.getCurrentLocation().pathname;
            if (confirmForDeleteRoute.isValidPath(pathname))
                return 'user/delete/confirm';
        };

        const logo = (
            <div className="login-modal-list__logo">
                <Img
                    className="login-modal-list__logo-image"
                    src={'/images/brands/who_are_you.png'}
                />
            </div>
        );

        const desc = (
            <div className="login-modal-list__desc">
                {confirmForDelete ? tt('g.login_quit') : tt('apps.home')}
            </div>
        );

        const buttons = (
            <div className="login-modal-list__button">
                <TwitterButton
                    text={confirmForDelete && tt('g.login')}
                    isSession={false}
                    modalPath={
                        confirmForDelete &&
                        'user/delete/confirm' /*modalPath()*/
                    }
                />
            </div>
        );

        return (
            <div className="login-modal-list">
                {logo}
                {desc}
                {buttons}
                <div className="login-modal-list__check">
                    <CheckLaws />
                </div>
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
