import env from '@env/env.json';

export const APP_NAME = 'Selfinity';
export const APP_NAME_LATIN = 'Selfinity';
export const APP_NAME_UPPERCASE = 'SELFINITY';
export const APP_ICON = 'selfinity';
export const HOST_NAME = 'selfinity';
export const APP_DOMAIN = 'selfinity.com';
export const APP_URL = 'https://selfinity.me';
export const LOCAL_APP_URL = 'http://localhost:8080';
export const CURRENT_APP_URL =
    process.env.NODE_ENV == 'production' ? APP_URL : LOCAL_APP_URL;
export const APP_HOST = 'selfinity.net';
export const APP_IP = 'http://13.114.65.196';
export const TOKEN_NAME = 'Self';
export const LIQUID_TOKEN = 'selfinity';
export const INC_NAME = 'selfiinty';
export const INC_FULL_NAME = '株式会社Selfinity';
export const img_proxy_prefix = 'https://selfinity.s3.amazonaws.com';
export const img_host = 'https://selfinity.s3.ap-northeast-1.amazonaws.com';
export const INC_ADDRESS = env.ADDRESS;

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
};
