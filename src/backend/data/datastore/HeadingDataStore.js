import DataStoreImpl from '@datastore/DataStoreImpl';
import { Set, Map, fromJS, List } from 'immutable';
import models from '@models';
import Promise from 'bluebird';
import data_config from '@constants/data_config';
import { ApiError } from '@extension/Error';

export default class HeadingDataStore extends DataStoreImpl {
    constructor() {
        super();
    }

    async getIncludes(
        datum,
        params = {
            user: true,
            answers: false
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
                    params.answers &&
                        models.Answer.findAll({
                            where: {
                                heading_id: val.id,
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
                if (params.answers) val.Answers = includes[index][1];
                return val;
            })
        );
    }

    async getIndexIncludes(datum) {
        return await this.getIncludes(datum, {
            user: true,
            answers: true,
        });
    }

    async updateCount(value) {
        if (!value) return;
        const heading = await models.Heading.findOne({
            where: {
              id: Number(value.id)
            },
        });
        if (!heading) return;

        const answers = await models.Answer.findAll({
            where: {
              heading_id: Number(heading.id)
            },
        });

        const result = await heading.update({
            answer_count: answers.length,
        });

        return result;
    }

    async create(heading) {
        if (!heading) return;
        const result = await models.Heading.create(heading);
        return result;
    }

    async update(heading) {
        if (!heading) return;

        const data = await models.Heading.findOne({
            where: {
                id: Number(heading.id),
            },
            raw: false,
        });

        const result = await data.update({
            body: heading.body,
        });
        return result;
    }

    async delete(heading) {
        if (!heading) return;

        const result = await models.Heading.destroy({
            where: {
                id: Number(heading.id),
            },
            raw: false,
        });

        return result;
    }

    async trash(heading) {
        if (!heading) return;

        const data = await models.Heading.findOne({
            where: {
                id: Number(heading.id),
            },
            raw: false,
        });

        const result = await data.update({
            isHide: false,
        });
        return result;
    }

    async untrash(heading) {
        if (!heading) return;

        const data = await models.Heading.findOne({
            where: {
                id: Number(heading.id),
            },
            raw: false,
        });

        const result = await data.update({
            isHide: true,
        });
        return result;
    }

}
