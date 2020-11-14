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

connectDB();

app.use('/', require('./routes/index'));
app.use('/api/v1/url', require('./routes/url'));

app.use(express.json({ extended: false }));

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server Started...');
});
