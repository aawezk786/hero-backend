const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Routes
const courseRoutes = require('./src/routes/hero');

//Connection db
require('./src/helpers/init_mongo_db');

//Connection Nodemon
require('./src/helpers/init_nodemon');

mongoose.Promise = global.Promise;

//PARSER SETTING
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false,limit:'50mb'}));
app.use(bodyParser.json({limit:'50mb'}));

//CORS SETTING
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

//Main Routes
app.use('/hero',courseRoutes);


//MIDDLEWARE
app.use((req, res, next) => {
    const error = new Error('Bad Request');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;


