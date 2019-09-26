// const PyShell = require('./utils/python_shell');
// const times = require('./utils/times');
// const labels = require('../test_data/label');
// const labelings = require('../test_data/labeling');

// class SeedLabel {
//     constructor(contents) {
//         this.contents = contents;
//         this.titles_cache = []
//     }

//     concat_titles(result) {
//         let titles = [];
//         Object.keys(Object.values(result)).forEach(key => {
//             titles.push(key);
//             if (Object.values(result)[key].length > 0)
//                 titles = titles.concat(Object.values(result)[key]);
//         }, Object.values(result));
//         return titles;
//     };

//     get_titles_from_corpus(contents) {
//         return new Promise((resolve, reject) => {
//             PyShell.runPython(PyShell.PYTHON_METHODS[2], [
//                 JSON.stringify({
//                     contents: contents,
//                 }),
//             ])
//             .then(results => {
//                 const contents = results.map(result => {
//                     return { content };
//                 });
//                 resolve({
//                     contents: 's',
//                 });
//                 return;
//             })
//             .catch(err => {
//                 console.log(err);
//                 throw new Error(err);
//                 reject(err);
//             });
//         });
//     };
// }
