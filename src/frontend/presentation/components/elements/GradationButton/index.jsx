import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import tt from 'counterpart';
import Ripple from '@elements/Ripple';
import { COLOR } from '@entity/Color';
import { browserHistory } from 'react-router';
import Icon from '@elements/Icon';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';

var urlregex = "/^(https?|ftp)(://[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+)$/"; //new RegExp("/^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/");
class GradationButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            active: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'GradationButton'
        );
    }

    handleClick = e => {
        const { onClick, url, submit, stop } = this.props;
        if (e && !submit) e.preventDefault();
        if (stop) e.stopPropagation();
        if (onClick) {
            onClick(this.state.value);
        }
        if (url) browserHistory.push(url);
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.value != nextProps.value)
            this.setState({ value: nextProps.value });
    }

    render() {
        const { value } = this.state;
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

        const button_class_name =
            color == '' ? 'gradation-button' : 'gradation-' + color + '-button';

        const button_target = url.match(urlregex) ? '_blank' : undefined;

        const gradationButton = submit ? (
            <button
                type="submit"
                className={button_class_name + '__link'}
                id="gradation_button_submit"
                onClick={e => this.handleClick(e)}
                target={button_target}
                disabled={disabled}
            >
                <div className={button_class_name}>
                    <div className="gradation-button__items">
                        {src && (
                            <Icon
                                className="gradation-button__items-image"
                                src={src}
                            />
                        )}
                        <div className="gradation-button__items-text">
                            {this.state.value}
                        </div>
                    </div>
                </div>
            </button>
        ) : (
            <div
                target={button_target}
                className={button_class_name + '__link'}
                onClick={e => this.handleClick(e)}
                disabled={disabled}
            >
                <div className={button_class_name}>
                    <div className="gradation-button__items">
                        {src && (
                            <Icon
                                className="gradation-button__items-image"
                                src={src}
                                size={'2x'}
                            />
                        )}
                        <div className="gradation-button__items-text">
                            {this.state.value}
                        </div>
                    </div>
                </div>
            </div>
        );

        return <Ripple outColor={COLOR.White.color}>{gradationButton}</Ripple>;
    }
}

GradationButton.defaultProps = {
    className: '',
    disabled: false,
    style: null,
    shadowBool: true,
    value: '',
    color: '',
    url: '',
    submit: false,
    stop: false,
};

GradationButton.propTypes = {
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
    /** The submit of the button. */
    stop: PropTypes.bool,
    /** The src for icon. */
    src: PropTypes.string,
};

export default GradationButton;
