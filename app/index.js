'use strict';

var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    uuid = require('node-uuid'),
    winston = require('winston'),
    expressWinston = require('express-winston'),
    winstonWebsocket = require('winston-websocket'),
    _ = require('underscore'),
    formatter = require('./formatter.js'),
    callback = require('./callback.js'),
    config = require('./config.js');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// request logger
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true,
            timestamp: true
        })
    ]
}));

// application logger
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            level: 'debug',
            timestamp: true
        }),
    ]
});

var server = http.createServer(app);

if(_.contains(config.logger, 'websocket')) {
    logger.add(winstonWebsocket.WSTransport, { wsoptions: { server: server, path: '/logs' } });
    logger.info('Winston websocket logger is enabled');

    app.use(express.static(__dirname + '/public'));
}


var caller = callback({ url: config.urls.delivery, logger: logger });

app.post('*', function(req, res) {

    logger.info(req.body);

    var id = uuid.v1();
    var message = formatter({ id: id, status: 201 });
    res.set('Content-Type', 'text/xml');
    res.send(200, message);

    setTimeout(function() {
        message = formatter({ id: id, status: 202 });
        caller(message);
    }, 1000);

    setTimeout(function() {
        message = formatter({ id: id, status: 203 });
        caller(message);
    }, 2000);

});


server.listen(process.env.PORT || 3010, function() {
    logger.info('Listening on port %d', server.address().port);
});