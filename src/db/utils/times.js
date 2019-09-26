module.exports = times = x => f => {
    if (x > 0) {
        f();
        times(x - 1)(f);
    }
};
