const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const Url = require('../models/url');

async function processUrl(reqBody, callback) {
    const { longUrl } = reqBody
    if (!longUrl) {
        callback({ success: false, msg: 'Invalid  Url' });
        return;
    }
    const baseUrl = config.get('baseUrl');

    if (!validUrl.isUri(baseUrl)) {
        callback({ success: false, msg: 'Invalid Base Url' });
        return;
    }
    const urlCode = shortid.generate();

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            if (url) {
                callback({ success: true, data: url });
            } else {
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                callback({ success: true, data: url });
                await url.save();
            }
        } catch (err) {
            console.error(err);
            callback({ success: false, msg: 'Server Busy' });
            return;
        }
    } else {
        callback({ success: false, msg: 'Bad request!!' });
        return;
    }
}

module.exports = {
    processUrl
}