import models from '@models';

const path_regexp = new RegExp(/[a-zA-Z]:\\[\w\\\.]*/, 'g');
const root_regexp = new RegExp(/^\/\d+/, 'g');

const isPath = str => !!str.match(path_regexp);

const hasPath = content => {
    if (!content) return false;
    if (!content.id || !content.path) return false;
    if (!isPath(content.path)) return false;
    const pattern = '/' + content.id;
    return (
        content.path.lastIndexOf(pattern) + pattern.length ==
            content.path.length || pattern.length <= content.path.length
    );
};

const setPath = async content => {
    if (!content) return;
    if (!content.id) return;
    if (hasPath(content)) return;

    if (!!content.ParentId) {
        const before = await models.Content.findOne({
            where: {
                id: Number(content.ParentId),
            },
            attributes: ['path'],
        });
        content.path = before.path + '/' + content.id;
        content.isStory = false;
    } else {
        content.path = '/' + content.id;
        content.isStory = true;
    }

    const val = await models.Content.findOne({
        where: {
            id: Number(content.id),
        },
    });

    const result = await val.update({
        path: content.path,
        isStory: content.isStory,
    });
};

const getRootId = path => path.match(root_regexp) && path.match(root_regexp)[0];

const getIds = path =>
    path &&
    path != '' &&
    path
        .split('/')
        .map(val => Number(val))
        .filter(val => val != 0);

module.exports = {
    setPath,
    isPath,
    hasPath,
    getRootId,
    getIds,
};
