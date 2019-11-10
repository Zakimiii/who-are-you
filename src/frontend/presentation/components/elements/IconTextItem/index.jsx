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

class IconTextItem extends React.Component {
    static propTypes = {
        src: PropTypes.string,
        size: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.string,
    };

    static defaultProps = {
        src: 'mini-logo-icon',
        size: '3x',
        title: '',
        text: '',
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'IconTextItem'
        );
    }

    render() {
        const { src, title, text, size } = this.props;

        return (
            <Ripple>
                <div className="icon-text-item">
                    <div className="icon-text-item__left">
                        <Icon
                            className="icon-text-item__left-icon"
                            src={src}
                            size={size}
                        />
                    </div>
                    <div className="icon-text-item__right">
                        <div className="icon-text-item__right-title">
                            {title}
                        </div>
                        <div className="icon-text-item__right-text">{text}</div>
                    </div>
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
)(IconTextItem);
