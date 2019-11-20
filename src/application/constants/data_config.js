import config from '@constants/config';

const fetch_data_limit = size => {
    switch (size) {
        case 'S':
            return 10;
        case 'M':
            return 50;
        case 'L':
            return 100;
        case 'XL':
            return 500;
    }
};

const fetch_data_raw_limit = size => {
    switch (size) {
        case 'S':
            return 3;
        case 'M':
            return 6;
        case 'L':
            return 9;
        case 'XL':
            return 12;
    }
};

const fetch_data_offset = size => {
    switch (size) {
        case 'S':
            return 10;
        case 'M':
            return 50;
        case 'L':
            return 100;
    }
};

const concurrency_size = size => {
    switch (size) {
        case 'S':
            return 6;
        case 'M':
            return 10;
        case 'L':
            return 12;
        case 'XL':
            return 20;
    }
};

const uuid_size = size => {
    switch (size) {
        case 'S':
            return 8;
        case 'M':
            return 16;
        case 'L':
            return 24;
    }
};

const post_template = (id, pathname) =>
    `【@${
        id
    } さんの紹介】\n詳しくはwho are you?で確認！\n\n#whoareyou #自己紹介 #友達紹介\n${config.CURRENT_APP_URL +
        pathname} `;

const post_text_template = (name, pathname) =>
    `【#${
        name
    } の紹介】\n詳しくはwho are you?で確認！\n\n#whoareyou #自己紹介 #友達紹介\n${config.CURRENT_APP_URL +
        pathname} `;

const post_text = id =>
    `【@${id}%20さんの紹介】%0a詳しくはwho are you?で確認！%0a%0a`;

const post_text_hash = id =>
    `【${id}%20の紹介】%0a詳しくはwho are you?で確認！%0a%0a`;

const invite_text = id =>
    `【@${
        id
    }%20さんも参加しませんか？】%0awho are you?を一緒に始めて、自分のプロフィールを遊びながら作成し、理解のある友達の輪を広げましょう！%0a%0a`;

const username_min_limit = 0;
const username_max_limit = 45;
const small_picture_size = 256; //px
const email_max_limit = 120;
const email_min_limit = 0;
const nickname_min_limit = 0;
const nickname_max_limit = 45;
const detail_min_limit = 0;
const detail_max_limit = 1000;
const password_min_limit = 8;
const password_max_limit = 125;
const provider_limit = 3;

const heading_body_min_limit = 0;
const heading_body_max_limit = 50;
const answer_body_min_limit = 0;
const answer_body_max_limit = 1000;

const max_decimal_range = 65;
const min_decimal_range = 4;

const drop_down_search_limit = 3;

const answer_index_limit = 3;

const answer_show_text_limit = 100;

const shot_picture_xsize = 1200;
const shot_picture_ysize = 600;

const picture_save_limit = 100;

const default_user_image = '/images/default_profile_image.png';
const default_opg_image = '/images/brands/ogp-logo.png';
const logo_image = '/images/brands/app-logo.png';
const mini_logo_image = '/images/brands/who-are-you_logo.png';

module.exports = {
    fetch_data_limit,
    fetch_data_raw_limit,
    fetch_data_offset,
    concurrency_size,
    uuid_size,
    username_min_limit,
    username_max_limit,
    small_picture_size,
    email_max_limit,
    email_min_limit,
    nickname_min_limit,
    nickname_max_limit,
    detail_min_limit,
    detail_max_limit,
    password_min_limit,
    password_max_limit,
    provider_limit,
    max_decimal_range,
    min_decimal_range,
    drop_down_search_limit,
    answer_index_limit,
    answer_show_text_limit,
    shot_picture_xsize,
    shot_picture_ysize,
    picture_save_limit,
    post_template,
    post_text_template,
    post_text,
    post_text_hash,
    invite_text,
    heading_body_min_limit,
    heading_body_max_limit,
    answer_body_min_limit,
    answer_body_max_limit,
    default_user_image,
    default_opg_image,
    logo_image,
    mini_logo_image,
};
