const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    helmet = require('helmet');

const { connectDB } = require('./config/db');

app.use(helmet());
app.use(morgan('dev'));

connectDB();

app.use('/', require('./routes/index'));
app.use('/api/v1/url', require('./routes/url'));

app.use(express.json({ extended: false }));

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server Started...');
});
