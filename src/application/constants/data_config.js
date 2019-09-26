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

const home_row_limit = fetch_data_raw_limit('M');

const relate_limit = fetch_data_limit('s');

const trend_limit = 20; //fetch_data_limit('s');
//MEMO: regexp is complecated
const trend_limit_regexp = /[1-9]|[2][0]/;

const title_min_limit = 0;
const title_max_limit = 50;
const body_min_limit = 0;
const body_max_limit = 1500; //unlimited
const request_body_max_limit = 250;
const request_body_min_limit = 0;
const label_title_min_limit = 0;
const label_title_max_limit = 30;

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

const invite_valid_interval = 3;

const max_decimal_range = 65;
const min_decimal_range = 4;

const vote_max_limit = 10;
const good_opinion_max_limit = 1;

const w2v_size = 50;

const email_desc_max_limit = 50;

const disscussion_count_min_limit =
    process.env.NODE_ENV == 'development' ? 0 : 3;
const disscussion_sum_min_limit = process.env.NODE_ENV == 'development' ? 0 : 1;
const topic_count_min_limit = process.env.NODE_ENV == 'development' ? 0 : 5;
const topic_sum_min_limit = process.env.NODE_ENV == 'development' ? 0 : 1;

const drop_down_search_limit = 3;

module.exports = {
    invite_valid_interval,
    fetch_data_limit,
    fetch_data_raw_limit,
    fetch_data_offset,
    concurrency_size,
    home_row_limit,
    relate_limit,
    title_min_limit,
    title_max_limit,
    body_min_limit,
    body_max_limit,
    request_body_min_limit,
    request_body_max_limit,
    label_title_min_limit,
    label_title_max_limit,
    username_min_limit,
    username_max_limit,
    email_min_limit,
    email_max_limit,
    nickname_min_limit,
    nickname_max_limit,
    detail_min_limit,
    detail_max_limit,
    password_min_limit,
    password_max_limit,
    max_decimal_range,
    min_decimal_range,
    w2v_size,
    small_picture_size,
    uuid_size,
    provider_limit,
    vote_max_limit,
    good_opinion_max_limit,
    email_desc_max_limit,
    trend_limit,
    trend_limit_regexp,
    disscussion_count_min_limit,
    disscussion_sum_min_limit,
    topic_count_min_limit,
    topic_sum_min_limit,
    drop_down_search_limit,
};
