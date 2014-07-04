'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    uuid = require('node-uuid'),
    winston = require('winston'),
    expressWinston = require('express-winston'),
    formatter = require('./formatter.js'),
    callback = require('./callback.js');

var urls = {
    'delivery': 'http://spp.dev/callback/smsdelivery'
};

// application logger
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            level: 'debug'
        }),
    ]
});

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// request logger
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ]
}));

app.all('*', function(req, res) {

    logger.info(req.body);

    var id = uuid.v1();
    var message = formatter({ id: id, status: 201 });
    res.set('Content-Type', 'text/xml');
    res.send(200, message);

    setTimeout(function() {
        message = formatter({ id: id, status: 202 });
        callback({url: urls.delivery, message: message, logger: logger});
    }, 1000);

    setTimeout(function() {
        message = formatter({ id: id, status: 203 });
        callback({url: urls.delivery, message: message, logger: logger});
    }, 2000);

});


var server = app.listen(process.env.PORT || 3010, function() {
    logger.info('Listening on port %d', server.address().port);
});