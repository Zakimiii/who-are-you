import { bindActionCreators } from 'redux';
import fetch from 'isomorphic-fetch';
import data_config from '@constants/data_config';
import { ApiError } from '@extension/Error';
import file_config from '@constants/file_config';
import Jimp from 'jimp';
import uuidv4 from 'uuid/v4';
import path from 'path';

// let last_call;
const request_base = {
    method: 'post',
    mode: 'no-cors',
    credentials: 'same-origin',
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    },
};

let blenna;

Jimp.read(
    path.join(
        __dirname,
        '..',
        '..',
        '..',
        'assets',
        'images/brands/eye_catch.png'
    )
).then(val => {
    blenna = val;
});

export default class DataStoreImpl {
    resolveAssetsPath(...rest) {
        return path.join(__dirname, '..', '..', '..', 'assets', ...rest);
    }

    constructor() {}

    async bcomposite_from_base64({
        base64,
        bsrc = this.resolveAssetsPath('images/brands/eye_catch.png'),
        params = {},
    }) {
        if (!base64) return;
        const lennas = await Promise.all([
            Jimp.read(blenna) ||
                Jimp.read(
                    this.resolveAssetsPath('images/brands/eye_catch.png')
                ),
            Jimp.read(
                Buffer.from(
                    base64.replace(/^data:image\/png;base64,/, ''),
                    'base64'
                )
            ),
        ]);

        let src;
        lennas[0]
            .resize(
                params.xsize || data_config.shot_picture_xsize,
                params.ysize || data_config.shot_picture_ysize
            )
            .composite(lennas[1], 0, 0)
            .getBase64(Jimp.AUTO, (e, d) => {
                src = d;
            });

        return src;
    }

    async apiCall(path, payload, reqType = 'POST') {
        const reqObjs = {
            POST: {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            },
            PUT: {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            GET: {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            },
        };
        const response = await fetch(path, reqObjs[reqType]);
        const contentType = response.headers.get('content-type');
        if (!contentType || contentType.indexOf('application/json') === -1) {
            throw new ApiError({
                erorr: new Error('Invalid response from server'),
                tt_key: 'errors.invalid_response_from_server',
            });
        }
        const responseData = await response.json();
        if (responseData.error) {
            const error = new ApiError({
                erorr: new Error('Invalid response from server'),
                tt_key: 'errors.invalid_response_from_server',
                ...responseData.error,
            });
            throw error;
        }
        return responseData;
    }
}
