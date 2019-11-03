import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AppPropTypes from '@extension/AppPropTypes';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import Masonry from 'react-masonry-component';
import autobind from 'class-autobind';

class Gallery extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        children: AppPropTypes.Children,
    };

    static defaultProps = {
        className: '',
    };

    state = {};

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Gallery');
        autobind(this);
    }

    handleLayoutComplete() {}

    handleRemoveComplete() {}

    handleImagesLoaded(imagesLoadedInstance) {}

    handleClick() {}

    render() {
        const { children, className } = this.props;

        const masonryOptions = {
            transitionDuration: 1,
        };

        return (
            <div className={`gallery ${className}`}>
                <Masonry
                    className={'gallery__body'}
                    elementType={'div'}
                    options={masonryOptions}
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={false}
                    onClick={this.handleClick}
                    onImagesLoaded={this.handleImagesLoaded}
                    onLayoutComplete={laidOutItems =>
                        this.handleLayoutComplete(laidOutItems)
                    }
                    onRemoveComplete={removedItems =>
                        this.handleRemoveComplete(removedItems)
                    }
                >
                    {children}
                </Masonry>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(Gallery);
