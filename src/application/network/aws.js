const AWS = require('aws-sdk');
const env = require('@env/env.json');
import { ApiError } from '@extension/Error';

AWS.config.update({
    accessKeyId: env.AWS.ACCESS_KEY_ID,
    secretAccessKey: env.AWS.SECRET_ACCESS_KEY,
    region: env.AWS.REGION,
    signatureVersion: 'v4',
    credentials: new AWS.Credentials(
        env.AWS.ACCESS_KEY_ID,
        env.AWS.SECRET_ACCESS_KEY
    ),
});

const s3 = new AWS.S3({
    accessKeyId: env.AWS.ACCESS_KEY_ID,
    secretAccessKey: env.AWS.SECRET_ACCESS_KEY,
    region: env.AWS.REGION,
    signatureVersion: 'v4',
    credentials: new AWS.Credentials(
        env.AWS.ACCESS_KEY_ID,
        env.AWS.SECRET_ACCESS_KEY
    ),
});

const ec2 = new AWS.EC2({
    accessKeyId: env.AWS.ACCESS_KEY_ID,
    secretAccessKey: env.AWS.SECRET_ACCESS_KEY,
    region: env.AWS.REGION,
    credentials: new AWS.Credentials(
        env.AWS.ACCESS_KEY_ID,
        env.AWS.SECRET_ACCESS_KEY
    ),
});

class AWSHandler {
    static checkUploaded = (before, after) => {
        return false;
    };

    static getPureUrl = url => {
        return url.split(/[?#]/)[0];
    };

    static getUploadedUrl = filename => {
        return `https://s3-${env.AWS.REGION}.amazonaws.com/${env.AWS.BUCKET}/${
            filename
        }`;
    };

    async uploadImage({ image, filename, type }) {
        var s3_params = {
            Bucket: env.AWS.BUCKET,
            Key: filename,
            ContentType: type,
            Body: image,
            ACL: 'public-read',
        };

        return new Promise((resolve, reject) => {
            s3.putObject(s3_params, (err, result) => {
                if (err)
                    throw new ApiError({
                        error: err,
                        tt_key: 'errors.invalid_response_from_server',
                    });
                resolve(AWSHandler.getUploadedUrl(filename));
            });
        });
    }

    async deleteFile(filename) {
        var s3_params = {
            Bucket: env.AWS.BUCKET,
            Key: filename,
        };

        return new Promise((resolve, reject) => {
            s3.deleteObject(s3_params, (err, result) => {
                if (err)
                    throw new ApiError({
                        error: error,
                        tt_key: 'errors.invalid_response_from_server',
                    });
                resolve(result);
            });
        });
    }

    async downloadImage(path) {}
}

module.exports = AWSHandler;
