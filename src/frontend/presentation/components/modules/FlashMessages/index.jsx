import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import TimeAgoWrapper from '@elements/TimeAgoWrapper';
import { connect } from 'react-redux';
import tt from 'counterpart';
import { HomeModel, HomeModels } from '@entity';
import models from '@network/client_models';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import Flash from '@elements/Flash';

class FlashMessages extends React.Component {
    static propTypes = {
        children: PropTypes.node,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'FlashMessages'
        );
    }

    render() {
        const { children } = this.props;

        const renderItem = vals =>
            React.Children.map(vals, (child, key) => {
                const { children: itemChildren, ...otherProps } = child.props;

                return (
                    <div className="flash-messages__item" key={key}>
                        <Flash
                            key={key}
                            message={child.props.message}
                            type={child.props.type}
                            onClose={child.props.onClose}
                            {...otherProps}
                        />
                    </div>
                );
            });

        return (
            <div className="flash-messages">
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
)(FlashMessages);
