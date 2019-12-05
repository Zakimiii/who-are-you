'use strict';

const Decimal = require('decimal.js');

Array.prototype.sum = self => {
    if (self.length == 0) return 0;
    return self.reduce((p, c) => p + c);
};

Array.prototype.sumDecimal = self => {
    if (self.length == 0) return new Decimal(0);
    return self.reduce((p, c) => p.plus(c));
};

Array.prototype.notBotLabels = self => {
    if (self.length == 0) return [];
    return self.filter(val => !val.bot).map(val => val.Label);
};

Array.prototype.flatten = function() {
    return Array.prototype.concat.apply([], this);
};

Array.prototype.randomSelect = function(array, num) {
    let newArray = [];
    while (newArray.length < num && array.length > 0) {
        const rand = Math.floor(Math.random() * array.length);
        newArray.push(array[rand]);
        array.splice(rand, 1);
    }
    return newArray;
};

Array.prototype.unique_by_id = function(array) {
    const results = [];
    const map = new Map();
    for (const item of array) {
        if (!map.has(item.id)) {
            map.set(item.id, true);
            results.push(item);
        }
    }
    return results;
};

module.exports = new Array();
