'use strict';

String.prototype.cleaning_tag = self => {
    return self.toString().replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
};

String.prototype.hasHtmlTag = self => {
    return !!body.match(/^<html>[\s\S]*<\/html>$/);
};

function shortenLargeNumber(num, digits) {
    var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
        decimal;

    for (var i = units.length - 1; i >= 0; i--) {
        decimal = Math.pow(1000, i + 1);

        if (num <= -decimal || num >= decimal) {
            return +(num / decimal).toFixed(digits) + units[i];
        }
    }

    return num < 1 && num > 0 ? num.toFixed(++digits) : num.toFixed(digits);
}

String.prototype.decimalize = self => {
    if (!parseFloat(self)) return self;
    return shortenLargeNumber(parseFloat(self), 0);
};

module.exports = new String();
