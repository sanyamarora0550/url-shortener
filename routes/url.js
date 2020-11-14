const express = require('express'),
    router = express.Router(),
    Url = require('../models/url'),
    service = require('./service');

router.post('/get-short-url', async (req, res) => {
    try {
        service.processUrl(req.body, (data) => {
            res.send(data);
        });
    } catch (err) {
        res.send({ succes: false });
        console.error('Error in /get-short-url', err);
    }
});

module.exports = router;