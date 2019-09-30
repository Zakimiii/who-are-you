import models from '@network/client_models';

const User = models.User.build({
    id: null,
    username: '匿名さん',
    nickname: '匿名さん',
    detail: 'ログインして紹介テーマを募集しよう！',
    picture_small: '/icons/noimage.svg',
    picture_large: '/icons/noimage.svg',
    locale: 'ja',
    country_code: 'JP',
    timezone: 'Asia/Tokyo',
    verified: false,
    bot: true,
});

module.exports = {
    User,
};
