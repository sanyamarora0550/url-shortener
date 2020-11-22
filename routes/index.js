const service = require('./service'),
    express = require('express'),
    router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        req.body.id = req.params.id;
        service.getUrl(req.body, (data) => {
            if (data && data.success) {
                res.redirect(data.url);
            } else {
                res.send({ success: false, msg: 'Bad Request' });
            }
        });
    } catch (err) {
        res.send({ success: false });
        console.error('Error in /:id', err);
    }
});

router.get('/', async (req, res) => {
    res.send("Welcome to Heroku!!!");
});

module.exports = router;