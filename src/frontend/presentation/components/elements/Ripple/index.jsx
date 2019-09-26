import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { TimelineMax } from 'gsap';
import { COLOR } from '@entity/Color';

class Ripple extends React.Component {
    static propTypes = {
        children: React.PropTypes.node,
        opacity: PropTypes.number,
        hoverColor: PropTypes.string,
        outColor: PropTypes.string,
        clickColor: PropTypes.string,
        isHover: PropTypes.bool,
        isOut: PropTypes.bool,
        isClick: PropTypes.bool,
    };

    static defaultProps = {
        opacity: 8,
        hoverColor: COLOR.White.color,
        outColor: COLOR.Base.color,
        clickColor: COLOR.White.color,
        isHover: true,
        isOut: false,
        isClick: true,
    };

    state = {
        width: 0,
        height: 0,
        current_color: COLOR.White.color,
    };

    constructor(props) {
        super(props);
        this.handleAnimate = (event, color) => {
            const elem = ReactDOM.findDOMNode(this.refs.ripple),
                tl = new TimelineMax(),
                x = event.nativeEvent.offsetX,
                y = event.nativeEvent.offsetY,
                w = event.target.offsetWidth,
                h = event.target.offsetHeight,
                offsetX = Math.abs(w / 2 - x),
                offsetY = Math.abs(h / 2 - y),
                deltaX = w / 2 + offsetX,
                deltaY = h / 2 + offsetY,
                scaleRatio = Math.sqrt(
                    Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
                );

            this.setState({
                ...this.state,
                width: w,
                height: h,
                current_color: color,
            });

            tl.fromTo(
                elem,
                0.5,
                {
                    x: x,
                    y: y,
                    transformOrigin: '50% 50%',
                    scale: 0,
                    opacity: 1,
                },
                {
                    scale: scaleRatio,
                    opacity: 0,
                }
            );
        };
        this.handleClick = event => {
            if (this.props.isClick)
                this.handleAnimate(event, this.props.clickColor);
        };
        this.handleHover = event => {
            if (this.props.isHover)
                this.handleAnimate(event, this.props.hoverColor);
        };
        this.handleOut = event => {
            if (this.props.isOut)
                this.handleAnimate(event, this.props.outColor);
        };
        this.handleAnimate.bind(this);
        this.handleOut.bind(this);
        this.handleHover.bind(this);
        this.handleClick.bind(this);
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    render() {
        const {
            children,
            opacity,
            hoverColor,
            outColor,
            clickColor,
        } = this.props;

        const { handleClick, handleAnimate, handleOut, handleHover } = this;

        const { current_color } = this.state;

        var { width, height } = this.state;

        if (width == undefined) {
            width = 0;
        }

        if (height == undefined) {
            height = 0;
        }

        const style = {
            fill: current_color,
        };

        return (
            <div
                className="ripple"
                onClick={handleClick}
                onMouseOver={handleHover}
                onMouseOut={handleOut}
            >
                <div className="ripple__body">{children}</div>
                <svg
                    viewBox={`0 0 ${width || 0} ${height || 0}`}
                    className={`ripple__obj-${opacity}`}
                    style={style}
                >
                    <circle ref="ripple" cx="1" cy="1" r="1" />
                </svg>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(Ripple);
