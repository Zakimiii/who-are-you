import { List } from 'immutable';

List.prototype.unique_by_id = function(array) {
    const results = List([]);
    const map = new Map();
    for (const item of array) {
        if (!map.has(item.id)) {
            map.set(item.id, true);
            results.push(item);
        }
    }
    return results;
};

module.exports = new List();
