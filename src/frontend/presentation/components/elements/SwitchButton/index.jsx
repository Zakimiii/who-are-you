import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import Ripple from '@elements/Ripple';

class SwitchButton extends React.Component {
    static propTypes = {
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        title: PropTypes.string,
        color: PropTypes.string,
        ref: PropTypes.string,
        onChange: PropTypes.func,
        stop: PropTypes.bool,
    };

    static defaultProps = {
        disabled: false,
        active: false,
        title: '',
        ref: '',
        stop: false,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'SwitchButton'
        );
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            active: this.props.active,
        });
    }

    onChange(e) {
        const { onChange, stop } = this.props;

        const { active } = this.state;

        if (e && stop) e.stopPropagation();

        this.setState({
            active: !active,
        });

        if (onChange) onChange(!active);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.active != this.props.active) {
            this.setState({
                active: nextProps.active,
            });
        }
    }

    render() {
        const { title, ref, color, disabled } = this.props;

        const { active } = this.state;

        const { onChange } = this;

        const className = color
            ? 'switch-' + color + '-button'
            : 'switch-button';

        return (
            <div className={className}>
                <label className={className + '__label'}>
                    <input
                        className={className + '__label-input'}
                        type="checkbox"
                        onChange={onChange}
                        checked={Number.prototype.castBool(active)}
                        ref={ref}
                        disabled={disabled}
                    />
                    <span className={className + '__label-parts'}>{title}</span>
                </label>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(SwitchButton);
