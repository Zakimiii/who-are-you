import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import Img from 'react-image';
import classNames from 'classnames';
import autobind from 'class-autobind';
import data_config from '@constants/data_config';
import LoadingIndicator from '@elements/LoadingIndicator';

class PictureItem extends React.Component {
    static propTypes = {
        url: PropTypes.string,
        rollback_url: PropTypes.string,
        width: PropTypes.number,
        radius: PropTypes.number,
        alt: PropTypes.string,
        className: PropTypes.string,
        onLoad: PropTypes.func,
        onError: PropTypes.func,
    };

    static defaultProps = {
        url: data_config.default_user_image,
        rollback_url: data_config.default_user_image,
        width: 120,
        radius: 60,
        alt: '',
        className: '',
    };

    state = {
        isError: false,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'PictureItem');
        autobind(this);
    }

    onLoad(e) {
        const { onLoad } = this.props;
        if (onLoad) onLoad(e);
    }

    onError(e) {
        const { onError } = this.props;
        if (onError) onError(e);
    }

    render() {
        const { url, rollback_url, width, radius, alt, className } = this.props;
        const { isError } = this.state;

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
                <Img
                    className="circle-picture-item__image"
                    style={image_style}
                    src={isError ? rollback_url : url}
                    alt={alt}
                    onLoad={onLoad}
                    onError={onError}
                    loader={<LoadingIndicator type={'circle'} />}
                    unloader={
                        <img
                            className="circle-picture-item__image"
                            style={image_style}
                            src={rollback_url}
                            alt={alt}
                        />
                    }
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
