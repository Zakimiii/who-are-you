const string = require('./String');
const array = require('./Array');
const hash = require('./Hash');
const number = require('./Number');
const date = require('./Date');

//export only prototype extension
module.exports = {
    string,
    array,
    hash,
    number,
    date,
};
