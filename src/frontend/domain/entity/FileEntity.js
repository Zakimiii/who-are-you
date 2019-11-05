import { ClientError, ApiError } from '@extension/Error';
import Entity from '@entity/Entity';
import { Enum, defineEnum } from '@extension/Enum';
import AWSHandler from '@network/aws';
import TwitterHandler from '@network/twitter';
import file_config from '@constants/file_config';
import data_config from '@constants/data_config';
import Jimp from 'jimp';
import uuidv4 from 'uuid/v4';

const awsHandler = new AWSHandler();

export class FileEntity extends Entity {
    static getExtension = str => {
        return /[.]/.exec(str) ? /[^.]+$/.exec(str) : '';
    };

    static build = h => {
        return new FileEntity(h);
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

    async bcomposite(lenna, bsrc, params = {}) {
        const blenna = await Jimp.read(bsrc);
        const { extension, url, xsize, ysize, type, name } = this;
        blenna
            .resize(params.xsize || xsize, params.ysize || ysize)
            .composite(lenna, 0, 0);
        return blenna;
    }

    async upload(params = {}) {
        const { extension, url, xsize, ysize, type, name } = this;

        switch (true) {
            case file_config.isImage(extension):
                const lenna = await Jimp.read(url);
                let src;
                lenna
                    .resize(params.xsize || xsize, params.ysize || ysize)
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

    async getBuffer(params = {}) {
        const { extension, url, xsize, ysize, type, name } = this;
        switch (true) {
            case file_config.isImage(extension):
                let lenna = await Jimp.read(url);
                //MEMO: this method is very slow in frontend!
                if (!!params.bcomposite_src) {
                    lenna = await this.bcomposite(
                        lenna,
                        params.bcomposite_src,
                        params
                    );
                }
                let src;
                lenna
                    .resize(params.xsize || xsize, params.ysize || ysize)
                    .getBase64(Jimp.AUTO, (e, d) => {
                        src = d;
                    });
                return src;
        }
    }

    async upload_twitter(params = {}) {
        const { extension, url, xsize, ysize, type, name } = this;

        switch (true) {
            case file_config.isImage(extension):
                const lenna = await Jimp.read(url);
                let src;
                lenna
                    .resize(params.xsize || xsize, params.ysize || ysize)
                    .quality(60)
                    .getBase64(Jimp.AUTO, (e, d) => {
                        src = d;
                    });
                const media_id = await TwitterHandler.postMedia({
                    possibly_sensitive: true,
                    media: src,
                });
                return media_id;
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
