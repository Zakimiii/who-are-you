'use strict';
import tt from 'counterpart';
import safe2json from '@extension/safe2json';

Error.prototype.toJSON = self => {
    var alt = {};

    Object.getOwnPropertyNames(self).forEach(function(key) {
        alt[key] = self[key];
    }, self);

    return alt;
};

export class ExtensibleCustomError extends Error {
    constructor(message, ...args) {
        let errorToWrap;

        if (message instanceof Error) {
            errorToWrap = message;
        } else if (args[0] instanceof Error) {
            errorToWrap = args[0];
            args.shift();
        }

        super(message, ...args);

        // Align with Object.getOwnPropertyDescriptor(Error.prototype, 'name')
        Object.defineProperty(this, 'name', {
            configurable: true,
            enumerable: false,
            value: this.constructor.name,
            writable: true,
        });

        // Helper function to merge stack traces
        const mergeStackTrace = (stackTraceToMerge, baseStackTrace) => {
            if (!baseStackTrace) {
                return stackTraceToMerge;
            }

            const entriesToMerge = stackTraceToMerge.split('\n');
            const baseEntries = baseStackTrace.split('\n');

            const newEntries = [];

            entriesToMerge.forEach(entry => {
                if (baseEntries.includes(entry)) {
                    return;
                }

                newEntries.push(entry);
            });

            return [...newEntries, ...baseEntries].join('\n');
        };

        const stackTraceSoFar = errorToWrap ? errorToWrap.stack : undefined;

        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);
            this.stack = mergeStackTrace(this.stack, stackTraceSoFar);
            return;
        }

        // This class is supposed to be extended, so the first two lines from
        // the second line are about error object constructors.
        const stackTraceEntries = new Error(message).stack.split('\n');
        const stackTraceWithoutConstructors = [
            stackTraceEntries[0],
            ...stackTraceEntries.slice(3),
        ].join('\n');

        this.stack = mergeStackTrace(
            stackTraceWithoutConstructors,
            stackTraceSoFar
        );
    }

    toJSON(args) {
        var alt = {
            ...this,
        };

        Object.getOwnPropertyNames(this).forEach(function(key) {
            alt[key] = this[key];
        }, this);

        return alt;
    }
}

export class ClientError extends ExtensibleCustomError {
    constructor({ error, tt_key, tt_params, override, tt_nested, key }) {
        if (!!error.message) {
            error.message = error.message.replace('Error: ', '');
        }
        super(error, ...error);
        this.tt_key = !override && error.tt_key ? error.tt_key : tt_key;
        this.tt_params =
            !override && error.tt_params ? error.tt_params : tt_params;
        this.tt_nested = tt_nested || true;
        this.key = key || ClientError.globalKey;

        Object.defineProperty(this, 'translate', {
            configurable: true,
            enumerable: false,
            value: () => {
                const { tt_key, tt_params } = this;
                if (!!tt_key && tt_key != '' && !!tt_params) {
                    try {
                        Object.keys(tt_params).map(key => {
                            const val = tt_params[key];
                            tt_params[key] = val.includes('g.') ? tt(val) : val;
                        });
                        return tt(tt_key, tt_params);
                    } catch (e) {
                        return tt(tt_key, this.tt_params);
                    }
                } else if (!!tt_key && tt_key != '') {
                    try {
                        return tt(tt_key);
                    } catch (e) {
                        return '';
                    }
                } else {
                    return '';
                }
            },
            writable: true,
        });
    }

    toJSON() {
        var alt = {
            ...this,
        };

        Object.getOwnPropertyNames(this).forEach(function(key) {
            alt[key] = this[key];
        }, this);

        return alt;
    }

    static globalKey = 'global';
}

export class ApiError extends ExtensibleCustomError {
    constructor({ error, tt_key, tt_params, override, tt_nested, key }) {
        if (!!error.message) {
            error.message = error.message.replace('Error: ', '');
        }
        super(error, ...error);
        this.error = safe2json(error);
        this.tt_key = !override && error.tt_key ? error.tt_key : tt_key;
        this.tt_params =
            !override && error.tt_params ? error.tt_params : tt_params;
        this.tt_nested = tt_nested || true;
        this.key = key || ApiError.globalKey;

        Object.defineProperty(this, 'translate', {
            configurable: true,
            enumerable: false,
            value: () => {
                const { tt_key, tt_params } = this;
                if (!!tt_key && tt_key != '' && !!tt_params) {
                    try {
                        Object.keys(tt_params).map(key => {
                            const val = tt_params[key];
                            tt_params[key] = val.includes('g.') ? tt(val) : val;
                        });
                        return tt(tt_key, tt_params);
                    } catch (e) {
                        return tt(tt_key, this.tt_params);
                    }
                } else if (!!tt_key && tt_key != '') {
                    try {
                        return tt(tt_key);
                    } catch (e) {
                        return '';
                    }
                } else {
                    return '';
                }
            },
            writable: true,
        });
    }

    toJSON(args) {
        var alt = {
            ...this,
        };

        Object.getOwnPropertyNames(this).forEach(function(key) {
            alt[key] = this[key];
        }, this);

        return alt;
    }

    static globalKey = 'global';
}

export async function handleApiError(router, ctx, next, error) {
    // ctx.status = err.status || 500;
    // ctx.body = err.message;
    // ctx.app.emit('error', err, ctx);
    console.log(error);
    router.body = {
        success: true,
        error: safe2json(error),
    };
}
