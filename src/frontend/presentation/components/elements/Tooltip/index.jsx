import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';

export const tooltip_position = [
    'none',
    'top',
    'right',
    'left',
    'bottom',
    'center',
];
export const tooltip_trigger = ['onClick', 'onMouseOver'];

class Tooltip extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        type: PropTypes.oneOf(tooltip_position),
        content: PropTypes.node,
        trigger: PropTypes.oneOf(tooltip_trigger),
        onClick: PropTypes.func,
        xOffset: PropTypes.number,
        yOffset: PropTypes.number,
    };

    static defaultProps = {
        type: tooltip_position[0],
        trigger: tooltip_trigger[0],
        onClick: () => {},
        xOffset: 0,
        yOffset: 0,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Tooltip');
        this.state = {
            visible: false,
            x: 0,
            y: 0,
            width: 0,
            type: 'none',
        };

        this.handleShow = evt => {
            let el = evt.currentTarget;
            if (!!el) {
                let rect = el.getBoundingClientRect();
                this.show(rect);
            }
        };

        this.onClick = e => {
            if (this.props.trigger == tooltip_trigger[0]) {
                if (e) e.stopPropagation();
                this.handleShow(e);
                this.props.onClick();
            }
        };

        this.onMouseOver = e => {
            if (this.props.trigger == tooltip_trigger[1]) {
                if (e) e.stopPropagation();
                this.handleShow(e);
            }
        };
        this.handleShow.bind(this);
        this.onClick.bind(this);
        this.onMouseOver.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside() {
        const elem = ReactDOM.findDOMNode(this.refs.tooltip);
        if (!elem) return;
        if (elem.contains(event.target)) return;
        this.setState({ visible: false });
    }

    pastShow(hoverRect) {
        let ttNode = ReactDOM.findDOMNode(this);
        const elem = ReactDOM.findDOMNode(this.refs.tooltip);
        if (!!ttNode && !!elem) {
            const { type, xOffset, yOffset } = this.props;

            let x, y;
            const width = elem.getBoundingClientRect().width;
            const height = elem.getBoundingClientRect().height;

            switch (type) {
                case tooltip_position[0]:
                case tooltip_position[1]:
                    x = -width * 2 - hoverRect.width + xOffset;
                    y = -height - hoverRect.height + yOffset;
                    break;
                case tooltip_position[2]:
                    x = hoverRect.width + xOffset;
                    y = height / 2 - height / 2 + yOffset;
                    break;
                case tooltip_position[3]:
                    x = -hoverRect.width + xOffset;
                    y = height / 2 - height / 2 + yOffset;
                    break;
                case tooltip_position[4]:
                    x = -width * 2 - hoverRect.width + xOffset;
                    y = height + yOffset + 10;
                    break;
                case tooltip_position[5]:
                    x = -width * 2 + hoverRect.width * 2 + xOffset;
                    y = 10 + yOffset; //height + yOffset + 10;
                    break;
            }

            this.setState({
                type,
                x,
                y,
                width,
                height,
            });
        }
    }

    show(hoverRect) {
        let { pastShow } = this;
        this.setState(
            { visible: !this.state.visible },
            pastShow.bind(this, hoverRect)
        );
    }

    render() {
        let { state, onClick, onMouseOver, handleShow } = this;

        const style = {
            left: state.x + 'px',
            top: state.y + 'px',
        };

        let arrow_style = {};
        switch (this.props.type) {
            case tooltip_position[0]:
            case tooltip_position[1]:
                arrow_style.top = 'calc(100% + 3px)';
                arrow_style.left = '50%';
                break;
            case tooltip_position[2]:
                arrow_style.top = '50%';
                arrow_style.left = 'calc(100% + 3px)';
                break;
            case tooltip_position[3]:
                arrow_style.top = '50%';
                // arrow_style.left = '-3px';
                break;
            case tooltip_position[4]:
                arrow_style.top = '-3px';
                arrow_style.right = `calc( ${state.width}px / 3  * 2)`;
                break;
            case tooltip_position[5]:
                arrow_style.top = '-3px';
                arrow_style.right = `50%`;
                break;
        }

        const body = (
            <div
                className={classNames(
                    'tool-tip__wrap-body',
                    'zoomIn',
                    'animated',
                    'faster'
                )}
                ref="tooltip"
                style={style}
            >
                {this.props.content}
                <div className="tool-tip__wrap-arrow" style={arrow_style} />
            </div>
        );

        return (
            <div
                className="tool-tip"
                onClick={onClick}
                onMouseOver={onMouseOver}
            >
                {this.props.children}
                <div className="tool-tip__wrap" onClick={onClick}>
                    {state.visible && body}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(Tooltip);
