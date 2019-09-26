const { match } = require('react-router');

const runRouter = async (location, routes) => {
    return new Promise(resolve =>
        match({ routes, location }, (...args) => resolve(args))
    );
};

module.exports = runRouter;
