const path = require('path');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function getCSV(file_name = 'crawlers_data.csv') {
    url = path.join(__dirname, '..', '..', 'python-scripts/util', file_name);
    var txt = new XMLHttpRequest();
    txt.open('get', url, true);
    txt.send(null);

    var arr = txt.responseText.split('\n');
    console.log(arr);
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == '') break;

        res[i] = arr[i].split(',');

        for (var i2 = 0; i2 < res[i].length; i2++) {
            if (res[i][i2].match(/\-?\d+(.\d+)?(e[\+\-]d+)?/)) {
                res[i][i2] = parseFloat(res[i][i2].replace('"', ''));
            }
        }
    }

    return res;
}

module.exports = {
    getCSV,
};
