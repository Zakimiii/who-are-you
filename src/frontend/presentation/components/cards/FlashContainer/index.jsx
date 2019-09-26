import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as appActions from '@redux/App/AppReducer';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import { ClientError } from '@extension/Error';
import FlashMessages from '@modules/FlashMessages';
import Flash from '@elements/Flash';

class FlashContainer extends React.Component {
    static propTypes = {
        errors: PropTypes.arrayOf(PropTypes.object),
    };

    static defaultProps = {
        errors: [],
    };

    state = {};

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'FlashContainer'
        );
    }

    componentWillMount() {
        const {
            errors,
            removeError,
            successes,
            removeSuccess,
            addSuccess,
        } = this.props;
    }

    render() {
        const {
            errors,
            removeError,
            successes,
            removeSuccess,
            addSuccess,
        } = this.props;

        const renderErrors = errors =>
            errors.map((error, index) => (
                <Flash
                    key={index}
                    message={error.translate()}
                    type="error"
                    onClose={() => removeError(error)}
                />
            ));

        const renderSuccesses = successes =>
            successes.map((success, index) => (
                <Flash
                    key={index}
                    message={success}
                    type="success"
                    onClose={() => removeSuccess(success)}
                />
            ));

        return (
            <div className="flash-container">
                {errors.length > 0 && (
                    <FlashMessages>{renderErrors(errors)}</FlashMessages>
                )}
                {successes.length > 0 && (
                    <FlashMessages>{renderSuccesses(successes)}</FlashMessages>
                )}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            errors: appActions.getErrorsFromKey(state, ClientError.globalKey),
            successes: appActions.getSuccess(state),
        };
    },

    dispatch => ({
        removeError: error => {
            dispatch(appActions.removeError({ error }));
        },
        removeSuccess: success => {
            dispatch(appActions.removeSuccess({ success }));
        },
        addSuccess: success => {
            dispatch(appActions.addSuccess({ success }));
        },
    })
)(FlashContainer);
