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

module.exports = new Array();
