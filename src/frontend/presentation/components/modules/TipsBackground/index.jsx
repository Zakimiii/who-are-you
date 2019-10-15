import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Img from 'react-image';
import classNames from 'classnames';

class TipsBackground extends React.Component {
    static propTypes = {
        children: AppPropTypes.Children,
        className: PropTypes.string,
    };

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'TipsBackground'
        );
    }

    componentDidMount() {
        this.transform();
    }

    transform() {
        if (!process.env.BROWSER) return;
        [...Array(11).keys()].map(i => ++i).map(key => {
            const el = document.getElementsByClassName(
                    `tips-background__back-image${key}`
                )[0],
                { width, height } = el.getBoundingClientRect(),
                center = width,
                radius = width / 2;
            setInterval(() => {
                const t = new Date().getTime() / 500 + (key + 10);
                const x = center + Math.cos(t) * radius;
                const y = center + Math.sin(t) * radius;

                el.setAttribute(
                    'style',
                    `transform: translate3d(${x}px, ${y}px, 0);`
                );
            }, 20);
        });
    }

    render() {
        const { children, className } = this.props;

        const renderImage = () =>
            [...Array(11).keys()].map(i => ++i).map(key => (
                <div className={`tips-background__back-image${key}`} key={key}>
                    <Img
                        key={key}
                        className={`tips-background__back-image${key}-img`}
                        src={`/images/tips/tip${key}.png`}
                        alt={`tip${key}.png`}
                    />
                </div>
            ));
        return (
            <div className={classNames('tips-background', className)}>
                <div className="tips-background__children">{children}</div>
                <div className="tips-background__back">{renderImage()}</div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(TipsBackground);
