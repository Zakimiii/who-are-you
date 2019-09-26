export class Enum {
    _enums;
    _lookups;

    constructor() {
        this._enums = [];
        this._lookups = {};
    }

    getEnums() {
        return this._enums;
    }

    forEach(callback) {
        var length = this._enums.length;
        for (var i = 0; i < length; ++i) {
            callback(this._enums[i]);
        }
    }

    addEnum(e) {
        this._enums.push(e);
    }

    insertEnum(e, i) {
        this._enums.splice(i, 0, e);
    }

    insertBeforeOtherEnum(e, field, value, params = { unique: true }) {
        const i = this._enums.indexOf(this.getByValue(field, value));
        if (i == -1) return;
        if (params.unique) {
            if (this._enums.indexOf(e) != -1) {
                return;
            }
        }
        this.insertEnum(e, i);
    }

    removeEnum(i) {
        this._enums.splice(i, 1);
    }

    removeByValueEnum(field, value) {
        const i = this._enums.indexOf(this.getByValue(field, value));
        if (i == -1) return;
        this._enums.splice(i, 1);
    }

    getByName(name) {
        return this[name];
    }

    getByValue(field, value) {
        var lookup = this._lookups[field];
        if (lookup) {
            return lookup[value];
        } else {
            this._lookups[field] = lookup = {};
            var k = this._enums.length - 1;
            for (; k >= 0; --k) {
                var m = this._enums[k];
                var j = m[field];
                lookup[j] = m;
                if (j == value) {
                    return m;
                }
            }
        }
        return null;
    }
}

export function defineEnum(definition) {
    var k;
    var e = new Enum();
    for (k in definition) {
        var j = definition[k];
        e[k] = j;
        e.addEnum(j);
    }
    return e;
}
