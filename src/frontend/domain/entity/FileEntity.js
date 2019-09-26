import { ClientError, ApiError } from '@extension/Error';
import Entity from '@entity/Entity';
import { Enum, defineEnum } from '@extension/Enum';
import AWSHandler from '@network/aws';
import file_config from '@constants/file_config';
import data_config from '@constants/data_config';
const Jimp = require('jimp');
const uuidv4 = require('uuid/v4');
const awsHandler = new AWSHandler();

export class FileEntity extends Entity {
    static getExtension = str => {
        return /[.]/.exec(str) ? /[^.]+$/.exec(str) : '';
    };
    constructor({
        uid,
        file,
        type,
        name,
        extension,
        fullname,
        url,
        xsize,
        ysize,
    }) {
        super();
        this.uid =
            uid ||
            uuidv4()
                .slice(data_config.uuid_size('S'))
                .replace('-', '');
        if (!file /* && file instanceof FileList*/) {
            this.name = name || '';
            this.type = type || '';
            this.url = url || '';
            this.extension = extension || FileEntity.getExtension(this.name);
            this.fullname =
                fullname ||
                this.uid + this.name.replace('.' + this.extension, '');
        }
        this.file = file;
        this.xsize = xsize;
        this.ysize = ysize;
    }

    set file(_file) {
        this._file = _file;
        if (!_file) return;
        this.type = this.file.type;
        this.name = this.uid + this.file.name;
        this.url = URL.createObjectURL(this.file);
        this.extension = FileEntity.getExtension(this.name)[0];
        this.fullname = this.name.replace('.' + this.extension, '');
    }

    get file() {
        return this._file;
    }

    static build_from_url = url => {
        return new FileEntity({
            url,
        });
    };

    async upload(params = {}) {
        const { extension, url, xsize, ysize, type, name } = this;

        switch (true) {
            case file_config.isImage(extension):
                const lenna = await Jimp.read(url);
                let src;
                lenna
                    .resize(params.xsize || xsize, params.ysize || ysize)
                    .quality(60)
                    .getBuffer(Jimp.AUTO, (e, d) => {
                        src = d;
                    });
                const s3url = await awsHandler.uploadImage({
                    image: src,
                    type,
                    filename: name,
                });
                this.url = s3url;
                this.file = null;
                URL.revokeObjectURL(url);
                break;
        }
    }

    toJSON() {
        return {
            ...this,
        };
    }
}

export class FileEntities extends Entity {
    constructor({ items }) {
        super();
        this.items = items;
    }

    static build_from_urls = urls => {
        return new FileEntities({
            items: urls.map(url => new FileEntity.build_from_url(url)),
        });
    };

    static build = h => {
        return new FileEntities({
            items: h && h.items.map(item => new FileEntity(item)),
        });
    };

    toJSON() {
        return {
            items: this.items.map(val => val.toJSON()),
        };
    }

    async upload({ xsize, ysize }) {
        await Promise.all(this.items.map(val => val.upload({ xsize, ysize })));
    }
}
