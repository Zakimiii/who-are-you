import { createSitemap } from 'sitemap';
import models from '@models';
import config from '@constants/config';
import data_config from '@constants/data_config';

const generateUserLinks = async () => {
    const users = await models.User.findAll({ attributes: ['username'] });
    return users.map((user, index) => {
        return {
            url: `/user/${user.username}/`,
            changefreq: 'weekly',
            priority: 0.3,
        };
    });
};

const generateHeadingLinks = async () => {
    const headings = await models.Heading.findAll({ attributes: ['id'] });
    return headings.map((heading, index) => {
        return {
            url: `/heading/${heading.id}/`,
            changefreq: 'monthly',
            priority: 0.4,
        };
    });
};

const generateAnswerLinks = async () => {
    const answers = await models.Answer.findAll({ attributes: ['id'] });
    return answers.map((answer, index) => {
        return {
            url: `/answer/${answer.id}/`,
            changefreq: 'monthly',
            priority: 0.4,
        };
    });
};

const defaultLinks = [
    { url: '/', changefreq: 'always', priority: 1.0 },
    { url: '/home/', changefreq: 'weekly', priority: 0.5 },
    { url: `/term/`, changefreq: 'monthly', priority: 0.1 },
    { url: `/privacy/`, changefreq: 'monthly', priority: 0.1 },
];

const generateUrls = async () =>
    Array.prototype.concat.apply(
        [],
        [
            defaultLinks,
            await generateUserLinks(),
            await generateHeadingLinks(),
            await generateAnswerLinks(),
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
