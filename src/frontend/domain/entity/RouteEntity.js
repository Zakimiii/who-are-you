import Entity from '@entity/Entity';
import { Enum, defineEnum } from '@extension/Enum';
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';

export class RouteEntity extends Entity {
    constructor({ path, page, component, notfound, validate, redirects }) {
        super();
        this.path = path;
        this.page = page;
        this.validate = validate;
        this.component = component;
        this.regexp = new pathToRegexp(path);
        this.toPath = pathToRegexp.compile(path);
        this.splits = path.split('/');
        this.notfound = notfound || false;
        this.params_splits = this.splits
            .filter(val => val.includes(RouteEntity.escape_params))
            .map(val => val.replace(RouteEntity.escape_params, ''))
            .map(val => val.replace(RouteEntity.escape_optional, ''));
        this.redirects = redirects || [[]];
    }

    static escape_params = ':';
    static escape_optional = '?';

    getPath(
        arg = {
            params: null,
            query: null,
        }
    ) {
        return !!arg.params
            ? this.appendQuery(
                  this.toPath(this.hashToString(arg.params)),
                  arg.query
              )
            : this.appendQuery(this.path, arg.query);
    }

    hashToString(hash) {
        if (!hash) return hash;
        Object.keys(hash).map(key => {
            hash[key] = `${hash[key]}`;
        });
        return hash;
    }

    appendQuery(cp, queryhash) {
        return !!queryhash
            ? cp +
                  RouteEntity.escape_optional +
                  querystring.stringify(queryhash)
            : cp;
    }

    // set currnet_path(current_path) {
    //     this._current_path = this.isValidPath(current_path) ? current_path : '';
    // }

    // get currnet_path() {
    //     return this._current_path;
    // }

    isValidPath(path) {
        return !!this.regexp.exec(path) && this.map_params_validate(path);
    }

    isValidPathWithParams(path, params) {
        if (!path) return false;
        if (!this.isValidPath(path)) return false;
        if (!params) return this.isValidPath(path);
        const valids = Object.keys(params).map(
            key => `${params[key]}` == this.params_value(`${key}`, path)
        );
        return this.isValidPath(path) && !(false in valids);
    }

    map_params_validate(cp) {
        if (!this.validate) return true;
        const results = Object.keys(this.validate).map(key => {
            return this.params_validate(key, cp);
        });
        return !(false in results);
    }

    params_value(string, cp) {
        if (!string) return;
        string = string.replace(RouteEntity.escape_params, '');
        return this.regexp.exec(cp)[this.params_splits.indexOf(string) + 1];
    }

    params_validate(string, cp) {
        if (!this.validate) return true;
        const params = this.params_value(string, cp);
        //MEMO: this condition is for optional params
        if (!params && !!this.regexp.exec(cp)) return true;
        const validate_pattern = this.validate[string];
        //MEMO: this condition is for optional validate
        if (validate_pattern) return true;
        return !!params.match(validate_pattern);
    }
}

export class RouteEntities extends Entity {
    constructor({ items, notfoundRoute }) {
        super();
        this.items = items || [];
        this.notfoundRoute = notfoundRoute;
        // this.current_path = current_path || '/';
    }

    getChildRoutes(nextState, cb) {
        const route = this.resolveRoute(nextState.location.pathname);
        const item = this.items.filter(val => val.page == route.page)[0];
        return item
            ? cb(null, [item.component])
            : cb(null, [this.notfoundRoute.component]);
    }

    resolveRoute(path) {
        const item = this.items.filter(val => val.isValidPath(path))[0];
        return item ? item : this.notfoundRoute;
    }

    params_value(string, cp) {
        if (!string) return;
        return this.resolveRoute(cp).params_value(string, cp);
    }

    get routePath() {
        return '/';
    }

    get indexRoute() {
        return {
            component: this.items.filter(val => val.path == this.routePath)[0]
                .component.component,
        };
    }

    get redirects() {
        return Array.prototype.concat.apply(
            [],
            this.items
                .filter(item => item.redirects[0].length != 0)
                .map(item => item.redirects)
        );
    }
}
