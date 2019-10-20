import env from '@env/env.json';

export const APP_NAME = 'Who are you?';
export const APP_NAME_LATIN = 'Who are you?';
export const APP_NAME_UPPERCASE = 'WHO ARE YOU?';
export const APP_ICON = 'who are you';
export const HOST_NAME = 'who are you';
export const APP_DOMAIN = 'whoareyou-jp.com';
export const APP_URL = 'https://whoareyou-jp.com';
export const LOCAL_APP_URL = 'http://localhost:8080';
export const CURRENT_APP_URL =
    process.env.NODE_ENV == 'production' ? APP_URL : LOCAL_APP_URL;
export const APP_HOST = 'whoareyou-jp.com';
export const APP_IP = 'http://13.114.65.196';
export const TOKEN_NAME = 'Self';
export const LIQUID_TOKEN = 'who are you';
export const INC_NAME = 'who are you';
export const INC_FULL_NAME = '株式会社Selfinity';
export const img_proxy_prefix = 'https://selfinity.s3.amazonaws.com';
export const img_host = 'https://selfinity.s3.ap-northeast-1.amazonaws.com';
export const INC_ADDRESS = env.ADDRESS;
export const APP_PUBLIC_IP =
    'http://ec2-54-196-92-235.compute-1.amazonaws.com/';

module.exports = {
    APP_NAME,
    APP_NAME_LATIN,
    APP_NAME_UPPERCASE,
    APP_ICON,
    APP_URL,
    LOCAL_APP_URL,
    APP_DOMAIN,
    LIQUID_TOKEN,
    INC_NAME,
    INC_FULL_NAME,
    TOKEN_NAME,
    APP_HOST,
    APP_IP,
    img_host,
    img_proxy_prefix,
    CURRENT_APP_URL,
    INC_ADDRESS,
    APP_PUBLIC_IP,
};
