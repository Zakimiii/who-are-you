const safe2json = val => {
    if (!val) return val;
    if (typeof val.toJSON == 'function') return val.toJSON(val);
    return val;
};

module.exports = safe2json;
