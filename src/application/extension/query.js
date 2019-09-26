export const generateLikeQuery = keyword => {
    const split_keyword = String(keyword).split('');
    return split_keyword
        .map((val, index) => {
            return `%${split_keyword.slice(0, index + 1).join('')}%`;
        })
        .reverse();
};

export const generateOrQuery = (key, vals) => {
    return vals.map(val => {
        let hash = {};
        hash[key] = val;
        return hash;
    });
};

export const generateOrQueries = key_vals_hashs => {
    const queries = key_vals_hashs
        .filter(val => !!val)
        .filter(val => !!val.key && !!val.values)
        .map(val => generateOrQuery(val.key, val.values));
    return Array.prototype.concat.apply([], queries);
};
