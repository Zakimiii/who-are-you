import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import Icon from '@elements/Icon';
import Ripple from '@elements/Ripple';

class GradationIconButton extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
        color: PropTypes.string,
        padding: PropTypes.string,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'GradationIconButton'
        );
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const { onClick } = this.props;
        if (e) e.preventDefault();
        if (onClick) onClick(e);
    }

    render() {
        const { color, padding, ...inputProps } = this.props;

        const button_class_name = !color
            ? 'gradation-icon-button'
            : 'gradation-' + color + '-icon-button';

        const { onClick } = this;

        return (
            <Ripple>
                <div
                    className={button_class_name}
                    onClick={onClick}
                    style={padding ? { padding } : {}}
                >
                    <Icon {...inputProps} />
                </div>
            </Ripple>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(GradationIconButton);
