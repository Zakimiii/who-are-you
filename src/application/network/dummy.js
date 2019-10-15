import models from '@network/client_models';
import data_config from '@constants/data_config';

const User = models.User.build({
    id: null,
    username: '匿名さん',
    nickname: '匿名さん',
    detail: 'ログインして紹介テーマを募集しよう！',
    picture_small: data_config.default_user_image,
    picture_large: data_config.default_user_image,
    locale: 'ja',
    country_code: 'JP',
    timezone: 'Asia/Tokyo',
    verified: false,
    bot: true,
});

module.exports = {
    User,
};
