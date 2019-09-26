var PropTypes = require('prop-types');

const Children = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
]);

module.exports = {
    Children,
};
