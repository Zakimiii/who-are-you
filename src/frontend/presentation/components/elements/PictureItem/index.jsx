import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import Img from 'react-image';
import classNames from 'classnames';
import autobind from 'class-autobind';

class PictureItem extends React.Component {
    static propTypes = {
        url: PropTypes.string,
        width: PropTypes.number,
        radius: PropTypes.number,
        alt: PropTypes.string,
        className: PropTypes.string,
        onLoad: PropTypes.func,
        onError: PropTypes.func,
    };

    static defaultProps = {
        url: '',
        width: 120,
        radius: 60,
        alt: '',
        className: '',
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { url, width, radius } = this.props;
        const n = nextProps;
        return url !== n.url || width !== n.width || radius !== n.radius;
    }

    onLoad(e) {
        // if (e) e.preventDefault();
        const { onLoad } = this.props;

        if (onLoad) onLoad(e);
    }

    onError(e) {
        // if (e) e.preventDefault();
        const { onError } = this.props;

        if (onError) onError(e);
    }

    render() {
        const { url, width, radius, alt, className } = this.props;

        const { onLoad, onError } = this;

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
            <div
                className={classNames('circle-picture-item', className)}
                style={style}
            >
                <img
                    className="circle-picture-item__image"
                    style={image_style}
                    src={url}
                    alt={alt}
                    onLoad={onLoad}
                    onError={onError}
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
