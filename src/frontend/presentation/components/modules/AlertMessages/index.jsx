import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import Alert from '@elements/Alert';
import AppPropTypes from '@extension/AppPropTypes';

class AlertMessages extends React.Component {
    static propTypes = {
        children: AppPropTypes.Children,
    };

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'AlertMessages'
        );
    }

    render() {
        const { children } = this.props;

        const renderItem = vals =>
            React.Children.map(vals, (child, key) => {
                const { children: itemChildren, ...otherProps } = child.props;

                return (
                    <div className="alert-messages__item" key={key}>
                        <Alert key={key} {...otherProps} />
                    </div>
                );
            });

        return (
            <div className="alert-messages">
                {children && renderItem(children)}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(AlertMessages);
