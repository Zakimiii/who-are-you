import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Icon from '@elements/Icon';
import classNames from 'classnames';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import Ripple from '@elements/Ripple';
import CloseButton from '@elements/CloseButton';

class Flash extends React.Component {
    constructor(props) {
        super(props);
        this.flashClass = this.flashClass.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Flash');
    }

    componentDidMount() {
        this.timer = setTimeout(this.props.onClose, this.props.timeout);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    flashClass(type) {
        let classes = {
            error: 'flash-danger wobble animated faster',
            flash: 'flash-warning',
            notice: 'flash-info',
            success: 'flash-success bounceIn animated faster',
        };
        return classes[type] || classes.success;
    }

    render() {
        const { message, type, onClose } = this.props;

        const flashClassName = `flash ${this.flashClass(type)}`;

        return (
            <div className={flashClassName}>
                <div className="flash__message">{message}</div>
                <CloseButton onClick={onClose} className="flash__button" />
            </div>
        );
    }
}

Flash.propTypes = {
    onClose: PropTypes.func,
    timeout: PropTypes.number,
    message: PropTypes.string,
    type: PropTypes.oneOf(['error', 'flash', 'notice', 'success']),
};

Flash.defaultProps = {
    timeout: 20000,
};

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(Flash);
