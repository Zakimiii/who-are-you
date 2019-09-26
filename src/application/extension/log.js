export const _stringval = v => (typeof v === 'string' ? v : JSON.stringify(v));
export function logRequest(path, ctx, extra) {
    let d = { ip: getRemoteIp(ctx.req) };
    if (ctx.session) {
        if (ctx.session.user) {
            d.user = ctx.session.user;
        }
        if (ctx.session.uid) {
            d.uid = ctx.session.uid;
        }
        // if (ctx.session.a) {
        //     d.account = ctx.session.a;
        // }
    }
    if (extra) {
        Object.keys(extra).forEach(k => {
            const nk = d[k] ? '_' + k : k;
            d[nk] = extra[k];
        });
    }
    const info = Object.keys(d)
        .map(k => `${k}=${_stringval(d[k])}`)
        .join(' ');
    console.log(`-- /${path} --> ${info}`);
}

export const developperLog = () => {
    if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'staging'
    ) {
        console.log(
            '%c%s',
            'color: red; background: yellow; font-size: 24px;',
            'WARNING!'
        );
        console.log(
            '%c%s',
            'color: black; font-size: 16px;',
            'This is a developer console, you must read and understand anything you paste or type here or you could compromise your account and your private keys.'
        );
    }
};

const logger = (key, value) => {
    console.log(`   > ${key}:        ${value}`);
};

module.exports = {
    logRequest,
    developperLog,
    logger,
};
