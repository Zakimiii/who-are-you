Date.prototype.getLeftDaysFromDate = today => {
    // var month = today.getMonth() + 1;
    var oomisoka = today.getFullYear() + '/12/31';
    var leftDays =
        Math.floor(
            (Date.parse(oomisoka) - today.getTime()) / (24 * 60 * 60 * 1000)
        ) + 1;
    return leftDays;
};

Date.prototype.getLeftDays = () => {
    var today = new Date();
    // var month = today.getMonth() + 1;
    var oomisoka = today.getFullYear() + '/12/31';
    var leftDays =
        Math.floor(
            (Date.parse(oomisoka) - today.getTime()) / (24 * 60 * 60 * 1000)
        ) + 1;
    return leftDays;
};

Date.prototype.isOneDayAgo = date => {
    const today = new Date();
    return today - date > 24 * 60 * 60 * 1000;
};

Date.prototype.getOneDayAgo = (now = new Date()) => {
    var yesterday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1
    );
    return yesterday;
};

Date.prototype.separate = (now = new Date()) => {
    return {
        yy: now.getFullYear(),
        mm: now.getMonth(),
        dd: now.getDate(),
    };
};

Date.prototype.isDayAgo = (date, i) => {
    if (!i) return false;
    if (i <= 0) return false;
    const today = new Date();
    return today - date > 24 * 60 * 60 * 1000 * i;
};

Date.prototype.getLeftDaysOfTheYear = () => {
    var today = new Date();
    today.setDate(1);
    today.setMonth(0);
    today.setDate(0);
    // var month = today.getMonth() + 1;
    var oomisoka = today.getFullYear() + '/12/31';
    var leftDays =
        Math.floor(
            (Date.parse(oomisoka) - today.getTime()) / (24 * 60 * 60 * 1000)
        ) + 1;
    return leftDays;
};

Date.prototype.getLeftDaysRateOfTheYear = () => {
    const leftDays = new Date().getLeftDays();
    const leftDaysOfTheYear = new Date().getLeftDaysOfTheYear();
    return leftDays / leftDaysOfTheYear;
};

Date.prototype.getHoursAgo = hour => {
    const now = Date.now();
    return new Date(now + hour * 60 * 60 * 1000);
};

module.exports = new Date();
