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
            priority: 0.4,
        };
    });
};

const generateHeadingLinks = async () => {
    const headings = await models.Heading.findAll({
        where: {
            isHide: false,
        },
        attributes: ['id']
    });
    return headings.map((heading, index) => {
        return {
            url: `/heading/${heading.id}/`,
            changefreq: 'monthly',
            priority: 0.3,
        };
    });
};

const generateAnswerLinks = async () => {
    const answers = await models.Answer.findAll({
        where: {
            isHide: false,
        },
        attributes: ['id']
    });
    return answers.map((answer, index) => {
        return {
            url: `/answer/${answer.id}/`,
            changefreq: 'monthly',
            priority: 0.3,
        };
    });
};

const generateCommunityLinks = async () => {
    const communities = await models.Community.findAll({ attributes: ['id'] });
    return communities.map((community, index) => {
        return {
            url: `/community/${community.id}/`,
            changefreq: 'weekly',
            priority: 0.4,
        };
    });
};

const generateCommunityHeadingLinks = async () => {
    const headings = await models.CommunityHeading.findAll({
        where: {
            isHide: false,
        },
        attributes: ['id']
    });
    return headings.map((heading, index) => {
        return {
            url: `/communities/heading/${heading.id}/`,
            changefreq: 'monthly',
            priority: 0.3,
        };
    });
};

const generateCommunityAnswerLinks = async () => {
    const answers = await models.CommunityAnswer.findAll({
        where: {
            isHide: false,
        },
        attributes: ['id']
    });
    return answers.map((answer, index) => {
        return {
            url: `/communities/answer/${answer.id}/`,
            changefreq: 'monthly',
            priority: 0.3,
        };
    });
};

const generateCategoryLinks = async () => {
    const categories = await models.Category.findAll({ attributes: ['id'] });
    return categories.map((category, index) => {
        return {
            url: `/category/${category.id}/`,
            changefreq: 'weekly',
            priority: 0.4,
        };
    });
};

const defaultLinks = [
    { url: '/', changefreq: 'always', priority: 1.0 },
    { url: '/home/', changefreq: 'weekly', priority: 0.5 },
    { url: '/categories', changefreq: 'always', priority: 1.0 },
    { url: '/communities', changefreq: 'always', priority: 1.0 },
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
            await generateCommunityLinks(),
            await generateCommunityHeadingLinks(),
            await generateCommunityAnswerLinks(),
            await generateCategoryLinks(),
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
