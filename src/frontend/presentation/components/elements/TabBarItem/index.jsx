import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Icon from '@elements/Icon';
import Ripple from '@elements/Ripple';
import classNames from 'classnames';
import * as authActions from '@redux/Auth/AuthReducer';
import * as appActions from '@redux/App/AppReducer';

class TabBarItem extends React.Component {
    static propTypes = {
        /** Fired when the button is tapped. */
        onRequest: PropTypes.func,
        /** Override or extend the styles applied to the component. */
        classes: PropTypes.string,
        /** Custom top-level class */
        className: PropTypes.string,
        /** Disables text field. */
        disabled: PropTypes.bool,
        /** Selected this cell . */
        active: PropTypes.bool,
        /** Override the inline-styles of the root element. */
        style: PropTypes.object,
        /** The value of the text field. */
        value: PropTypes.string,
        /** The value of the text field. */
        image: PropTypes.string,
        /** The link of the text field. */
        link: PropTypes.string,
        /** The func of the onClick. */
        onClick: PropTypes.func,
        /** Disables not login user. */
        loginRequire: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        disabled: false,
        active: false,
        style: null,
        value: '',
        image: '',
        link: '',
        loginRequire: false,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'TabBarItem');
    }

    handleRequest = e => {
        const {
            loginRequire,
            current_user,
            onClick,
            showLogin,
            ...inputProps
        } = this.props;

        if (loginRequire && !current_user) {
            if (e) e.preventDefault();
            showLogin();
            return;
        }

        if (this.props.onClick) this.props.onClick(e);
    };

    render() {
        const {
            className,
            classes,
            disabled,
            active,
            style,
            value,
            image,
            link,
            loginRequire,
            current_user,
            onClick,
            ...inputProps
        } = this.props;

        return (
            <Link
                to={loginRequire && !current_user ? ' ' : link}
                className={classNames('tab-bar-item__link', { active })}
                onClick={this.handleRequest}
            >
                <div className="tab-bar-item">
                    <Icon
                        src={image}
                        className="tab-bar-item__image"
                        size={'2x'}
                    />
                    <div className="tab-bar-item__value">{value}</div>
                </div>
            </Link>
        );
    }
}

export default connect(
    (state, props) => {
        const current_user = authActions.getCurrentUser(state);
        return {
            current_user: current_user,
        };
    },

    dispatch => ({
        showLogin: () => {
            dispatch(authActions.showLogin());
        },
        addError: error => {
            dispatch(appActions.addError({ error }));
        },
    })
)(TabBarItem);
