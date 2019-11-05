var PropTypes = require('prop-types');

const Children = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
]);

const User = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    nickname: PropTypes.string,
    detail: PropTypes.string,
    picture_small: PropTypes.string,
    picture_large: PropTypes.string,
});

const Heading = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    body: PropTypes.string,
});

const Answer = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    body: PropTypes.string,
});

const Template = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    body: PropTypes.string,
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

module.exports = {
    Children,
    User,
    Heading,
    Answer,
    Template,
};
