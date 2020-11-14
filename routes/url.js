const express = require('express'),
    router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const Url = require('../models/url');

router.post('/get-short-url', async (req, res) => {
    console.log(req.body);
    const { longUrl } = req.body;

    if (!longUrl) {
        return res.sendStatus(401).json('Invalid Base Url.....!!!!');
    }
    const baseUrl = config.get('baseUrl');

    if (!validUrl.isUri(baseUrl)) {
        return res.sendStatus(401).json('Invalid Base Url.....!!!!');
    }
    const urlCode = shortid.generate();

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            if (url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
            }
        } catch (err) {
            console.error(err);
            res.sendStatus(500).json('Server Busy!!');
        }
    } else {
        res.sendStatus(401).json('Bad Request');
    }
});

module.exports = router;