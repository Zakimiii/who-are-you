import { ClientError, ApiError } from '@extension/Error';
import Entity from '@entity/Entity';
import { Enum, defineEnum } from '@extension/Enum';

export class ValidationEntity extends Entity {
    constructor({ validate, error }) {
        super();
        this.validate = validate;
        this.error = error;
    }

    async isValid(arg) {
        let result;
        try {
            result = await this.validate(arg);
        } catch (e) {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        }
        if (!!result) {
            return true;
        } else {
            throw this.error(arg);
        }
    }

    getErrorKey() {
        return !!this.error ? this.error.key : ApiError.globalKey;
    }
}

export class ValidationEntities extends Entity {
    constructor({ items }) {
        super();
        this.items = items;
    }

    async isValid(arg) {
        const { items } = this;
        const results = await Promise.all(
            items.map(async item => await item.isValid(arg))
        );
        return results.length == items.length;
    }

    async isValidMap(args) {
        const { items } = this;
        const results = await Promise.all(
            items.map(async (item, i) => await item.isValid(args[i]))
        );
        return results.length == items.length;
    }
}
