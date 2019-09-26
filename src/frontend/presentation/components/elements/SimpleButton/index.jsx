import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import tt from 'counterpart';
import Ripple from '@elements/Ripple';
import classNames from 'classnames';
import { browserHistory } from 'react-router';
import Icon from '@elements/Icon';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';

class SimpleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            active: this.props.active,
        };
        this.handleClick = this.handleClick.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'SimpleButton'
        );
    }

    componentWillUpdate(nextProps, nextState) {
        this.setState({
            value: nextProps.value,
            active: nextProps.active,
        });
    }

    handleClick = e => {
        const { onClick, url, submit } = this.props;
        if (e && !submit) e.stopPropagation();
        if (url) browserHistory.push(url);
        if (onClick) {
            onClick(this.state.value);
        }
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.value != nextProps.value)
            this.setState({ value: nextProps.value });
        if (this.state.active != nextProps.active)
            this.setState({ active: nextProps.active });
    }

    render() {
        const { value, active } = this.state;
        const {
            className,
            classes,
            disabled,
            onClick,
            style,
            shadowBool,
            color,
            url,
            submit,
            src,
            ...inputProps
        } = this.props;

        let button_class_name =
            color == '' ? 'simple-button' : 'simple-' + color + '-button';

        const simpleButton = submit ? (
            <button
                type="submit"
                className={classNames('simple-button__link', {
                    active,
                })}
                id="simple_button_submit"
                onClick={e => this.handleClick(e)}
            >
                <div
                    className={classNames(button_class_name, {
                        active,
                    })}
                >
                    <div className="simple-button__items">
                        {src && (
                            <Icon
                                className="simple-button__items-image"
                                src={src}
                                size={'2x'}
                            />
                        )}
                        <div className="simple-button__items-text">
                            {this.state.value}
                        </div>
                    </div>
                </div>
            </button>
        ) : (
            <div
                className={classNames('simple-button__link', {
                    active: active,
                })}
                onClick={e => this.handleClick(e)}
            >
                <div
                    className={classNames(button_class_name, {
                        active: active,
                    })}
                >
                    <div className="simple-button__items">
                        {src && (
                            <Icon
                                className="simple-button__items-image"
                                src={src}
                                size={'2x'}
                            />
                        )}
                        <div className="simple-button__items-text">
                            {this.state.value}
                        </div>
                    </div>
                </div>
            </div>
        );

        return <Ripple>{simpleButton}</Ripple>;
    }
}

SimpleButton.defaultProps = {
    className: '',
    disabled: false,
    style: null,
    shadowBool: true,
    value: '',
    color: '',
    url: '',
    submit: false,
    active: false,
};

SimpleButton.propTypes = {
    /** Override or extend the styles applied to the component. */
    classes: PropTypes.string,
    /** Custom top-level class */
    className: PropTypes.string,
    /** Disables text field. */
    disabled: PropTypes.bool,
    /** Fired when the button is tapped. */
    onClick: PropTypes.func,
    /** Override the inline-styles of the root element. */
    style: PropTypes.object,
    /** Disables shadow. */
    shadowBool: PropTypes.bool,
    /** The value of the text field. */
    value: PropTypes.string,
    /** The color of the button. */
    color: PropTypes.string,
    /** The url of the button. */
    url: PropTypes.string,
    /** The submit of the button. */
    submit: PropTypes.bool,
    /** The mode of the button layout. */
    active: PropTypes.bool,
    /** The src for icon. */
    src: PropTypes.string,
};

export default SimpleButton;
