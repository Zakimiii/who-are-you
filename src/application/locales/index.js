import tt from 'counterpart';

function removeEmpty(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
}

export const getValueWithLangs = (
    key,
    params = {
        en: true,
        es: false,
        ru: false,
        fr: false,
        it: false,
        ko: false,
        zh: false,
        pl: false,
        ja: true,
    }
) => {
    if (!key || key == '') return;
    return removeEmpty({
        en: params.en ? tt(key, { locale: 'en' }) : null,
        es: params.es ? tt(key, { locale: 'es' }) : null,
        ru: params.ru ? tt(key, { locale: 'ru' }) : null,
        fr: params.fr ? tt(key, { locale: 'fr' }) : null,
        it: params.it ? tt(key, { locale: 'it' }) : null,
        ko: params.ko ? tt(key, { locale: 'ko' }) : null,
        zh: params.zh ? tt(key, { locale: 'zh' }) : null,
        pl: params.pl ? tt(key, { locale: 'pl' }) : null,
        ja: params.ja ? tt(key, { locale: 'ja' }) : null,
    });
};
