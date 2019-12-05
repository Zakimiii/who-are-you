import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Icon from '@elements/Icon';
import Ripple from '@elements/Ripple';

class ActionButton extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'ActionButton'
        );
    }

    onClick(e) {
        const { onClick } = this.props;
        if (onClick) onClick(e);
    }

    render() {
        const { ...inputProps } = this.props;
        return (
            <div className="action-button">
                <Ripple>
                    <div
                        className="action-button__button"
                        onClick={this.onClick}
                    >
                        <Icon
                            {...inputProps}
                            className="action-button__button-icon"
                        />
                    </div>
                </Ripple>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(ActionButton);
