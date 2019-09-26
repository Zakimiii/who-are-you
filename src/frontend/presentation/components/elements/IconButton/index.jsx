import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import Icon from '@elements/Icon';
import Ripple from '@elements/Ripple';

class IconButton extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'IconButton');
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const { onClick } = this.props;
        if (e) e.preventDefault();
        if (onClick) onClick(e);
    }

    render() {
        const { ...inputProps } = this.props;

        const { onClick } = this;

        return (
            <Ripple>
                <div className="icon-button" onClick={onClick}>
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
)(IconButton);
