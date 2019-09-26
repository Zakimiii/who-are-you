const sgMail = require('@sendgrid/mail');
const templates = require('./mail_templates.json');
const clone = require('lodash/clone');
const env = require('@env/env.json');
const html_mail = require('@network/html_mail');

if (!env.SENDGRID_API_KEY) {
    throw new Error('Missing SENDGRID_API_KEY env var');
}

sgMail.setApiKey(env.SENDGRID_API_KEY);

const mail = {};

mail.send = function sendMail(to, template, params = {}) {
    return new Promise((resolve, reject) => {
        const data = clone(templates[template]);
        if (!data) return;
        data.html =
            data.html &&
            (html_mail.templates[template] || html_mail.base_template);
        for (const key of Object.keys(params)) {
            // eslint-disable-line no-restricted-syntax
            data.text =
                data.text && data.text.split(`{${key}}`).join(params[key]);
            data.subject = data.subject.split(`{${key}}`).join(params[key]);
            data.html =
                data.html &&
                data.html
                    .split(`{${key}}`)
                    .join(params[key])
                    .split(`{subject}`)
                    .join(data.subject);
        }
        data.to = to;
        sgMail.send(data, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = mail;
