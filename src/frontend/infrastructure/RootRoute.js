import App from '@components/App';
import HomeIndex from '@pages/HomeIndex';
import resolveRoute from '@infrastructure/ResolveRoute';
import { RouteEntity, RouteEntities } from '@entity';
import { routeEntities } from '@infrastructure/RouteInitialize';

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default {
    path: routeEntities.routePath,
    component: App,
    getChildRoutes(nextState, cb) {
        routeEntities.getChildRoutes(nextState, cb);
    },
    indexRoute: routeEntities.indexRoute,
};
