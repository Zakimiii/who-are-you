import GDPRUserList from '@constants/GDPRUserList';
import { routeEntities } from '@infrastructure/RouteInitialize';

export default function resolveRoute(path) {
    return routeEntities.resolveRoute(path);
}
