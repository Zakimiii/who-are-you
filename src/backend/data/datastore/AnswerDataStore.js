import DataStoreImpl from '@datastore/DataStoreImpl';
import { Set, Map, fromJS, List } from 'immutable';
import models from '@models';
import Promise from 'bluebird';
import data_config from '@constants/data_config';
import { ApiError } from '@extension/Error';

export default class AnswerDataStore extends DataStoreImpl {
    constructor() {
        super();
    }

    async getIncludes(
        datum,
        params = {
            user: true,
            heading: true,
            siblings: false
        },
    ) {
        if (!datum) return;
        if (!(datum instanceof Array)) {
            datum = [datum];
        }
        let contents = datum.filter(data => !!data);

        const includes = await Promise.map(
            contents,
            val => {
                return Promise.all([
                    params.user &&
                        models.User.findOne({
                            where: {
                                id: val.UserId,
                            },
                            raw: true,
                        }),
                    params.heading &&
                        models.Heading.findOne({
                            where: {
                                id: val.HeadingId,
                            },
                            raw: true,
                        }),
                    params.siblings &&
                        models.Answer.findAll({
                            where: {
                                heading_id: val.HeadingId,
                            },
                            raw: true,
                        }),
                ]);
            },
            { concurrency: data_config.concurrency_size('M') }
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        return await Promise.all(
            contents.map(async (val, index) => {
                if (params.user) val.User = includes[index][0];
                if (params.heading) val.Heading = includes[index][1];
                if (params.siblings) val.Sibilings = includes[index][2];
                return val;
            })
        );
    }

    async getIndexIncludes(datum) {
        return await this.getIncludes(datum, {
            user: true,
            heading: false,
            siblings: false,
        });
    }

    async create(answer) {
        if (!answer) return;
        const result = await models.Answer.create(answer);
        return result;
    }

    async update(answer) {
        if (!answer) return;

        const data = await models.Answer.findOne({
            where: {
                id: Number(answer.id),
            },
            raw: false,
        });

        const result = await data.update({
            body: answer.body,
        });
        return result;
    }

    async delete(answer) {
        if (!answer) return;

        const result = await models.Answer.destroy({
            where: {
                id: Number(answer.id),
            },
            raw: false,
        });

        return result;
    }

    async trash(answer) {
        if (!answer) return;

        const data = await models.Answer.findOne({
            where: {
                id: Number(answer.id),
            },
            raw: false,
        });

        const result = await data.update({
            isHide: false,
        });
        return result;
    }

    async untrash(answer) {
        if (!answer) return;

        const data = await models.Answer.findOne({
            where: {
                id: Number(answer.id),
            },
            raw: false,
        });

        const result = await data.update({
            isHide: true,
        });
        return result;
    }
}
