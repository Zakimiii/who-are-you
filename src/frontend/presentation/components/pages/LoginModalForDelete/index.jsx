import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as authActions from '@redux/Auth/AuthReducer';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import { confirmForDeleteRoute } from '@infrastructure/RouteInitialize';
import LoginModalList from '@cards/LoginModalList';
import CloseButton from '@elements/CloseButton';
import tt from 'counterpart';
import Responsible from '@modules/Responsible';
import IconButton from '@elements/IconButton';

class LoginModalForDelete extends React.Component {
    static propTypes = {
        onCancel: PropTypes.func,
    };

    static defaultProps = {};

    static pushURLState(title) {
        if (window)
            window.history.pushState({}, title, confirmForDeleteRoute.path);
    }

    static state = {
        beforePathname: '/',
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'LoginModalForDelete'
        );
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        this.setState({
            beforePathname:
                browserHistory.getCurrentLocation().pathname !=
                    confirmForDeleteRoute.path &&
                browserHistory.getCurrentLocation().pathname,
        });
    }

    componentDidMount() {
        LoginModalForDelete.pushURLState(tt('g.login'));
        if (process.env.BROWSER)
            window.addEventListener(
                'touchmove',
                e => {
                    e.preventDefault();
                },
                true
            );
    }

    componentWillUnmount() {
        browserHistory.push(this.state.beforePathname);
        if (process.env.BROWSER)
            window.removeEventListener(
                'touchmove',
                e => {
                    e.preventDefault();
                },
                true
            );
    }

    onCancel = e => {
        const { onCancel } = this.props;
        this.setState({ beforePathname: null });
        if (onCancel) onCancel();
    };

    render() {
        const { onCancel } = this.props;

        return (
            <div className="login-modal">
                <div className="login-modal__button">
                    <IconButton onClick={onCancel} src="close" size={'2x'} />
                </div>
                <div className="login-modal__items">
                    <LoginModalList
                        onCancel={this.onCancel}
                        confirmForDelete={true}
                    />
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
)(LoginModalForDelete);
