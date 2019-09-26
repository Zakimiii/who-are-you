import { fromJS, Set, List } from 'immutable';
import { call, put, select, fork, takeLatest } from 'redux-saga/effects';

export default class UseCaseImpl {
    constructor() {}

    *removeHighSecurityKeys({ payload: { pathname } }) {
        const highSecurityPage =
            highSecurityPages.find(p => p.test(pathname)) != null;
        // Let the user keep the active key when going from one high security page to another.  This helps when
        // the user logins into the Wallet then the Permissions tab appears (it was hidden).  This keeps them
        // from getting logged out when they click on Permissions (which is really bad because that tab
        // disappears again).
        if (!highSecurityPage) yield put(userActions.removeHighSecurityKeys());
    }

    *uploadImage({
        payload: { file, dataUrl, filename = 'image.txt', progress },
    }) {
        const _progress = progress;
        progress = msg => {
            // console.log('Upload image progress', msg)
            _progress(msg);
        };

        const stateUser = yield select(state => state.user);
        const username = stateUser.getIn(['current', 'username']);
        const d = stateUser.getIn([
            'current',
            'private_keys',
            'posting_private',
        ]);
        if (!username) {
            progress({ error: 'Please login first.' });
            return;
        }
        if (!d) {
            progress({ error: 'Login with your posting key' });
            return;
        }

        if (!file && !dataUrl) {
            console.error('uploadImage required: file or dataUrl');
            return;
        }

        let data, dataBs64;
        if (file) {
            // drag and drop
            const reader = new FileReader();
            data = yield new Promise(resolve => {
                reader.addEventListener('load', () => {
                    const result = new Buffer(reader.result, 'binary');
                    resolve(result);
                });
                reader.readAsBinaryString(file);
            });
        } else {
            // recover from preview
            const commaIdx = dataUrl.indexOf(',');
            dataBs64 = dataUrl.substring(commaIdx + 1);
            data = new Buffer(dataBs64, 'base64');
        }

        // The challenge needs to be prefixed with a constant (both on the server and checked on the client) to make sure the server can't easily make the client sign a transaction doing something else.
        const prefix = new Buffer('ImageSigningChallenge');
        const bufSha = hash.sha256(Buffer.concat([prefix, data]));

        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        } else {
            // formData.append('file', file, filename) <- Failed to add filename=xxx to Content-Disposition
            // Can't easily make this look like a file so this relies on the server supporting: filename and filebinary
            formData.append('filename', filename);
            formData.append('filebase64', dataBs64);
        }

        const sig = Signature.signBufferSha256(bufSha, d);
        //TODO: post url
        const postUrl = `upload_image${username}/${sig.toHex()}`;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', postUrl);
        xhr.onload = function() {
            console.log(xhr.status, xhr.responseText);
            const res = JSON.parse(xhr.responseText);
            const { error } = res;
            if (error) {
                progress({ error: 'Error: ' + error });
                return;
            }
            const { url } = res;
            progress({ url });
        };
        xhr.onerror = function(error) {
            console.error(filename, error);
            progress({ error: 'Unable to contact the server.' });
        };
        xhr.upload.onprogress = function(event) {
            if (event.lengthComputable) {
                const percent = Math.round(event.loaded / event.total * 100);
                progress({ message: `Uploading ${percent}%` });
                // console.log('Upload', percent)
            }
        };
        xhr.send(formData);
    }
}
