import jstz from 'jstimezonedetect';
import LanguageDetect from 'languagedetect';
// import ISO639 from 'languagedetect/ISO639';

const lngDetector = new LanguageDetect('iso2');
// lngDetector.me.languageType = 'iso2';

export function getEnvLocale(env) {
    env = env || process.env;
    return env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
}

export function getTimeZone() {
    var tz = jstz.determine();
    return tz.name();
}

export function getLocaleCodeFromText(text) {
    return lngDetector.detect(text, 1)[0][0];
}
