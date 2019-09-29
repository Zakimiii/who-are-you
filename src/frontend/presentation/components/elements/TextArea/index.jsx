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
    };

    static defaultProps = {
        label: '',
        value: '',
        placeholder: '&nbsp;',
    };

    state = {
        focus: false,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'TextArea');
    }

    onChange(e) {
        if (e) e.preventDefault();
        if (this.props.onChange) this.props.onChange(e);
    }

    onFocus(e) {
        // if (e) e.preventDefault();
        this.setState({ focus: true });
    }

    onBlur(e) {
        // if (e) e.preventDefault();
        this.setState({ focus: false });
    }

    render() {
        const { label, value, placeholder } = this.props;

        const { focus } = this.state;
        return (
            <div className="text-area">
                <TextareaAutosize
                    className="text-area__input"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    placeholder={focus ? placeholder : ''}
                    value={value}
                />
                <span
                    className={classNames('text-area__label', {
                        focus: focus || (value && value != ''),
                    })}
                >
                    {label}
                </span>
                <span
                    className={classNames('text-area__border', {
                        focus: focus || (value && value != ''),
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
