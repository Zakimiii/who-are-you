import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import Ripple from '@elements/Ripple';
import * as appActions from '@redux/App/AppReducer';
import Img from 'react-image';
import tt from 'counterpart';
import GradationButton from '@elements/GradationButton';

class TwitterButton extends React.Component {
    static propTypes = {
        isSession: PropTypes.bool,
        error: PropTypes.any,
        modalPath: PropTypes.string,
    };

    static defaultProps = {
        isSession: false,
        error: null,
        modalPath: null,
    };

    state = {};

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'TwitterButton'
        );
    }

    render() {
        const { isSession, error, addError, modalPath } = this.props;

        return (
            <GradationButton
                src={'twitter'}
                onClick={e => {
                    error
                        ? addError(error)
                        : !!isSession
                          ? (window.location.href = '/auth/twitter/session')
                          : (window.location.href = !modalPath
                                ? '/auth/twitter'
                                : `/auth/twitter/confirm?modal=${modalPath}`);
                }}
                value={tt('g.twitter_login')}
            />
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({
        addError: error => {
            dispatch(appActions.addError({ error }));
        },
    })
)(TwitterButton);
