function shortenLargeNumber(num, digits) {
    var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
        decimal;

    for (var i = units.length - 1; i >= 0; i--) {
        decimal = Math.pow(1000, i + 1);

        if (num <= -decimal || num >= decimal) {
            return +(num / decimal).toFixed(digits) + units[i];
        }
    }

    return num;
}

Number.prototype.decimalize = self => {
    if (!self instanceof Number) return self;
    return shortenLargeNumber(self, 1);
};

Number.prototype.castBool = self => {
    return self == 1 || self == true;
};

module.exports = 0;
