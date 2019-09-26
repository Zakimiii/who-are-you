import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import Icon from '@elements/Icon';
import CloseButton from '@elements/CloseButton';
import Ripple from '@elements/Ripple';
import SimpleButton from '@elements/SimpleButton';
import GradationButton from '@elements/GradationButton';

class Alert extends React.Component {
    static propTypes = {
        onCancel: PropTypes.func,
        onClose: PropTypes.func,
        onComplete: PropTypes.func,
        title: PropTypes.string,
        message: PropTypes.string,
        timeout: PropTypes.number,
        cancelText: PropTypes.string,
        completeText: PropTypes.string,
        isTimeLimit: PropTypes.bool,
    };

    static defaultProps = {
        title: '',
        message: '',
        timeout: 10000,
        cancelText: 'Cancel',
        completeText: 'Done',
        isTimeLimit: true,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Alert');
        this.onCancel = this.onCancel.bind(this);
        this.onComplete = this.onComplete.bind(this);
    }

    componentDidMount() {
        if (this.props.isTimeLimit)
            this.timer = setTimeout(this.props.onClose, this.props.timeout);
    }

    componentWillUnmount() {
        if (this.props.isTimeLimit) clearTimeout(this.timer);
    }

    onCancel(e) {
        const { onCancel } = this.props;
        if (onCancel) onCancel();
    }

    onComplete(e) {
        const { onComplete } = this.props;
        if (onComplete) onComplete();
    }

    render() {
        const {
            message,
            onClose,
            title,
            cancelText,
            completeText,
        } = this.props;

        const { onCancel, onComplete } = this;

        return (
            <div className="alert">
                <div className="alert__close" onClick={onClose}>
                    <Ripple>
                        <CloseButton className="alert__close-button" />
                    </Ripple>
                </div>
                <div className="alert__body">
                    <div className="alert__body__title">{title}</div>
                    <div className="alert__body__message">{message}</div>
                    <div className="alert__body__buttons">
                        <div className="alert__body__button">
                            <SimpleButton
                                onClick={onCancel}
                                value={cancelText}
                            />
                        </div>
                        <div className="alert__body__button">
                            <GradationButton
                                onClick={onComplete}
                                value={completeText}
                            />
                        </div>
                    </div>
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
)(Alert);
