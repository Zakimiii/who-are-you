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
import TextareaAutosize from 'react-textarea-autosize';

class TextArea extends React.Component {
    static propTypes = {
        label: PropTypes.string,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        focus: PropTypes.bool,
    };

    static defaultProps = {
        label: '',
        value: '',
        placeholder: '&nbsp;',
        foucus: true,
    };

    state = {
        focused: false,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'TextArea');
    }

    componentDidMount() {
        // this.props.focus && this.nameInput.focus();
    }

    onChange(e) {
        if (e) e.preventDefault();
        if (this.props.onChange) this.props.onChange(e);
    }

    onFocus(e) {
        // if (e) e.preventDefault();
        this.setState({ focused: true });
    }

    onBlur(e) {
        // if (e) e.preventDefault();
        this.setState({ focused: false });
    }

    render() {
        const { label, value, placeholder } = this.props;

        const { focused } = this.state;
        return (
            <div className="text-area">
                <TextareaAutosize
                    ref={input => {
                        this.nameInput = input;
                    }}
                    className="text-area__input"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    placeholder={focused ? placeholder : ''}
                    value={value}
                />
                <span
                    className={classNames('text-area__label', {
                        focus: focused || (value && value != ''),
                    })}
                >
                    {label}
                </span>
                <span
                    className={classNames('text-area__border', {
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
)(TextArea);
