import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Ripple from '@elements/Ripple';
import classNames from 'classnames';

class InputText extends React.Component {
    static propTypes = {
        label: PropTypes.string,
        prelabel: PropTypes.string,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        disabled: PropTypes.bool,
        focus: PropTypes.bool,
    };

    static defaultProps = {
        label: '',
        prelabel: null,
        value: '',
        placeholder: '',
        disabled: false,
        foucus: true,
    };

    state = {
        focused: false,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'InputText');
    }

    componentDidMount() {
        this.props.focus && this.nameInput.focus();
    }

    onChange(e) {
        if (e) e.preventDefault();
        if (this.props.onChange) this.props.onChange(e);
    }

    onClick(e) {
        if (e) e.preventDefault();
        if (this.props.onClick) this.props.onClick(e);
    }

    onFocus(e) {
        // if (e) e.preventDefault();
        this.setState({ focused: true });
        if (this.props.onFocus) this.props.onFocus(e);
    }

    onBlur(e) {
        // if (e) e.preventDefault();
        this.setState({ focused: false });
        if (this.props.onBlur) this.props.onBlur(e);
    }

    render() {
        const { label, prelabel, value, placeholder, disabled } = this.props;

        const { focused } = this.state;

        return (
            <div className="input-text" onClick={this.onClick}>
                <input
                    ref={input => {
                        this.nameInput = input;
                    }}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    className="input-text__input"
                    type="text"
                    id="input-text-inp"
                    placeholder={focused ? placeholder : ''}
                    value={value}
                    disabled={disabled}
                />
                <span
                    className={classNames('input-text__label', {
                        focus: focused || (value && value != ''),
                    })}
                >
                    {!!focused ? prelabel || label : label}
                </span>
                <span
                    className={classNames('input-text__border', {
                        focus: focused || (value && value != ''),
                    })}
                />
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(InputText);
