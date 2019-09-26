import PropTypes from 'prop-types';
import React from 'react';

export const CloseButton = ({ className, ...restProps }) => {
    return (
        <button
            {...restProps}
            className={'close-button ' + className}
            type="button"
        >
            &times;
        </button>
    );
};

CloseButton.propTypes = {
    className: PropTypes.string,
};

export default CloseButton;
