import { createSitemap } from 'sitemap';
import models from '@models';
import config from '@constants/config';
import data_config from '@constants/data_config';

const generateUserLinks = async () => {
    const users = await models.User.findAll({ attributes: ['id'] });
    return users.map((user, index) => {
        return {
            url: `/user/${user.id}/`,
            changefreq: 'weekly',
            priority: 0.3,
        };
    });
};

const generateContentLinks = async () => {
    const contents = await models.Content.findAll({ attributes: ['id'] });
    return contents.map((content, index) => {
        return {
            url: `/content/${content.id}/`,
            changefreq: 'daily',
            priority: 0.4,
        };
    });
};

const generateRequestLinks = async () => {
    const requests = await models.Request.findAll({
        where: { isAnswered: false },
        attributes: ['id'],
    });
    return requests.map((request, index) => {
        return {
            url: `/request/${request.id}/`,
            changefreq: 'monthly',
            priority: 0.3,
        };
    });
};

const generateLabelLinks = async () => {
    const labels = await models.Label.findAll({ attributes: ['id'] });
    return labels.map((label, index) => {
        return {
            url: `/label/${label.id}/`,
            changefreq: 'monthly',
            priority: 0.2,
        };
    });
};

const generateTrendLinks = async () => {
    const ids = [...Array(data_config.trend_limit).keys()];
    return ids.map((id, index) => {
        return {
            url: `/trends/${id + 1}/`,
            changefreq: 'always',
            priority: 0.3,
        };
    });
};

const defaultLinks = [
    { url: '/', changefreq: 'always', priority: 1.0 },
    { url: '/welcome/', changefreq: 'weekly', priority: 0.5 },
    { url: `/trends/`, changefreq: 'always', priority: 0.3 },
    { url: `/feeds/`, changefreq: 'always', priority: 0.2 },
    { url: `/feeds/disscussions/`, changefreq: 'always', priority: 0.2 },
    { url: `/feeds/newests/`, changefreq: 'always', priority: 0.2 },
    { url: `/pickup/contents/`, changefreq: 'daily', priority: 0.3 },
    { url: `/pickup/opinions/`, changefreq: 'daily', priority: 0.3 },
    { url: `/term/`, changefreq: 'monthly', priority: 0.1 },
    { url: `/privacy/`, changefreq: 'monthly', priority: 0.1 },
];

const generateUrls = async () =>
    Array.prototype.concat.apply(
        [],
        [
            defaultLinks,
            await generateContentLinks(),
            await generateUserLinks(),
            await generateRequestLinks(),
            await generateLabelLinks(),
            await generateTrendLinks(),
        ]
    );

module.exports = async () => {
    const urls = await generateUrls();
    return createSitemap({
        hostname: config.APP_URL,
        // cacheTime: 600000,
        urls,
    });
};
