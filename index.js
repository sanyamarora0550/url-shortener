const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    helmet = require('helmet'),
    bodyParser = require('body-parser');


const { connectDB } = require('./config/db');

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // req.body

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

connectDB();

app.use('/', require('./routes/index'));
app.use('/api/v1/url', require('./routes/url'));

app.use(express.json({ extended: false }));

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server Started...');
});
