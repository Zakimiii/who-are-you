import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Icon from '@elements/Icon';
import classNames from 'classnames';
import { isScrollStart } from '@extension/scroll';

class ScrollNavigator extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {
        top: true,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'ScrollNavigator'
        );
    }

    componentWillMount() {
        this.onWindowScroll();
        if (process.env.BROWSER)
            window.addEventListener('scroll', this.onWindowScroll, false);
    }

    componentWillUnmount() {
        if (process.env.BROWSER)
            window.removeEventListener('scroll', this.onWindowScroll, false);
    }

    onWindowScroll() {
        const isStart = isScrollStart();
        this.setState({ top: isStart });
    }

    render() {
        const { top } = this.state;

        return (
            <div
                className={classNames('scroll-navigator', 'faster', {
                    zoomIn: !!top,
                    zoomOut: !top,
                    animated: !top,
                })}
            >
                <Icon
                    className="scroll-navigator__icon"
                    size="2_4x"
                    src={'chevron-next'}
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
)(ScrollNavigator);
