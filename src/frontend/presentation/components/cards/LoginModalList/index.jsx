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
import data_config from '@constants/data_config';
import TwitterHandler from '@network/twitter';

class LoginModalList extends React.Component {
    static propTypes = {
        confirmForDelete: PropTypes.bool,
        confirmForLineLink: PropTypes.bool,
        linkToken: PropTypes.string,
    };

    static defaultProps = {
        confirmForDelete: false,
        confirmForLineLink: false,
        linkToken: '',
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
        const { confirmForDelete, confirmForLineLink, linkToken } = this.props;

        const modalPath = () => {
            if (confirmForDelete) return 'user/delete/confirm';
            if (confirmForLineLink && linkToken)
                return `line/link/confirm${
                    TwitterHandler.escape_symbol
                }linkToken${TwitterHandler.escape_equal}${linkToken}`;
            return null;
        };

        const desc_text = () => {
            if (confirmForDelete) return tt('g.login_quit');
            if (confirmForLineLink) return tt('g.login_line');
            return tt('apps.home');
        };

        const button_text = () => {
            if (confirmForDelete) return tt('g.login');
            if (confirmForLineLink) return tt('g.login');
            return null;
        };

        const logo = (
            <div className="login-modal-list__logo">
                <Img
                    className="login-modal-list__logo-image"
                    src={data_config.logo_image}
                />
            </div>
        );

        const desc = (
            <div className="login-modal-list__desc">{desc_text()}</div>
        );

        const buttons = (
            <div className="login-modal-list__button">
                <TwitterButton
                    text={button_text()}
                    isSession={false}
                    modalPath={modalPath()}
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
