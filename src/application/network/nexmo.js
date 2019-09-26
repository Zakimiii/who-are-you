const env = require('@env/env.json');
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: env.NEXMO.KEY,
    apiSecret: env.NEXMO.SECRET,
});

module.exports = nexmo;

//Example
// nexmo.message.sendSms(from, to, text)
