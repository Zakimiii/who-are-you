import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import Img from 'react-image';

class PictureItem extends React.Component {
    static propTypes = {
        url: PropTypes.string,
        width: PropTypes.number,
        radius: PropTypes.number,
        alt: PropTypes.string,
    };

    static defaultProps = {
        url: '',
        width: 120,
        radius: 60,
        alt: '',
    };

    state = {};

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { url, width, radius } = this.props;
        const n = nextProps;
        return url !== n.url || width !== n.width || radius !== n.radius;
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    render() {
        const { url, width, radius, alt } = this.props;

        const style = {
            width: `${width}px`,
            height: `${width}px`,
            borderRadius: `${radius}px`,
        };

        const image_style = {
            // backgroundImage: `url(${url})`,
            width: `${width}px`,
            height: `${width}px`,
            borderRadius: `${radius}px`,
        };

        return (
            <div className="circle-picture-item" style={style}>
                <img
                    className="circle-picture-item__image"
                    style={image_style}
                    src={url}
                    alt={alt}
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
)(PictureItem);
