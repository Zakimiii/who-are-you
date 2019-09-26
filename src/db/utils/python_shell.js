const { PythonShell } = require('python-shell');
const env = require('./env.json');

function pythonMethodsPath(method) {
    return `${env.NODE_PATH}/python-scripts/`;
}

const PYTHON_METHODS = [
    'run_google_emperor',
    'get_text_from_corpus',
    'seed_label_create',
    'text_vectorize',
];

const options = (method, args = []) => {
    return {
        mode: 'text',
        pythonPath: env.PYTHON_PATH,
        pythonOptions: ['-u'],
        scriptPath: pythonMethodsPath(method),
        args: args,
    };
};

const runPython = (method, args = []) => {
    var pyshell = new PythonShell(`${method}.py`, options(method, args));
    pyshell.send(args);

    return new Promise((resolve, reject) => {
        pyshell.on('message', message => {
            resolve(JSON.parse(message));
            return;
        });

        pyshell.end((err, code, signal) => {
            return;
        });
    });
};

module.exports = {
    PYTHON_METHODS,
    options,
    runPython,
};
